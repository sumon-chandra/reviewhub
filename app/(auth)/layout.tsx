import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center py-8">
        {children}
      </div>
    </AppShell>
  );
}
