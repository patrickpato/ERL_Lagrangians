import { type ContentEntry } from "@/lib/mdx";

export const getPrevNext = (entries: ContentEntry[], slug: string) => {
  const sorted = [...entries].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const index = sorted.findIndex((entry) => entry.slug === slug);
  return {
    previous: index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
};
