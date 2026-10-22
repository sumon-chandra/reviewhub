"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Award,
  ExternalLink,
  GitBranch,
  Globe,
  History,
  Sparkles,
} from "lucide-react";
import { useMentorSubmissionDetail } from "@/features/mentor/hooks/use-mentor";
import { ReviewModal } from "@/features/mentor/components/review-modal";
import {
  formatDate,
  getRatingBadgeVariant,
  getStatusBadgeVariant,
  RATING_LABELS,
  STATUS_LABELS,
} from "@/features/student/utils/format-review";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import { ErrorCard } from "@/components/feedback/error-card";

export default function MentorSubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id;
  const [reviewOpen, setReviewOpen] = React.useState(false);

  const {
    data: detail,
    isLoading,
    isError,
    error,
    refetch,
  } = useMentorSubmissionDetail(submissionId);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" label="Loading submission details..." />
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <ErrorCard
          title="Submission Not Found"
          message={
            error instanceof Error
              ? error.message
              : "Could not retrieve details for this project submission."
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const isPending = detail.status === "PENDING";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div>
        <Link href="/mentor/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <ArrowLeft className="size-3.5" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="font-mono text-xs">
              Attempt #{detail.attemptNumber}
            </Badge>
            <Badge variant={getStatusBadgeVariant(detail.status)}>
              {STATUS_LABELS[detail.status]}
            </Badge>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {detail.project.projectName}
          </h1>

          <p className="text-xs text-muted-foreground mt-1">
            Submitted by{" "}
            <span className="font-medium text-foreground">
              {detail.project.student.name}
            </span>{" "}
            ({detail.project.student.email}) on {formatDate(detail.submittedAt)}
          </p>
        </div>

        {isPending && (
          <Button
            size="sm"
            className="gap-2 self-start sm:self-auto text-xs"
            onClick={() => setReviewOpen(true)}
          >
            <Award className="size-4" />
            Evaluate Attempt
          </Button>
        )}
      </div>

      {/* Repository & Demo Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={detail.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <Card className="h-full border-border/70 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GitBranch className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-xs font-semibold">Source Repository</CardTitle>
                  <p className="text-[11px] text-muted-foreground">GitHub / GitLab Code</p>
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <p className="text-xs font-mono text-foreground truncate">
                {detail.repositoryUrl}
              </p>
            </CardContent>
          </Card>
        </a>

        <a
          href={detail.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <Card className="h-full border-border/70 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Globe className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-xs font-semibold">Live Demonstration</CardTitle>
                  <p className="text-[11px] text-muted-foreground">Hosted Web Application</p>
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <p className="text-xs font-mono text-foreground truncate">
                {detail.liveUrl}
              </p>
            </CardContent>
          </Card>
        </a>
      </div>

      {/* Description & Submission Notes */}
      <Card className="border-border/70 shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Submission Description & Technical Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/20 p-4 border border-border/50 text-sm whitespace-pre-wrap text-foreground leading-relaxed">
            {detail.description}
          </div>
        </CardContent>
      </Card>

      {/* Review Feedback Section */}
      {detail.review && (
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Mentor Evaluation & Feedback
            </CardTitle>
            <Badge
              variant={getRatingBadgeVariant(detail.review.rating)}
              className="gap-1 text-xs"
            >
              <Sparkles className="size-3" />
              {RATING_LABELS[detail.review.rating] || detail.review.rating}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {detail.review.feedback && (
              <div>
                <p className="text-[11px] font-medium text-muted-foreground mb-1">
                  Mentor Remarks
                </p>
                <div className="rounded-lg bg-background p-4 text-xs border border-border/60 text-foreground whitespace-pre-wrap leading-relaxed">
                  {detail.review.feedback}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
              <span>Reviewed by {detail.review.mentor?.name || "Mentor"}</span>
              <span>{formatDate(detail.review.createdAt)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attempt History */}
      {detail.project.submissions.length > 1 && (
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <History className="size-4 text-primary" />
              <CardTitle className="text-sm font-semibold">
                Project Attempt History ({detail.project.submissions.length} Attempts)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {detail.project.submissions.map((sub) => {
              const isCurrent = sub.id === detail.id;
              return (
                <div
                  key={sub.id}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                    isCurrent
                      ? "bg-accent/40 border-primary/40 font-medium"
                      : "bg-muted/10 border-border/50 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      #{sub.attemptNumber}
                    </Badge>
                    <Badge
                      variant={getStatusBadgeVariant(sub.status)}
                      className="text-[10px]"
                    >
                      {STATUS_LABELS[sub.status]}
                    </Badge>
                    {sub.review && (
                      <span className="text-[11px] text-muted-foreground">
                        ({RATING_LABELS[sub.review.rating] || sub.review.rating})
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] text-primary font-medium">
                        (Viewing)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground">
                      {formatDate(sub.submittedAt)}
                    </span>
                    {!isCurrent && (
                      <Link href={`/mentor/submissions/${sub.id}`}>
                        <Button variant="ghost" size="xs" className="h-6 text-[11px] px-2">
                          View
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Review Dialog */}
      <ReviewModal
        key={detail.id}
        submission={detail}
        open={reviewOpen}
        onOpenChange={setReviewOpen}
      />
    </div>
  );
}
