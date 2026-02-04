import SEO from "@/lib/seo";
import SolutionDetail from "@/components/solutions/SolutionDetail";

const RlAdvisorSolutionPage = () => {
  /* TODO: Add model governance details. */
  const problem =
    "Operational leaders need fast answers but lack the analytics bandwidth to interpret growing data streams.";
  const approach =
    "RL Advisor blends reinforcement learning and decision intelligence to surface next-best actions aligned with your goals.";
  const howItWorks = [
    "Ingest operational signals from ERP, CRM, and IoT sources.",
    "Train adaptive policies that test decisions in controlled sandboxes.",
    "Deploy recommendations with human-in-the-loop approvals.",
  ];
  const benefits = [
    "Reduce response time to supply chain disruptions.",
    "Empower teams with explainable recommendations.",
    "Continuously optimize performance against KPI targets.",
  ];
  const faq = [
    {
      question: "Is RL Advisor transparent to business users?",
      answer:
        "Yes. We provide confidence scores, rationale, and control toggles.",
    },
    {
      question: "Can we start with a pilot program?",
      answer:
        "Pilots are available for a single business line or region.",
    },
  ];

  return (
    <>
      <SEO
        title="RL Advisor"
        description="Decision intelligence that learns with your operations."
        path="/solutions/rl-advisor"
      />
      <SolutionDetail
        title="RL Advisor"
        subtitle="Decision intelligence that learns with your operations."
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

export default RlAdvisorSolutionPage;
