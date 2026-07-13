import Link from "next/link";
import type { Company } from "@/lib/schemas";

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

  return (
    <figure className={`ecosystem-map${compact ? " ecosystem-map--compact" : ""}`}>
      <div className="ecosystem-map__grid">
        {Array.from(groups.entries()).map(([subsector, groupedCompanies]) => (
          <section className="ecosystem-cluster" key={subsector} aria-labelledby={`cluster-${subsector.replaceAll(" ", "-")}`}>
            <div>
              <p className="eyebrow">Subsector</p>
              <h2 id={`cluster-${subsector.replaceAll(" ", "-")}`}>{subsector}</h2>
            </div>
            <div className="ecosystem-nodes">
              {groupedCompanies.map((company) => (
                <Link key={company.slug} href={`/companies/${company.slug}`}>
                  <strong>{company.name}</strong>
                  <span>{company.primaryCapability}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {!compact ? (
          <section className="ecosystem-cluster ecosystem-cluster--empty" aria-labelledby="cluster-future">
            <div>
              <p className="eyebrow">Planned expansion</p>
              <h2 id="cluster-future">Evaluation & specialized data</h2>
            </div>
            <p>Additional profiles will populate these regions after source review.</p>
          </section>
        ) : null}
      </div>
      <figcaption>Placement indicates primary emphasis only. Distance and node size do not represent market share, similarity, or commercial relationships.</figcaption>
    </figure>
  );
}
