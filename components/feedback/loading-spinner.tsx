import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  label?: string;
}

const sizeClasses = {
  sm: "size-4",
  default: "size-6",
  lg: "size-8",
};

export function LoadingSpinner({
  className,
  size = "default",
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center justify-center gap-2 p-6", className)}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
}
