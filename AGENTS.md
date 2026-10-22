# AGENTS.md --- ProjectReview Hub Frontend

This file defines the frontend requirements, architecture, and
implementation plan for AI coding agents working on ProjectReview Hub.

---

## 1. Inspect Before Coding & Lean Implementation Rules

The backend is already implemented. Integrate with its **actual API
contract**, not assumed endpoints or example payloads.

Before making changes:
1. Inspect the existing frontend structure, `package.json`, Next.js version,
   TypeScript configuration, Tailwind setup, ShadCN components, and available scripts.
2. Read the project README and existing frontend documentation.
3. Inspect backend routes, validation schemas, response envelope, authentication
   transport, role names, enums, pagination metadata, and error handling.
4. Confirm the actual API base URL and environment-variable names.
5. Present a concise plan and identify any API mismatch or unresolved business
   decision before broad changes.

### Core Working Rules:
- **Package Manager:** Always use **`bun`** for package installation and script
  execution (`bun add <pkg>`, `bun add -d <pkg>`, `bun run dev`, `bun run build`, etc.).
  Do not use `npm` or `yarn`.
- **No Unnecessary Complexity or Bloat:** Do not write unnecessary checks, mock tests,
  redundant abstractions, or overly defensive/robust code. Implement clean, direct,
  and pragmatic solutions.
- **Clarify Doubts First:** If you have any doubt or ambiguity about a function,
  business rule, or requirement, **stop and ask the user before writing code**.
  The user prefers a direct question over assumptions or speculative code.
- **Frontend Scope:** Work on the frontend only unless the user explicitly
  authorizes backend changes.

---

## 2. Project and Technology Stack

**Project:** ProjectReview Hub

**Frontend Stack:**
- **Framework:** Next.js (App Router, current version configured in project)
- **Runtime & Package Manager:** Bun (`bun`)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS (v4) with CSS variables
- **Component Primitives:** ShadCN UI (Base UI / `base-maia` style configured)
- **Server State & Data Fetching:** **TanStack Query** (`@tanstack/react-query`)
- **Forms & Validation:** **TanStack Form** (`@tanstack/react-form`) with **Zod** (`zod`)
- **Icons:** `lucide-react`
- **Theme:** `next-themes`

---

## 3. Directives & Component Architecture

To maintain maintainability and clean Next.js App Router boundaries:

### Explicit Directives
- **Server Functions & Actions:** Explicitly mark server action files or functions
  with `"use server"` at the very top.
- **Client Components:** Explicitly mark any interactive client component with
  `"use client"` at the very top.

### Ultra-Lean Client Components
- **Keep Client Components Minimal:** Client components must be as small as possible,
  focusing strictly on rendering JSX, layout, and event wiring.
- **Separate Helpers and Feature Functions:** Never bury business logic, API calls,
  complex data transformations, or bulky calculations inside the JSX component.
  Extract them into separate files:
  - Feature services (e.g. `features/student/services/submission-api.ts`)
  - Feature hooks (e.g. `features/student/hooks/use-submission.ts`)
  - Helper functions (e.g. `features/student/utils/format-attempt.ts` or `lib/utils.ts`)
  - Form schemas (e.g. `features/student/schemas/submission-schema.ts`)

---

## 4. Roles and Features

Verify role names against the backend before implementing checks. The intended
roles are `STUDENT` and `MENTOR`, but the actual backend schema is authoritative.

### Student Experience
- Sign up and log in using fields accepted by the backend.
- View current account and profile information when supported.
- Submit a project (project name, repository URL, live demo URL, description).
- View latest submission status, review rating, and mentor feedback.
- Resubmit when backend rules permit it (e.g., after rejection).
- Change repository and live demo URLs during an allowed resubmission without
  duplicating project identity.
- View previous attempt and review history when exposed by the API.
- Students must not select their own role, set review statuses, or access mentor views.

