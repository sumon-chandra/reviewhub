import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AppShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-xs">
          <Compass className="size-7" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold mb-1">
          404 Error
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The requested page could not be located. It might have been moved, renamed,
          or does not exist on ProjectReview Hub.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button size="sm" className="gap-2">
              <Home className="size-3.5" />
              Return Home
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
