import type { Metadata } from "next";
import Link from "next/link";
import { GlossaryTermLink } from "@/components/glossary-term-link";
import { ModuleContent } from "@/components/module-content";
import { PageIntro } from "@/components/page-intro";
import { SourceList } from "@/components/source-list";
import { getModule, getSources, glossary } from "@/lib/content";

const moduleRecord = getModule("model-lifecycle");

function getBlockLabel(block: NonNullable<typeof moduleRecord>["sections"][number]) {
  if (block.type === "paragraph") return block.heading;
  if (block.type === "stage") return block.name.replace(/^\d+\s*·\s*/, "");
  return block.title;
}

export const metadata: Metadata = {
  title: "From pretraining to inference",
  description: "A practical map of the model-development lifecycle and its feedback loops.",
};

export default function ModelLifecyclePage() {
  if (!moduleRecord) return null;
  const relatedTerms = glossary.filter((term) => moduleRecord.glossaryTerms.includes(term.slug));
  const moduleSources = getSources(moduleRecord.sourceIds);
  const navigationItems = moduleRecord.sections.flatMap((block) => {
    const label = getBlockLabel(block);
    return label ? [{ id: block.id, label }] : [];
  });

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
        <ModuleContent module={moduleRecord} sources={moduleSources} />
      </div>
      <section className="section module-sources" aria-labelledby="module-sources-heading">
        <p className="eyebrow">Bibliography</p>
        <h2 id="module-sources-heading">Sources for this module</h2>
        <p className="source-note">Source type describes where the material originated. Evidence status describes how AI Training Atlas uses it to support the educational synthesis.</p>
        <SourceList sources={moduleSources} />
      </section>
      <section className="section related-terms">
        <p className="eyebrow">Related glossary</p>
        <h2>Concepts to open next</h2>
        <div>{relatedTerms.map((term) => <GlossaryTermLink key={term.slug} term={term} />)}</div>
      </section>
    </div>
  );
}
