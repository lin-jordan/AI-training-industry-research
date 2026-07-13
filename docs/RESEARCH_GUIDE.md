# Research Guide

This guide defines how facts enter AI Training Atlas. The goal is traceable evidence, not maximum apparent completeness.

## Non-negotiable rule

Never invent a fact, figure, date, customer, relationship, product, quote, or source. If evidence is missing, leave the field null, omit the claim, or label the uncertainty explicitly.

## Source hierarchy

Use the strongest available source for the claim:

1. Official company pages, filings, technical documentation, announcements, and published datasets.
2. Primary research papers, benchmark repositories, government records, and original documents.
3. Reputable reporting with named sourcing and direct claim support.
4. Credible specialist publications with transparent methodology.
5. Aggregators or social posts only as discovery leads, not final evidence when stronger sources exist.

## Primary and secondary sources

- **Primary sources** establish what an organization says, publishes, or files. They are strongest for identity, product descriptions, official announcements, and technical artifacts.
- **Secondary sources** provide independent context, verification, criticism, or estimates. They are necessary when the claim is about reputation, market response, disputes, or independently reported financial information.
- A primary source proves that a company made a claim; it does not automatically prove the claim is independently true.

## Company marketing claims

- Attribute claims about customers, performance, scale, leadership, uniqueness, or outcomes as `Company stated` unless independently corroborated.
- Remove adjectives such as “leading,” “best,” “frontier-grade,” or “revolutionary” from neutral summaries unless they are necessary quoted context.
- Prefer descriptions of observable capabilities over mission language.
- Do not convert investor backing, customer logos, or marketing copy into undisclosed commercial figures.

## Conflicting sources

1. Record both sources and their publication/review dates.
2. Check whether the conflict reflects a name change, time difference, scope difference, estimate, or correction.
3. Prefer direct and more recent evidence when source quality is otherwise equal.
4. Do not silently choose a convenient value. Omit the field or describe the conflict neutrally.
5. Use `Unverified`, `Potentially stale`, or an attributed `Reported` statement as appropriate.
6. Add the unresolved conflict to `PROJECT_STATE.md` if it affects public interpretation or blocks a milestone.

## Missing information

- Use `null` for supported nullable schema fields.
- Render “Not publicly disclosed” only where showing the absence helps the reader.
- Omit optional detail when an unknown-state label would create noise.
- Never use `0`, “N/A,” a guessed range, or a copied aggregator value as a substitute for missing evidence.

## Evidence labels

The schema defines these exact values:

| Label | Use |
|---|---|
| `Reported` | A reputable secondary source reports the claim. |
| `Company stated` | The company or its official representative makes the claim. |
| `Third-party estimate` | An external party provides an explicit estimate with methodology or attribution. |
| `Projected` | A source describes a forward-looking value or outcome. |
| `Inferred` | The project derives a cautious conclusion from stated evidence; explain the reasoning. |
| `Undisclosed` | The information is relevant but not public. |
| `Unverified` | A claim exists but has not been confirmed to the project's standard. |
| `Potentially stale` | The source may no longer represent current conditions. |

Do not create near-duplicate labels without a schema and documentation decision.

## Claim-to-source workflow

1. Write the smallest specific claim that needs support.
2. Find the most direct source and open the exact supporting page or document.
3. Confirm company identity, publication context, and date.
4. Add or reuse a `Source` record with a unique ID.
5. List the exact supported claim in `supportedClaims`.
6. Assign the correct evidence label and source type.
7. Link the content record through `sourceIds` or the relevant direct URL field.
8. Verify that the rendered source marker lands on the intended source.
9. Run type-check and build so schema failures surface.

One source may support several related claims, but `supportedClaims` should remain specific enough for a reviewer to verify the connection.

## Dates

- Use `YYYY-MM-DD` for `publicationDate`, `reviewedDate`, `lastResearched`, and `lastReviewed`.
- Use `null` when a publication date cannot be confirmed.
- `reviewedDate` records when a researcher last opened and evaluated the source, not when the source was published.
- Update the record's research/review date only after reviewing its evidence, not after formatting-only edits.

## Source-link precision

- Link to the exact announcement, paper, dataset, documentation page, or article whenever possible.
- Avoid homepages, search pages, tracking URLs, copied documents, and link shorteners.
- For PDFs, link to the original publisher and note the page or section in the supported claim when useful.
- Confirm the URL resolves and the linked page still supports the claim.

## Estimates and projections

- Include only when the source, date, unit, scope, and methodology are clear enough to interpret.
- Preserve attribution and use `Third-party estimate` or `Projected`.
- Never present an estimate as a company-disclosed fact.
- Do not average conflicting estimates or create a project estimate unless an approved methodology is documented.
- If comparability across companies is weak, omit the visualization rather than imply precision.

## Company research checklist

- [ ] Verify official brand, legal name when available, domain, and aliases.
- [ ] Confirm the company belongs in the training/post-training/evaluation ecosystem.
- [ ] Assign the primary subsector and lifecycle roles consistently.
- [ ] Describe products and capabilities in neutral language.
- [ ] Verify founded year and headquarters or leave them null.
- [ ] Describe customer types without inventing named customers.
- [ ] Attribute company-stated differentiators.
- [ ] Investigate business model only to the level supported publicly.
- [ ] Record direct sources and supported claims.
- [ ] Set `lastResearched` and an evidence-based data status.
- [ ] Connect relevant glossary terms and modules.
- [ ] Review rendered citations and external links.

## Educational-module research checklist

- [ ] Define the learning objective and assumed reader knowledge.
- [ ] Place the module within the lifecycle.
- [ ] Use accepted technical terminology and define unfamiliar terms.
- [ ] Distinguish simplification from settled fact.
- [ ] Add sources for statistics, disputed claims, historical assertions, and rapidly changing methods.
- [ ] Cross-link glossary terms and relevant companies only when useful.
- [ ] Provide a summary, practical example, and clear stage relationships.
- [ ] Give diagrams captions and text equivalents.
- [ ] Set `lastReviewed` after a substantive review.

## News research checklist

- [ ] Confirm the event and event date, not only the article publication date.
- [ ] Use the exact publisher URL.
- [ ] Separate the factual summary from the project takeaway.
- [ ] Identify whether the source is official, reporting, or research.
- [ ] Avoid repeating promotional framing as fact.
- [ ] Explain why the development changes understanding of the ecosystem.
- [ ] Check for corrections, follow-up reporting, and conflicts.
- [ ] Keep curated stories separate from future external-feed records.

## Review cadence

- Company profiles: review at least quarterly and after material announcements.
- News: verify links and context when added; review curated relevance quarterly.
- Educational modules and glossary: review at least twice per year and after major terminology or method changes.
- Sources marked `Potentially stale`: prioritize in the next research pass.
- Before a tagged release: run a full link, date, evidence-label, and unresolved-conflict review.
