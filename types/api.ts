export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: ApiMeta | null;
}

export interface ApiFieldError {
  path: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: ApiFieldError[] | unknown;
  stack?: string;
}
