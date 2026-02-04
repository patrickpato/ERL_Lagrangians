import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Grid from "@/components/layout/Grid";
import Card from "@/components/ui/Card";
import SectionTOC from "@/components/navigation/SectionTOC";
import FAQ, { type FAQItem } from "@/components/solutions/FAQ";

type SolutionDetailProps = {
  title: string;
  subtitle: string;
  eyebrow: string;
  problem: string;
  approach: string;
  howItWorks: string[];
  benefits: string[];
  faq: FAQItem[];
};

const SolutionDetail = ({
  title,
  subtitle,
  eyebrow,
  problem,
  approach,
  howItWorks,
  benefits,
  faq,
}: SolutionDetailProps) => {
  const tocSections = [
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "how-it-works", label: "How It Works" },
    { id: "benefits", label: "Benefits" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} eyebrow={eyebrow} />
      <Section>
        <Container className="grid gap-10 xl:grid-cols-[1fr_240px]">
          <div className="space-y-16">
            <div id="problem">
              <h2 className="h3">Problem</h2>
              <p className="body mt-4">{problem}</p>
            </div>
            <div id="approach">
              <h2 className="h3">Approach</h2>
              <p className="body mt-4">{approach}</p>
            </div>
            <div id="how-it-works">
              <h2 className="h3">How It Works</h2>
              <Grid className="mt-6" cols="three">
                {howItWorks.map((step, index) => (
                  <Card key={step}>
                    <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
                      Step {index + 1}
                    </p>
                    <p className="body mt-3">{step}</p>
                  </Card>
                ))}
              </Grid>
            </div>
            <div id="benefits">
              <h2 className="h3">Benefits</h2>
              <ul className="mt-6 list-disc space-y-3 pl-6 text-cd-muted">
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div id="faq">
              <h2 className="h3">FAQ</h2>
              <FAQ className="mt-6" items={faq} />
            </div>
          </div>
          <SectionTOC sections={tocSections} />
        </Container>
      </Section>
    </>
  );
};

export default SolutionDetail;
