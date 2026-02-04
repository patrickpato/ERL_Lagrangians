import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "@/components/layout/Container";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/navigation/MobileMenu";
import { navbarLinks, routes, solutions } from "@/lib/routes";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium text-cd-text/90 transition hover:text-cd-text",
      isActive && "text-cd-accent",
    );

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-cd-bg/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link to="/" aria-label="ClearDrop Tech home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-cd-text/90 transition hover:text-cd-text"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solutions
              <span className="text-xs text-cd-muted">▼</span>
            </button>
            {solutionsOpen ? (
              <div
                className="absolute left-0 mt-3 w-80 rounded-2xl border border-white/10 bg-cd-surface p-4 shadow-lg"
                role="menu"
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <div className="grid gap-3">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.slug}
                      to={solution.href}
                      className="rounded-xl border border-transparent p-3 transition hover:border-white/10 hover:bg-white/5"
                      onClick={() => setSolutionsOpen(false)}
                    >
                      <p className="text-sm font-semibold text-cd-text">
                        {solution.title}
                      </p>
                      <p className="text-xs text-cd-muted">
                        {solution.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {navbarLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild className="hidden lg:inline-flex">
            <Link to={routes.contact}>Get a Demo</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-cd-text lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </Container>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
};

export default Navbar;
