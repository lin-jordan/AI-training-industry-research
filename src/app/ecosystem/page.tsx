import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemMap } from "@/components/ecosystem-map";
import { PageIntro } from "@/components/page-intro";
import { companies } from "@/lib/content";
import { activeVersion1Subsectors, countRepresentedSubsectors } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Ecosystem map",
  description: "A qualitative cluster map of the AI training and evaluation ecosystem.",
};

export default function EcosystemPage() {
  const representedSubsectors = countRepresentedSubsectors(companies);

  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Ecosystem map"
        title="A qualitative map of a changing market."
        description="The first map organizes companies by their primary emphasis. It deliberately avoids quantitative placement until comparable evidence exists."
        meta={`${companies.length} companies · ${representedSubsectors} of ${activeVersion1Subsectors.length} active subsectors represented`}
      />
      <section className="section">
        <EcosystemMap companies={companies} />
      </section>
      <section className="map-reading-guide">
        <div><p className="eyebrow">How to read it</p><h2>Region = primary emphasis</h2><p>A company can operate across several lifecycle stages. Its region reflects the clearest current emphasis in public source material.</p></div>
        <div><p className="eyebrow">What it does not show</p><h2>No rank, share, or proximity</h2><p>Node size and distance are decorative layout choices. They do not represent revenue, market share, quality, or competitive similarity.</p></div>
      </section>
      <section className="section map-text-alternative">
        <p className="eyebrow">Text equivalent</p>
        <h2>Companies by region</h2>
        <ul>{companies.map((company) => <li key={company.slug}><Link href={`/companies/${company.slug}`}>{company.name}</Link><span>{company.subsector} · {company.primaryCapability}</span></li>)}</ul>
      </section>
    </div>
  );
}
