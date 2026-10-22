"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { FolderGit2, Loader2, Send } from "lucide-react";
import { useStudentProject } from "../hooks/use-student-submission";
import {
  initialSubmissionSchema,
  type InitialSubmissionInput,
} from "../schemas/submission-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function InitialSubmissionForm() {
  const { submit, isSubmitting } = useStudentProject();

  const form = useForm({
    defaultValues: {
      projectName: "",
      repositoryUrl: "",
      liveUrl: "",
      description: "",
    } as InitialSubmissionInput,
    onSubmit: async ({ value }) => {
      submit(value);
    },
  });

  return (
    <Card className="max-w-2xl mx-auto border-border/70 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FolderGit2 className="size-4" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            Submit Your Project
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Provide your project details, repository link, and live demonstration URL for mentor review.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardContent className="space-y-4">
          {/* Project Name */}
          <form.Field
            name="projectName"
            validators={{
              onChange: ({ value }) => {
                const res = initialSubmissionSchema.shape.projectName.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Project Title *
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. NextGen E-Commerce Platform"
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

          {/* Repository URL */}
          <form.Field
            name="repositoryUrl"
            validators={{
              onChange: ({ value }) => {
                const res = initialSubmissionSchema.shape.repositoryUrl.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Source Code Repository URL *
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://github.com/username/project"
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

          {/* Live Demo URL */}
          <form.Field
            name="liveUrl"
            validators={{
              onChange: ({ value }) => {
                const res = initialSubmissionSchema.shape.liveUrl.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Live Demo URL *
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://my-project.vercel.app"
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

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => {
                const res = initialSubmissionSchema.shape.description.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Project Description & Key Features *
                </label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  placeholder="Summarize the core features, architecture, instructions to test credentials, and tech stack utilized..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting}
                  className="resize-y"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 pt-3">
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting Project...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Submit Project
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
