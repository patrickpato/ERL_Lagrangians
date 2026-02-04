import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="ClearDrop Tech">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cd-accent to-cd-accent-2 text-sm font-semibold text-slate-950">
        CD
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-wide text-cd-text">
          ClearDrop
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-cd-muted">
          Tech
        </span>
      </div>
    </div>
  );
};

export default Logo;
