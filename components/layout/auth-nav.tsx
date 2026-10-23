"use client"

import * as React from "react"
import Link from "next/link"
import { LogOut, User as UserIcon } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

export function AuthNav() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  if (isLoading) {
    return <Skeleton className="h-8 w-24 rounded-md" />
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-xs">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="text-xs">
            Sign up
          </Button>
        </Link>
      </div>
    )
  }

  const isMentor = user.role === "MENTOR"
  const dashboardHref = isMentor ? "/mentor/dashboard" : "/student/submission"

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 border-border/80 px-2.5 text-xs font-normal"
            />
          }
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserIcon className="size-3" />
          </div>
          <span className="max-w-[110px] truncate font-medium text-foreground">
            {user.name}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="truncate text-[11px] leading-none text-muted-foreground">
                  {user.email}
                </p>
                <div className="pt-1">
                  <Badge
                    variant="outline"
                    className="px-1.5 py-0 font-mono text-[10px]"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem render={<Link href={dashboardHref} />}>
              {isMentor ? "Mentor Dashboard" : "My Submission"}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={logout}
              className="cursor-pointer gap-2"
            >
              <LogOut className="size-3.5" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
