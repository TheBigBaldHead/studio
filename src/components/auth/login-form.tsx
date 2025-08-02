
"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePostData } from "@/lib/apiClient";
import { useAuth } from "@/hooks/use-auth";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("لطفا یک ایمیل معتبر وارد کنید.").required("ایمیل الزامی است."),
  password: Yup.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.").required("رمز عبور الزامی است."),
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>ورود به حساب کاربری</CardTitle>
        <CardDescription>برای دسترسی به پنل خود وارد شوید.</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            mutate({ endPoint: "/login", data: values });
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  className={errors.email && touched.email ? "border-destructive" : ""}
                />
                <ErrorMessage name="email" component="div" className="text-sm font-medium text-destructive" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                 <div className="relative">
                    <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={cn("pl-10", errors.password && touched.password ? "border-destructive" : "")}
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
                <ErrorMessage name="password" component="div" className="text-sm font-medium text-destructive" />
              </div>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "در حال ورود..." : "ورود"}
              </Button>
            </Form>
          )}
        </Formik>
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
