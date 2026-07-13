# Roadmap

The roadmap prioritizes research credibility and educational depth before broader product features. Milestones should leave the application working and deployable.

## Milestone 1 — First vertical slice

**Status:** Completed  
**Recommended Codex reasoning:** High

**Objective:** Establish a complete, coherent product slice and validate the architecture.

**User-visible result:** A responsive site with lifecycle education, a searchable glossary, three company profiles, qualitative map, research dashboard, curated news, and cross-content search.

**Engineering work:** Next.js shell and routes; Zod schemas; static generation; local search; reusable components; metadata; responsive and accessibility behavior; Playwright tests.

**Research/content work:** Mercor, AfterQuery, and Fleet profiles; 12 glossary terms; one lifecycle module; three news records; six source records.

**Dependencies:** None; greenfield setup.

**Explicit exclusions:** Database, CMS, authentication, RSS automation, exhaustive profiles, quantitative market claims.

**Validation requirements:** Lint, type-check, production build, desktop/mobile browser checks, search/navigation checks, and representative accessibility scans.

**Completion criteria:** All initial routes work; content validates; unknown facts remain honest; architecture supports later expansion.

## Milestone 2 — Research and educational depth

**Status:** Next  
**Recommended Codex reasoning:** High

**Objective:** Increase credibility and teaching value before expanding product mechanics.

**User-visible result:** Stronger existing profiles, more precise sources, and dedicated modules that explain supervised fine-tuning, preference/RL methods, and evaluation.

**Engineering work:** Add cross-record referential validation; improve claim-level citation helpers if needed; preserve static architecture; reconcile subsector and dashboard denominators.

**Research/content work:** Re-review all three profiles; replace generic source links with direct sources; define data-status criteria; attach sources to educational claims; add 3 focused modules and related glossary coverage.

**Dependencies:** Research guide, content style guide, confirmed subsector taxonomy.

**Explicit exclusions:** New interactive dashboards, comparison tools, RSS ingestion, database, or CMS.

**Validation requirements:** Source audit; content-schema validation; broken-link review; terminology review; existing route, search, mobile, and accessibility tests.

**Completion criteria:** Every time-sensitive/company-specific claim maps to an appropriate source; status labels follow documented criteria; the four-stage lifecycle has meaningful depth beyond the overview.

## Milestone 3 — Version 1 company coverage

**Status:** Planned  
**Recommended Codex reasoning:** High

**Objective:** Expand the landscape from 3 to 10 researched company profiles.

**User-visible result:** A broader, more representative directory spanning all approved Version 1 subsectors.

**Engineering work:** Add records and routes through the existing model; improve directory grouping only where content scale requires it; add referential and duplicate-slug checks.

**Research/content work:** Research Handshake, micro1, Terac, Bespoke Labs, Encord, Arena, and Labelbox; verify exact identity and scope before inclusion; record missing data explicitly.

**Dependencies:** Milestone 2 status criteria, taxonomy decision, research checklist.

**Explicit exclusions:** Company rankings, investment conclusions, user-generated profiles, unsourced financial estimates.

**Validation requirements:** Claim-to-source audit for each profile; schema/build validation; directory/profile route checks; mobile layout; source-link review.

**Completion criteria:** Ten profiles render, all approved subsectors have intentional coverage or a documented gap, and every profile meets the minimum research standard.

## Milestone 4 — Discovery and connected learning

**Status:** Planned  
**Recommended Codex reasoning:** Medium

**Objective:** Make the expanded content easier to navigate and connect.

**User-visible result:** Useful company/subsector filters, stronger search relevance, and clearer journeys between modules, terms, companies, and news.

**Engineering work:** Add URL-addressable filters; introduce search weighting/synonyms; validate related-record slugs; improve contextual related-content components.

**Research/content work:** Define filter vocabulary, synonyms, and meaningful cross-links; review every relationship for relevance.

**Dependencies:** Stable content taxonomy and ten-profile dataset.

**Explicit exclusions:** Hosted search, personalization, saved views, accounts.

**Validation requirements:** Keyboard and touch filter tests; URL/state behavior; empty states; search relevance examples; responsive and accessibility checks.

**Completion criteria:** Readers can reliably find content by company, subsector, lifecycle stage, and concept without dead ends or invalid relationships.

## Milestone 5 — Evidence-backed map and dashboard

**Status:** Planned  
**Recommended Codex reasoning:** High

**Objective:** Add analytical value without introducing false precision.

**User-visible result:** Richer coverage dashboards and an ecosystem view based on transparent, comparable repository data.

**Engineering work:** Add derived metrics, data-completeness definitions, accessible chart/table components, captions, and nonvisual alternatives.

**Research/content work:** Define comparable measures; document collection methods and limitations; source every non-derived statistic.

**Dependencies:** Stable company dataset, data-status rubric, sufficient cross-company evidence.

**Explicit exclusions:** Market share, valuation comparisons, or competitive-distance plotting without defensible evidence.

**Validation requirements:** Reproducible metric calculations; source audit; accessible table/diagram review; no meaning conveyed by color alone.

**Completion criteria:** Every displayed metric can be traced to records or sources, limitations are visible, and charts have equivalent text/table access.

## Milestone 6 — News workflow and external ingestion

**Status:** Planned  
**Recommended Codex reasoning:** High

**Objective:** Add timely external material while protecting editorial quality.

**User-visible result:** Curated major stories remain distinct from a labeled, periodically refreshed external feed.

**Engineering work:** Add resilient RSS ingestion, normalization, deduplication, safe rendering, timeouts, and graceful failure; preserve a static curated fallback.

**Research/content work:** Approve publishers and feeds; define selection, correction, staleness, and promotion rules.

**Dependencies:** Editorial workflow, source policy, deployment scheduling decision.

**Explicit exclusions:** Automatic promotion into curated stories, paywall circumvention, full-article reproduction, opaque AI summaries.

**Validation requirements:** Feed success/failure tests; duplicate handling; attribution and date checks; safe external links; accessibility and empty/error states.

**Completion criteria:** External feed failures do not break the page, curated records remain manually controlled, and every external item retains clear provenance.

## Milestone 7 — Release hardening and documentation

**Status:** Planned  
**Recommended Codex reasoning:** Medium

**Objective:** Prepare Version 1 for reliable public use and ongoing maintenance.

**User-visible result:** Stable production deployment with polished metadata, performance, accessibility, and current content.

**Engineering work:** Confirm canonical domain; resolve safe dependency advisories; audit performance and metadata; expand end-to-end coverage; verify deployment and monitoring expectations.

**Research/content work:** Full staleness review, link check, terminology consistency pass, and final source audit.

**Dependencies:** Completion of the intended Version 1 content and feature milestones.

**Explicit exclusions:** Version 2 accounts, personalization, or CMS migration.

**Validation requirements:** Lint, type-check, build, full browser suite, accessibility review, responsive QA, link audit, production smoke test, and documentation review.

**Completion criteria:** Version 1 is live at the canonical URL, validation is green, known limitations are documented, and the next maintainer can update research safely.

## Deferred directions

**Status:** Deferred  
**Recommended Codex reasoning:** High before reconsideration

Database-backed editing, CMS integration, authentication, saved research views, user accounts, company comparison, and personalization remain deferred until user need and maintenance cost justify their complexity.
