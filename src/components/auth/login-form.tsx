
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePostData } from "@/lib/apiClient";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "لطفا یک ایمیل معتبر وارد کنید." }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد." }),
});

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = usePostData({
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      toast.success("با موفقیت وارد شدید!");
      router.push("/");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ endPoint: "/login", data: values });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ورود به حساب کاربری</CardTitle>
        <CardDescription>برای دسترسی به پنل خود وارد شوید.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="underline">
            ثبت‌نام کنید
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
