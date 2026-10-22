import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Sign in | ProjectReview Hub",
  description: "Sign in to your ProjectReview Hub account to access submissions and mentor reviews.",
};

export default function LoginPage() {
  return <LoginForm />;
}
