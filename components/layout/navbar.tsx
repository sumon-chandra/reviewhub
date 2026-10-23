"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { AuthNav } from "./auth-nav"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  navItems?: NavItem[]
}

export function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const effectiveNavItems: NavItem[] =
    navItems ??
    (user
      ? user.role === "MENTOR"
        ? [{ label: "Mentor Dashboard", href: "/mentor/dashboard" }]
        : [{ label: "My Submission", href: "/student/submission" }]
      : [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <CheckCircle2 className="size-4" />
            </div>
            <span className="text-sm font-semibold">Project Review Hub</span>
          </Link>

          {effectiveNavItems.length > 0 && (
            <nav className="hidden items-center gap-1 md:flex">
              {effectiveNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-accent font-semibold text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <AuthNav />
          <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
