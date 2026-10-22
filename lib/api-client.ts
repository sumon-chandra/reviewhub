import type { ApiErrorResponse, ApiResponse } from "@/types";
import { getAuthToken } from "./token";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export class ApiClientError extends Error {
  statusCode: number;
  errors?: unknown;

  constructor(message: string, statusCode: number, errors?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  requireAuth?: boolean;
}

const buildUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string => {
  const base = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  if (!params) return base;

  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, headers, requireAuth = true, ...fetchOptions } = options;

  const url = buildUrl(endpoint, params);
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Content-Type") && !(fetchOptions.body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (requireAuth) {
    const token = getAuthToken();
    if (token && !requestHeaders.has("Authorization")) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: requestHeaders,
    credentials: "include",
  });

  let responseData: ApiResponse<T> | ApiErrorResponse | null = null;
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    const errorMessage =
      (responseData as ApiErrorResponse)?.message ||
      `Request failed with status ${response.status}`;
    const errors = (responseData as ApiErrorResponse)?.errors;

    throw new ApiClientError(errorMessage, response.status, errors);
  }

  if (responseData && typeof responseData === "object" && "data" in responseData) {
    return responseData.data as T;
  }

  return responseData as unknown as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>(endpoint, { ...options, method: "DELETE" }),

  /**
   * For endpoints where pagination meta is needed alongside data
   */
  getWithEnvelope: async <T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> => {
    const { params, headers, requireAuth = true, ...fetchOptions } = options || {};
    const url = buildUrl(endpoint, params);
    const requestHeaders = new Headers(headers);

    if (requireAuth) {
      const token = getAuthToken();
      if (token && !requestHeaders.has("Authorization")) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      method: "GET",
      headers: requestHeaders,
      credentials: "include",
    });

    const responseData = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      throw new ApiClientError(
        responseData.message || `Request failed with status ${response.status}`,
        response.status,
      );
    }

    return responseData;
  },
};
