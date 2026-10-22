import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
        <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1 text-xs font-medium">
          <Sparkles className="size-3.5 text-primary" />
          ProjectReview Hub Platform
        </Badge>

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          Streamlined Project Submissions and Mentor Reviews
        </h1>

        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          A focused platform connecting students and mentors. Submit project repositories,
          track review decisions in real time, and inspect structured feedback.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
              Student Registration
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                <CheckCircle2 className="size-5" />
              </div>
              <CardTitle className="text-base font-semibold">Single Project Identity</CardTitle>
              <CardDescription className="text-xs">
                Students maintain one project with continuous versioned submission attempts.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Resubmit with updated repository and live demo URLs whenever revisions are needed.
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                <UserCheck className="size-5" />
              </div>
              <CardTitle className="text-base font-semibold">Structured Reviews</CardTitle>
              <CardDescription className="text-xs">
                Clear formal status decisions paired with standardized review ratings.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Ratings from Excellent to Needs Improvement with constructive mentor feedback.
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                <ShieldCheck className="size-5" />
              </div>
              <CardTitle className="text-base font-semibold">Server-Driven Control</CardTitle>
              <CardDescription className="text-xs">
                Protected role boundaries with server-side pagination and filters.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Real-time synchronization powered by TanStack Query and verified backend schemas.
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
