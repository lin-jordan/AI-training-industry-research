import type { MetadataRoute } from "next";
import { companies, glossary } from "@/lib/content";

const baseUrl = "https://ai-training-atlas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/foundations", "/foundations/model-lifecycle", "/glossary", "/companies", "/ecosystem", "/dashboard", "/news", "/search"];
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: "2026-07-12" })),
    ...companies.map((company) => ({ url: `${baseUrl}/companies/${company.slug}`, lastModified: company.lastResearched })),
    ...glossary.map((term) => ({ url: `${baseUrl}/glossary/${term.slug}`, lastModified: "2026-07-12" })),
  ];
}
