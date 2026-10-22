"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authApi } from "../services/auth-api"
import { removeCookie, setCookie } from "@/lib/token"
import type { UserProfile } from "@/types"
import type { LoginInput, SignupInput } from "../schemas/auth-schemas"
import { ApiClientError } from "@/lib/api-client"

export const AUTH_QUERY_KEY = ["auth", "me"] as const

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<UserProfile | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      try {
        return await authApi.getMe()
      } catch (err) {
        if (
          err instanceof ApiClientError &&
          (err.statusCode === 401 || err.statusCode === 403)
        ) {
          return null
        }
        return null
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (data) => {
      if (data?.accessToken) {
        setCookie("accessToken", data.accessToken, { days: 7 })
      }

      toast.success("Account created successfully!", {
        description: `Welcome to Waypoint, ${data?.user?.name}.`,
      })
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
      toast.success(`Welcome back, ${data.user.name}!`)

      if (data.user.role === "MENTOR") {
        router.push("/mentor/dashboard")
      } else {
        router.push("/student/submission")
      }
    },
    onError: (error) => {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Invalid email or password. Please try again."
      toast.error(message)
    },
  })

  const signupMutation = useMutation({
    mutationFn: (data: SignupInput) => authApi.signup(data),
    onSuccess: (data) => {
      if (data?.accessToken) {
        setCookie("accessToken", data.accessToken, { days: 7 })
      }
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
      toast.success("Account created successfully!")
      router.push("/student/submission")
    },
    onError: (error) => {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Registration failed. Please check your details."
      toast.error(message)
    },
  })

  const logout = () => {
    removeCookie("accessToken")
    queryClient.setQueryData(AUTH_QUERY_KEY, null)
    queryClient.clear()
    toast.success("Logged out successfully.")
    router.push("/login")
  }

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading,
    isError,
    refetchUser: refetch,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    signup: signupMutation.mutate,
    isSigningUp: signupMutation.isPending,
    logout,
  }
}
