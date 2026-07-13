import type { Metadata } from "next";
import Link from "next/link";
import { GlossaryTermLink } from "@/components/glossary-term-link";
import { ModuleContent } from "@/components/module-content";
import { PageIntro } from "@/components/page-intro";
import { getModule, glossary } from "@/lib/content";

const moduleRecord = getModule("model-lifecycle");

export const metadata: Metadata = {
  title: "From pretraining to inference",
  description: "A practical map of the model-development lifecycle and its feedback loops.",
};

export default function ModelLifecyclePage() {
  if (!moduleRecord) return null;
  const relatedTerms = glossary.filter((term) => moduleRecord.glossaryTerms.includes(term.slug));

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
        <aside className="module-rail" aria-label="Module summary">
          <p className="eyebrow">In this module</p>
          <ol>
            <li>Pretraining</li>
            <li>Post-training</li>
            <li>Evaluation</li>
            <li>Inference</li>
          </ol>
        </aside>
        <ModuleContent module={moduleRecord} />
      </div>
      <section className="section related-terms">
        <p className="eyebrow">Related glossary</p>
        <h2>Concepts to open next</h2>
        <div>{relatedTerms.map((term) => <GlossaryTermLink key={term.slug} term={term} />)}</div>
      </section>
    </div>
  );
}
