import type { Company, EducationalModule, GlossaryTerm, NewsItem, Source } from "@/lib/schemas";

export type ContentCollections = {
  companies: readonly Company[];
  glossary: readonly GlossaryTerm[];
  modules: readonly EducationalModule[];
  sources: readonly Source[];
  news: readonly NewsItem[];
};

type CollectionName = "companies" | "glossary" | "modules" | "sources" | "news";

const referenceLabels: Record<CollectionName, string> = {
  companies: "company",
  glossary: "glossary",
  modules: "module",
  sources: "source",
  news: "news",
};

function describeIssue(
  collection: CollectionName,
  record: string,
  field: string,
  value: string,
  issue: string,
) {
  return `[${collection}] record "${record}", field "${field}", value "${value}": ${issue}`;
}

function findDuplicateValues(values: readonly string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return duplicates;
}

function validateUniqueIdentifiers(
  issues: string[],
  collection: CollectionName,
  field: "id" | "slug",
  values: readonly string[],
) {
  for (const value of findDuplicateValues(values)) {
    issues.push(describeIssue(collection, value, field, value, "duplicate identifier"));
  }
}

function validateReferences(
  issues: string[],
  collection: CollectionName,
  record: string,
  field: string,
  values: readonly string[],
  validValues: ReadonlySet<string>,
  targetCollection: CollectionName,
) {
  for (const value of findDuplicateValues(values)) {
    issues.push(describeIssue(collection, record, field, value, "duplicate relationship value"));
  }

  for (const value of values) {
    if (!validValues.has(value)) {
      issues.push(describeIssue(collection, record, field, value, `unknown ${referenceLabels[targetCollection]} reference`));
    }
  }
}

export function validateContentReferences(collections: ContentCollections) {
  const issues: string[] = [];
  const companySlugs = new Set(collections.companies.map((company) => company.slug));
  const glossarySlugs = new Set(collections.glossary.map((term) => term.slug));
  const moduleSlugs = new Set(collections.modules.map((module) => module.slug));
  const sourceIds = new Set(collections.sources.map((source) => source.id));

  validateUniqueIdentifiers(issues, "companies", "slug", collections.companies.map((company) => company.slug));
  validateUniqueIdentifiers(issues, "glossary", "slug", collections.glossary.map((term) => term.slug));
  validateUniqueIdentifiers(issues, "modules", "slug", collections.modules.map((module) => module.slug));
  validateUniqueIdentifiers(issues, "sources", "id", collections.sources.map((source) => source.id));
  validateUniqueIdentifiers(issues, "news", "id", collections.news.map((item) => item.id));

  for (const company of collections.companies) {
    validateReferences(issues, "companies", company.slug, "relatedGlossaryTerms", company.relatedGlossaryTerms, glossarySlugs, "glossary");
    validateReferences(issues, "companies", company.slug, "relatedModules", company.relatedModules, moduleSlugs, "modules");
    validateReferences(issues, "companies", company.slug, "sourceIds", company.sourceIds, sourceIds, "sources");
  }

  for (const term of collections.glossary) {
    validateReferences(issues, "glossary", term.slug, "relatedTerms", term.relatedTerms, glossarySlugs, "glossary");
    validateReferences(issues, "glossary", term.slug, "relatedCompanies", term.relatedCompanies, companySlugs, "companies");
    validateReferences(issues, "glossary", term.slug, "relatedModules", term.relatedModules, moduleSlugs, "modules");
  }

  for (const moduleRecord of collections.modules) {
    validateReferences(issues, "modules", moduleRecord.slug, "glossaryTerms", moduleRecord.glossaryTerms, glossarySlugs, "glossary");
    validateReferences(issues, "modules", moduleRecord.slug, "relatedCompanies", moduleRecord.relatedCompanies, companySlugs, "companies");
    validateReferences(issues, "modules", moduleRecord.slug, "sourceIds", moduleRecord.sourceIds, sourceIds, "sources");
  }

  if (issues.length > 0) {
    throw new Error(`Content referential validation failed:\n- ${issues.join("\n- ")}`);
  }
}
