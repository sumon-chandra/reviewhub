"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { AuthNav } from "./auth-nav";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems?: NavItem[];
  rightContent?: React.ReactNode;
}

export function Navbar({ navItems, rightContent }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const effectiveNavItems: NavItem[] =
    navItems ??
    (user
      ? user.role === "MENTOR"
        ? [{ label: "Mentor Dashboard", href: "/mentor/dashboard" }]
        : [{ label: "My Submission", href: "/student/submission" }]
      : []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground hover:opacity-90 transition-opacity"
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <CheckCircle2 className="size-4" />
            </div>
            <span className="text-sm font-semibold">ProjectReview Hub</span>
          </Link>

          {effectiveNavItems.length > 0 && (
            <nav className="hidden md:flex items-center gap-1">
              {effectiveNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightContent ?? <AuthNav />}
          <div className="h-4 w-px bg-border mx-1" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
