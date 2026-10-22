"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mentorApi } from "../services/mentor-api";
import { ApiClientError } from "@/lib/api-client";
import type {
  ApiResponse,
  MentorStatistics,
  MentorSubmissionDetail,
  MentorSubmissionItem,
  QuerySubmissionsParams,
  ReviewSubmissionPayload,
} from "@/types";

export const MENTOR_STATS_QUERY_KEY = ["mentor", "statistics"] as const;
export const MENTOR_SUBMISSIONS_QUERY_KEY = ["mentor", "submissions"] as const;

export function useMentorStats() {
  return useQuery<MentorStatistics>({
    queryKey: MENTOR_STATS_QUERY_KEY,
    queryFn: mentorApi.getStatistics,
    staleTime: 1000 * 30, // 30s
  });
}

export function useMentorSubmissions(filters: QuerySubmissionsParams) {
  return useQuery<ApiResponse<MentorSubmissionItem[]>>({
    queryKey: [...MENTOR_SUBMISSIONS_QUERY_KEY, filters],
    queryFn: () => mentorApi.getSubmissions(filters),
    staleTime: 1000 * 20, // 20s
  });
}

export function useMentorSubmissionDetail(id?: string | null) {
  return useQuery<MentorSubmissionDetail>({
    queryKey: ["mentor", "submission", id],
    queryFn: () => mentorApi.getSubmissionById(id!),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}

export function useReviewSubmissionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ReviewSubmissionPayload;
    }) => mentorApi.reviewSubmission(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MENTOR_STATS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MENTOR_SUBMISSIONS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: ["mentor", "submission", variables.id],
      });
      toast.success("Submission evaluation recorded successfully!");
    },
    onError: (err) => {
      const message =
        err instanceof ApiClientError
          ? err.message
          : "Failed to submit review. Please try again.";
      toast.error(message);
    },
  });
}
