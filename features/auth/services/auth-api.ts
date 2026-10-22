import { apiClient } from "@/lib/api-client";
import type { AuthResponseData, UserProfile } from "@/types";
import type { LoginInput, SignupInput } from "../schemas/auth-schemas";

export const authApi = {
  login: (data: LoginInput): Promise<AuthResponseData> =>
    apiClient.post<AuthResponseData>("/auth/login", data, { requireAuth: false }),

  signup: (data: SignupInput): Promise<AuthResponseData> =>
    apiClient.post<AuthResponseData>("/auth/signup", data, { requireAuth: false }),

  getMe: (): Promise<UserProfile> =>
    apiClient.get<UserProfile>("/auth/me", { requireAuth: true }),

  logout: (): Promise<unknown> =>
    apiClient.post("/auth/logout", undefined, { requireAuth: false }),
};
