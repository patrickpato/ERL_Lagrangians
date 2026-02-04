import { Link } from "react-router-dom";
import SEO from "@/lib/seo";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

type ErrorPageProps = {
  error?: Error;
};

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <Container className="py-24 text-center">
      <SEO title="Something went wrong" description="An unexpected error." />
      <p className="text-sm uppercase tracking-widest text-cd-muted">500</p>
      <h1 className="h2 mt-4">Something went wrong.</h1>
      <p className="body mt-4">
        An unexpected error occurred while loading this page. Please refresh or
        return home.
      </p>
      {error?.message ? (
        <p className="mt-6 text-sm text-cd-muted">Error: {error.message}</p>
      ) : null}
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild variant="secondary">
          <Link to="/">Back to home</Link>
        </Button>
        <Button asChild>
          <a href="mailto:hello@cleardroptech.com">Contact support</a>
        </Button>
      </div>
    </Container>
  );
};

export default ErrorPage;
