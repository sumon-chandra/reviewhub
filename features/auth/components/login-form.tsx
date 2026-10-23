"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "@tanstack/react-form"
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  LogIn,
  ShieldCheck,
} from "lucide-react"
import { useAuth } from "../hooks/use-auth"
import { loginSchema, type LoginInput } from "../schemas/auth-schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const DEMO_CREDENTIALS = {
  STUDENT: {
    email: process.env.NEXT_PUBLIC_DEMO_STUDENT_EMAIL || "student@example.com",
    password: process.env.NEXT_PUBLIC_DEMO_STUDENT_PASSWORD || "123456",
  },
  MENTOR: {
    email: process.env.NEXT_PUBLIC_DEMO_MENTOR_EMAIL || "mentor@example.com",
    password: process.env.NEXT_PUBLIC_DEMO_MENTOR_PASSWORD || "123456",
  },
} as const

export function LoginForm() {
  const { login, isLoggingIn } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [activeDemoRole, setActiveDemoRole] = React.useState<
    "STUDENT" | "MENTOR" | null
  >(null)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginInput,
    onSubmit: async ({ value }) => {
      setActiveDemoRole(null)
      login(value)
    },
  })

  const handleOneTapLogin = (role: "STUDENT" | "MENTOR") => {
    setActiveDemoRole(role)
    const creds = DEMO_CREDENTIALS[role]
    form.setFieldValue("email", creds.email)
    form.setFieldValue("password", creds.password)
    login(creds)
  }

  return (
    <Card className="w-full max-w-md border-border/70 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <CardContent className="space-y-4">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const res = loginSchema.shape.email.safeParse(value)
                return res.success ? undefined : res.error.issues[0]?.message
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor={field.name}
                  className="text-xs font-medium text-foreground"
                >
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
                const res = loginSchema.shape.password.safeParse(value)
                return res.success ? undefined : res.error.issues[0]?.message
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor={field.name}
                  className="text-xs font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isLoggingIn}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoggingIn}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button type="submit" className="w-full gap-2" disabled={isLoggingIn}>
            {isLoggingIn && !activeDemoRole ? (
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

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-card px-2 font-medium tracking-wider text-muted-foreground">
                Or quick demo access
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isLoggingIn}
              onClick={() => handleOneTapLogin("STUDENT")}
              className="h-9 gap-1.5 border-border/70 text-xs font-normal hover:bg-muted/50"
            >
              {isLoggingIn && activeDemoRole === "STUDENT" ? (
                <Loader2 className="size-3.5 animate-spin text-primary" />
              ) : (
                <GraduationCap className="size-3.5 text-primary" />
              )}
              <span>Student Demo</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isLoggingIn}
              onClick={() => handleOneTapLogin("MENTOR")}
              className="h-9 gap-1.5 border-border/70 text-xs font-normal hover:bg-muted/50"
            >
              {isLoggingIn && activeDemoRole === "MENTOR" ? (
                <Loader2 className="size-3.5 animate-spin text-primary" />
              ) : (
                <ShieldCheck className="size-3.5 text-primary" />
              )}
              <span>Mentor Demo</span>
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up as Student
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
