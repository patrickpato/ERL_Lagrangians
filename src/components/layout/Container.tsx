import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide";
};

const Container = ({ children, className, size = "default" }: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6",
        size === "wide" ? "max-w-6xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
