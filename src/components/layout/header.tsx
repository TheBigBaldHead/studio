
"use client"

import Link from "next/link"
import {
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { featuredProducts, Product } from "@/lib/placeholder-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/search", label: "محصولات" },
  { href: "#categories", label: "دسته بندی ها" },
  { href: "#featured", label: "ویژه" },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (searchQuery) {
      const results = featuredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(searchQuery) {
      router.push(`/search?q=${searchQuery}`);
      setIsSearchFocused(false);
      setSearchQuery('');
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              لارا
            </span>
          </Link>
          <div className="hidden md:flex items-center">
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
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Center Section - Search Bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md" ref={searchRef}>
             <form onSubmit={handleSearchSubmit}>
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی محصولات..."
                className="w-full pr-9"
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                value={searchQuery}
              />
            </form>
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg overflow-hidden">
                {searchResults.length > 0 ? (
                  <ScrollArea className="h-72">
                    <ul className="text-right">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <Link 
                            href={`/products/${product.id}`} 
                            className="flex items-center justify-end gap-4 p-3 hover:bg-accent text-right"
                            onClick={() => {
                              setSearchQuery("")
                              setIsSearchFocused(false)
                            }}
                          >
                            <div className="flex flex-col text-right">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-sm text-muted-foreground">{product.price}</span>
                            </div>
                            <Image 
                              src={product.image} 
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover" 
                              />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                      محصولی یافت نشد.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-2 ml-6">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">سبد خرید</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">پروفایل کاربر</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer justify-end">
                  پروفایل
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer justify-end">
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">ورود</Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
