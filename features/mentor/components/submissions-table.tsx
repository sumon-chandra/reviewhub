"use client";

import * as React from "react";
import {
  ExternalLink,
  GitBranch,
  Globe,
  Search,
  Eye,
  Award,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  RotateCcw,
} from "lucide-react";
import type {
  MentorSubmissionItem,
  QuerySubmissionsParams,
  SubmissionStatus,
} from "@/types";
import {
  formatDate,
  getRatingBadgeVariant,
  getStatusBadgeVariant,
  RATING_LABELS,
  STATUS_LABELS,
} from "@/features/student/utils/format-review";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/feedback/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SubmissionsTableProps {
  submissions: MentorSubmissionItem[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  } | null;
  filters: QuerySubmissionsParams;
  isLoading?: boolean;
  onFilterChange: (filters: QuerySubmissionsParams) => void;
  onInspect: (submission: MentorSubmissionItem) => void;
  onReview: (submission: MentorSubmissionItem) => void;
}

export function SubmissionsTable({
  submissions,
  meta,
  filters,
  isLoading = false,
  onFilterChange,
  onInspect,
  onReview,
}: SubmissionsTableProps) {
  const [searchInput, setSearchInput] = React.useState(filters.search ?? "");

  // Keep search input synced when URL search query parameter changes
  React.useEffect(() => {
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      ...filters,
      search: searchInput.trim() || undefined,
      page: 1, // Reset to page 1 on new search
    });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onFilterChange({
      ...filters,
      search: undefined,
      page: 1,
    });
  };

  const handleStatusChange = (status: string | null) => {
    onFilterChange({
      ...filters,
      status: !status || status === "ALL" ? undefined : (status as SubmissionStatus),
      page: 1, // Reset to page 1 on filter change
    });
  };

  const hasActiveFilters = Boolean(filters.search || filters.status);

  const handleResetAll = () => {
    setSearchInput("");
    onFilterChange({
      ...filters,
      search: undefined,
      status: undefined,
      page: 1,
    });
  };

  const currentPage = meta?.page ?? 1;
  const totalPages = meta?.totalPage ?? 1;
  const totalCount = meta?.total ?? 0;

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by student, email, or project title..."
            className="pl-9 pr-24 text-xs h-9"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              title="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs px-2.5"
          >
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground hidden sm:block" />
          <Select
            value={filters.status ?? "ALL"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[170px] text-xs h-9">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs">
                All Statuses
              </SelectItem>
              <SelectItem value="PENDING" className="text-xs">
                Pending Review
              </SelectItem>
              <SelectItem value="APPROVED" className="text-xs">
                Approved
              </SelectItem>
              <SelectItem value="REJECTED" className="text-xs">
                Changes Requested
              </SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetAll}
              className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5"
              title="Reset search and filters"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Submissions Table */}
      <Card className="border-border/70 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-xs">Student</TableHead>
                  <TableHead className="text-xs">Project & Links</TableHead>
                  <TableHead className="text-xs">Attempt</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Rating</TableHead>
                  <TableHead className="text-xs">Submitted</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-28 mb-1" />
                      <Skeleton className="h-3 w-36" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-14" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-7 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : submissions.length === 0 ? (
          <EmptyState
            title="No Submissions Found"
            description="There are currently no student project submissions matching your filter criteria."
            className="border-none py-12"
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-xs">Student</TableHead>
                  <TableHead className="text-xs">Project & Links</TableHead>
                  <TableHead className="text-xs">Attempt</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Rating</TableHead>
                  <TableHead className="text-xs">Submitted</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {submissions.map((sub) => {
                  const isPending = sub.status === "PENDING";

                  return (
                    <TableRow key={sub.id} className="hover:bg-muted/20">
                      {/* Student */}
                      <TableCell className="align-middle">
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-foreground">
                            {sub.project.student.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[160px]">
                            {sub.project.student.email}
                          </p>
                        </div>
                      </TableCell>

                      {/* Project */}
                      <TableCell className="align-middle">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-foreground truncate max-w-[200px]">
                            {sub.project.projectName}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <a
                              href={sub.repositoryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 hover:text-foreground hover:underline"
                            >
                              <GitBranch className="size-3" />
                              Repo
                              <ExternalLink className="size-2.5" />
                            </a>
                            <span>•</span>
                            <a
                              href={sub.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 hover:text-foreground hover:underline"
                            >
                              <Globe className="size-3" />
                              Demo
                              <ExternalLink className="size-2.5" />
                            </a>
                          </div>
                        </div>
                      </TableCell>

                      {/* Attempt */}
                      <TableCell className="align-middle">
                        <Badge variant="outline" className="font-mono text-[11px]">
                          #{sub.attemptNumber}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="align-middle">
                        <Badge variant={getStatusBadgeVariant(sub.status)} className="text-[10px]">
                          {STATUS_LABELS[sub.status]}
                        </Badge>
                      </TableCell>

                      {/* Rating */}
                      <TableCell className="align-middle">
                        {sub.review ? (
                          <Badge
                            variant={getRatingBadgeVariant(sub.review.rating)}
                            className="text-[10px]"
                          >
                            {RATING_LABELS[sub.review.rating] || sub.review.rating}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="align-middle text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(sub.submittedAt)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="align-middle text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => onInspect(sub)}
                            title="Inspect Details"
                          >
                            <Eye className="size-3.5" />
                          </Button>

                          {isPending && (
                            <Button
                              size="xs"
                              className="gap-1 font-medium text-xs"
                              onClick={() => onReview(sub)}
                            >
                              <Award className="size-3" />
                              Evaluate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalCount > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 px-4 py-3 bg-muted/10 text-xs text-muted-foreground">
            <div>
              Showing {submissions.length} of {totalCount} submissions
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon-xs"
                disabled={currentPage <= 1}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    page: Math.max(1, currentPage - 1),
                  })
                }
              >
                <ChevronLeft className="size-3.5" />
              </Button>

              <Button
                variant="outline"
                size="icon-xs"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    page: currentPage + 1,
                  })
                }
              >
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
