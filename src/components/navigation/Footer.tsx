import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Logo from "@/components/brand/Logo";
import { footerLinks, routes } from "@/lib/routes";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-cd-bg">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Link to={routes.home} aria-label="ClearDrop Tech home">
            <Logo />
          </Link>
          <p className="body">
            ClearDrop Tech builds resilient digital infrastructure for teams
            navigating complex operations across East Africa.
          </p>
          <div className="flex gap-4 text-sm text-cd-muted">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              X (Twitter)
            </a>
            <a href="mailto:hello@cleardroptech.com">Email</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-cd-text">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-cd-muted">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-cd-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cd-text">Solutions</p>
          <ul className="mt-4 space-y-2 text-sm text-cd-muted">
            {footerLinks.solutions.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-cd-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cd-text">Legal</p>
          <ul className="mt-4 space-y-2 text-sm text-cd-muted">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-cd-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#site-top"
            className="mt-6 inline-flex text-sm text-cd-accent hover:underline"
          >
            Back to top
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10 py-6 text-center text-xs text-cd-muted">
        © 2025 ClearDrop Tech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
