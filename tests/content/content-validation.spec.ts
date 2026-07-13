import { expect, test } from "@playwright/test";
import { educationalModuleRecords } from "../../src/content/modules";
import { companyRecords } from "../../src/data/companies";
import { glossaryRecords } from "../../src/data/glossary";
import { newsRecords } from "../../src/data/news";
import { sourceRecords } from "../../src/data/sources";
import { type ContentCollections, validateContentReferences } from "../../src/lib/content-validation";
import type { Company, EducationalModule, GlossaryTerm } from "../../src/lib/schemas";

const validCollections: ContentCollections = {
  companies: companyRecords,
  glossary: glossaryRecords,
  modules: educationalModuleRecords,
  sources: sourceRecords,
  news: newsRecords,
};

test("accepts the current content relationships", () => {
  expect(() => validateContentReferences(validCollections)).not.toThrow();
});

test("reports duplicate identifiers for every collection", () => {
  const duplicateCases: Array<{ collections: ContentCollections; message: string }> = [
    {
      collections: { ...validCollections, companies: [...validCollections.companies, validCollections.companies[0]] },
      message: '[companies] record "mercor", field "slug", value "mercor": duplicate identifier',
    },
    {
      collections: { ...validCollections, glossary: [...validCollections.glossary, validCollections.glossary[0]] },
      message: '[glossary] record "pretraining", field "slug", value "pretraining": duplicate identifier',
    },
    {
      collections: { ...validCollections, modules: [...validCollections.modules, validCollections.modules[0]] },
      message: '[modules] record "model-lifecycle", field "slug", value "model-lifecycle": duplicate identifier',
    },
    {
      collections: { ...validCollections, sources: [...validCollections.sources, validCollections.sources[0]] },
      message: '[sources] record "mercor-research", field "id", value "mercor-research": duplicate identifier',
    },
    {
      collections: { ...validCollections, news: [...validCollections.news, validCollections.news[0]] },
      message: '[news] record "mercor-apex", field "id", value "mercor-apex": duplicate identifier',
    },
  ];

  for (const duplicateCase of duplicateCases) {
    expect(() => validateContentReferences(duplicateCase.collections)).toThrow(duplicateCase.message);
  }
});

test("reports unknown glossary, company, module, and source references", () => {
  const companyWithUnknownGlossary: Company = {
    ...validCollections.companies[0],
    relatedGlossaryTerms: [...validCollections.companies[0].relatedGlossaryTerms, "missing-term"],
  };
  const termWithUnknownCompany: GlossaryTerm = {
    ...validCollections.glossary[0],
    relatedCompanies: ["missing-company"],
  };
  const termWithUnknownModule: GlossaryTerm = {
    ...validCollections.glossary[0],
    relatedModules: ["missing-module"],
  };
  const companyWithUnknownSource: Company = {
    ...validCollections.companies[0],
    sourceIds: ["missing-source"],
  };
  const moduleWithUnknownSource: EducationalModule = {
    ...validCollections.modules[0],
    sourceIds: ["missing-source"],
  };

  expect(() => validateContentReferences({
    ...validCollections,
    companies: [companyWithUnknownGlossary, ...validCollections.companies.slice(1)],
  })).toThrow('[companies] record "mercor", field "relatedGlossaryTerms", value "missing-term": unknown glossary reference');

  expect(() => validateContentReferences({
    ...validCollections,
    glossary: [termWithUnknownCompany, ...validCollections.glossary.slice(1)],
  })).toThrow('[glossary] record "pretraining", field "relatedCompanies", value "missing-company": unknown company reference');

  expect(() => validateContentReferences({
    ...validCollections,
    glossary: [termWithUnknownModule, ...validCollections.glossary.slice(1)],
  })).toThrow('[glossary] record "pretraining", field "relatedModules", value "missing-module": unknown module reference');

  expect(() => validateContentReferences({
    ...validCollections,
    companies: [companyWithUnknownSource, ...validCollections.companies.slice(1)],
  })).toThrow('[companies] record "mercor", field "sourceIds", value "missing-source": unknown source reference');

  expect(() => validateContentReferences({
    ...validCollections,
    modules: [moduleWithUnknownSource],
  })).toThrow('[modules] record "model-lifecycle", field "sourceIds", value "missing-source": unknown source reference');
});

test("reports duplicate relationship values", () => {
  const duplicateTerm = validCollections.companies[0].relatedGlossaryTerms[0];
  const invalidCompany: Company = {
    ...validCollections.companies[0],
    relatedGlossaryTerms: [...validCollections.companies[0].relatedGlossaryTerms, duplicateTerm],
  };

  expect(() => validateContentReferences({
    ...validCollections,
    companies: [invalidCompany, ...validCollections.companies.slice(1)],
  })).toThrow(`[companies] record "mercor", field "relatedGlossaryTerms", value "${duplicateTerm}": duplicate relationship value`);
});

test("allows blocks without source mappings", () => {
  expect(validCollections.modules[0].sections.some((block) => block.sourceIds === undefined)).toBeTruthy();
  expect(() => validateContentReferences(validCollections)).not.toThrow();
});

test("reports duplicate educational block identifiers", () => {
  const moduleRecord = validCollections.modules[0];
  const duplicateBlockId = moduleRecord.sections[0].id;
  const invalidModule: EducationalModule = {
    ...moduleRecord,
    sections: moduleRecord.sections.map((block, index) => (
      index === 1 ? { ...block, id: duplicateBlockId } : block
    )),
  };

  expect(() => validateContentReferences({ ...validCollections, modules: [invalidModule] })).toThrow(
    `[modules] module "model-lifecycle", block "${duplicateBlockId}", field "id", value "${duplicateBlockId}": duplicate block identifier`,
  );
});

test("reports unknown educational block source references", () => {
  const moduleRecord = validCollections.modules[0];
  const invalidModule: EducationalModule = {
    ...moduleRecord,
    sections: moduleRecord.sections.map((block) => (
      block.id === "pretraining" ? { ...block, sourceIds: ["missing-source"] } : block
    )),
  };

  expect(() => validateContentReferences({ ...validCollections, modules: [invalidModule] })).toThrow(
    '[modules] module "model-lifecycle", block "pretraining", field "sourceIds", value "missing-source": unknown source reference',
  );
});

test("reports duplicate educational block source mappings", () => {
  const moduleRecord = validCollections.modules[0];
  const duplicateSourceId = moduleRecord.sourceIds[0];
  const invalidModule: EducationalModule = {
    ...moduleRecord,
    sections: moduleRecord.sections.map((block) => (
      block.id === "pretraining" ? { ...block, sourceIds: [duplicateSourceId, duplicateSourceId] } : block
    )),
  };

  expect(() => validateContentReferences({ ...validCollections, modules: [invalidModule] })).toThrow(
    `[modules] module "model-lifecycle", block "pretraining", field "sourceIds", value "${duplicateSourceId}": duplicate relationship value`,
  );
});

test("requires cited sources to be present in the module bibliography", () => {
  const moduleRecord = validCollections.modules[0];
  const sourceOutsideBibliography = "mercor-research";
  const invalidModule: EducationalModule = {
    ...moduleRecord,
    sections: moduleRecord.sections.map((block) => (
      block.id === "pretraining" ? { ...block, sourceIds: [sourceOutsideBibliography] } : block
    )),
  };

  expect(() => validateContentReferences({ ...validCollections, modules: [invalidModule] })).toThrow(
    `[modules] module "model-lifecycle", block "pretraining", field "sourceIds", value "${sourceOutsideBibliography}": source is not present in the parent module bibliography`,
  );
});
