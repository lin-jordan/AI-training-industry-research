import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { SourceList } from "@/components/source-list";
import { StatusBadge } from "@/components/status-badge";
import { companies, getCompany, getSources, glossary } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  return company ? { title: company.name, description: company.shortDescription } : {};
}

export default async function CompanyProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const companySources = getSources(company.sourceIds);
  const relatedTerms = glossary.filter((term) => company.relatedGlossaryTerms.includes(term.slug));

  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/companies">Companies</Link><span aria-hidden="true">/</span><span aria-current="page">{company.name}</span>
      </nav>
      <PageIntro
        eyebrow={company.subsector}
        title={company.name}
        description={company.shortDescription}
        meta={`Last researched · ${company.lastResearched}`}
      />

      <div className="profile-summary">
        <div className="profile-summary__narrative">
          <div className="profile-summary__badges">
            <StatusBadge tone={company.dataStatus === "Source-backed overview" ? "blue" : "neutral"}>{company.dataStatus}</StatusBadge>
            <StatusBadge>{companySources[0]?.evidenceLabel ?? "Unverified"}</StatusBadge>
          </div>
          <p>{company.longDescription}<sup><a href="#source-1" aria-label="Source 1">1</a></sup></p>
          <a className="button-link button-link--secondary" href={company.website} target="_blank" rel="noreferrer">Official website <span aria-hidden="true">↗</span></a>
        </div>
        <dl className="profile-facts">
          <div><dt>Official name</dt><dd>{company.officialName}</dd></div>
          <div><dt>Founded</dt><dd>{company.foundedYear ?? "Not publicly disclosed"}</dd></div>
          <div><dt>Headquarters</dt><dd>{company.headquarters ?? "Not publicly disclosed"}</dd></div>
          <div><dt>Primary capability</dt><dd>{company.primaryCapability}</dd></div>
          <div><dt>Business model</dt><dd>{company.businessModel}</dd></div>
        </dl>
      </div>

      <section className="profile-section">
        <div><p className="eyebrow">Products & services</p><h2>What the company provides</h2></div>
        <ul className="profile-list">{company.products.map((product) => <li key={product}>{product}</li>)}</ul>
      </section>
      <section className="profile-section">
        <div><p className="eyebrow">Differentiators</p><h2>How it presents its approach</h2></div>
        <ul className="profile-list">{company.differentiators.map((differentiator) => <li key={differentiator}>{differentiator}</li>)}</ul>
      </section>
      <section className="profile-section">
        <div><p className="eyebrow">Lifecycle role</p><h2>Where it fits</h2></div>
        <div className="profile-tags">{company.lifecycleRoles.map((role) => <span key={role}>{role}</span>)}</div>
      </section>
      <section className="profile-section">
        <div><p className="eyebrow">Target customers</p><h2>Who the work serves</h2></div>
        <ul className="profile-list">{company.customerTypes.map((customer) => <li key={customer}>{customer}</li>)}</ul>
      </section>
      <section className="profile-section">
        <div><p className="eyebrow">Related concepts</p><h2>Continue through the glossary</h2></div>
        <div className="related-link-list"><div>{relatedTerms.map((term) => <Link key={term.slug} href={`/glossary/${term.slug}`}>{term.term} <span aria-hidden="true">→</span></Link>)}</div></div>
      </section>
      <section className="section">
        <p className="eyebrow">Sources</p>
        <h2>Evidence used in this profile</h2>
        <p className="source-note">Company claims are labeled “Company stated.” Third-party reporting is labeled separately and is not treated as confirmation of every company claim.</p>
        <SourceList sources={companySources} />
      </section>
    </div>
  );
}
