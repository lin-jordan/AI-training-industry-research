import type { Metadata } from "next";
import { GlossarySearch } from "@/components/glossary-search";
import { PageIntro } from "@/components/page-intro";
import { glossary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Search the core vocabulary of AI training, post-training, evaluation, and inference.",
};

export default function GlossaryPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Glossary"
        title="The vocabulary behind model improvement."
        description="Short definitions establish orientation. Full entries explain why each concept matters and where it appears in practice."
        meta={`${glossary.length} terms · Keyboard and touch accessible`}
      />
      <GlossarySearch terms={glossary} />
    </div>
  );
}
