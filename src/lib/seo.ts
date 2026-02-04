import { siteUrl } from "@/lib/routes";
import { useEffect } from "react";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
};

const defaultSeo = {
  title: "ClearDrop Tech",
  description:
    "ClearDrop Tech builds resilient, data-driven technology for critical operations.",
  image: "/og-default.svg",
};

const buildTitle = (title?: string) => {
  if (!title) return defaultSeo.title;
  return `${title} | ClearDrop Tech`;
};

const setMetaTag = (key: string, value: string, attribute: "name" | "property") => {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
};

const setLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const SEO = ({ title, description, image, path, noIndex }: SeoProps) => {
  const resolvedTitle = buildTitle(title);
  const resolvedDescription = description ?? defaultSeo.description;
  const resolvedImage = image ?? defaultSeo.image;
  const resolvedUrl = path ? `${siteUrl}${path}` : siteUrl;

  useEffect(() => {
    document.title = resolvedTitle;
    setMetaTag("description", resolvedDescription, "name");
    setMetaTag("robots", noIndex ? "noindex, nofollow" : "index, follow", "name");
    setMetaTag("og:title", resolvedTitle, "property");
    setMetaTag("og:description", resolvedDescription, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:image", resolvedImage, "property");
    setMetaTag("og:url", resolvedUrl, "property");
    setMetaTag("twitter:card", "summary_large_image", "name");
    setMetaTag("twitter:title", resolvedTitle, "name");
    setMetaTag("twitter:description", resolvedDescription, "name");
    setMetaTag("twitter:image", resolvedImage, "name");
    setLinkTag("canonical", resolvedUrl);
  }, [resolvedTitle, resolvedDescription, resolvedImage, resolvedUrl, noIndex]);

  return null;
};

export default SEO;
