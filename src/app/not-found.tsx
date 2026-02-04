import { Link } from "react-router-dom";
import SEO from "@/lib/seo";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const NotFoundPage = () => {
  return (
    <Container className="py-24 text-center">
      <SEO title="Page not found" description="This page could not be found." />
      <p className="text-sm uppercase tracking-widest text-cd-muted">404</p>
      <h1 className="h2 mt-4">We could not find that page.</h1>
      <p className="body mt-4">
        The link may be outdated or the page has moved. Use the button below to
        return home.
      </p>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
