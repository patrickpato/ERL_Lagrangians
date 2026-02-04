import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type PrevNextItem = {
  slug: string;
  title: string;
  pathPrefix: string;
};

type PrevNextProps = {
  previous?: PrevNextItem | null;
  next?: PrevNextItem | null;
  className?: string;
};

const PrevNext = ({ previous, next, className }: PrevNextProps) => {
  return (
    <div className={cn("mt-12 grid gap-4 md:grid-cols-2", className)}>
      {previous ? (
        <Link
          to={`${previous.pathPrefix}/${previous.slug}`}
          className="rounded-2xl border border-white/10 bg-cd-surface/60 p-5 hover:border-white/20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
            Previous
          </p>
          <p className="mt-2 text-sm font-semibold text-cd-text">
            {previous.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`${next.pathPrefix}/${next.slug}`}
          className="rounded-2xl border border-white/10 bg-cd-surface/60 p-5 hover:border-white/20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
            Next
          </p>
          <p className="mt-2 text-sm font-semibold text-cd-text">
            {next.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PrevNext;
