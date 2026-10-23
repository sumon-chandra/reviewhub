# 🚀 Review Hub

> A streamlined, role-based evaluation and code review platform connecting students and mentors with real-time submission tracking, versioned attempts, and structured feedback.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)
[![Package Manager](https://img.shields.io/badge/Runtime-Bun-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)

---

## 🌐 Live Demo

- **Live Application:** [https://web-reviewhub.vercel.app](https://web-reviewhub.vercel.app)
- **API Base URL:** [https://api-reviewhub.vercel.app/api/v1](https://api-reviewhub.vercel.app/api/v1)

---

## 📖 Project Description

**Review Hub** is an automated project evaluation platform designed to eliminate friction in academic and bootcamp review workflows. Students maintain a singular project identity across iterative submissions while mentors inspect codebases, analyze candidate history, and provide structured formal ratings.

Built with Next.js App Router and TanStack Query, the application ensures real-time cache synchronization, zero-flicker role authentication, and seamless browser URL query persistence for table filtering and search.

---

## 🧭 Project Overview

```text
┌─────────────────┐         ┌────────────────────────┐         ┌──────────────────┐
│                 │         │                        │         │                  │
│  Student Portal │ ──────> │  ProjectReview Hub     │ <────── │  Mentor Portal   │
│                 │         │  (Next.js App Router)  │         │                  │
└─────────────────┘         └────────────────────────┘         └──────────────────┘
         │                              │                                │
         │ Submit & Resubmit            │ Centralized API Client         │ Evaluate & Rate
         ▼                              ▼                                ▼
┌─────────────────┐         ┌────────────────────────┐         ┌──────────────────┐
│ Version History │         │ TanStack Query Cache   │         │ Global Dashboard │
│ & Mentor Rating │         │ & Realtime Invalidation│         │ & Search Params  │
└─────────────────┘         └────────────────────────┘         └──────────────────┘
```

The system establishes a strict domain separation between **Student** and **Mentor** workspaces:

- **Students** submit project repositories, inspect detailed review timelines, and resubmit rejected attempts with updated repository/live links without duplicating project identity.
- **Mentors** access real-time global statistics, filter submissions via URL search params, inspect historical attempts, and submit structured evaluations with mandatory constructive feedback.

---

## ✨ Feature Lists

### 🎓 Student Experience

- **Single Project Identity:** Students maintain one project identity with continuous, versioned attempt tracking.
- **Interactive Submission Form:** Built with TanStack Form and Zod validation for repository and live demo URLs.
- **Dynamic Status Card:** View immediate submission status (`PENDING`, `APPROVED`, `REJECTED`) and review ratings.
- **Eligible Resubmission:** Seamlessly update repository or live demo URLs after a rejection without losing past submission history.
- **Attempt History Log:** Full visibility into previous attempts, timestamps, and mentor feedback.

### 👨‍🏫 Mentor Evaluation Workspace

- **Real-Time Statistics Dashboard:** Global metrics tracking total submissions, projects, pending reviews, approvals, and rejections.
- **URL-Driven Submissions Table:** Search by student name/email or project title, filter by status, and paginate with direct synchronization to URL query parameters (`?search=Bob&status=APPROVED&page=1`).
- **Comprehensive Candidate Inspection:** Modal viewer displaying student details, repository/demo URLs, and chronological attempt records.
- **Structured Review Modal:** Record formal review decisions (`APPROVED` / `REJECTED`), standardized review ratings (`EXCELLENT` to `UNSATISFACTORY`), and constructive feedback (minimum 5 characters).
- **Immediate Cache Sync:** Automatic TanStack Query invalidation updates dashboard statistics and submission tables upon review.

### 🛡️ Authentication & System Features

- **Role-Based Protected Routes:** Route guards with zero-flicker server-state resolution.
- **One-Tap Demo Access:** Instant login buttons for both Student and Mentor roles for rapid evaluation and testing.
- **Password Visibility Toggle:** Built-in eye toggle on login and registration password inputs.
- **Responsive Dark/Light Mode:** Seamless theming powered by `next-themes` with keyboard hotkey support (`D`).
- **Accessible UI Primitives:** Headless accessible UI primitives built with ShadCN and Base UI.

---

## 📸 Screenshots

|                                    Student Submission Workspace                                    |                                   Mentor Review Dashboard                                    |
| :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
| ![Student Workspace](https://placehold.co/600x340/18181b/ffffff?text=Student+Submission+Workspace) | ![Mentor Dashboard](https://placehold.co/600x340/18181b/ffffff?text=Mentor+Review+Dashboard) |
|                        _Track latest attempt, mentor ratings, and feedback_                        |                 _Server-filtered table with search params and review modal_                  |

|                                   Evaluation Action Modal                                    |                                     One-Tap Demo Authentication                                     |
| :------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| ![Evaluation Modal](https://placehold.co/600x340/18181b/ffffff?text=Evaluation+Action+Modal) | ![Demo Authentication](https://placehold.co/600x340/18181b/ffffff?text=One-Tap+Demo+Authentication) |
|                         _Structured ratings with mandatory feedback_                         |                             _Instant student and mentor demo accounts_                              |

---

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory by duplicating `.env.example`:

```bash
cp .env.example .env.local
```

### Environment Variables

| Variable                            | Required | Default                                   | Description                                    |
| :---------------------------------- | :------: | :---------------------------------------- | :--------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`          | **Yes**  | `https://api-reviewhub.vercel.app/api/v1` | Base URL for backend API requests              |
| `NEXT_PUBLIC_DEMO_STUDENT_EMAIL`    |    No    | `student@example.com`                     | Pre-configured email for student demo login    |
| `NEXT_PUBLIC_DEMO_STUDENT_PASSWORD` |    No    | `123456`                                  | Pre-configured password for student demo login |
| `NEXT_PUBLIC_DEMO_MENTOR_EMAIL`     |    No    | `mentor@example.com`                      | Pre-configured email for mentor demo login     |
| `NEXT_PUBLIC_DEMO_MENTOR_PASSWORD`  |    No    | `123456`                                  | Pre-configured password for mentor demo login  |

---

## 📦 Installation Guide

This project utilizes [Bun](https://bun.sh/) as its designated package manager and runtime.

### Prerequisites

- **Bun** (v1.0 or newer) installed:
  ```bash
  curl -fsSL https://bun.sh/install | bash
  # Or on Windows via PowerShell:
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```
- **Node.js** (v18.17+ or v20+)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sumon-chandra/reviewhub.git
   cd project-review-hub
   ```

2. **Install project dependencies:**

   ```bash
   bun install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env.local
   ```

4. **Launch the development server:**

   ```bash
   bun run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Typecheck
bun run typecheck

# Linting
bun run lint

# Build production bundle
bun run build

# Start production server
bun run start
```

---

## 📁 Clean Folder Structure

```text
project-review-hub/
├── app/                              # Next.js App Router routes & layouts
│   ├── (auth)/                       # Auth group
│   │   ├── login/page.tsx            # Login page
│   │   └── signup/page.tsx           # Registration page
│   ├── mentor/                       # Mentor workspace
│   │   ├── dashboard/page.tsx        # Dashboard with search params & stats
│   │   ├── submissions/[id]/page.tsx # Detailed submission view
│   │   └── layout.tsx                # Role-guarded mentor layout
│   ├── student/                      # Student workspace
│   │   ├── submission/page.tsx       # Submission status & history
│   │   └── layout.tsx                # Role-guarded student layout
│   ├── layout.tsx                    # Root application layout
│   ├── page.tsx                      # Landing home page
│   └── globals.css                   # Tailwind v4 configuration & tokens
├── components/                       # Shared UI & layout components
│   ├── feedback/                     # LoadingSpinner, EmptyState, ErrorCard
│   ├── layout/                       # Navbar, AuthNav, AppShell
│   ├── ui/                           # Base UI / ShadCN primitives (button, dialog, etc.)
│   └── theme-provider.tsx            # ThemeProvider & hotkey listener
├── features/                         # Modular domain features
│   ├── auth/                         # Authentication feature module
│   │   ├── components/               # LoginForm, SignupForm
│   │   ├── hooks/                    # useAuth, useAuthGuard
│   │   ├── schemas/                  # auth-schemas.ts (Zod)
│   │   └── services/                 # auth-api.ts
│   ├── student/                      # Student feature module
│   │   ├── components/               # StatusCard, AttemptHistory, Forms
│   │   ├── hooks/                    # useStudentSubmission, useResubmitMutation
│   │   ├── schemas/                  # submission-schema.ts (Zod)
│   │   ├── services/                 # student-api.ts
│   │   └── utils/                    # format-review.ts
│   └── mentor/                       # Mentor feature module
│       ├── components/               # StatsCards, SubmissionsTable, ReviewModal
│       ├── hooks/                    # useMentor, useMentorSearchParams
│       ├── schemas/                  # review-schema.ts (Zod)
│       └── services/                 # mentor-api.ts
├── lib/                              # Core utilities & API wrapper
│   ├── api-client.ts                 # Centralized fetch wrapper & error handling
│   ├── query-client.ts               # TanStack Query client configuration
│   ├── token.ts                      # Cookie management helpers
│   └── utils.ts                      # Class merging (cn) utility
├── types/                            # Strict TypeScript domain interfaces
│   ├── api.ts                        # ApiResponse, ApiErrorResponse, Meta
│   ├── auth.ts                       # User, Role, Session
│   ├── mentor.ts                     # MentorStatistics, QueryParams
│   └── submission.ts                 # Submission, Review, Attempt, Ratings
└── public/                           # Static assets
```

---

## 📡 API Documentation

The frontend integrates directly with the backend API service:

### 1. Authentication Endpoints

| Method | Endpoint       | Description                                                  | Auth Required |
| :----- | :------------- | :----------------------------------------------------------- | :-----------: |
| `POST` | `/auth/signup` | Register a new student account (`name`, `email`, `password`) |      No       |
| `POST` | `/auth/login`  | Authenticate student or mentor (`email`, `password`)         |      No       |
| `GET`  | `/auth/me`     | Resolve current active authenticated session                 |    **Yes**    |

### 2. Student Endpoints

| Method | Endpoint                       | Description                                                                                  |   Auth Required   |
| :----- | :----------------------------- | :------------------------------------------------------------------------------------------- | :---------------: |
| `GET`  | `/student/submission`          | Retrieve student's project, current attempt, and review history                              | **Yes (Student)** |
| `POST` | `/student/submission`          | Create initial project submission (`projectName`, `repositoryUrl`, `liveUrl`, `description`) | **Yes (Student)** |
| `POST` | `/student/submission/resubmit` | Create a new attempt for a rejected project (`repositoryUrl`, `liveUrl`)                     | **Yes (Student)** |

### 3. Mentor Endpoints

| Method  | Endpoint                         | Description                                                     |  Auth Required   |
| :------ | :------------------------------- | :-------------------------------------------------------------- | :--------------: |
| `GET`   | `/mentor/statistics`             | Retrieve global statistics (total, pending, approved, rejected) | **Yes (Mentor)** |
| `GET`   | `/mentor/submissions`            | Retrieve paginated submissions list with query filters          | **Yes (Mentor)** |
| `GET`   | `/mentor/submissions/:id`        | Fetch specific candidate submission with full attempt history   | **Yes (Mentor)** |
| `PATCH` | `/mentor/submissions/:id/review` | Record evaluation decision, rating, and feedback                | **Yes (Mentor)** |

#### Mentor Submissions Query Parameters (`GET /mentor/submissions`)

- `search` _(string, optional)_: Filter by student name, student email, or project title.
- `status` _(string, optional)_: `PENDING`, `APPROVED`, or `REJECTED`.
- `page` _(number, optional)_: Page number (default: `1`).
- `limit` _(number, optional)_: Items per page (default: `10`).
- `sortBy` _(string, optional)_: `submittedAt`, `attemptNumber`, or `status`.
- `order` _(string, optional)_: `asc` or `desc` (default: `desc`).

#### Mentor Review Request Payload (`PATCH /mentor/submissions/:id/review`)

```json
{
  "decision": "APPROVED",
  "rating": "VERY_GOOD",
  "feedback": "Clean project structure and repository commits. Meets all evaluation criteria."
}
```

_Note: `feedback` must be at least 5 characters in length._

---

## 📬 Contact Information

- **Developer:** Sumon Chandra
- **Email:** idev.sumon@gmail.com
- **GitHub:** [@sumon-chandra](https://github.com/sumon-chandra)
- **Project Repository:** [https://github.com/sumon-chandra/reviewhub](https://github.com/sumon-chandra/reviewhub)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
