import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { navbarLinks, routes, solutions } from "@/lib/routes";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 z-40 bg-black/60"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 z-50 h-full w-80 border-l border-white/10 bg-cd-surface p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-cd-muted">
            Menu
          </p>
          <button
            type="button"
            className="text-sm text-cd-muted"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-4">
          <Link
            to={routes.home}
            className="text-sm font-medium text-cd-text"
            onClick={onClose}
          >
            Home
          </Link>
          <button
            type="button"
            className="flex items-center justify-between text-sm font-medium text-cd-text"
            onClick={() => setSolutionsOpen((value) => !value)}
            aria-expanded={solutionsOpen}
          >
            Solutions
            <span className="text-xs text-cd-muted">▼</span>
          </button>
          {solutionsOpen ? (
            <div className="flex flex-col gap-3 pl-3">
              {solutions.map((solution) => (
                <Link
                  key={solution.slug}
                  to={solution.href}
                  className={cn("text-sm text-cd-muted hover:text-cd-text")}
                  onClick={onClose}
                >
                  {solution.title}
                </Link>
              ))}
            </div>
          ) : null}
          {navbarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-cd-text"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-4">
            <Link to={routes.contact} onClick={onClose}>
              Get a Demo
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
