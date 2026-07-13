import { companies, educationalModules, glossary, news } from "@/lib/content";
import type { EducationalModule } from "@/lib/schemas";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: "Companies" | "Glossary" | "Foundations" | "News";
  href: string;
  keywords: string;
};

function getVisibleBlockText(block: EducationalModule["sections"][number]) {
  if (block.type === "paragraph") return [block.heading, block.body];
  if (block.type === "callout" || block.type === "details") return [block.title, block.body];
  return [block.name, block.summary, ...block.inputs, ...block.outputs];
}

export const searchIndex: SearchItem[] = [
  ...companies.map((company) => ({
    id: `company-${company.slug}`,
    title: company.name,
    description: company.shortDescription,
    category: "Companies" as const,
    href: `/companies/${company.slug}`,
    keywords: [company.name, ...company.aliases, company.subsector, company.primaryCapability, ...company.lifecycleRoles].join(" "),
  })),
  ...glossary.map((term) => ({
    id: `term-${term.slug}`,
    title: term.term,
    description: term.shortDefinition,
    category: "Glossary" as const,
    href: `/glossary/${term.slug}`,
    keywords: [term.term, term.fullDefinition, term.whyItMatters].join(" "),
  })),
  ...educationalModules.map((module) => ({
    id: `module-${module.slug}`,
    title: module.title,
    description: module.summary,
    category: "Foundations" as const,
    href: `/foundations/${module.slug}`,
    keywords: [
      module.title,
      module.summary,
      ...module.glossaryTerms,
      ...module.sections.flatMap(getVisibleBlockText),
    ].filter(Boolean).join(" "),
  })),
  ...news.map((item) => ({
    id: `news-${item.id}`,
    title: item.headline,
    description: item.summary,
    category: "News" as const,
    href: `/news#${item.id}`,
    keywords: [item.headline, item.companyOrTopic, item.category, item.takeaway].join(" "),
  })),
];
