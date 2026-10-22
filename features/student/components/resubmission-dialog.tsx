"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Loader2, RotateCw } from "lucide-react";
import type { StudentProject } from "@/types";
import {
  resubmissionSchema,
  type ResubmissionInput,
} from "../schemas/submission-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResubmissionDialogProps {
  project: StudentProject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitResubmission: (data: ResubmissionInput) => Promise<unknown>;
  isSubmitting: boolean;
}

export function ResubmissionDialog({
  project,
  open,
  onOpenChange,
  onSubmitResubmission,
  isSubmitting,
}: ResubmissionDialogProps) {
  const latestSubmission = project.submissions[0];

  const form = useForm({
    defaultValues: {
      projectName: project.projectName,
      repositoryUrl: latestSubmission?.repositoryUrl || project.repositoryUrl,
      liveUrl: latestSubmission?.liveUrl || project.liveUrl,
      description: "",
    } as ResubmissionInput,
    onSubmit: async ({ value }) => {
      try {
        await onSubmitResubmission(value);
        onOpenChange(false);
      } catch {
        // Handled by mutation toast
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <RotateCw className="size-4" />
            </div>
            <DialogTitle className="text-lg font-bold">
              Submit Revision (Attempt #{(latestSubmission?.attemptNumber ?? 1) + 1})
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Address mentor feedback and submit an updated attempt. You may update your repository or live demonstration links if revisions were deployed to new URLs.
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
          {/* Project Title */}
          <form.Field
            name="projectName"
            validators={{
              onChange: ({ value }) => {
                const res = resubmissionSchema.shape.projectName.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Project Title
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Repository URL */}
          <form.Field
            name="repositoryUrl"
            validators={{
              onChange: ({ value }) => {
                const res = resubmissionSchema.shape.repositoryUrl.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Repository URL
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Live Demo URL */}
          <form.Field
            name="liveUrl"
            validators={{
              onChange: ({ value }) => {
                const res = resubmissionSchema.shape.liveUrl.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Live Demo URL
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Revision Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => {
                const res = resubmissionSchema.shape.description.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Revision Summary & Changes Made *
                </label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder="Detail the improvements, bug fixes, or feedback items resolved in this submission..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting Attempt...
                </>
              ) : (
                <>
                  <RotateCw className="size-4" />
                  Submit Revision
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
