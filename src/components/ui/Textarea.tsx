import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-white/10 bg-cd-surface/60 px-4 py-3 text-sm text-cd-text placeholder:text-cd-muted focus:border-cd-accent focus:outline-none focus:ring-2 focus:ring-cd-accent/30",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
