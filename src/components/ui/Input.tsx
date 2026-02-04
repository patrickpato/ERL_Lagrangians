import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-lg border border-white/10 bg-cd-surface/60 px-4 py-2 text-sm text-cd-text placeholder:text-cd-muted focus:border-cd-accent focus:outline-none focus:ring-2 focus:ring-cd-accent/30",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
