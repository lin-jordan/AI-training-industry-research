import type { Metadata } from "next";
import { NewsCard } from "@/components/news-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { news } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research watch",
  description: "Curated developments in AI training data, evaluation, and agent environments.",
};

export default function NewsPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Research watch"
        title="Developments that change the map."
        description="Curated stories prioritize research implications over volume. Official sources and independent reporting remain visibly distinct."
        meta="3 curated records · Reviewed 2026-07-12"
      />
      <section className="section">
        <SectionHeading eyebrow="Curated major stories" title="Selected for structural relevance." description="Each record includes the development and a short explanation of why it matters to this research landscape." />
        <div className="news-grid">{news.map((item) => <NewsCard key={item.id} item={item} />)}</div>
      </section>
      <section className="external-feed">
        <div><p className="eyebrow">External feed</p><h2>Ingestion intentionally inactive.</h2></div>
        <div><StatusBadge tone="amber">Planned milestone</StatusBadge><p>A future RSS pipeline will be separated from editorial selections, retain publisher links, and fail gracefully when feeds are unavailable.</p></div>
      </section>
    </div>
  );
}
