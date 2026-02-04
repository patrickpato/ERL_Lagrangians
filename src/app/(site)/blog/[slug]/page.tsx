import { useParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import PrevNext from "@/components/navigation/PrevNext";
import MDXContent from "@/components/mdx/MDXContent";
import NotFoundPage from "@/app/not-found";
import SEO from "@/lib/seo";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";
import { getPrevNext } from "@/lib/navigation";
import { formatDate } from "@/lib/utils";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return <NotFoundPage />;
  }

  const { previous, next } = getPrevNext(getAllBlogPosts(), post.slug);
  const PostComponent = post.Component;

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
      />
      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <h1 className="h2 mt-6">{post.title}</h1>
          <p className="body mt-4">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-cd-muted">
            <span>{formatDate(post.date)}</span>
            <span>By {post.author}</span>
          </div>
          <div className="mt-10">
            <MDXContent>
              <PostComponent />
            </MDXContent>
          </div>
          <PrevNext
            previous={
              previous
                ? { slug: previous.slug, title: previous.title, pathPrefix: "/blog" }
                : null
            }
            next={
              next ? { slug: next.slug, title: next.title, pathPrefix: "/blog" } : null
            }
          />
        </Container>
      </Section>
    </>
  );
};

export default BlogPostPage;
