import Link from "next/link";
import type { Company } from "@/lib/schemas";
import { StatusBadge } from "@/components/status-badge";

type CompanyCardProps = {
  company: Company;
  index?: number;
};

export function CompanyCard({ company, index }: CompanyCardProps) {
  return (
    <article className="company-card">
      <div className="company-card__topline">
        <span className="metadata">{index ? String(index).padStart(2, "0") : company.subsector}</span>
        <StatusBadge tone={company.dataStatus === "Source-backed overview" ? "blue" : "neutral"}>
          {company.dataStatus}
        </StatusBadge>
      </div>
      <div>
        <h3><Link href={`/companies/${company.slug}`}>{company.name}</Link></h3>
        <p>{company.shortDescription}</p>
      </div>
      <dl className="mini-spec">
        <div>
          <dt>Subsector</dt>
          <dd>{company.subsector}</dd>
        </div>
        <div>
          <dt>Primary capability</dt>
          <dd>{company.primaryCapability}</dd>
        </div>
      </dl>
      <Link className="text-link" href={`/companies/${company.slug}`} aria-label={`Read the ${company.name} company profile`}>
        View profile <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
