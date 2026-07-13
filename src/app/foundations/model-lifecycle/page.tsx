import type { Metadata } from "next";
import Link from "next/link";
import { GlossaryTermLink } from "@/components/glossary-term-link";
import { LifecycleFlow } from "@/components/lifecycle-flow";
import { ModuleContent } from "@/components/module-content";
import { PageIntro } from "@/components/page-intro";
import { SourceList } from "@/components/source-list";
import { companies, getModule, getSources, glossary } from "@/lib/content";
import { activeVersion1Subsectors } from "@/lib/taxonomy";

const moduleRecord = getModule("model-lifecycle");

function getBlockLabel(block: NonNullable<typeof moduleRecord>["sections"][number]) {
  if (block.type === "paragraph") return block.heading;
  if (block.type === "stage") return block.name.replace(/^\d+\s*·\s*/, "");
  return block.title;
}

export const metadata: Metadata = {
  title: "From pretraining to agents: how the AI model-development lifecycle fits together",
  description: "A sourced guide to pretraining, post-training, evaluation, inference, and agent operation as one feedback-driven system.",
};

export default function ModelLifecyclePage() {
  if (!moduleRecord) return null;
  const relatedTerms = glossary.filter((term) => moduleRecord.glossaryTerms.includes(term.slug));
  const relatedCompanies = companies.filter((company) => moduleRecord.relatedCompanies.includes(company.slug));
  const moduleSources = getSources(moduleRecord.sourceIds);
  const navigationItems = moduleRecord.sections.flatMap((block) => {
    const label = getBlockLabel(block);
    return label ? [{ id: block.id, label }] : [];
  });
  const supplementalContent = {
    "system-map": <LifecycleFlow />,
    "industry-fit": (
      <nav className="module-category-links" aria-label="Active Version 1 ecosystem categories">
        <ul>
          {activeVersion1Subsectors.map((subsector) => (
            <li key={subsector.slug}>
              <Link href={`/ecosystem#cluster-${subsector.slug}`}>{subsector.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    ),
    "continue-exploring": (
      <div className="module-explore-grid">
        <section aria-labelledby="explore-terms-heading">
          <h3 id="explore-terms-heading">Glossary concepts</h3>
          <div className="module-explore__term-links">
            {relatedTerms.map((term) => <GlossaryTermLink key={term.slug} term={term} />)}
          </div>
        </section>
        <section aria-labelledby="explore-companies-heading">
          <h3 id="explore-companies-heading">Company applications</h3>
          <ul>
            {relatedCompanies.map((company) => (
              <li key={company.slug}><Link href={`/companies/${company.slug}`}>{company.name}</Link></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="explore-evidence-heading">
          <h3 id="explore-evidence-heading">Landscape and evidence</h3>
          <ul>
            <li><Link href="/ecosystem">Explore the ecosystem map</Link></li>
            <li><a href="#module-sources-heading">Review the module bibliography</a></li>
          </ul>
        </section>
      </div>
    ),
  };

  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/foundations">Foundations</Link><span aria-hidden="true">/</span><span aria-current="page">Model lifecycle</span>
      </nav>
      <PageIntro
        eyebrow="Module 01 · Model lifecycle"
        title={moduleRecord.title}
        description={moduleRecord.summary}
        meta={`Last reviewed · ${moduleRecord.lastReviewed}`}
      />
      <div className="module-layout">
        <nav className="module-rail" aria-label="Module navigation">
          <p className="eyebrow">In this module</p>
          <ol>
            {navigationItems.map((item) => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ol>
        </nav>
        <ModuleContent module={moduleRecord} sources={moduleSources} supplementalContent={supplementalContent} />
      </div>
      <section className="section module-sources" aria-labelledby="module-sources-heading">
        <p className="eyebrow">Bibliography</p>
        <h2 id="module-sources-heading">Sources for this module</h2>
        <p className="source-note">Source type describes where the material originated. Evidence status describes how AI Training Atlas uses it to support the educational synthesis.</p>
        <SourceList sources={moduleSources} />
      </section>
    </div>
  );
}
