import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const Newsletter = () => {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cd-muted">
            Newsletter
          </p>
          <h2 className="h2 mt-4">Stay close to our product releases.</h2>
          <p className="body mt-4">
            Monthly updates on solution releases, new partnerships, and
            industry trends. {/* TODO: Connect to marketing automation. */}
          </p>
        </div>
        <form className="rounded-2xl border border-white/10 bg-cd-surface/60 p-6">
          <label className="text-sm text-cd-muted" htmlFor="newsletter-email">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="you@company.com"
            className="mt-3"
          />
          <Button type="submit" className="mt-4 w-full">
            Subscribe
          </Button>
          <p className="mt-3 text-xs text-cd-muted">
            We respect your inbox. Unsubscribe at any time.
          </p>
        </form>
      </Container>
    </Section>
  );
};

export default Newsletter;
