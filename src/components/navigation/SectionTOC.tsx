import { cn } from "@/lib/utils";

type SectionLink = {
  id: string;
  label: string;
};

type SectionTOCProps = {
  sections: SectionLink[];
  className?: string;
};

const SectionTOC = ({ sections, className }: SectionTOCProps) => {
  return (
    <aside
      className={cn(
        "sticky top-24 hidden h-fit w-56 rounded-2xl border border-white/10 bg-cd-surface/60 p-6 text-sm text-cd-muted xl:block",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-cd-text">
        On this page
      </p>
      <ul className="mt-4 space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="hover:text-cd-text"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SectionTOC;
