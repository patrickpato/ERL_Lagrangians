import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";
import Card from "@/components/ui/Card";
import SEO from "@/lib/seo";

const industries = [
  {
    title: "Retail",
    description:
      "Inventory control, demand forecasting, and omnichannel reporting.",
  },
  {
    title: "Agriculture",
    description:
      "Field data collection, cooperative finance, and supply chain visibility.",
  },
  {
    title: "Finance",
    description:
      "Operational dashboards for risk, compliance, and credit performance.",
  },
  {
    title: "Education",
    description:
      "Student engagement analytics and program delivery monitoring.",
  },
  {
    title: "Security",
    description:
      "IoT monitoring, incident response, and device governance.",
  },
];

const IndustriesPage = () => {
  return (
    <>
      <SEO
        title="Industries"
        description="Industries served by ClearDrop Tech."
        path="/industries"
      />
      <PageHeader
        title="Industries"
        subtitle="Strategic technology programs for teams managing distributed operations."
        eyebrow="Industries"
      />
      <Section>
        <Container>
          <Grid cols="three">
            {industries.map((industry) => (
              <Card key={industry.title}>
                <h3 className="h4">{industry.title}</h3>
                <p className="body mt-3">{industry.description}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
};

export default IndustriesPage;
