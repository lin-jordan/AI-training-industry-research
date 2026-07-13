# Changelog

This project uses a lightweight [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)-inspired format. Record user-visible product changes, research coverage changes, and meaningful engineering-process changes.

## Unreleased

### Added

- Project blueprint, state record, roadmap, decision log, research guide, content style guide, contribution guide, and GitHub collaboration templates.
- GitHub Actions quality workflow for linting, type-checking, production builds, and Chromium Playwright tests on pull requests and pushes to `main`.
- Complete Data annotation glossary entry and generated entry route.
- Referential validation for duplicate identifiers, unknown references, duplicate relationship values, and existing company/module source mappings.
- Extensible registry for the four active Version 1 subsectors, with stable category slugs.
- Focused content-validation coverage using the existing Playwright test runner without a browser.
- Stable IDs and optional source mappings for educational content blocks.
- Block-level validation for duplicate IDs, unknown or duplicate source mappings, and sources missing from the parent module bibliography.
- Server-rendered citation markers and stable source-row anchors for educational modules.
- Two direct technical sources supporting the representative pretraining section.

### Changed

- Homepage, glossary, foundations, company, ecosystem, and dashboard coverage counts now derive from validated repository data where appropriate.
- Dashboard and ecosystem copy now state that 2 of 4 active subsectors are represented.
- The lifecycle module rail now derives its linked navigation from ordered content blocks.
- The pretraining section now explains predictive objectives, base capabilities, limitations, and the role of later post-training and evaluation.
- Source rows now show publication and review dates, source type, evidence status, supported claims, and a direct external link.

### Fixed

- Resolved the dangling `data-annotation` glossary relationship.
- Corrected the dashboard's five-subsector denominator inconsistency.

### Deferred

- Research and educational depth work remains the recommended next milestone.
- The full flagship-module rewrite, company-profile depth, and broader glossary expansion remain deferred to later Milestone 2 slices.

## 0.1.0 — Initial vertical slice

### Added

- Next.js App Router application with responsive editorial shell and navigation.
- Homepage, foundations, glossary, company directory and profiles, ecosystem map, dashboard, news, and search routes.
- Three company profiles: Mercor, AfterQuery, and Fleet.
- Twelve glossary entries and one model-lifecycle educational module.
- Three curated news records and six structured source records.
- Zod-validated Git-managed content and a build-time local search index.
- Qualitative ecosystem map, research-coverage dashboard, and visible uncertainty states.
- Sitemap, robots metadata, custom icon, reduced-motion behavior, and Vercel-compatible build.
- Playwright desktop/mobile coverage and representative axe accessibility scans.
- Lean PRD, visual direction, and local-development README.

### Changed

- No separately recorded changes for the initial release.

### Fixed

- No separately recorded fixes for the initial release.

### Deferred

- Seven additional Version 1 company profiles.
- Deeper educational modules and glossary integration.
- Quantitative dashboards and market mapping pending comparable evidence.
- Automated RSS ingestion, database, CMS, authentication, and user accounts.
