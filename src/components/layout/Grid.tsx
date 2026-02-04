import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GridProps = {
  children: ReactNode;
  className?: string;
  cols?: "two" | "three" | "four";
};

const Grid = ({ children, className, cols = "three" }: GridProps) => {
  const colClasses = {
    two: "grid-cols-1 md:grid-cols-2",
    three: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    four: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
  }[cols];

  return (
    <div className={cn("grid gap-6", colClasses, className)}>{children}</div>
  );
};

export default Grid;
