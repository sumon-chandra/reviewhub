"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { loginSchema, type LoginInput } from "../schemas/auth-schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginInput,
    onSubmit: async ({ value }) => {
      login(value);
    },
  });

  return (
    <Card className="w-full max-w-md border-border/70 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Enter your credentials to access your dashboard
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
            name="email"
            validators={{
              onChange: ({ value }) => {
                const res = loginSchema.shape.email.safeParse(value);
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
                  disabled={isLoggingIn}
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
                const res = loginSchema.shape.password.safeParse(value);
                return res.success ? undefined : res.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label htmlFor={field.name} className="text-xs font-medium text-foreground">
                  Password
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoggingIn}
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
          <Button type="submit" className="w-full gap-2" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="size-4" />
                Sign in
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up as Student
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
