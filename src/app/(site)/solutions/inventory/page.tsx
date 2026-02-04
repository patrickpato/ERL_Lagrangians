import SEO from "@/lib/seo";
import SolutionDetail from "@/components/solutions/SolutionDetail";

const InventorySolutionPage = () => {
  /* TODO: Expand problem context and metrics. */
  const problem =
    "Retailers struggle to reconcile stock levels across stores, warehouses, and last-mile hubs. Manual reconciliations create delays and lost revenue.";
  const approach =
    "ClearDrop Tech streams inventory events into a unified control tower, then automates alerts and replenishment workflows for every location.";
  const howItWorks = [
    "Connect POS, warehouse, and supplier feeds into a single data pipeline.",
    "Normalize SKU logic and unify inventory states across teams.",
    "Automate reorder triggers and exception reporting for managers.",
  ];
  const benefits = [
    "Reduce stockouts with near real-time inventory visibility.",
    "Coordinate merchandising and procurement with shared forecasts.",
    "Improve cash flow by minimizing excess safety stock.",
  ];
  const faq = [
    {
      question: "How quickly can we integrate existing systems?",
      answer:
        "Most teams connect their core data sources within four to six weeks.",
    },
    {
      question: "Does this support multi-region operations?",
      answer:
        "Yes. The platform supports multi-currency, multi-warehouse deployments.",
    },
  ];

  return (
    <>
      <SEO
        title="Inventory Intelligence"
        description="Real-time inventory visibility and automated replenishment workflows."
        path="/solutions/inventory"
      />
      <SolutionDetail
        title="Inventory Intelligence"
        subtitle="Real-time inventory visibility for multi-site retail operations."
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

export default InventorySolutionPage;
