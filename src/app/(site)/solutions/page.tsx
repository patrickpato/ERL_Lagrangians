import { Link } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SEO from "@/lib/seo";
import { solutions } from "@/lib/routes";

const SolutionsPage = () => {
  return (
    <>
      <SEO
        title="Solutions"
        description="Explore ClearDrop Tech solutions for distributed operations."
        path="/solutions"
      />
      <PageHeader
        title="Solutions"
        subtitle="Modular, data-driven platforms that adapt to your operational reality."
        eyebrow="Solutions"
      />
      <Section>
        <Container>
          <Grid cols="three">
            {solutions.map((solution) => (
              <Card key={solution.slug}>
                <h3 className="h4">{solution.title}</h3>
                <p className="body mt-3">{solution.description}</p>
                <Button asChild variant="secondary" className="mt-4">
                  <Link to={solution.href}>View solution</Link>
                </Button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
};

export default SolutionsPage;
