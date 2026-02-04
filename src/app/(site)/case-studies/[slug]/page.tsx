import { useParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import PrevNext from "@/components/navigation/PrevNext";
import MDXContent from "@/components/mdx/MDXContent";
import NotFoundPage from "@/app/not-found";
import SEO from "@/lib/seo";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/mdx";
import { getPrevNext } from "@/lib/navigation";
import { formatDate } from "@/lib/utils";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const study = slug ? getCaseStudyBySlug(slug) : null;

  if (!study) {
    return <NotFoundPage />;
  }

  const { previous, next } = getPrevNext(getAllCaseStudies(), study.slug);
  const StudyComponent = study.Component;

  return (
    <>
      <SEO
        title={study.title}
        description={study.description}
        path={`/case-studies/${study.slug}`}
      />
      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: "/case-studies" },
              { label: study.title },
            ]}
          />
          <h1 className="h2 mt-6">{study.title}</h1>
          <p className="body mt-4">{study.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-cd-muted">
            <span>{formatDate(study.date)}</span>
            <span>By {study.author}</span>
          </div>
          <div className="mt-10">
            <MDXContent>
              <StudyComponent />
            </MDXContent>
          </div>
          <PrevNext
            previous={
              previous
                ? {
                    slug: previous.slug,
                    title: previous.title,
                    pathPrefix: "/case-studies",
                  }
                : null
            }
            next={
              next
                ? {
                    slug: next.slug,
                    title: next.title,
                    pathPrefix: "/case-studies",
                  }
                : null
            }
          />
        </Container>
      </Section>
    </>
  );
};

export default CaseStudyPage;
