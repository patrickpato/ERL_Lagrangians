export const siteUrl = "https://cleardroptech.com";

export const routes = {
  home: "/",
  solutions: "/solutions",
  inventory: "/solutions/inventory",
  translation: "/solutions/translation",
  rlAdvisor: "/solutions/rl-advisor",
  farmers: "/solutions/farmers",
  iotSecurity: "/solutions/iot-security",
  industries: "/industries",
  blog: "/blog",
  caseStudies: "/case-studies",
  about: "/about",
  careers: "/careers",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
};

export const solutions = [
  {
    title: "Inventory Intelligence",
    slug: "inventory",
    description: "Real-time inventory visibility for multi-site retail.",
    href: routes.inventory,
  },
  {
    title: "Translation Insights",
    slug: "translation",
    description: "Localization workflows that keep regulated teams aligned.",
    href: routes.translation,
  },
  {
    title: "RL Advisor",
    slug: "rl-advisor",
    description: "Decision intelligence that learns with your operations.",
    href: routes.rlAdvisor,
  },
  {
    title: "Farmers Network",
    slug: "farmers",
    description: "Field data, cooperative finance, and market access tools.",
    href: routes.farmers,
  },
  {
    title: "IoT Security",
    slug: "iot-security",
    description: "Continuous monitoring for distributed device fleets.",
    href: routes.iotSecurity,
  },
];

export const industries = [
  "Retail",
  "Agriculture",
  "Finance",
  "Education",
  "Security",
];

export const sitemapPaths = [
  routes.home,
  routes.solutions,
  routes.inventory,
  routes.translation,
  routes.rlAdvisor,
  routes.farmers,
  routes.iotSecurity,
  routes.industries,
  routes.blog,
  routes.caseStudies,
  routes.about,
  routes.careers,
  routes.contact,
  routes.privacy,
  routes.terms,
];

export const navbarLinks = [
  { label: "Industries", href: routes.industries },
  { label: "Case Studies", href: routes.caseStudies },
  { label: "Blog", href: routes.blog },
  { label: "About", href: routes.about },
  { label: "Careers", href: routes.careers },
  { label: "Contact", href: routes.contact },
];

export const footerLinks = {
  company: [
    { label: "About", href: routes.about },
    { label: "Careers", href: routes.careers },
    { label: "Contact", href: routes.contact },
  ],
  solutions: solutions.map((solution) => ({
    label: solution.title,
    href: solution.href,
  })),
  legal: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms of Service", href: routes.terms },
  ],
};
