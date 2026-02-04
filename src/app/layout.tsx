import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

const AppLayout = () => {
  return (
    <div id="site-top" className="min-h-screen bg-cd-bg text-cd-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cd-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <ErrorBoundary>
        <main id="main-content" className="pt-20">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default AppLayout;
