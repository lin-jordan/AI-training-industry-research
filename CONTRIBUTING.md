# Contributing to AI Training Atlas

This guide is written for a beginner working with Codex. Make one focused change at a time, keep the application working, and ask Codex to explain any command before running it if the effect is unclear.

## Before you start

1. Read [docs/PROJECT_BLUEPRINT.md](docs/PROJECT_BLUEPRINT.md).
2. Check [docs/PROJECT_STATE.md](docs/PROJECT_STATE.md) and [docs/ROADMAP.md](docs/ROADMAP.md).
3. Open or choose an issue with clear completion criteria.
4. For research work, read [docs/RESEARCH_GUIDE.md](docs/RESEARCH_GUIDE.md) and [docs/CONTENT_STYLE_GUIDE.md](docs/CONTENT_STYLE_GUIDE.md).
5. Confirm the Git worktree is clean:

```bash
git status
```

## Create a branch

Update your local main branch, then create a descriptive branch:

```bash
git switch main
git pull --ff-only
git switch -c research/add-labelbox-profile
```

Branch names use lowercase words separated by hyphens:

- `feature/add-company-filters`
- `research/add-labelbox-profile`
- `docs/update-research-guide`
- `fix/mobile-map-overflow`
- `chore/update-dependencies`

Do not work directly on `main`.

## Run locally

Install dependencies the first time:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`. Stop the server with `Control-C` in the terminal.

## Validate changes

GitHub automatically runs the full quality suite for every pull request targeting `main` and every push to `main`. Do not merge a pull request while a check is pending or failing. Open the failed job in the pull request's **Checks** tab to see the command and error output.

To reproduce the clean CI installation locally, use the committed lockfile:

```bash
npm ci
```

Install Chromium once if Playwright has not already downloaded it:

```bash
npx playwright install chromium
```

Then run the same validation commands as CI:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Each check has a distinct purpose:

- `npm run lint` checks source files against the repository's ESLint rules.
- `npm run typecheck` asks TypeScript to verify types without emitting files.
- `npm run build` creates the production Next.js build and validates static content generation.
- `npm run test:e2e` runs the desktop and mobile Playwright scenarios, including representative accessibility scans.

CI installs only Chromium and its required Ubuntu system dependencies before the browser suite. No secrets or local environment variables are required for these checks.

Explain any failed command in the pull request. Do not silence a check or modify unrelated application code merely to make the output green.

## Commit changes

Review exactly what changed:

```bash
git status
git diff
```

Stage the intended files and create a concise commit:

```bash
git add docs/RESEARCH_GUIDE.md src/data/companies.ts src/data/sources.ts
git commit -m "research: add Labelbox company profile"
```

Useful commit prefixes include `feature:`, `research:`, `docs:`, `fix:`, `test:`, and `chore:`.

## Push and open a pull request

```bash
git push -u origin research/add-labelbox-profile
```

Open the repository on GitHub and choose **Compare & pull request**. Complete the template, link the issue, report validation results, and include desktop/mobile screenshots for visual changes. Open a draft pull request if research or implementation is incomplete.

## Keep project records current

Update [docs/PROJECT_STATE.md](docs/PROJECT_STATE.md) when a change affects completed work, current counts, coverage, known issues, technical debt, research gaps, decisions required, deployment status, or the recommended next milestone.

Update [docs/CHANGELOG.md](docs/CHANGELOG.md) under `Unreleased` for user-visible features, content-coverage changes, meaningful fixes, and intentional deferrals. Do not add formatting-only edits unless they affect the user experience or maintenance workflow.

If a durable architecture, product, research, or design choice changes, add a row to [docs/DECISION_LOG.md](docs/DECISION_LOG.md).

## Add a company

1. Use the company checklist in `RESEARCH_GUIDE.md`.
2. Verify official identity, domain, scope, and primary subsector.
3. Add precise sources to `src/data/sources.ts` before writing unsupported detail.
4. Add the company record to `src/data/companies.ts` using an existing record as a structural example.
5. Use `null` for unknown nullable fields; do not guess.
6. Connect only relevant glossary terms and modules.
7. Confirm `/companies`, `/companies/[slug]`, search, ecosystem, dashboard, and sitemap behavior.
8. Update project counts and changelog.

## Add a glossary term

1. Confirm the term is useful to the intended audience and not a duplicate synonym.
2. Add a record to `src/data/glossary.ts` with a short definition, full definition, significance, example, and valid relationships.
3. Use the exact slugs of related terms, companies, and modules.
4. Confirm the glossary list, entry route, hover/focus definition, search, and sitemap.
5. Update project counts and changelog.

## Add a source

1. Open the exact source and verify the relevant claim.
2. Add a unique source ID in `src/data/sources.ts`.
3. Record title, publisher, precise URL, publication date or `null`, review date, source type, supported claims, and evidence label.
4. Link the source ID from the content record.
5. Confirm the rendered source link and label.

## Add an educational module

1. Define the learning objective and lifecycle position.
2. Research the topic using the educational checklist.
3. Add a typed module to `src/content/modules.ts` using supported content blocks.
4. Add a route or approved dynamic-module route; do not assume the data record creates a public page automatically.
5. Connect relevant glossary terms and companies.
6. Add source IDs for specific, disputed, statistical, or time-sensitive claims.
7. Test headings, disclosure controls, captions, text alternatives, mobile layout, and related links.
8. Update project state, roadmap status if appropriate, and changelog.

## Report research uncertainty

- Use only the evidence labels defined in `src/lib/schemas.ts`.
- Attribute company claims as `Company stated`.
- Use `Reported` for reputable secondary reporting.
- Use `Third-party estimate`, `Projected`, or `Inferred` only with explicit context.
- Use `Undisclosed`, `Unverified`, or `Potentially stale` rather than filling gaps.
- Record consequential conflicts or gaps in `PROJECT_STATE.md`.

## Definition of done

A change is complete when:

- [ ] It matches the linked issue or milestone and avoids unrelated scope.
- [ ] Research follows the source hierarchy and every claim has appropriate support.
- [ ] Unknown values are not guessed.
- [ ] Content follows the style guide and existing schemas.
- [ ] Links, related slugs, and rendered routes work.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] Relevant browser, mobile, interaction, and accessibility checks pass.
- [ ] Required GitHub quality checks are complete and passing.
- [ ] `PROJECT_STATE.md`, `CHANGELOG.md`, and the decision log are updated when applicable.
- [ ] The pull request explains the change, evidence, limitations, and validation results.
