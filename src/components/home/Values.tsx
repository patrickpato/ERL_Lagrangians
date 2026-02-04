import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";

const values = [
  {
    title: "Operational clarity",
    description:
      "Bring every team into a single, trusted view of real-time performance.",
  },
  {
    title: "Adaptive intelligence",
    description:
      "Deploy decision systems that learn, iterate, and improve continuously.",
  },
  {
    title: "Responsible security",
    description:
      "Safeguard data and devices with privacy-first governance.",
  },
];

const Values = () => {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
            Values
          </p>
          <h2 className="h2 mt-4">Built for lasting partnerships.</h2>
          <p className="body mt-4">
            We collaborate with teams that demand measurable outcomes and
            long-term trust. {/* TODO: Expand values copy. */}
          </p>
        </div>
        <Grid className="mt-10" cols="three">
          {values.map((value) => (
            <Card key={value.title}>
              <h3 className="h4">{value.title}</h3>
              <p className="body mt-3">{value.description}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Values;