### Mentor Experience
- View global dashboard statistics.
- Browse submissions in a paginated table.
- Filter by submission status on the server.
- Inspect project details, repository/demo URLs, student information, and attempt history.
- Review submissions: formal status (`APPROVED` / `REJECTED`), review rating, and feedback.
- See proper loading, empty, success, and error states.

---

## 5. Confirmed Domain Behavior

Use these product rules unless the backend contract or a later user instruction explicitly changes them:
- Each student owns **one** project identity.
- A project may have multiple submission attempts.
- Resubmission is permitted after a previous attempt has been reviewed and rejected.
- A new attempt starts with `PENDING` status.
- Another attempt cannot be created while the current attempt is pending.
- Repository and live demo URLs may change during an allowed resubmission.
- Previous attempts and reviews must remain visible as historical records when returned by API.
- Review rating and formal submission status are separate concepts:
  - **Proposed formal statuses:** `PENDING`, `APPROVED`, `REJECTED`.
  - **Proposed review ratings:**
    - `EXCELLENT` --- Excellent
    - `VERY_GOOD` --- Very Good
    - `GOOD` --- Good
    - `NEEDS_IMPROVEMENT` --- Needs Improvement
    - `UNSATISFACTORY` --- Unsatisfactory

---

## 6. Server State Management (TanStack Query) & API Client

### TanStack Query
- Use **TanStack Query** (`@tanstack/react-query`) for all API requests and server state management.
- Wrap application with a configured `QueryClientProvider` in a root provider component.
- Encapsulate queries and mutations inside dedicated custom hooks (e.g., `useSubmissionsQuery`, `useReviewMutation`).
- Maintain cache consistency by invalidating relevant queries upon successful mutations (e.g., after project submission, resubmission, or mentor review).
- Leverage TanStack Query's built-in `isPending`, `isError`, and `data` states to drive UI rendering.

### Centralized API Client
- Centralize HTTP calls in `lib/api-client.ts`.
- Read API base URL from `process.env.NEXT_PUBLIC_API_BASE_URL`.
- Handle non-2xx HTTP responses consistently, throwing informative errors containing backend error messages.
- Model request and response types strictly with TypeScript types in `types/api.ts`.
- Response envelope structure: `{ success, statusCode, message, data, meta }`.

---

## 7. Forms & Validation (TanStack Form + Zod)

- All forms must be built using **TanStack Form** (`@tanstack/react-form`).
- All validations must be defined with **Zod** schemas.
- Keep forms clean and declarative:
  - Form validation schemas live in dedicated schema files (e.g., `features/auth/schemas/login-schema.ts`).
  - Render accessible form fields with ShadCN UI primitives.
  - Display clear field-level validation errors.
  - Disable submit buttons during form submission (`isSubmitting`) to prevent double submissions.
  - Do not add client-side rules that contradict backend validation.

---

## 8. Authentication and Session Handling

- Determine whether the backend transports tokens via `HttpOnly` cookies or Bearer Authorization headers.
- If cookies are used, ensure `credentials: "include"` is set on all fetch requests.
- If Bearer tokens are used, follow backend expectations without inventing a conflicting approach.
- Resolve user session and role using backend `/me` endpoint wrapped in a TanStack Query hook (`useUser` / `useSession`).
- Clear session state on logout.
- Protect routes appropriately without flashing protected content while the session is resolving.
- Never rely solely on client redirects for security; backend authorization remains authoritative.

---

## 9. Suggested Project Structure

Structure the codebase cleanly by feature, ensuring client components remain lightweight:

