# Project State

Last updated: 2026-07-13  
Current release: 0.1.0  
Current milestone: Project operating system and preparation for research-depth work  
Deployment status: Vercel production URL is configured as `https://ai-training-industry-research.vercel.app`; live availability was not verified during this documentation task.

## Completed

- Responsive editorial application shell and shared navigation.
- Homepage with lifecycle, company, glossary, map, and news previews.
- Foundations index and one complete model-lifecycle module.
- Searchable glossary with 12 full entry routes.
- Company directory and profiles for Mercor, AfterQuery, and Fleet.
- Qualitative ecosystem map with accessible text equivalent.
- Research-coverage dashboard using repository-derived values.
- Curated news page with a separate future-feed state.
- Local search across companies, glossary, foundations, and news.
- Zod validation for all structured content collections.
- Sitemap, robots metadata, custom icon, responsive styles, and reduced-motion support.
- Playwright/axe test suite and beginner-oriented project README.
- GitHub Actions quality checks for pull requests targeting `main` and pushes to `main`.

## Partially Implemented

- Educational coverage: the lifecycle overview exists, but individual stages do not yet have dedicated modules.
- Company landscape: 3 of the 10 planned Version 1 profiles exist.
- Subsector coverage: 2 subsectors contain companies; evaluation and specialized-data subsectors are empty.
- Dashboard: reports research coverage but does not yet provide evidence-backed industry metrics.
- Ecosystem map: clickable qualitative clusters exist; coverage is too thin for deeper analysis.
- News: three curated records exist; external ingestion and editorial review workflow are not implemented.
- Citation system: company profiles use structured sources, but some news/source links are generic homepages rather than precise article URLs.

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
- Content loaders validate 3 companies, 12 glossary terms, 3 news records, 6 sources, and 1 educational module.
- No database, CMS, API service, authentication, analytics, or hosted search.
- Vercel-compatible build with no required environment variables.
- A least-privilege GitHub Actions job runs lint, type-check, production build, and Chromium Playwright tests on Ubuntu with Node.js 20.

## Current Content Coverage

| Collection | Count | Current coverage |
|---|---:|---|
| Companies | 3 | Mercor, AfterQuery, Fleet |
| Glossary terms | 12 | Core pretraining, post-training, feedback, evaluation, environment, and inference concepts |
| Educational modules | 1 | Pretraining → post-training → evaluation → inference |
| News records | 3 | Benchmark, company development, and research direction |
| Source records | 6 | Five official company sources and one reporting source |
| Populated subsectors | 2 | Expert data platforms; RL environment providers |

Company data status: 1 source-backed overview, 1 partial public-data profile, and 1 early-stage public-data profile.

## Current Test Coverage

The Playwright suite defines six behaviors in both desktop Chromium and Pixel 7 projects, producing 12 test cases when the full suite runs:

- Primary-route availability and horizontal-overflow checks.
- Home content, console-error, and framework-overlay checks.
- Glossary filtering and empty state.
- Cross-content search and category filtering.
- Ecosystem-to-company navigation.
- Serious/critical axe checks on representative pages.

On 2026-07-13, lint, type-check, the production build, and all 12 Playwright test cases passed locally. The production build required network access for the configured Google-hosted Geist font fetch.

## Known Issues

- The dashboard displays `2/5` populated subsectors, while the current company schema defines four subsector values. The intended Version 1 taxonomy must be reconciled before expanding dashboard metrics.
- The configured production URL is present in sitemap and robots metadata, but live deployment health is not represented in the repository.
- The original scaffold favicon remains alongside the custom icon route; browser icon precedence should be checked in a release QA pass.
- npm previously reported moderate PostCSS advisories through the installed Next.js dependency; the suggested forced fix would be breaking and requires an upstream-safe upgrade path.

## Technical Debt

- Long global stylesheet with many page-specific selectors; acceptable for the vertical slice but should be modularized only when repeated maintenance becomes costly.
- Search is substring/token based and will need ranking or synonym support as content grows.
- Content relationships are string slugs without cross-record referential validation.
- Source IDs are validated structurally but not checked automatically for broken references or duplicate IDs.
- Sitemap hostname is hard-coded rather than derived from deployment configuration.

## Research Gaps

- AfterQuery and Fleet lack verified founded-year and headquarters fields; all three profiles lack sourced headquarters data.
- Business model and commercial data remain limited, especially for Fleet.
- The lifecycle educational module has no attached source records.
- Several claims rely on company-stated material without independent corroboration.
- The AfterQuery research news item points to a homepage rather than a direct publication URL.
- No profiles yet represent evaluation platforms or specialized data providers.

## Decisions Required

- Confirm whether Version 1 has four or five company subsectors and define the missing category if five.
- Define minimum evidence and completeness criteria for a company to move between data-status levels.
- Decide which educational modules constitute the minimum coherent Version 1 curriculum.
- Confirm the canonical production URL and deployment ownership before formal release.
- Choose an upstream-safe response to the PostCSS advisory when a patched stable Next.js version is available.

## Recommended Next Milestone

Complete the **Research and Educational Depth** milestone before adding broad features. Strengthen the three existing profiles, attach precise sources, resolve taxonomy and status criteria, and add focused modules on supervised fine-tuning, preference/RL methods, and evaluation. This improves the product's core value—credible explanation and research—while preserving the current architecture.
