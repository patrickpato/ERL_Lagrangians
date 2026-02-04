import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cd-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cd-bg disabled:cursor-not-allowed disabled:opacity-60",
          {
            primary:
              "bg-cd-accent text-slate-950 hover:bg-cd-accent/90 shadow-glow",
            secondary:
              "border border-white/20 bg-transparent text-cd-text hover:border-white/40",
            ghost: "bg-transparent text-cd-text hover:bg-white/5",
          }[variant],
          {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-sm",
            lg: "px-8 py-4 text-base",
          }[size],
          className,
        )}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