```text
src/ (or root)
├── app/                         # Next.js App Router routes
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── student/
│   │   ├── submission/page.tsx
│   │   └── layout.tsx
│   ├── mentor/
│   │   ├── dashboard/page.tsx
│   │   ├── submissions/[id]/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                      # ShadCN UI primitives (button, input, etc.)
│   ├── layout/                  # Shared headers, navigation shells
│   ├── providers/               # QueryClientProvider, ThemeProvider
│   └── feedback/                # LoadingSpinner, EmptyState, ErrorCard
├── features/
│   ├── auth/
│   │   ├── components/          # Small presentation components (LoginForm, SignupForm)
│   │   ├── hooks/               # useAuth, useLoginMutation
│   │   ├── schemas/             # auth-schemas.ts (Zod)
│   │   └── services/            # auth-api.ts
│   ├── student/
│   │   ├── components/          # SubmissionForm, StatusCard, AttemptHistory
│   │   ├── hooks/               # useStudentSubmission, useResubmitMutation
│   │   ├── schemas/             # submission-schema.ts (Zod)
│   │   └── services/            # submission-api.ts
│   └── mentor/
│       ├── components/          # StatsCards, SubmissionsTable, ReviewActionModal
│       ├── hooks/               # useMentorDashboard, useReviewSubmissionMutation
│       ├── schemas/             # review-schema.ts (Zod)
│       └── services/            # mentor-api.ts
├── lib/
│   ├── api-client.ts            # Base fetch wrapper
│   ├── query-client.ts          # TanStack Query client configuration
│   └── utils.ts                 # cn helper and utility functions
└── types/
    ├── api.ts                   # ApiResponse<T>, Meta, Error types
    ├── auth.ts                  # User, Role, Session
    ├── submission.ts            # Submission, Attempt, Status, Rating
    └── mentor.ts                # Stats, FilterParams
```

---

## 10. Testing & Lean Code Policy

- **Do Not Write Unnecessary Checks or Tests:** Avoid mocking frameworks, redundant unit tests, or over-engineered boundary checks unless explicitly requested.
- **Rely on Clean Types:** Use TypeScript compiler checks (`bun run typecheck`) and ESLint (`bun run lint`) for verification.
- **Ask Before Writing When in Doubt:** When any function behavior, edge case, or integration path is unclear, clarify with the user first.

---

## 11. Implementation Plan

### Phase 1 --- Reconnaissance and API Contract
- Verify actual backend endpoints, payloads, response envelopes, role names, and enums.
- Confirm base URL and configure `.env.local` / `.env.example`.
- Define accurate TypeScript types matching backend response contracts.

### Phase 2 --- Foundation, Providers & Shared UI
- Set up TanStack Query provider (`QueryClientProvider`) with optimal defaults.
- Implement lean `lib/api-client.ts`.
- Install necessary ShadCN UI components with `bun`.
- Build shared layout, navigation header, and minimal feedback states.

### Phase 3 --- Authentication
- Implement auth service and TanStack Query mutations for login/signup.
- Build lean `LoginForm` and `SignupForm` using **TanStack Form** and **Zod**.
- Implement role-aware navigation and route access.

### Phase 4 --- Student Submissions
- Build `SubmissionForm` using **TanStack Form** + **Zod**.
- Fetch and display latest status and mentor feedback using TanStack Query.
- Support eligible resubmission with URL updates.
- Display historical attempts and previous review feedback.

### Phase 5 --- Mentor Dashboard & Review Actions
- Fetch and display global dashboard statistics with TanStack Query.
- Implement server-side filtered, paginated submission table.
- Build submission review dialog/action with **TanStack Form** + **Zod** (decision, rating, feedback).
- Invalidate query cache on review submission for immediate UI sync.

### Phase 6 --- Verification & Polish
- Verify responsive layout across mobile and desktop.
- Prevent duplicate actions during pending mutations.
- Run `bun run typecheck` and `bun run lint` to guarantee clean build.

---

## 12. Agent Completion Report

At the end of each substantial task, report:
1. What was implemented.
2. Which files changed or were created.
3. Which backend endpoints/contracts were used.
4. Which verification checks ran (typecheck, lint) and their output.
5. Any open questions or remaining decisions for the user.
