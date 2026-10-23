"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { QuerySubmissionsParams, SubmissionStatus } from "@/types";

export function useMentorSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Parse filters from the URL query parameters
  const filters: QuerySubmissionsParams = React.useMemo(() => {
    const searchParam = searchParams.get("search")?.trim();
    const search = searchParam || undefined;

    const statusParam = searchParams.get("status")?.toUpperCase();
    const status: SubmissionStatus | undefined =
      statusParam === "PENDING" || statusParam === "APPROVED" || statusParam === "REJECTED"
        ? (statusParam as SubmissionStatus)
        : undefined;

    const pageParam = searchParams.get("page");
    const page =
      pageParam && !Number.isNaN(Number(pageParam))
        ? Math.max(1, parseInt(pageParam, 10))
        : 1;

    const limitParam = searchParams.get("limit");
    const limit =
      limitParam && !Number.isNaN(Number(limitParam))
        ? Math.max(1, parseInt(limitParam, 10))
        : 10;

    const sortByParam = searchParams.get("sortBy");
    const sortBy =
      sortByParam === "submittedAt" || sortByParam === "attemptNumber" || sortByParam === "status"
        ? sortByParam
        : "submittedAt";

    const orderParam = searchParams.get("order")?.toLowerCase();
    const order = orderParam === "asc" || orderParam === "desc" ? orderParam : "desc";

    return {
      search,
      status,
      page,
      limit,
      sortBy,
      order,
    };
  }, [searchParams]);

  // Synchronize URL query parameters when filters change
  const updateFilters = React.useCallback(
    (next: Partial<QuerySubmissionsParams> | QuerySubmissionsParams) => {
      const merged = { ...filters, ...next };
      const params = new URLSearchParams();

      if (merged.search && merged.search.trim()) {
        params.set("search", merged.search.trim());
      }
      if (merged.status) {
        params.set("status", merged.status);
      }
      if (merged.page && merged.page > 1) {
        params.set("page", String(merged.page));
      }
      if (merged.limit && merged.limit !== 10) {
        params.set("limit", String(merged.limit));
      }
      if (merged.sortBy && merged.sortBy !== "submittedAt") {
        params.set("sortBy", merged.sortBy);
      }
      if (merged.order && merged.order !== "desc") {
        params.set("order", merged.order);
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(targetUrl);
    },
    [filters, pathname, router]
  );

  return {
    filters,
    updateFilters,
  };
}
