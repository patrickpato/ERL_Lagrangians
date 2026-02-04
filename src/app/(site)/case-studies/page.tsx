import { Link } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import SEO from "@/lib/seo";
import { getAllCaseStudies } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

const CaseStudiesPage = () => {
  const studies = getAllCaseStudies();

  return (
    <>
      <SEO
        title="Case Studies"
        description="Customer stories and deployment outcomes."
        path="/case-studies"
      />
      <PageHeader
        title="Case Studies"
        subtitle="Real-world outcomes from ClearDrop Tech deployments."
        eyebrow="Case Studies"
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <Card key={study.slug}>
              <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
                {formatDate(study.date)}
              </p>
              <h2 className="h4 mt-3">{study.title}</h2>
              <p className="body mt-3">{study.description}</p>
              <Link
                to={`/case-studies/${study.slug}`}
                className="mt-4 inline-flex text-sm text-cd-accent hover:underline"
              >
                View case study
              </Link>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
};

export default CaseStudiesPage;
