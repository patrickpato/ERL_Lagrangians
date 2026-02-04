ClearDrop Tech Website (React)

Production-ready, fully navigable marketing website for ClearDrop Tech, built
with React, TypeScript, Tailwind CSS, and MDX.

Quick Start

Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

Installation

```bash
npm install
```

Development

```bash
npm run dev
```

Open http://localhost:5173 to view the site.

Build and Production

```bash
npm run build
npm run preview
```

Testing

```bash
npm run test:e2e
npm run test:e2e:ui
```

Project Structure

```
Clear-Drop-Tech/
  src/
    app/                      App layout and route-level pages
      (site)/                 Main site pages
    components/               UI and marketing components
    content/                  MDX content
    lib/                      Utilities and route registry
  public/                     Static assets
  tests/e2e/                  Playwright tests
  vite.config.ts              Vite configuration
  tailwind.config.ts          Tailwind configuration
  tsconfig.json               TypeScript configuration
  playwright.config.ts        Playwright configuration
  package.json
```

Environment Variables

Create a .env.local file:

```
PLAUSIBLE_DOMAIN=cleardroptech.com
NEXT_PUBLIC_GA_ID=
CONTACT_WEBHOOK_URL=
```

Notes
- All non-provided content is marked with TODO comments.
- Update sitemap.xml and robots.txt when adding new routes.
- Have legal counsel review privacy and terms pages before production.
