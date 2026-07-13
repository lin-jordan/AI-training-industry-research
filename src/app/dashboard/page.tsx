import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { StatusBadge } from "@/components/status-badge";
import { companies } from "@/lib/content";
import { activeVersion1Subsectors, countRepresentedSubsectors } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Research dashboard",
  description: "A transparent view of current profile coverage and research completeness.",
};

export default function DashboardPage() {
  const sourceBacked = companies.filter((company) => company.dataStatus === "Source-backed overview").length;
  const representedSubsectors = countRepresentedSubsectors(companies);

  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Research dashboard"
        title="Coverage before conclusions."
        description="This early dashboard measures the research project itself—not the market. It shows what has been profiled, where evidence is thin, and what is planned next."
        meta="Repository-derived metrics · No market estimates"
      />
      <section className="metric-grid" aria-label="Research coverage metrics">
        <article><span className="metadata">Profile coverage</span><strong>{companies.length}<span>/10</span></strong><p>Version 1 companies researched</p></article>
        <article>
          <span className="metadata">Subsector coverage</span>
          <strong>
            {representedSubsectors}<span> of {activeVersion1Subsectors.length} active subsectors represented</span>
          </strong>
          <p>Active Version 1 taxonomy</p>
        </article>
        <article><span className="metadata">Source-backed</span><strong>{sourceBacked}<span>/{companies.length}</span></strong><p>Profiles at the strongest current status</p></article>
        <article><span className="metadata">Last review</span><strong className="metric-date">12<span>Jul 2026</span></strong><p>Most recent research pass</p></article>
      </section>
      <section className="section dashboard-table-wrap">
        <div className="landscape-heading">
          <div><p className="eyebrow">Profile register</p><h2>Research completeness</h2></div>
          <p>Derived from structured content</p>
        </div>
        <table>
          <caption>Current company profile research status and publicly available identity fields.</caption>
          <thead><tr><th scope="col">Company</th><th scope="col">Subsector</th><th scope="col">Status</th><th scope="col">Founded</th><th scope="col">Reviewed</th></tr></thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.slug}>
                <th scope="row"><Link href={`/companies/${company.slug}`}>{company.name}</Link></th>
                <td>{company.subsector}</td>
                <td><StatusBadge tone={company.dataStatus === "Source-backed overview" ? "blue" : "neutral"}>{company.dataStatus}</StatusBadge></td>
                <td>{company.foundedYear ?? "Undisclosed"}</td>
                <td>{company.lastResearched}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <aside className="dashboard-caveat">
        <p className="eyebrow">Interpretation note</p>
        <h2>Completeness is not company quality.</h2>
        <p>A lower status means less structured public evidence has been captured in this project. It is not a rating of the company, its products, or its market position.</p>
      </aside>
    </div>
  );
}
