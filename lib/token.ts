const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY as string

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null
  }
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch {
    return null
  }
}

export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") {
    return
  }
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  } catch {
    // Fail-safe if storage is restricted
  }
}

export const removeAuthToken = (): void => {
  if (typeof window === "undefined") {
    return
  }
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  } catch {
    // Fail-safe
  }
}
