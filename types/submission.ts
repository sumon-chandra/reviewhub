export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ReviewRating =
  | "EXCELLENT"
  | "VERY_GOOD"
  | "GOOD"
  | "NEEDS_IMPROVEMENT"
  | "UNSATISFACTORY";

export interface ReviewMentorSummary {
  id: string;
  name: string;
  email: string;
}

export interface ProjectReview {
  id: string;
  submissionId?: string;
  mentorId?: string;
  rating: ReviewRating;
  decision: SubmissionStatus;
  feedback: string | null;
  createdAt: string;
  updatedAt?: string;
  mentor?: ReviewMentorSummary;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  attemptNumber: number;
  description: string;
  repositoryUrl: string;
  liveUrl: string;
  status: SubmissionStatus;
  submittedAt: string;
  updatedAt: string;
  review?: ProjectReview | null;
}

export interface StudentProject {
  id: string;
  studentId: string;
  projectName: string;
  repositoryUrl: string;
  liveUrl: string;
  createdAt: string;
  updatedAt: string;
  submissions: ProjectSubmission[];
}

export interface SubmitProjectResponse {
  project: {
    id: string;
    studentId?: string;
    projectName: string;
    repositoryUrl: string;
    liveUrl: string;
    createdAt?: string;
    updatedAt?: string;
  };
  submission: ProjectSubmission;
  attemptNumber: number;
  isResubmission: boolean;
}
