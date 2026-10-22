import type { ProjectReview, ProjectSubmission, ReviewRating, SubmissionStatus } from "./submission";

export interface MentorStatistics {
  totalSubmissions: number;
  totalProjects: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export interface QuerySubmissionsParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
  sortBy?: "submittedAt" | "attemptNumber" | "status";
  order?: "asc" | "desc";
  search?: string;
}

export interface StudentInfo {
  id: string;
  name: string;
  email: string;
}

export interface MentorSubmissionItem extends ProjectSubmission {
  project: {
    id: string;
    projectName: string;
    repositoryUrl: string;
    liveUrl: string;
    student: StudentInfo;
  };
  review: ProjectReview | null;
}

export interface MentorSubmissionDetailProject {
  id: string;
  projectName: string;
  repositoryUrl: string;
  liveUrl: string;
  student: StudentInfo;
  submissions: Array<
    ProjectSubmission & {
      review: ProjectReview | null;
    }
  >;
}

export interface MentorSubmissionDetail extends ProjectSubmission {
  project: MentorSubmissionDetailProject;
  review: ProjectReview | null;
}

export interface ReviewSubmissionPayload {
  rating: ReviewRating;
  decision: "APPROVED" | "REJECTED";
  feedback?: string;
}

export interface ReviewSubmissionResult {
  review: ProjectReview;
  submission: ProjectSubmission;
}
