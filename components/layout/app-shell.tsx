import * as React from "react"
import { Navbar } from "./navbar"

interface AppShellProps {
  children: React.ReactNode
  navItems?: Array<{ label: string; href: string }>
}

export function AppShell({ children, navItems }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar navItems={navItems} />
      <main className="container mx-auto max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} ProjectReview Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
