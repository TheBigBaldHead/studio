
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
import { Label } from "../ui/label";

const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, "نام باید حداقل ۲ کاراکتر باشد.").required("نام الزامی است."),
  email: Yup.string().email("لطفا یک ایمیل معتبر وارد کنید.").required("ایمیل الزامی است."),
  password: Yup.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد.").required("رمز عبور الزامی است."),
});

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const { mutate, isPending } = usePostData({
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      toast.success("ثبت‌نام با موفقیت انجام شد!");
      router.push("/");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد حساب کاربری جدید</CardTitle>
        <CardDescription>فرم زیر را برای ساخت حساب جدید تکمیل کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            mutate({ endPoint: "/register", data: values });
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
               <div className="space-y-2">
                <Label htmlFor="name">نام</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="نام شما"
                  className={errors.name && touched.name ? "border-destructive" : ""}
                />
                <ErrorMessage name="name" component="div" className="text-sm font-medium text-destructive" />
              </div>

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
                        className={errors.password && touched.password ? "border-destructive" : ""}
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
                {isPending ? "در حال ثبت نام..." : "ثبت نام"}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center text-sm">
          قبلا ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="underline">
            وارد شوید
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
