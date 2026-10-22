import { z } from "zod";

export const reviewRatingEnum = z.enum([
  "EXCELLENT",
  "VERY_GOOD",
  "GOOD",
  "NEEDS_IMPROVEMENT",
  "UNSATISFACTORY",
]);

export const submissionDecisionEnum = z.enum(["APPROVED", "REJECTED"]);

export const reviewSchema = z
  .object({
    decision: submissionDecisionEnum,
    rating: reviewRatingEnum,
    feedback: z
      .string()
      .trim()
      .max(3000, "Feedback cannot exceed 3000 characters")
      .optional(),
  })
  .refine(
    (data) => {
      // Require constructive feedback if rejecting an attempt
      if (data.decision === "REJECTED") {
        return !!data.feedback && data.feedback.trim().length >= 5;
      }
      return true;
    },
    {
      message: "Constructive feedback (at least 5 characters) is required when rejecting a submission.",
      path: ["feedback"],
    },
  );

export type ReviewFormInput = z.infer<typeof reviewSchema>;
