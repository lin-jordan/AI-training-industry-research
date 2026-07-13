import Link from "next/link";
import type { GlossaryTerm } from "@/lib/schemas";

type GlossaryTermLinkProps = {
  term: GlossaryTerm;
};

export function GlossaryTermLink({ term }: GlossaryTermLinkProps) {
  return (
    <span className="term-link">
      <Link href={`/glossary/${term.slug}`} aria-describedby={`definition-${term.slug}`}>{term.term}</Link>
      <span className="term-link__definition" id={`definition-${term.slug}`} role="tooltip">{term.shortDefinition}</span>
    </span>
  );
}
