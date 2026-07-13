import type { Metadata } from "next";
import Link from "next/link";
import { LifecycleFlow } from "@/components/lifecycle-flow";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { educationalModules } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industry foundations",
  description: "Understand the model-development lifecycle from pretraining through inference.",
};

export default function FoundationsPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Industry foundations"
        title="A field guide to how models improve."
        description="Start with the lifecycle. Each module links technical ideas to the data, people, and infrastructure required to make them work."
        meta="1 module · Last reviewed 2026-07-12"
      />
      <section className="section">
        <SectionHeading
          eyebrow="Lifecycle overview"
          title="Four stages, one feedback loop."
          description="These categories simplify a complicated process, but they provide a stable map for understanding where companies and methods fit."
        />
        <LifecycleFlow />
      </section>
      <section className="section">
        <SectionHeading eyebrow="Modules" title="Begin with the system, then zoom in." />
        <div className="module-index">
          {educationalModules.map((module) => (
            <article key={module.slug}>
              <span className="metadata">Module {String(module.order).padStart(2, "0")}</span>
              <h2>{module.title}</h2>
              <p>{module.summary}</p>
              <div className="module-index__footer">
                <span className="metadata">{module.glossaryTerms.length} connected terms</span>
                <Link className="button-link" href={`/foundations/${module.slug}`}>Read module</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
