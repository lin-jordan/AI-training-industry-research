import { companyRecords } from "@/data/companies";
import { glossaryRecords } from "@/data/glossary";
import { newsRecords } from "@/data/news";
import { sourceRecords } from "@/data/sources";
import { educationalModuleRecords } from "@/content/modules";
import {
  companySchema,
  educationalModuleSchema,
  glossaryTermSchema,
  newsItemSchema,
  sourceSchema,
} from "@/lib/schemas";
import { validateContentReferences } from "@/lib/content-validation";

export const sources = sourceSchema.array().parse(sourceRecords);
export const companies = companySchema.array().parse(companyRecords);
export const glossary = glossaryTermSchema.array().parse(glossaryRecords);
export const news = newsItemSchema.array().parse(newsRecords);
export const educationalModules = educationalModuleSchema.array().parse(educationalModuleRecords);

validateContentReferences({
  companies,
  glossary,
  modules: educationalModules,
  sources,
  news,
});

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug);
}

export function getGlossaryTerm(slug: string) {
  return glossary.find((term) => term.slug === slug);
}

export function getModule(slug: string) {
  return educationalModules.find((module) => module.slug === slug);
}

export function getSources(sourceIds: string[]) {
  return sourceIds.flatMap((sourceId) => {
    const source = sources.find((candidate) => candidate.id === sourceId);
    return source ? [source] : [];
  });
}
