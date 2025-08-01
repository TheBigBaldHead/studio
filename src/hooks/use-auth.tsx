
"use client";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useEffect, useState, createContext, useContext } from "react";

const auth = getAuth(app);

export const AuthContext = createContext<{ user: User | null, loading: boolean }>({ user: null, loading: true });

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
