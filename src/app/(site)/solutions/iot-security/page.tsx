import SEO from "@/lib/seo";
import SolutionDetail from "@/components/solutions/SolutionDetail";

const IotSecuritySolutionPage = () => {
  /* TODO: Add device compliance requirements. */
  const problem =
    "IoT fleets are difficult to monitor, patch, and secure across remote sites.";
  const approach =
    "ClearDrop Tech delivers continuous device monitoring with automated risk scoring and rapid response playbooks.";
  const howItWorks = [
    "Register devices and enforce secure onboarding policies.",
    "Monitor health, uptime, and anomaly signals in real time.",
    "Trigger automated containment and maintenance workflows.",
  ];
  const benefits = [
    "Reduce downtime for critical IoT infrastructure.",
    "Improve security compliance with audit-ready logs.",
    "Centralize device governance across regions.",
  ];
  const faq = [
    {
      question: "Which device types are supported?",
      answer:
        "We support sensors, gateways, cameras, and custom edge devices.",
    },
    {
      question: "Can we integrate with SIEM tools?",
      answer:
        "Yes. Alerts can be forwarded to existing security tooling.",
    },
  ];

  return (
    <>
      <SEO
        title="IoT Security"
        description="Continuous monitoring for distributed device fleets."
        path="/solutions/iot-security"
      />
      <SolutionDetail
        title="IoT Security"
        subtitle="Continuous monitoring for distributed device fleets."
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

export default IotSecuritySolutionPage;
