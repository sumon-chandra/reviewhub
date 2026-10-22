"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected runtime errors
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4 shadow-xs">
        <AlertTriangle className="size-7" />
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-destructive font-semibold mb-1">
        Runtime Error
      </span>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Something went wrong
      </h1>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {error.message ||
          "An unexpected application error occurred while processing your request."}
      </p>

      {error.digest && (
        <p className="mt-1 font-mono text-[11px] text-muted-foreground/70">
          Digest: {error.digest}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button size="sm" onClick={() => reset()} className="gap-2">
          <RefreshCw className="size-3.5" />
          Try Again
        </Button>
        <Link href="/">
          <Button size="sm" variant="outline" className="gap-2">
            <Home className="size-3.5" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
