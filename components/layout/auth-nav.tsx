"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthNav() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <Skeleton className="h-8 w-24 rounded-md" />;
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
    );
  }

  const isMentor = user.role === "MENTOR";
  const dashboardHref = isMentor ? "/mentor/dashboard" : "/student/submission";

  return (
    <div className="flex items-center gap-3">
      <Link href={dashboardHref} className="hidden sm:inline-block">
        <Badge
          variant={isMentor ? "default" : "secondary"}
          className="text-[10px] tracking-wide uppercase px-2 py-0.5"
        >
          {user.role}
        </Badge>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs h-8 px-2.5 font-normal border-border/80"
            />
          }
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserIcon className="size-3" />
          </div>
          <span className="max-w-[110px] truncate text-foreground font-medium">
            {user.name}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-semibold leading-none text-foreground">{user.name}</p>
              <p className="text-[11px] leading-none text-muted-foreground truncate">
                {user.email}
              </p>
              <div className="pt-1">
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-mono">
                  {user.role}
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem render={<Link href={dashboardHref} />}>
            {isMentor ? "Mentor Dashboard" : "My Submission"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={logout}
            className="cursor-pointer gap-2"
          >
            <LogOut className="size-3.5" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
