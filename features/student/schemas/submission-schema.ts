import { z } from "zod";

export const initialSubmissionSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name cannot exceed 100 characters"),
  repositoryUrl: z
    .string()
    .trim()
    .min(1, "Repository URL is required")
    .url("Please enter a valid URL (e.g. https://github.com/username/repo)"),
  liveUrl: z
    .string()
    .trim()
    .min(1, "Live demo URL is required")
    .url("Please enter a valid URL (e.g. https://myproject.vercel.app)"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(3000, "Description cannot exceed 3000 characters"),
});

export const resubmissionSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name cannot exceed 100 characters")
    .optional(),
  repositoryUrl: z
    .string()
    .trim()
    .min(1, "Repository URL is required")
    .url("Please enter a valid URL (e.g. https://github.com/username/repo)")
    .optional(),
  liveUrl: z
    .string()
    .trim()
    .min(1, "Live demo URL is required")
    .url("Please enter a valid URL (e.g. https://myproject.vercel.app)")
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(3000, "Description cannot exceed 3000 characters"),
});

export type InitialSubmissionInput = z.infer<typeof initialSubmissionSchema>;
export type ResubmissionInput = z.infer<typeof resubmissionSchema>;
