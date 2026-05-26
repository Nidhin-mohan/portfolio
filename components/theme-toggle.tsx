"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground">
        <Moon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</span>
    </button>
  )
}
