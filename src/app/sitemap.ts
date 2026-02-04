import { siteUrl, sitemapPaths } from "@/lib/routes";

export const buildSitemapXml = () => {
  const urls = sitemapPaths
    .map((path) => {
      return `<url><loc>${siteUrl}${path}</loc></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;
};
