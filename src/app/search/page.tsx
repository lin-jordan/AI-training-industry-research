import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SearchExplorer } from "@/components/search-explorer";
import { searchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search companies, glossary terms, educational modules, and research news.",
};

export default function SearchPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Atlas search"
        title="Find a concept, company, or signal."
        description="Search runs entirely in your browser across the project's validated, Git-managed content. No query is sent to an external service."
        meta={`${searchIndex.length} indexed records`}
      />
      <section className="section"><SearchExplorer items={searchIndex} /></section>
    </div>
  );
}
