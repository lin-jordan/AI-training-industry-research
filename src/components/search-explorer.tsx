"use client";

import Link from "next/link";
import { useState } from "react";
import type { SearchItem } from "@/lib/search";

type SearchExplorerProps = {
  items: SearchItem[];
};

const categories = ["All", "Companies", "Glossary", "Foundations", "News"] as const;
type Category = (typeof categories)[number];

export function SearchExplorer({ items }: SearchExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const matches = items.filter((item) => {
    const categoryMatches = category === "All" || item.category === category;
    const haystack = `${item.title} ${item.description} ${item.keywords}`.toLocaleLowerCase();
    return categoryMatches && tokens.every((token) => haystack.includes(token));
  });

  return (
    <section className="search-explorer" aria-labelledby="site-search-title">
      <label id="site-search-title" htmlFor="site-query">Search across the atlas</label>
      <input
        id="site-query"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search companies, concepts, modules, and news"
        autoFocus
        autoComplete="off"
      />
      <div className="filter-row" aria-label="Filter search results">
        {categories.map((option) => (
          <button
            key={option}
            type="button"
            className={category === option ? "is-active" : undefined}
            aria-pressed={category === option}
            onClick={() => setCategory(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">{matches.length} {matches.length === 1 ? "result" : "results"}</p>
      {matches.length > 0 ? (
        <ol className="search-results">
          {matches.map((item) => (
            <li key={item.id}>
              <span className="metadata">{item.category}</span>
              <h2><Link href={item.href}>{item.title}</Link></h2>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">No results</p>
          <h2>Nothing matches that query yet.</h2>
          <p>Remove a filter or try a related lifecycle term.</p>
        </div>
      )}
    </section>
  );
}
