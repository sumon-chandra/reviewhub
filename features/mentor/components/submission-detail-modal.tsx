"use client";

import * as React from "react";
import Link from "next/link";
import {
  ExternalLink,
  GitBranch,
  Globe,
  Award,
  Sparkles,
  History,
} from "lucide-react";
import { useMentorSubmissionDetail } from "../hooks/use-mentor";
import {
  formatDate,
  getRatingBadgeVariant,
  getStatusBadgeVariant,
  RATING_LABELS,
  STATUS_LABELS,
} from "@/features/student/utils/format-review";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubmissionDetailModalProps {
  submissionId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenReview: () => void;
}

export function SubmissionDetailModal({
  submissionId,
  open,
  onOpenChange,
  onOpenReview,
}: SubmissionDetailModalProps) {
  const { data: detail, isLoading } = useMentorSubmissionDetail(
    open ? submissionId : null,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {isLoading || !detail ? (
          <div className="py-12">
            <LoadingSpinner label="Loading submission details..." />
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            <DialogHeader className="border-b border-border/50 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Attempt #{detail.attemptNumber}
                  </Badge>
                  <Badge variant={getStatusBadgeVariant(detail.status)}>
                    {STATUS_LABELS[detail.status]}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/mentor/submissions/${detail.id}`}>
                    <Button variant="ghost" size="xs" className="gap-1 text-xs h-8">
                      <ExternalLink className="size-3" />
                      Full View
                    </Button>
                  </Link>

                  {detail.status === "PENDING" && (
                    <Button
                      size="sm"
                      className="gap-1.5 text-xs h-8"
                      onClick={() => {
                        onOpenChange(false);
                        onOpenReview();
                      }}
                    >
                      <Award className="size-3.5" />
                      Evaluate Attempt
                    </Button>
                  )}
                </div>
              </div>

              <DialogTitle className="text-xl font-bold pt-2">
                {detail.project.projectName}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Submitted by {detail.project.student.name} ({detail.project.student.email}) on {formatDate(detail.submittedAt)}
              </p>
            </DialogHeader>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={detail.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GitBranch className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">Source Repository</p>
                    <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                      {detail.repositoryUrl}
                    </p>
                  </div>
                </div>
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </a>

              <a
                href={detail.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="size-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">Live Demonstration</p>
                    <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                      {detail.liveUrl}
                    </p>
                  </div>
                </div>
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </a>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Submission Notes & Description
              </h4>
              <div className="rounded-lg bg-muted/20 p-4 border border-border/50 text-sm whitespace-pre-wrap text-foreground leading-relaxed">
                {detail.description}
              </div>
            </div>

            {/* Review Section */}
            {detail.review && (
              <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-foreground">
                    Review Decision & Rating
                  </h4>
                  <Badge variant={getRatingBadgeVariant(detail.review.rating)} className="gap-1 text-xs">
                    <Sparkles className="size-3" />
                    {RATING_LABELS[detail.review.rating] || detail.review.rating}
                  </Badge>
                </div>

                {detail.review.feedback && (
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground mb-1">
                      Feedback
                    </p>
                    <div className="rounded-lg bg-background p-3 text-xs border border-border/60 text-foreground whitespace-pre-wrap leading-relaxed">
                      {detail.review.feedback}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                  <span>Reviewed by {detail.review.mentor?.name || "Mentor"}</span>
                  <span>{formatDate(detail.review.createdAt)}</span>
                </div>
              </div>
            )}

            {/* All Project Attempts */}
            {detail.project.submissions.length > 1 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <History className="size-4 text-primary" />
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    All Project Attempts ({detail.project.submissions.length})
                  </h4>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {detail.project.submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                        sub.id === detail.id
                          ? "bg-accent/40 border-primary/40 font-medium"
                          : "bg-muted/10 border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          #{sub.attemptNumber}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(sub.status)} className="text-[10px]">
                          {STATUS_LABELS[sub.status]}
                        </Badge>
                        {sub.review && (
                          <span className="text-[11px] text-muted-foreground">
                            ({RATING_LABELS[sub.review.rating] || sub.review.rating})
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {formatDate(sub.submittedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
