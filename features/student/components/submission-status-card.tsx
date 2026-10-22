"use client";

import * as React from "react";
import {
  ExternalLink,
  GitBranch,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  RotateCw,
} from "lucide-react";
import type { StudentProject } from "@/types";
import {
  formatDate,
  getStatusBadgeVariant,
  getRatingBadgeVariant,
  RATING_LABELS,
  STATUS_LABELS,
} from "../utils/format-review";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SubmissionStatusCardProps {
  project: StudentProject;
  onOpenResubmit: () => void;
}

export function SubmissionStatusCard({
  project,
  onOpenResubmit,
}: SubmissionStatusCardProps) {
  const latestSubmission = project.submissions[0];
  const review = latestSubmission?.review;
  const isRejected = latestSubmission?.status === "REJECTED";
  const isPending = latestSubmission?.status === "PENDING";
  const isApproved = latestSubmission?.status === "APPROVED";

  return (
    <Card className="border-border/70 shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-mono text-[11px] px-2 py-0.5">
                Attempt #{latestSubmission?.attemptNumber ?? 1}
              </Badge>
              <Badge variant={getStatusBadgeVariant(latestSubmission?.status ?? "PENDING")}>
                {latestSubmission?.status === "PENDING" && <Clock className="size-3 mr-1" />}
                {latestSubmission?.status === "APPROVED" && <CheckCircle2 className="size-3 mr-1" />}
                {latestSubmission?.status === "REJECTED" && <AlertCircle className="size-3 mr-1" />}
                {STATUS_LABELS[latestSubmission?.status ?? "PENDING"]}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              {project.projectName}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Submitted on {formatDate(latestSubmission?.submittedAt)}
            </CardDescription>
          </div>

          {isRejected && (
            <Button onClick={onOpenResubmit} className="gap-2 shrink-0">
              <RotateCw className="size-4" />
              Submit Revision
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Project Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={latestSubmission?.repositoryUrl || project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:text-foreground">
                <GitBranch className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">Repository</p>
                <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                  {latestSubmission?.repositoryUrl || project.repositoryUrl}
                </p>
              </div>
            </div>
            <ExternalLink className="size-3.5 text-muted-foreground shrink-0 group-hover:text-foreground" />
          </a>

          <a
            href={latestSubmission?.liveUrl || project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:text-foreground">
                <Globe className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">Live Demo</p>
                <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                  {latestSubmission?.liveUrl || project.liveUrl}
                </p>
              </div>
            </div>
            <ExternalLink className="size-3.5 text-muted-foreground shrink-0 group-hover:text-foreground" />
          </a>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Submission Notes & Description
          </h4>
          <div className="rounded-lg bg-muted/20 p-4 border border-border/40 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {latestSubmission?.description}
          </div>
        </div>

        {/* Mentor Review Section */}
        {review ? (
          <div className="rounded-xl border border-border/80 bg-muted/20 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">
                  Mentor Evaluation
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Rating:</span>
                <Badge variant={getRatingBadgeVariant(review.rating)} className="gap-1">
                  <Sparkles className="size-3" />
                  {RATING_LABELS[review.rating] || review.rating}
                </Badge>
              </div>
            </div>

            {review.feedback && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  Mentor Feedback
                </p>
                <div className="rounded-lg bg-background p-3.5 border border-border/60 text-sm whitespace-pre-wrap text-foreground leading-relaxed">
                  {review.feedback}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>Reviewed by {review.mentor?.name || "Assigned Mentor"}</span>
              <span>{formatDate(review.createdAt)}</span>
            </div>
          </div>
        ) : (
          isPending && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-900 dark:text-amber-200">
              <Clock className="size-5 shrink-0 text-amber-500 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold">Review Pending</p>
                <p className="text-muted-foreground">
                  A mentor will review your repository, live demo, and implementation. You will be notified once a formal decision is recorded.
                </p>
              </div>
            </div>
          )
        )}

        {isApproved && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
            <p className="text-xs font-medium">
              Congratulations! Your project submission has been approved. No further actions are required.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
