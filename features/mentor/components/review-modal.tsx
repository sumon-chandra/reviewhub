"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Award, CheckCircle2, Loader2, Sparkles, XCircle } from "lucide-react";
import type { MentorSubmissionItem, MentorSubmissionDetail } from "@/types";
import { reviewSchema, type ReviewFormInput } from "../schemas/review-schema";
import { useReviewSubmissionMutation } from "../hooks/use-mentor";
import { RATING_LABELS } from "@/features/student/utils/format-review";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewModalProps {
  submission: MentorSubmissionItem | MentorSubmissionDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({
  submission,
  open,
  onOpenChange,
}: ReviewModalProps) {
  const { mutateAsync: reviewSubmission, isPending } =
    useReviewSubmissionMutation();

  const form = useForm({
    defaultValues: {
      decision: "APPROVED",
      rating: "VERY_GOOD",
      feedback: "",
    } as ReviewFormInput,
    onSubmit: async ({ value }) => {
      if (!submission) return;
      try {
        await reviewSubmission({
          id: submission.id,
          payload: value,
        });
        onOpenChange(false);
      } catch {
        // Handled by mutation toast
      }
    },
  });

  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Award className="size-4" />
            </div>
            <DialogTitle className="text-lg font-bold">
              Evaluate Submission (Attempt #{submission.attemptNumber})
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            {submission.project.projectName} by {submission.project.student.name} ({submission.project.student.email})
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-2"
        >
          {/* Formal Decision */}
          <form.Field name="decision">
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-foreground">
                  Formal Evaluation Decision *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={field.state.value === "APPROVED" ? "default" : "outline"}
                    className="justify-center gap-2 text-xs h-9"
                    onClick={() => field.handleChange("APPROVED")}
                  >
                    <CheckCircle2 className="size-3.5" />
                    Approve Project
                  </Button>
                  <Button
                    type="button"
                    variant={field.state.value === "REJECTED" ? "destructive" : "outline"}
                    className="justify-center gap-2 text-xs h-9"
                    onClick={() => field.handleChange("REJECTED")}
                  >
                    <XCircle className="size-3.5" />
                    Request Revisions
                  </Button>
                </div>
              </div>
            )}
          </form.Field>

          {/* Rating */}
          <form.Field name="rating">
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3 text-primary" />
                  Review Rating *
                </label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as ReviewFormInput["rating"])}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Select review rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(RATING_LABELS) as ReviewFormInput["rating"][]).map(
                      (key) => (
                        <SelectItem key={key} value={key} className="text-xs">
                          {RATING_LABELS[key]}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          {/* Feedback */}
          <form.Field
            name="feedback"
            validators={{
              onChange: ({ value }) => {
                const res = reviewSchema.shape.feedback.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Mentor Remarks & Feedback <span className="text-destructive font-semibold">*</span>
                </label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder={
                    form.getFieldValue("decision") === "REJECTED"
                      ? "Explain specifically what issues must be resolved before resubmission (min. 5 characters)..."
                      : "Provide commendations, suggestions for production readiness, or general feedback (min. 5 characters)..."
                  }
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <DialogFooter className="gap-2 sm:gap-0 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Recording Review...
                </>
              ) : (
                "Submit Evaluation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
