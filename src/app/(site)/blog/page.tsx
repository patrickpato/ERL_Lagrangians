import { Link } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import SEO from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const BlogIndexPage = () => {
  const posts = getAllBlogPosts();

  return (
    <>
      <SEO title="Blog" description="ClearDrop Tech insights and updates." path="/blog" />
      <PageHeader
        title="Blog"
        subtitle="Insights from our teams building operational intelligence."
        eyebrow="Blog"
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug}>
              <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
                {formatDate(post.date)}
              </p>
              <h2 className="h4 mt-3">{post.title}</h2>
              <p className="body mt-3">{post.description}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm text-cd-accent hover:underline"
              >
                Read article
              </Link>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
};

export default BlogIndexPage;
