import { Routes, Route } from "react-router-dom";
import AppLayout from "./app/layout";
import HomePage from "./app/(site)/page";
import SolutionsPage from "./app/(site)/solutions/page";
import InventorySolutionPage from "./app/(site)/solutions/inventory/page";
import TranslationSolutionPage from "./app/(site)/solutions/translation/page";
import RlAdvisorSolutionPage from "./app/(site)/solutions/rl-advisor/page";
import FarmersSolutionPage from "./app/(site)/solutions/farmers/page";
import IotSecuritySolutionPage from "./app/(site)/solutions/iot-security/page";
import IndustriesPage from "./app/(site)/industries/page";
import BlogIndexPage from "./app/(site)/blog/page";
import BlogPostPage from "./app/(site)/blog/[slug]/page";
import CaseStudiesPage from "./app/(site)/case-studies/page";
import CaseStudyPage from "./app/(site)/case-studies/[slug]/page";
import AboutPage from "./app/(site)/about/page";
import CareersPage from "./app/(site)/careers/page";
import ContactPage from "./app/(site)/contact/page";
import PrivacyPage from "./app/(site)/privacy/page";
import TermsPage from "./app/(site)/terms/page";
import NotFoundPage from "./app/not-found";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="solutions/inventory" element={<InventorySolutionPage />} />
        <Route
          path="solutions/translation"
          element={<TranslationSolutionPage />}
        />
        <Route
          path="solutions/rl-advisor"
          element={<RlAdvisorSolutionPage />}
        />
        <Route path="solutions/farmers" element={<FarmersSolutionPage />} />
        <Route
          path="solutions/iot-security"
          element={<IotSecuritySolutionPage />}
        />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="blog" element={<BlogIndexPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
