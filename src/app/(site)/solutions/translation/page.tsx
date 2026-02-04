import SEO from "@/lib/seo";
import SolutionDetail from "@/components/solutions/SolutionDetail";

const TranslationSolutionPage = () => {
  /* TODO: Add translation workflow milestones. */
  const problem =
    "Global teams struggle to coordinate translation requests, approvals, and compliance checks across fast-moving product cycles.";
  const approach =
    "ClearDrop Tech provides a centralized translation workspace with real-time status tracking, glossaries, and audit-ready documentation.";
  const howItWorks = [
    "Capture translation requests directly from product teams.",
    "Route tasks to certified linguists with shared glossaries.",
    "Automate approvals and export localized content to deployment teams.",
  ];
  const benefits = [
    "Reduce turnaround time for multilingual releases.",
    "Maintain consistent terminology across markets.",
    "Improve audit readiness with structured review logs.",
  ];
  const faq = [
    {
      question: "Can we integrate existing translation vendors?",
      answer:
        "Yes. We support vendor onboarding and direct task assignments.",
    },
    {
      question: "How do you handle regulated content?",
      answer:
        "Compliance workflows include review checkpoints and audit trails.",
    },
  ];

  return (
    <>
      <SEO
        title="Translation Insights"
        description="Localization workflows that keep regulated teams aligned."
        path="/solutions/translation"
      />
      <SolutionDetail
        title="Translation Insights"
        subtitle="Localization workflows that keep regulated teams aligned."
        eyebrow="Solutions"
        problem={problem}
        approach={approach}
        howItWorks={howItWorks}
        benefits={benefits}
        faq={faq}
      />
    </>
  );
};

export default TranslationSolutionPage;
