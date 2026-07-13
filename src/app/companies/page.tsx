import type { Metadata } from "next";
import { CompanyCard } from "@/components/company-card";
import { PageIntro } from "@/components/page-intro";
import { companies } from "@/lib/content";
import type { Company } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Company landscape",
  description: "Source-aware profiles of companies across expert data and AI agent environments.",
};

export default function CompaniesPage() {
  const subsectors = companies.reduce<Map<string, Company[]>>((result, company) => {
    const group = result.get(company.subsector) ?? [];
    group.push(company);
    result.set(company.subsector, group);
    return result;
  }, new Map());

  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Company landscape"
        title="The organizations behind better model behavior."
        description="Companies are grouped by primary subsector. Profiles emphasize capabilities, lifecycle roles, source quality, and what remains undisclosed."
        meta={`${companies.length} researched profiles · 10 planned`}
      />
      {Array.from(subsectors.entries()).map(([subsector, groupedCompanies]) => (
        <section className="section" key={subsector}>
          <div className="landscape-heading">
            <div>
              <p className="eyebrow">Subsector</p>
              <h2>{subsector}</h2>
            </div>
            <p>{groupedCompanies.length} {groupedCompanies.length === 1 ? "profile" : "profiles"}</p>
          </div>
          <div className="company-grid">
            {groupedCompanies.map((company, index) => <CompanyCard key={company.slug} company={company} index={index + 1} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
