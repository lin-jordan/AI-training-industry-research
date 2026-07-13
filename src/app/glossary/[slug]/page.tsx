import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { getGlossaryTerm, glossary } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return glossary.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  return term ? { title: term.term, description: term.shortDefinition } : {};
}

export default async function GlossaryEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const relatedTerms = glossary.filter((candidate) => term.relatedTerms.includes(candidate.slug));

  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/glossary">Glossary</Link><span aria-hidden="true">/</span><span aria-current="page">{term.term}</span>
      </nav>
      <PageIntro eyebrow="Glossary entry" title={term.term} description={term.shortDefinition} />
      <article className="definition-layout">
        <section>
          <p className="eyebrow">Definition</p>
          <h2>What it means</h2>
          <p>{term.fullDefinition}</p>
        </section>
        <section>
          <p className="eyebrow">Why it matters</p>
          <h2>Role in the system</h2>
          <p>{term.whyItMatters}</p>
        </section>
        <section>
          <p className="eyebrow">Example</p>
          <h2>In practice</h2>
          <p>{term.example}</p>
        </section>
      </article>
      {relatedTerms.length > 0 ? (
        <section className="section related-link-list">
          <p className="eyebrow">Related terms</p>
          <div>{relatedTerms.map((candidate) => <Link key={candidate.slug} href={`/glossary/${candidate.slug}`}>{candidate.term} <span aria-hidden="true">→</span></Link>)}</div>
        </section>
      ) : null}
    </div>
  );
}
