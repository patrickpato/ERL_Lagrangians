import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";

const stats = [
  { label: "Active deployments", value: "45+" },
  { label: "Partners across regions", value: "18" },
  { label: "Average response improvement", value: "32%" },
  { label: "Operations monitored daily", value: "120k+" },
];

const Stats = () => {
  return (
    <Section>
      <Container>
        <Grid cols="four">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 p-6">
              <p className="text-3xl font-semibold text-cd-text">{stat.value}</p>
              <p className="mt-2 text-sm text-cd-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Stats;
