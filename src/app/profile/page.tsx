
"use client"

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, isAuthLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isAuthLoading || !user) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/50">
            <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">این صفحه پروفایل شماست. به زودی امکانات بیشتری به آن اضافه خواهد شد.</p>
            <Button variant="destructive" onClick={handleLogout}>خروج از حساب کاربری</Button>
        </CardContent>
      </Card>
    </div>
  );
}
