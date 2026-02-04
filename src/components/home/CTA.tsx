import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import { routes } from "@/lib/routes";

const CTA = () => {
  return (
    <Section className="bg-cd-surface/40">
      <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="h2">Ready to modernize operations?</h2>
          <p className="body mt-4">
            Partner with ClearDrop Tech to design a deployment roadmap that
            delivers measurable impact. {/* TODO: Add CTA copy. */}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link to={routes.contact}>Get a Demo</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to={routes.careers}>Join our team</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
