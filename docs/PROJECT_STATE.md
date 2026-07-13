# Project State

Last updated: 2026-07-13  
Current release: 0.1.0  
Current milestone: Milestone 2 — Slice 1B complete and awaiting review

Deployment status: Vercel production URL is configured as `https://ai-training-industry-research.vercel.app`; live availability was not verified during this documentation task.

## Completed

- Responsive editorial application shell and shared navigation.
- Homepage with lifecycle, company, glossary, map, and news previews.
- Foundations index and one complete model-lifecycle module.
- Searchable glossary with 13 full entry routes, including Data annotation.
- Company directory and profiles for Mercor, AfterQuery, and Fleet.
- Qualitative ecosystem map with accessible text equivalent.
- Research-coverage dashboard using repository-derived values.
- Curated news page with a separate future-feed state.
- Local search across companies, glossary, foundations, and news.
- Zod validation for all structured content collections.
- Sitemap, robots metadata, custom icon, responsive styles, and reduced-motion support.
- Playwright/axe test suite and beginner-oriented project README.
- GitHub Actions quality checks for pull requests targeting `main` and pushes to `main`.
- Cross-record validation for duplicate identifiers, unknown references, duplicate relationships, and company/module source mappings.
- Extensible active Version 1 subsector registry with stable slugs for the four current categories.
- Stable educational-block IDs, optional block source mappings, and validation of block IDs and bibliography membership.
- Server-rendered educational citation markers, detailed source rows, and module navigation derived from content blocks.
- Expanded, source-backed pretraining section using two direct technical sources.

## Partially Implemented

- Educational coverage: the lifecycle overview exists, but individual stages do not yet have dedicated modules.
- Company landscape: 3 of the 10 planned Version 1 profiles exist.
- Subsector coverage: 2 subsectors contain companies; evaluation and specialized-data subsectors are empty.
- Dashboard: reports research coverage but does not yet provide evidence-backed industry metrics.
- Ecosystem map: clickable qualitative clusters exist; coverage is too thin for deeper analysis.
- News: three curated records exist; external ingestion and editorial review workflow are not implemented.
- Citation system: company profiles and the representative pretraining section use structured sources, but some news/source links are generic homepages rather than precise article URLs.
- Lifecycle depth: pretraining now has a sourced representative section; post-training, evaluation, inference, and the surrounding orientation blocks remain concise and intentionally uncited pending the full flagship-module rewrite.

## Not Started

- Seven remaining Version 1 company profiles.
- Dedicated modules for data preparation, SFT, preference optimization/RLHF, evaluation, synthetic data, agent environments, and physical-AI data.
- Company filtering, comparison, or richer landscape discovery.
- Quantitative market mapping and research-backed dashboards.
- Automated RSS ingestion and feed-failure handling.
- CMS, database, authentication, accounts, or personalization; these remain intentional non-goals for Version 1.

## Current Architecture

- Next.js 16.2.10 App Router with React 19.2.4.
- TypeScript, Zod, Tailwind CSS 4, npm, and Git-managed structured content.
- Server Components by default with small Client Components for navigation and search.
- Static pages plus statically generated company and glossary routes.
- Content loaders validate 3 companies, 13 glossary terms, 3 news records, 8 sources, and 1 educational module, then verify referential integrity across collections and educational-block citations.
- No database, CMS, API service, authentication, analytics, or hosted search.
- Vercel-compatible build with no required environment variables.
- A least-privilege GitHub Actions job runs lint, type-check, production build, and Chromium Playwright tests on Ubuntu with Node.js 20.

## Current Content Coverage

| Collection | Count | Current coverage |
|---|---:|---|
| Companies | 3 | Mercor, AfterQuery, Fleet |
| Glossary terms | 13 | Core pretraining, post-training, feedback, annotation, evaluation, environment, and inference concepts |
| Educational modules | 1 | Pretraining → post-training → evaluation → inference |
| News records | 3 | Benchmark, company development, and research direction |
| Source records | 8 | Five official company sources, one reporting source, and two direct technical sources |
| Populated subsectors | 2 | Expert data platforms; RL environment providers |

Company data status: 1 source-backed overview, 1 partial public-data profile, and 1 early-stage public-data profile.

## Current Test Coverage

The browser suite defines nine behaviors in both desktop Chromium and Pixel 7 projects, producing 18 test cases when the full suite runs:

- Primary-route availability and horizontal-overflow checks.
- Home content, console-error, and framework-overlay checks.
- Glossary filtering and empty state.
- Complete Data annotation glossary route.
- Repository-derived coverage counts and active-subsector language.
- Cross-content search and category filtering.
- Ecosystem-to-company navigation.
- Derived lifecycle-module navigation, source markers, bibliography anchors, and sourced pretraining content.
- Serious/critical axe checks on representative pages.

Nine focused Playwright-runner tests cover valid and uncited blocks, duplicate identifiers across collections and within modules, unknown references, duplicate relationships and block source mappings, and parent-bibliography membership without starting a browser or development server.

On 2026-07-13, lint, type-check, the production build, all 9 focused content tests, and all 18 browser tests passed locally. The production build required network access for the configured Google-hosted Geist font fetch.

## Known Issues

- The configured production URL is present in sitemap and robots metadata, but live deployment health is not represented in the repository.
- The original scaffold favicon remains alongside the custom icon route; browser icon precedence should be checked in a release QA pass.
- npm previously reported moderate PostCSS advisories through the installed Next.js dependency; the suggested forced fix would be breaking and requires an upstream-safe upgrade path.

## Technical Debt

- Long global stylesheet with many page-specific selectors; acceptable for the vertical slice but should be modularized only when repeated maintenance becomes costly.
- Search is substring/token based and will need ranking or synonym support as content grows.
- Content relationships remain string slugs; validation now checks existence and duplicates but intentionally does not force reciprocal links.
- Sitemap hostname is hard-coded rather than derived from deployment configuration.

## Research Gaps

- AfterQuery and Fleet lack verified founded-year and headquarters fields; all three profiles lack sourced headquarters data.
- Business model and commercial data remain limited, especially for Fleet.
- Only the representative pretraining section has attached educational sources; the rest of the lifecycle module still needs the approved research-depth pass.
- Several claims rely on company-stated material without independent corroboration.
- The AfterQuery research news item points to a homepage rather than a direct publication URL.
- No profiles yet represent evaluation platforms or specialized data providers.

## Decisions Required

- Define minimum evidence and completeness criteria for a company to move between data-status levels.
- Decide which educational modules constitute the minimum coherent Version 1 curriculum.
- Confirm the canonical production URL and deployment ownership before formal release.
- Choose an upstream-safe response to the PostCSS advisory when a patched stable Next.js version is available.

## Recommended Next Milestone

Review **Milestone 2 Slice 1B: block-level citation vertical slice**. After approval, proceed to the separately scoped flagship-module implementation; do not treat this representative section as the full rewrite.
