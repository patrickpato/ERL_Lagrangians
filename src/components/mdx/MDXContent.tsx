import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";
import { MDXProvider } from "@mdx-js/react";

const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="h2 mt-6" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="h3 mt-6" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="h4 mt-6" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="body mt-4" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-cd-muted" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-cd-muted" {...props} />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-cd-accent hover:underline" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-cd-accent/60 pl-4 text-cd-muted"
      {...props}
    />
  ),
};

type MDXContentProps = {
  children: ReactNode;
};

const MDXContent = ({ children }: MDXContentProps) => {
  return (
    <MDXProvider components={mdxComponents}>
      <div className="prose prose-invert max-w-none">{children}</div>
    </MDXProvider>
  );
};

export default MDXContent;
