import SEO from "@/lib/seo";
import SolutionDetail from "@/components/solutions/SolutionDetail";

const FarmersSolutionPage = () => {
  /* TODO: Expand cooperative finance features. */
  const problem =
    "Smallholder networks lack consistent market access, financing, and climate intelligence.";
  const approach =
    "ClearDrop Tech connects farmers, cooperatives, and buyers through a unified digital platform.";
  const howItWorks = [
    "Collect field data and crop forecasts through mobile workflows.",
    "Match growers with buyers and financing partners.",
    "Track deliveries, payments, and extension services in one dashboard.",
  ];
  const benefits = [
    "Improve income predictability for growers.",
    "Support co-ops with accurate supply forecasting.",
    "Increase transparency across agricultural value chains.",
  ];
  const faq = [
    {
      question: "Does the platform work offline?",
      answer:
        "Yes. Field agents can capture data offline and sync when connected.",
    },
    {
      question: "Can we onboard multiple cooperatives?",
      answer:
        "Multi-cooperative deployments are supported with role-based access.",
    },
  ];

  return (
    <>
      <SEO
        title="Farmers Network"
        description="Field data, cooperative finance, and market access tools."
        path="/solutions/farmers"
      />
      <SolutionDetail
        title="Farmers Network"
        subtitle="Field data, cooperative finance, and market access tools."
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

export default FarmersSolutionPage;
