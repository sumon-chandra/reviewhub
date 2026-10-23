"use client";

import * as React from "react";
import { LayoutDashboard, RefreshCw } from "lucide-react";
import {
  useMentorStats,
  useMentorSubmissions,
} from "@/features/mentor/hooks/use-mentor";
import { useMentorSearchParams } from "@/features/mentor/hooks/use-mentor-search-params";
import { StatsCards } from "@/features/mentor/components/stats-cards";
import { SubmissionsTable } from "@/features/mentor/components/submissions-table";
import { SubmissionDetailModal } from "@/features/mentor/components/submission-detail-modal";
import { ReviewModal } from "@/features/mentor/components/review-modal";
import { ErrorCard } from "@/components/feedback/error-card";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import { Button } from "@/components/ui/button";
import type { MentorSubmissionItem } from "@/types";

function MentorDashboardContent() {
  const { filters, updateFilters } = useMentorSearchParams();

  const [inspectSubmission, setInspectSubmission] =
    React.useState<MentorSubmissionItem | null>(null);
  const [reviewSubmission, setReviewSubmission] =
    React.useState<MentorSubmissionItem | null>(null);

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
    refetch: refetchStats,
    isFetching: isStatsFetching,
  } = useMentorStats();

  const {
    data: submissionsEnvelope,
    isLoading: isSubmissionsLoading,
    isError: isSubmissionsError,
    error: submissionsError,
    refetch: refetchSubmissions,
    isFetching: isSubmissionsFetching,
  } = useMentorSubmissions(filters);

  const handleRefresh = () => {
    refetchStats();
    refetchSubmissions();
  };

  const isRefreshing = isStatsFetching || isSubmissionsFetching;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <LayoutDashboard className="size-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Evaluation Workspace
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Mentor Review Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor real-time submission metrics, inspect candidate attempts, and evaluate projects.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2 text-xs self-start sm:self-auto"
        >
          <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Global Statistics */}
      {isStatsError ? (
        <ErrorCard
          title="Could not load dashboard statistics"
          message={
            statsError instanceof Error
              ? statsError.message
              : "An error occurred while fetching mentor statistics."
          }
          onRetry={() => refetchStats()}
        />
      ) : (
        <StatsCards stats={stats} isLoading={isStatsLoading} />
      )}

      {/* Submissions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Student Submissions
            </h2>
            <p className="text-xs text-muted-foreground">
              Review incoming project submissions and record formal ratings.
            </p>
          </div>
        </div>

        {isSubmissionsError ? (
          <ErrorCard
            title="Failed to load submissions"
            message={
              submissionsError instanceof Error
                ? submissionsError.message
                : "Could not retrieve the submissions list."
            }
            onRetry={() => refetchSubmissions()}
          />
        ) : (
          <SubmissionsTable
            submissions={submissionsEnvelope?.data ?? []}
            meta={submissionsEnvelope?.meta}
            filters={filters}
            isLoading={isSubmissionsLoading}
            onFilterChange={updateFilters}
            onInspect={(sub) => setInspectSubmission(sub)}
            onReview={(sub) => setReviewSubmission(sub)}
          />
        )}
      </div>

      {/* Inspection Modal */}
      <SubmissionDetailModal
        submissionId={inspectSubmission?.id ?? null}
        open={!!inspectSubmission}
        onOpenChange={(open) => {
          if (!open) setInspectSubmission(null);
        }}
        onOpenReview={() => {
          const current = inspectSubmission;
          setInspectSubmission(null);
          setReviewSubmission(current);
        }}
      />

      {/* Review Modal */}
      {reviewSubmission && (
        <ReviewModal
          key={reviewSubmission.id}
          submission={reviewSubmission}
          open={!!reviewSubmission}
          onOpenChange={(open) => {
            if (!open) setReviewSubmission(null);
          }}
        />
      )}
    </div>
  );
}

export default function MentorDashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingSpinner label="Loading mentor workspace..." />
        </div>
      }
    >
      <MentorDashboardContent />
    </React.Suspense>
  );
}

