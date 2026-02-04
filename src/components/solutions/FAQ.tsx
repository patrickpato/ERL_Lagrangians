import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  className?: string;
};

const FAQ = ({ items, className }: FAQProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-2xl border border-white/10 bg-cd-surface/60 p-5"
        >
          <summary className="cursor-pointer text-sm font-semibold text-cd-text">
            {item.question}
          </summary>
          <p className="body mt-3">{item.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQ;
