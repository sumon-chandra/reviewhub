export type Role = "STUDENT" | "MENTOR"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface AuthResponseData {
  user: User
  accessToken: string
  refreshToken: string
}

export interface UserProjectSummary {
  id: string
  projectName: string
  repositoryUrl: string
  liveUrl: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  project: UserProjectSummary | null
}
