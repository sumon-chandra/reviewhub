"use client";

import * as React from "react";
import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const { isAuthorized, isLoading } = useAuthGuard(["MENTOR"]);

  if (isLoading || !isAuthorized) {
    return (
      <AppShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner label="Authenticating mentor session..." />
        </div>
      </AppShell>
    );
  }

  return <AppShell>{children}</AppShell>;
}
