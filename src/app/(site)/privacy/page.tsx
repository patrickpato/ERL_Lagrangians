import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SEO from "@/lib/seo";

const PrivacyPage = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="ClearDrop Tech privacy policy."
        path="/privacy"
      />
      <PageHeader
        title="Privacy Policy"
        subtitle="We respect your data and handle it responsibly."
        eyebrow="Legal"
      />
      <Section>
        <Container className="space-y-6">
          <p className="body">
            ClearDrop Tech is committed to protecting your personal information.
            This policy explains how we collect, use, and safeguard data across
            our services.
          </p>
          <p className="body">
            {/* TODO: Replace with legal counsel approved privacy policy. */}
            This page is a placeholder and should be reviewed by legal counsel
            before production.
          </p>
        </Container>
      </Section>
    </>
  );
};

export default PrivacyPage;
