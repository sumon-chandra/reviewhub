"use client";

import * as React from "react";
import { Clock, CheckCircle2, AlertCircle, FileCheck } from "lucide-react";
import type { MentorStatistics } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsProps {
  stats?: MentorStatistics | null;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border/60">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const items = [
    {
      title: "Total Submissions",
      value: stats?.totalSubmissions ?? 0,
      description: "All historical project attempts",
      icon: FileCheck,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Pending Review",
      value: stats?.pendingCount ?? 0,
      description: "Awaiting mentor evaluation",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Approved Projects",
      value: stats?.approvedCount ?? 0,
      description: "Successfully evaluated & passed",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Changes Requested",
      value: stats?.rejectedCount ?? 0,
      description: "Returned for revisions",
      icon: AlertCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="border-border/60 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className={`flex size-8 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {item.value}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
