import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
};

const PageHeader = ({ title, subtitle, eyebrow, className }: PageHeaderProps) => {
  return (
    <div className={cn("border-b border-white/10 bg-cd-surface/40", className)}>
      <Container className="py-12 md:py-16">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="h2 mt-4">{title}</h1>
        {subtitle ? <p className="body-lg mt-4">{subtitle}</p> : null}
      </Container>
    </div>
  );
};

export default PageHeader;
