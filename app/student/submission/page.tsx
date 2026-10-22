"use client";

import * as React from "react";
import { FolderGit2 } from "lucide-react";
import { useStudentProject } from "@/features/student/hooks/use-student-submission";
import { InitialSubmissionForm } from "@/features/student/components/initial-submission-form";
import { SubmissionStatusCard } from "@/features/student/components/submission-status-card";
import { ResubmissionDialog } from "@/features/student/components/resubmission-dialog";
import { AttemptHistory } from "@/features/student/components/attempt-history";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";
import { ErrorCard } from "@/components/feedback/error-card";

export default function StudentSubmissionPage() {
  const [resubmitOpen, setResubmitOpen] = React.useState(false);

  const {
    project,
    hasProject,
    attempts,
    isLoading,
    isError,
    error,
    refetch,
    submitAsync,
    isSubmitting,
  } = useStudentProject();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" label="Loading project submission details..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <ErrorCard
          title="Failed to load submission"
          message={error instanceof Error ? error.message : "Could not retrieve project data."}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="flex items-center gap-2 mb-1 text-primary">
          <FolderGit2 className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Student Workspace
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {hasProject ? "Project Overview & Review Status" : "Initial Project Submission"}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {hasProject
            ? "Track evaluation decisions, inspect mentor remarks, and submit revisions."
            : "Register your single project repository and live demonstration URL to request review."}
        </p>
      </div>

      {/* Main Content */}
      {!project ? (
        <InitialSubmissionForm />
      ) : (
        <div className="space-y-6">
          <SubmissionStatusCard
            project={project}
            onOpenResubmit={() => setResubmitOpen(true)}
          />

          <ResubmissionDialog
            project={project}
            open={resubmitOpen}
            onOpenChange={setResubmitOpen}
            onSubmitResubmission={submitAsync}
            isSubmitting={isSubmitting}
          />

          <AttemptHistory attempts={attempts} />
        </div>
      )}
    </div>
  );
}
