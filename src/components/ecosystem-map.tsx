import Link from "next/link";
import type { Company } from "@/lib/schemas";
import { activeVersion1Subsectors } from "@/lib/taxonomy";

type EcosystemMapProps = {
  companies: Company[];
  compact?: boolean;
};

export function EcosystemMap({ companies, compact = false }: EcosystemMapProps) {
  const groups = companies.reduce<Map<string, Company[]>>((result, company) => {
    const group = result.get(company.subsector) ?? [];
    group.push(company);
    result.set(company.subsector, group);
    return result;
  }, new Map());
  const subsectors = activeVersion1Subsectors
    .map((subsector) => ({ ...subsector, companies: groups.get(subsector.name) ?? [] }))
    .filter((subsector) => !compact || subsector.companies.length > 0);

  return (
    <figure className={`ecosystem-map${compact ? " ecosystem-map--compact" : ""}`}>
      <div className="ecosystem-map__grid">
        {subsectors.map((subsector) => (
          <section
            className={`ecosystem-cluster${subsector.companies.length === 0 ? " ecosystem-cluster--empty" : ""}`}
            key={subsector.slug}
            aria-labelledby={`cluster-${subsector.slug}`}
          >
            <div>
              <p className="eyebrow">Active subsector</p>
              <h2 id={`cluster-${subsector.slug}`}>{subsector.name}</h2>
            </div>
            {subsector.companies.length > 0 ? (
              <div className="ecosystem-nodes">
                {subsector.companies.map((company) => (
                  <Link key={company.slug} href={`/companies/${company.slug}`}>
                    <strong>{company.name}</strong>
                    <span>{company.primaryCapability}</span>
                  </Link>
                ))}
              </div>
            ) : <p>Additional profiles will populate this category after source review.</p>}
          </section>
        ))}
      </div>
      <figcaption>Placement indicates primary emphasis only. Distance and node size do not represent market share, similarity, or commercial relationships.</figcaption>
    </figure>
  );
}
