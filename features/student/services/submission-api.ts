import { apiClient } from "@/lib/api-client";
import type { StudentProject, SubmitProjectResponse } from "@/types";
import type { InitialSubmissionInput, ResubmissionInput } from "../schemas/submission-schema";

export const submissionApi = {
  submitProject: (
    data: InitialSubmissionInput | ResubmissionInput,
  ): Promise<SubmitProjectResponse> =>
    apiClient.post<SubmitProjectResponse>("/submissions", data, { requireAuth: true }),

  getMySubmissions: (): Promise<StudentProject | null> =>
    apiClient.get<StudentProject | null>("/submissions/me", { requireAuth: true }),
};
