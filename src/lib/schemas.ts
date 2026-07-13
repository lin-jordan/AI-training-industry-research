import { z } from "zod";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const evidenceLabelSchema = z.enum([
  "Reported",
  "Company stated",
  "Third-party estimate",
  "Projected",
  "Inferred",
  "Undisclosed",
  "Unverified",
  "Potentially stale",
]);

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.url(),
  publicationDate: dateSchema.nullable(),
  reviewedDate: dateSchema,
  sourceType: z.enum(["official", "primary", "reporting", "research"]),
  supportedClaims: z.array(z.string().min(1)).min(1),
  evidenceLabel: evidenceLabelSchema,
});

export const companySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  officialName: z.string().min(1),
  aliases: z.array(z.string()),
  website: z.url(),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  foundedYear: z.number().int().min(1900).max(2100).nullable(),
  headquarters: z.string().nullable(),
  subsector: z.enum([
    "Expert data platforms",
    "RL environment providers",
    "Evaluation platforms",
    "Specialized data providers",
  ]),
  primaryCapability: z.string().min(1),
  products: z.array(z.string().min(1)).min(1),
  customerTypes: z.array(z.string().min(1)).min(1),
  businessModel: z.string().min(1),
  differentiators: z.array(z.string().min(1)).min(1),
  lifecycleRoles: z.array(z.string().min(1)).min(1),
  relatedGlossaryTerms: z.array(z.string()),
  relatedModules: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
  lastResearched: dateSchema,
  dataStatus: z.enum(["Source-backed overview", "Partial public data", "Early-stage public data"]),
});

export const glossaryTermSchema = z.object({
  slug: z.string().min(1),
  term: z.string().min(1),
  shortDefinition: z.string().min(1),
  fullDefinition: z.string().min(1),
  whyItMatters: z.string().min(1),
  example: z.string().min(1),
  relatedTerms: z.array(z.string()),
  relatedCompanies: z.array(z.string()),
  relatedModules: z.array(z.string()),
});

export const newsItemSchema = z.object({
  id: z.string().min(1),
  headline: z.string().min(1),
  date: dateSchema,
  dateLabel: z.string().min(1),
  companyOrTopic: z.string().min(1),
  category: z.enum(["Benchmark", "Company development", "Research direction"]),
  summary: z.string().min(1),
  takeaway: z.string().min(1),
  publisher: z.string().min(1),
  url: z.url(),
  featured: z.boolean(),
  sourceType: z.enum(["official", "reporting", "research"]),
});

const contentBlockMetadata = {
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sourceIds: z.array(z.string().min(1)).optional(),
};

const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({ ...contentBlockMetadata, type: z.literal("paragraph"), heading: z.string().optional(), body: z.string().min(1) }),
  z.object({ ...contentBlockMetadata, type: z.literal("callout"), title: z.string().min(1), body: z.string().min(1) }),
  z.object({
    ...contentBlockMetadata,
    type: z.literal("stage"),
    name: z.string().min(1),
    summary: z.string().min(1),
    inputs: z.array(z.string().min(1)),
    outputs: z.array(z.string().min(1)),
  }),
  z.object({ ...contentBlockMetadata, type: z.literal("details"), title: z.string().min(1), body: z.string().min(1) }),
]);

export const educationalModuleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  order: z.number().int().positive(),
  glossaryTerms: z.array(z.string()),
  relatedCompanies: z.array(z.string()),
  sections: z.array(contentBlockSchema).min(1),
  sourceIds: z.array(z.string()),
  lastReviewed: dateSchema,
});

export type Source = z.infer<typeof sourceSchema>;
export type Company = z.infer<typeof companySchema>;
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;
export type NewsItem = z.infer<typeof newsItemSchema>;
export type EducationalModule = z.infer<typeof educationalModuleSchema>;
export type EvidenceLabel = z.infer<typeof evidenceLabelSchema>;
