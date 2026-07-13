import Link from "next/link";
import { CompanyCard } from "@/components/company-card";
import { EcosystemMap } from "@/components/ecosystem-map";
import { LifecycleFlow } from "@/components/lifecycle-flow";
import { SectionHeading } from "@/components/section-heading";
import { companies, glossary, news } from "@/lib/content";

export default function Home() {
  return (
    <div className="page-shell">
      <section className="page-intro home-hero">
        <div>
          <p className="eyebrow">Independent industry field guide · v0.1</p>
          <h1>How AI systems learn after the internet.</h1>
        </div>
        <div className="page-intro__copy">
          <p>AI Training Atlas maps the data, expert work, evaluations, and interactive environments that turn general-purpose models into useful systems.</p>
          <div className="hero-actions">
            <Link className="button-link" href="/foundations/model-lifecycle">Explore the lifecycle</Link>
            <Link className="button-link button-link--secondary" href="/companies">View companies</Link>
          </div>
          <p className="metadata">Last updated · 2026-07-12</p>
        </div>
      </section>

      <div className="hero-index" aria-label="Current research coverage">
        <div><span className="metadata">Profiles</span><strong>3 / 10 planned</strong></div>
        <div><span className="metadata">Glossary</span><strong>12 core terms</strong></div>
        <div><span className="metadata">Modules</span><strong>1 foundation</strong></div>
        <div><span className="metadata">Evidence</span><strong>Claim-labeled</strong></div>
      </div>

      <section className="section">
        <SectionHeading
          eyebrow="01 · Industry foundations"
          title="Training is a lifecycle, not a single event."
          description="A model moves through several distinct systems. Each stage creates different needs for data, judgment, infrastructure, and evaluation."
          action={<Link className="text-link" href="/foundations">Read the foundations <span aria-hidden="true">→</span></Link>}
        />
        <LifecycleFlow />
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="02 · Company landscape"
          title="A market forming around model improvement."
          description="The initial landscape focuses on expert-generated data and agent environments. Profiles distinguish sourced facts from unavailable information."
          action={<Link className="text-link" href="/companies">Browse the directory <span aria-hidden="true">→</span></Link>}
        />
        <div className="company-grid">
          {companies.map((company, index) => <CompanyCard key={company.slug} company={company} index={index + 1} />)}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="03 · Working vocabulary"
          title="Learn the language of the stack."
          description="Twelve concise definitions connect training methods to the companies and lifecycle stages where they matter."
          action={<Link className="text-link" href="/glossary">Search all terms <span aria-hidden="true">→</span></Link>}
        />
        <div className="glossary-preview">
          {glossary.slice(0, 6).map((term) => (
            <Link key={term.slug} href={`/glossary/${term.slug}`}>
              <span>{term.term}</span>
              <small>{term.shortDefinition}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="04 · Ecosystem map"
          title="Clusters, not false precision."
          description="The map groups companies by primary emphasis without implying market share or exact competitive distance."
          action={<Link className="text-link" href="/ecosystem">Open the map <span aria-hidden="true">→</span></Link>}
        />
        <EcosystemMap companies={companies} compact />
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="05 · Research watch"
          title="Signals worth following."
          description="A small curated layer separates consequential developments from the future external feed."
          action={<Link className="text-link" href="/news">View research watch <span aria-hidden="true">→</span></Link>}
        />
        <div className="news-list-preview">
          {news.map((item) => (
            <article key={item.id}>
              <time className="metadata" dateTime={item.date}>{item.date}</time>
              <h3><Link href={`/news#${item.id}`}>{item.headline}</Link></h3>
              <span className="metadata">{item.category}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
