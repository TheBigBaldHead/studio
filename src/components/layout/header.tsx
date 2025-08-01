
"use client"

import Link from "next/link"
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  ShieldCheck,
  Sparkles,
  LogOut,
  LogIn,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { logout } from "@/lib/auth/actions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { href: "#categories", label: "دسته بندی ها" },
  { href: "#featured", label: "ویژه" },
  { href: "#new-arrivals", label: "تازه رسیده" },
]

export function Header() {
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              لارا
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/admin"
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                <ShieldCheck className="h-4 w-4" />
                ادمین
              </Link>
            )}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">تغییر منو</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pr-0">
            <Link href="/" className="mr-6 flex items-center space-x-2">
               <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">لارا</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                 {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <Link href="/admin" className="text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    ادمین
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی محصولات..."
                className="w-full md:w-[250px] pr-9"
              />
            </div>
          </div>
          <nav className="flex items-center">
            {loading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
                      <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/account">
                      <User className="mr-2 h-4 w-4" />
                      <span>حساب کاربری</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>خروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
               <Button asChild>
                  <Link href="/login">
                     <LogIn className="ml-2 h-4 w-4" />
                     ورود
                  </Link>
               </Button>
            )}

            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">سبد خرید</span>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
