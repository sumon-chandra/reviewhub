import type { ReviewRating, SubmissionStatus } from "@/types";

export const RATING_LABELS: Record<ReviewRating, string> = {
  EXCELLENT: "Excellent",
  VERY_GOOD: "Very Good",
  GOOD: "Good",
  NEEDS_IMPROVEMENT: "Needs Improvement",
  UNSATISFACTORY: "Unsatisfactory",
};

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  PENDING: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Changes Requested",
};

export function getStatusBadgeVariant(
  status: SubmissionStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "APPROVED":
      return "default";
    case "REJECTED":
      return "destructive";
    case "PENDING":
    default:
      return "secondary";
  }
}

export function getRatingBadgeVariant(
  rating?: ReviewRating | null,
): "default" | "secondary" | "destructive" | "outline" {
  switch (rating) {
    case "EXCELLENT":
    case "VERY_GOOD":
      return "default";
    case "GOOD":
      return "secondary";
    case "NEEDS_IMPROVEMENT":
    case "UNSATISFACTORY":
      return "destructive";
    default:
      return "outline";
  }
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}
