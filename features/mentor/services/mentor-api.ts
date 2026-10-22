import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  MentorStatistics,
  MentorSubmissionDetail,
  MentorSubmissionItem,
  QuerySubmissionsParams,
  ReviewSubmissionPayload,
  ReviewSubmissionResult,
} from "@/types";

export const mentorApi = {
  getStatistics: (): Promise<MentorStatistics> =>
    apiClient.get<MentorStatistics>("/mentor/statistics", { requireAuth: true }),

  getSubmissions: (
    params?: QuerySubmissionsParams,
  ): Promise<ApiResponse<MentorSubmissionItem[]>> =>
    apiClient.getWithEnvelope<MentorSubmissionItem[]>("/mentor/submissions", {
      requireAuth: true,
      params: params as Record<string, string | number | boolean | undefined | null>,
    }),

  getSubmissionById: (id: string): Promise<MentorSubmissionDetail> =>
    apiClient.get<MentorSubmissionDetail>(`/mentor/submissions/${id}`, {
      requireAuth: true,
    }),

  reviewSubmission: (
    id: string,
    payload: ReviewSubmissionPayload,
  ): Promise<ReviewSubmissionResult> =>
    apiClient.patch<ReviewSubmissionResult>(
      `/mentor/submissions/${id}/review`,
      payload,
      { requireAuth: true },
    ),
};
