"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorCardProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorCard({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-card-foreground",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="size-5 shrink-0 text-destructive mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-destructive">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
      {onRetry && (
        <div className="flex justify-end pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="gap-1.5 text-xs font-normal"
          >
            <RotateCcw className="size-3.5" />
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
