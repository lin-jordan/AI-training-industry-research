"use client";

import Link from "next/link";
import { useState } from "react";
import type { GlossaryTerm } from "@/lib/schemas";

type GlossarySearchProps = {
  terms: GlossaryTerm[];
};

export function GlossarySearch({ terms }: GlossarySearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredTerms = terms.filter((term) =>
    [term.term, term.shortDefinition, term.fullDefinition].join(" ").toLocaleLowerCase().includes(normalizedQuery),
  );

  return (
    <section aria-labelledby="glossary-search-title">
      <div className="search-controls">
        <div>
          <label id="glossary-search-title" htmlFor="glossary-query">Search the glossary</label>
          <p>Try “reward,” “environment,” or “training.”</p>
        </div>
        <input
          id="glossary-query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${terms.length} terms`}
          autoComplete="off"
        />
      </div>
      <p className="result-count" aria-live="polite">{filteredTerms.length} {filteredTerms.length === 1 ? "term" : "terms"}</p>
      {filteredTerms.length > 0 ? (
        <div className="glossary-grid">
          {filteredTerms.map((term) => (
            <article className="glossary-card" key={term.slug}>
              <span className="metadata">{term.term.slice(0, 1).toUpperCase()}</span>
              <h2><Link href={`/glossary/${term.slug}`}>{term.term}</Link></h2>
              <p>{term.shortDefinition}</p>
              <Link className="text-link" href={`/glossary/${term.slug}`}>Full definition <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">No matches</p>
          <h2>Try a broader concept.</h2>
          <p>Search checks term names and both short and full definitions.</p>
        </div>
      )}
    </section>
  );
}
