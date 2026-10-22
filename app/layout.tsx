import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "ProjectReview Hub — Student Submissions & Mentor Evaluations",
    template: "%s | ProjectReview Hub",
  },
  description:
    "A unified platform connecting students and mentors for code repository evaluations, structured feedback ratings, and project revisions.",
  keywords: [
    "ProjectReview Hub",
    "student project",
    "code review",
    "mentor evaluation",
    "Next.js",
  ],
  authors: [{ name: "ProjectReview Hub Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
