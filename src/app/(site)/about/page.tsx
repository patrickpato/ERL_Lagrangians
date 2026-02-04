import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import SEO from "@/lib/seo";

const values = [
  "Honor",
  "Order",
  "Competence",
  "Trustworthiness",
  "Reliability",
];

const AboutPage = () => {
  return (
    <>
      <SEO
        title="About"
        description="Mission, vision, and values at ClearDrop Tech."
        path="/about"
      />
      <PageHeader
        title="About ClearDrop Tech"
        subtitle="We deliver technology that strengthens operational resilience."
        eyebrow="About"
      />
      <Section>
        <Container className="space-y-12">
          <div>
            <h2 className="h3">Mission</h2>
            <p className="body mt-4">
              Embrace the values of quality service delivery, agility, and
              open-mindedness in finding novel and sustainable solutions to all
              nature of challenges.
            </p>
          </div>
          <div>
            <h2 className="h3">Vision</h2>
            <p className="body mt-4">
              To be a leading and reliable partner for organizations and
              individuals looking forward to transform their businesses using
              technology.
            </p>
          </div>
          <div>
            <h2 className="h3">Core Values</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {values.map((value) => (
                <Card key={value}>
                  <p className="text-sm font-semibold text-cd-text">{value}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AboutPage;
