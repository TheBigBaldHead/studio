"use client"

import type { FC, ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const themeProps: ThemeProviderProps = {
    attribute: "class",
    defaultTheme: "system",
    enableSystem: true,
  }

  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
}
