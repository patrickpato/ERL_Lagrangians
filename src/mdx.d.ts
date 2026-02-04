declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const frontmatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    image: string;
  };
  const Component: ComponentType;
  export default Component;
}
