import SEO from "@/lib/seo";
import Hero from "@/components/home/Hero";
import Values from "@/components/home/Values";
import SolutionsTeaser from "@/components/home/SolutionsTeaser";
import Stats from "@/components/home/Stats";
import Insights from "@/components/home/Insights";
import Newsletter from "@/components/home/Newsletter";
import CTA from "@/components/home/CTA";

const HomePage = () => {
  return (
    <>
      <SEO
        title="Home"
        description="ClearDrop Tech builds data-driven platforms for resilient operations."
        path="/"
      />
      <Hero />
      <Values />
      <SolutionsTeaser />
      <Stats />
      <Insights />
      <Newsletter />
      <CTA />
    </>
  );
};

export default HomePage;
