"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";
import type { Role } from "@/types";

export function useAuthGuard(allowedRoles?: Role[]) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      if (user.role === "MENTOR") {
        router.replace("/mentor/dashboard");
      } else {
        router.replace("/student/submission");
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

  const isAuthorized =
    isAuthenticated &&
    user &&
    (!allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(user.role));

  return {
    user,
    isLoading,
    isAuthorized,
  };
}
