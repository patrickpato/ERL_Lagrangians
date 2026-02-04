import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return <div className={cn("card", className)}>{children}</div>;
};

export default Card;
