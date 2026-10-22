import type { Metadata } from "next";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Create Student Account | ProjectReview Hub",
  description: "Register as a student on ProjectReview Hub to submit projects and receive mentor feedback.",
};

export default function SignupPage() {
  return <SignupForm />;
}
