
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { logout } from "@/lib/auth/actions";

export default async function AccountPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>حساب کاربری</CardTitle>
          <CardDescription>
            اطلاعات حساب کاربری شما در اینجا نمایش داده می شود.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">ایمیل</h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">نام کاربری</h3>
            <p className="text-muted-foreground">{user.name || "تعیین نشده"}</p>
          </div>
        </CardContent>
        <CardFooter>
          <form action={logout}>
            <Button variant="destructive">خروج از حساب</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
