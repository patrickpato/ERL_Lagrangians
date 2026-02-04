import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SEO from "@/lib/seo";

const openRoles = [
  {
    title: "Frontend Engineer",
    location: "Nairobi, KE (Hybrid)",
    type: "Full-time",
    description:
      "Build data-rich experiences with React, TypeScript, and analytics tooling.",
  },
  {
    title: "Customer Success Lead",
    location: "Remote (East Africa)",
    type: "Full-time",
    description:
      "Partner with enterprise teams to drive adoption and measurable outcomes.",
  },
  {
    title: "Data Scientist",
    location: "Nairobi, KE",
    type: "Contract",
    description:
      "Prototype decision intelligence models and support RL Advisor pilots.",
  },
];

const CareersPage = () => {
  return (
    <>
      <SEO
        title="Careers"
        description="Join the ClearDrop Tech team."
        path="/careers"
      />
      <PageHeader
        title="Careers"
        subtitle="Join a mission-driven team building technology for critical operations."
        eyebrow="Careers"
      />
      <Section>
        <Container className="space-y-10">
          <div className="max-w-2xl">
            <h2 className="h3">Open roles</h2>
            <p className="body mt-4">
              We are growing across engineering, product, and customer success.
              {/* TODO: Move role listings to JSON/MDX. */}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {openRoles.map((role) => (
              <Card key={role.title} className="flex flex-col justify-between">
                <div>
                  <h3 className="h4">{role.title}</h3>
                  <p className="mt-2 text-sm text-cd-muted">{role.location}</p>
                  <p className="mt-1 text-sm text-cd-muted">{role.type}</p>
                  <p className="body mt-4">{role.description}</p>
                </div>
                <Button className="mt-6" variant="secondary">
                  Apply now
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default CareersPage;
