import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { routes } from "@/lib/routes";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-cd-bg pb-20 pt-28">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cd-muted">
            ClearDrop Tech
          </p>
          <h1 className="h1">
            Data-driven platforms for resilient, distributed operations.
          </h1>
          <p className="body-lg">
            We help organizations across Africa orchestrate inventory,
            translation workflows, and adaptive intelligence with confidence.
            {/* TODO: Replace with finalized hero copy. */}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to={routes.contact}>Get a Demo</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to={routes.solutions}>Explore Solutions</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
