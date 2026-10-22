"use client";

import * as React from "react";
import { History, ExternalLink, GitBranch, Globe, Sparkles } from "lucide-react";
import type { ProjectSubmission } from "@/types";
import {
  formatDate,
  getRatingBadgeVariant,
  getStatusBadgeVariant,
  RATING_LABELS,
  STATUS_LABELS,
} from "../utils/format-review";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AttemptHistoryProps {
  attempts: ProjectSubmission[];
}

export function AttemptHistory({ attempts }: AttemptHistoryProps) {
  // Exclude attempt #0 (latest), focus on historical attempts, or display all historical attempts
  const historicalAttempts = attempts.slice(1);

  if (historicalAttempts.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <History className="size-4 text-primary" />
          <CardTitle className="text-base font-semibold">
            Submission History & Previous Attempts ({historicalAttempts.length})
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="divide-y divide-border/60 p-0">
        {historicalAttempts.map((attempt) => {
          const review = attempt.review;

          return (
            <div key={attempt.id} className="p-5 space-y-3 hover:bg-muted/10 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Attempt #{attempt.attemptNumber}
                  </Badge>
                  <Badge variant={getStatusBadgeVariant(attempt.status)}>
                    {STATUS_LABELS[attempt.status]}
                  </Badge>
                  {review?.rating && (
                    <Badge variant={getRatingBadgeVariant(review.rating)} className="gap-1 text-xs">
                      <Sparkles className="size-3" />
                      {RATING_LABELS[review.rating]}
                    </Badge>
                  )}
                </div>

                <span className="text-xs text-muted-foreground">
                  {formatDate(attempt.submittedAt)}
                </span>
              </div>

              {/* Attempt Description */}
              <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {attempt.description}
              </p>

              {/* URLs */}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                <a
                  href={attempt.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground hover:underline"
                >
                  <GitBranch className="size-3" />
                  Repo Link
                  <ExternalLink className="size-2.5" />
                </a>

                <a
                  href={attempt.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground hover:underline"
                >
                  <Globe className="size-3" />
                  Demo Link
                  <ExternalLink className="size-2.5" />
                </a>
              </div>

              {/* Historical Mentor Review */}
              {review && (
                <div className="mt-3 rounded-lg bg-muted/30 p-3 border border-border/50 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-medium text-foreground">
                    <span>Mentor Feedback by {review.mentor?.name || "Mentor"}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  {review.feedback && (
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {review.feedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
