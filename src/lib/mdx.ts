import type { ComponentType } from "react";

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
};

export type ContentEntry = Frontmatter & {
  slug: string;
  Component: ComponentType;
};

type MdxModule = {
  default: ComponentType;
  frontmatter: Frontmatter;
};

const blogModules = import.meta.glob("../content/blog/*.mdx", {
  eager: true,
}) as Record<string, MdxModule>;

const caseStudyModules = import.meta.glob("../content/case-studies/*.mdx", {
  eager: true,
}) as Record<string, MdxModule>;

const normalizeEntry = (path: string, module: MdxModule): ContentEntry => {
  const slug = path.split("/").pop()?.replace(".mdx", "") ?? "";
  return {
    slug,
    Component: module.default,
    ...module.frontmatter,
  };
};

const sortByDate = (entries: ContentEntry[]) => {
  return [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getAllBlogPosts = () => {
  return sortByDate(
    Object.entries(blogModules).map(([path, module]) =>
      normalizeEntry(path, module),
    ),
  );
};

export const getBlogPostBySlug = (slug: string) => {
  const entry = getAllBlogPosts().find((post) => post.slug === slug);
  return entry ?? null;
};

export const getAllCaseStudies = () => {
  return sortByDate(
    Object.entries(caseStudyModules).map(([path, module]) =>
      normalizeEntry(path, module),
    ),
  );
};

export const getCaseStudyBySlug = (slug: string) => {
  const entry = getAllCaseStudies().find((post) => post.slug === slug);
  return entry ?? null;
};
