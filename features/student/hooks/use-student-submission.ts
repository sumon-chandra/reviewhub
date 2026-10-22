"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submissionApi } from "../services/submission-api";
import { ApiClientError } from "@/lib/api-client";
import type { InitialSubmissionInput, ResubmissionInput } from "../schemas/submission-schema";
import type { StudentProject } from "@/types";
import { AUTH_QUERY_KEY } from "@/features/auth/hooks/use-auth";

export const STUDENT_PROJECT_QUERY_KEY = ["student", "project", "me"] as const;

export function useStudentProject() {
  const queryClient = useQueryClient();

  const {
    data: project,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<StudentProject | null>({
    queryKey: STUDENT_PROJECT_QUERY_KEY,
    queryFn: async () => {
      try {
        return await submissionApi.getMySubmissions();
      } catch (err) {
        if (err instanceof ApiClientError && err.statusCode === 404) {
          return null;
        }
        throw err;
      }
    },
    staleTime: 1000 * 30, // 30 seconds
  });

  const submitMutation = useMutation({
    mutationFn: (data: InitialSubmissionInput | ResubmissionInput) =>
      submissionApi.submitProject(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: STUDENT_PROJECT_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      const message = data.isResubmission
        ? `Submission attempt #${data.attemptNumber} submitted successfully!`
        : "Project and initial submission created successfully!";
      toast.success(message);
    },
    onError: (err) => {
      const message =
        err instanceof ApiClientError
          ? err.message
          : "Failed to submit project. Please try again.";
      toast.error(message);
    },
  });

  const latestSubmission = project?.submissions?.[0] ?? null;
  const attempts = project?.submissions ?? [];
  const hasProject = !!project;
  const isPending = latestSubmission?.status === "PENDING";
  const isApproved = latestSubmission?.status === "APPROVED";
  const isRejected = latestSubmission?.status === "REJECTED";
  const canResubmit = hasProject && isRejected;

  return {
    project,
    latestSubmission,
    attempts,
    hasProject,
    isPending,
    isApproved,
    isRejected,
    canResubmit,
    isLoading,
    isError,
    error,
    refetch,
    submit: submitMutation.mutate,
    submitAsync: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
  };
}
