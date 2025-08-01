import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 px-8 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            ساخته شده توسط هوش مصنوعی همسایه شما.
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} شرکت لارا. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  )
}
