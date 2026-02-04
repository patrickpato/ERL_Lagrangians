import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SEO from "@/lib/seo";

const TermsPage = () => {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="ClearDrop Tech terms of service."
        path="/terms"
      />
      <PageHeader
        title="Terms of Service"
        subtitle="Review the terms that govern use of our services."
        eyebrow="Legal"
      />
      <Section>
        <Container className="space-y-6">
          <p className="body">
            These terms outline the rules and responsibilities that apply when
            using ClearDrop Tech services.
          </p>
          <p className="body">
            {/* TODO: Replace with legal counsel approved terms of service. */}
            This page is a placeholder and should be reviewed by legal counsel
            before production.
          </p>
        </Container>
      </Section>
    </>
  );
};

export default TermsPage;
