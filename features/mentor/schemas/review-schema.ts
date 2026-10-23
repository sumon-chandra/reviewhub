import { z } from "zod"

export const reviewRatingEnum = z.enum([
  "EXCELLENT",
  "VERY_GOOD",
  "GOOD",
  "NEEDS_IMPROVEMENT",
  "UNSATISFACTORY",
])

export const submissionDecisionEnum = z.enum(["APPROVED", "REJECTED"])

export const reviewSchema = z.object({
  decision: submissionDecisionEnum,
  rating: reviewRatingEnum,
  feedback: z
    .string({
      error: "Feedback is required",
    })
    .trim()
    .min(5, "Feedback must be at least 5 characters long")
    .max(3000, "Feedback cannot exceed 3000 characters"),
})

export type ReviewFormInput = z.infer<typeof reviewSchema>
