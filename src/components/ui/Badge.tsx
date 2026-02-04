import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-cd-muted",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
