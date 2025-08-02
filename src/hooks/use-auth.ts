
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types/auth';

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({ user: null, accessToken: null });
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const revalidate = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const { user, accessToken } = JSON.parse(storedUser);
          setAuth({ user, accessToken });
        } else {
          setAuth({ user: null, accessToken: null });
        }
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
      setAuth({ user: null, accessToken: null });
    } finally {
        setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    revalidate();
    
    const handleStorageChange = () => {
        revalidate();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [revalidate]);

  const login = (user: User, accessToken: string) => {
    const userData = { user, accessToken };
    localStorage.setItem('user', JSON.stringify(userData));
    setAuth(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth({ user: null, accessToken: null });
  };

  return { ...auth, login, logout, isAuthLoading, revalidate };
}
