import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { routes, solutions } from "@/lib/routes";

const SolutionsTeaser = () => {
  return (
    <Section className="bg-cd-surface/30">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
              Solutions
            </p>
            <h2 className="h2 mt-4">What we build for teams on the ground.</h2>
            <p className="body mt-4">
              From inventory control to IoT security, ClearDrop Tech delivers
              modular platforms that scale with your operations.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link to={routes.solutions}>View all solutions</Link>
          </Button>
        </div>
        <Grid className="mt-10" cols="three">
          {solutions.map((solution) => (
            <Card key={solution.slug}>
              <h3 className="h4">{solution.title}</h3>
              <p className="body mt-3">{solution.description}</p>
              <Link
                to={solution.href}
                className="mt-4 inline-flex text-sm text-cd-accent hover:underline"
              >
                Learn more
              </Link>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default SolutionsTeaser;
