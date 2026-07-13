# Project Blueprint

AI Training Atlas is a public, research-driven field guide to the data, expert work, evaluations, and environments used to improve AI models. This blueprint is the canonical summary of the product and its architecture.

## Product vision

Build an interactive research platform that makes the AI training ecosystem understandable without flattening its complexity or overstating uncertain evidence. The project should demonstrate disciplined industry research, clear information architecture, and a polished public web experience.

## Audience

- Primary: readers who understand basic AI concepts but are new to the training-data and post-training industry.
- Secondary: AI professionals seeking a structured overview.
- Portfolio: recruiters and collaborators assessing the quality of the research and implementation.

## User problem

Information about model training is fragmented across technical papers, company marketing, benchmark releases, and news. Terminology is inconsistent, companies span multiple lifecycle stages, and commercial facts are often private. Readers need a system that connects concepts, organizations, and evidence while preserving uncertainty.

## Product principles

1. Explain the model-development system before cataloging companies.
2. Organize educational content by lifecycle and companies by primary subsector.
3. Prefer primary sources and identify company-stated claims.
4. Make missing, stale, estimated, and conflicting information visible.
5. Use interaction to improve orientation, not as decoration.
6. Keep Version 1 content editable, reviewable, and validated in Git.
7. Treat accessibility and responsive behavior as release requirements.

## Current information architecture

| Area | Route | Purpose |
|---|---|---|
| Home | `/` | Introduces the project, lifecycle, companies, glossary, map, and news. |
| Foundations | `/foundations` | Index for educational modules. |
| Lifecycle module | `/foundations/model-lifecycle` | Explains pretraining, post-training, evaluation, and inference. |
| Glossary | `/glossary` and `/glossary/[slug]` | Searches and explains core concepts. |
| Companies | `/companies` and `/companies/[slug]` | Groups profiles by subsector and presents sourced company detail. |
| Ecosystem | `/ecosystem` | Shows a qualitative cluster map with a text equivalent. |
| Dashboard | `/dashboard` | Reports research coverage rather than unsupported market metrics. |
| News | `/news` | Separates curated developments from a future external feed. |
| Search | `/search` | Searches companies, glossary terms, modules, and news locally. |

## Educational organization

Foundations follow the model-development lifecycle:

```text
Pretraining → Post-training → Evaluation → Inference
      ↑                                      │
      └──── production and evaluation feedback ────┘
```

Future modules should deepen individual stages and cross-link to glossary terms and relevant companies. The lifecycle is a teaching model, not a claim that real development work is strictly linear.

## Company organization

Companies are assigned a primary subsector for navigation while retaining multiple lifecycle roles. The current schema supports:

- Expert data platforms
- RL environment providers
- Evaluation platforms
- Specialized data providers

Subsector placement indicates emphasis only. It does not imply market share, quality, or exclusive participation in that category.

## Current architecture

- Next.js 16 App Router and React 19.
- TypeScript throughout the application and content model.
- React Server Components by default; Client Components are limited to navigation state and search interactions.
- Static generation for content-heavy pages; dynamic company and glossary routes use `generateStaticParams`.
- Tailwind CSS 4 plus editorial design tokens in `src/app/globals.css`.
- Zod validates all structured collections during development and builds.
- Client-side search uses a build-time index; no hosted search service is required.
- Playwright and axe cover route behavior, responsive overflow, interactions, and representative accessibility checks.
- Vercel-compatible deployment with no required environment variables in Version 1.

## Content architecture

- `src/data/companies.ts`: company records.
- `src/data/glossary.ts`: glossary entries.
- `src/data/news.ts`: curated news records.
- `src/data/sources.ts`: reusable source metadata and evidence labels.
- `src/content/modules.ts`: typed educational content blocks.
- `src/lib/schemas.ts`: canonical data contracts.
- `src/lib/content.ts`: parsing and lookup helpers.
- `src/lib/search.ts`: unified local search index.

Content is intentionally separated from presentation. A future CMS or ingestion system may replace the storage layer only if it preserves validation, review history, source precision, and static fallbacks.

## Research and citation principles

- Prefer official company sources and primary research; use reputable reporting for independent context.
- Attach company-specific and time-sensitive claims to source records.
- Distinguish `Company stated` from `Reported`, estimates, inferences, and other evidence states.
- Record publication dates when known and review dates for every source.
- Use precise links that support the cited claim, not a generic domain when a direct page exists.
- Leave information null, undisclosed, or unverified when evidence is insufficient.
- Never invent figures, relationships, dates, customers, or company attributes.

Detailed operating rules live in [RESEARCH_GUIDE.md](RESEARCH_GUIDE.md).

## Visual principles

The interface should resemble a contemporary research report: warm off-white surfaces, dark editorial typography, restrained blue and amber accents, compact metadata, thin rules, and grid-aligned panels. Visualizations require captions and must explain what encodings do and do not mean. Avoid generic SaaS styling, ornamental gradients, glass effects, and unsupported precision.

[VISUAL_DIRECTION.md](VISUAL_DIRECTION.md) is authoritative for typography, color, layout, cards, tables, diagrams, and interaction design.

## Accessibility requirements

- Semantic landmarks, headings, tables, lists, and controls.
- Keyboard-accessible navigation, search, disclosures, and map nodes.
- Visible focus states and adequate color contrast.
- Touch-compatible alternatives to hover interactions.
- Captions and text equivalents for diagrams.
- Reduced-motion support.
- Descriptive links, clear empty states, and honest missing-data states.
- Desktop and mobile validation before release.

## Version 1 scope

Version 1 should establish a credible, maintainable field guide with:

- Lifecycle-oriented educational modules and an integrated glossary.
- Ten researched company profiles across relevant subsectors.
- Source-backed company and news claims with visible uncertainty.
- A qualitative ecosystem map and evidence-backed coverage dashboards.
- Curated news and a clearly separated, resilient external feed.
- Local search, responsive design, accessibility, and Vercel deployment.

## Explicit non-goals

- Authentication, user accounts, or personalization.
- A database or CMS before the Git-managed workflow becomes a demonstrated constraint.
- Career listings, job-search tools, or AI safety as a primary section.
- Unsupported market-size, revenue, valuation, or market-share estimates.
- Quantitative company positioning without comparable evidence.
- Company rankings or investment recommendations.
- Automated content publishing without editorial review.

## Future direction

Near-term work should improve evidence quality and educational depth before adding broad product features. Later increments can expand company coverage, add discovery filters, introduce defensible visual analysis, and automate news collection with graceful failure and editorial separation.

## Relationship to other documents

- [LEAN_PRD.md](LEAN_PRD.md) is the concise authority for the problem, current milestone boundaries, and success criteria.
- [VISUAL_DIRECTION.md](VISUAL_DIRECTION.md) is the detailed authority for visual and interaction decisions.
- This blueprint connects those documents to the implemented information, technical, content, and research architecture. When documents conflict, update all three in the same pull request and record the decision in [DECISION_LOG.md](DECISION_LOG.md).
