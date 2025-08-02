
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onChange, placeholder, ...props }, ref) => {
    const [direction, setDirection] = React.useState('rtl');
    const persianRegex = /[\u0600-\u06FF]/;

    React.useEffect(() => {
        if (placeholder && persianRegex.test(placeholder)) {
            setDirection('rtl');
        } else if (placeholder) {
            setDirection('ltr');
        }
    }, [placeholder]);

    const handleDirectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && persianRegex.test(e.target.value)) {
        setDirection('rtl');
      } else if (e.target.value) {
        setDirection('ltr');
      } else {
        // Reset to placeholder's direction if input is cleared
        if (placeholder && persianRegex.test(placeholder)) {
            setDirection('rtl');
        } else {
            setDirection('ltr');
        }
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        placeholder={placeholder}
        onChange={handleDirectionChange}
        style={{ direction }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
