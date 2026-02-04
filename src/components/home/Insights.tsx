import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import { getAllBlogPosts, getAllCaseStudies } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const Insights = () => {
  const blogPosts = getAllBlogPosts().slice(0, 2);
  const caseStudies = getAllCaseStudies().slice(0, 1);

  return (
    <Section className="bg-cd-surface/30">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
            Insights
          </p>
          <h2 className="h2 mt-4">Stories from the field.</h2>
          <p className="body mt-4">
            Learn how ClearDrop Tech helps teams streamline critical workflows.
            {/* TODO: Expand insights copy. */}
          </p>
        </div>
        <Grid className="mt-10" cols="three">
          {blogPosts.map((post) => (
            <Card key={post.slug}>
              <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
                Blog
              </p>
              <h3 className="h4 mt-2">{post.title}</h3>
              <p className="body mt-3">{post.description}</p>
              <p className="mt-4 text-xs text-cd-muted">
                {formatDate(post.date)}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm text-cd-accent hover:underline"
              >
                Read article
              </Link>
            </Card>
          ))}
          {caseStudies.map((study) => (
            <Card key={study.slug}>
              <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
                Case Study
              </p>
              <h3 className="h4 mt-2">{study.title}</h3>
              <p className="body mt-3">{study.description}</p>
              <p className="mt-4 text-xs text-cd-muted">
                {formatDate(study.date)}
              </p>
              <Link
                to={`/case-studies/${study.slug}`}
                className="mt-4 inline-flex text-sm text-cd-accent hover:underline"
              >
                View case study
              </Link>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Insights;
