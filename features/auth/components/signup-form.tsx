"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { signupSchema, type SignupInput } from "../schemas/auth-schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SignupForm() {
  const { signup, isSigningUp } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as SignupInput,
    onSubmit: async ({ value }) => {
      signup(value);
    },
  });

  return (
    <Card className="w-full max-w-md border-border/70 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Create student account</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Register to submit your project and track mentor reviews
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
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const res = signupSchema.shape.name.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Full name
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSigningUp}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const res = signupSchema.shape.email.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Email address
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSigningUp}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                const res = signupSchema.shape.password.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Password (min. 6 characters)
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSigningUp}
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

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button type="submit" className="w-full gap-2" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="size-4" />
                Create account
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
