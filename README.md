# AI Training Atlas

AI Training Atlas is a public, research-driven field guide to the training-data, post-training, evaluation, and reinforcement-learning ecosystem. This first vertical slice combines one educational module, a searchable glossary, company profiles, a qualitative ecosystem map, curated research news, and a transparent coverage dashboard.

## Run locally

You need Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server reloads the browser when files change.

## Validate the project

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

- `lint` checks code quality rules.
- `typecheck` verifies TypeScript without producing files.
- `build` validates content and generates the production application.
- `test:e2e` starts the app and checks routes, search, responsive behavior, and accessibility in Chromium.

## Edit research content

Structured records live in `src/data/`, while educational modules live in `src/content/`. Zod schemas in `src/lib/schemas.ts` validate every collection when the application builds. A malformed date, URL, or required field produces a clear build error.

Company claims should link to source records and use an evidence label such as `Company stated` or `Reported`. Unknown facts should remain `null`; never use `0` or a guess as a placeholder.

## Architecture

- Next.js App Router and React Server Components for static, content-heavy pages.
- Small Client Components only for navigation state and in-browser search.
- TypeScript and Zod for editable, validated content.
- Tailwind CSS plus a custom editorial token system in `globals.css`.
- No database, CMS, authentication, API service, analytics, or hosted search.

See [docs/LEAN_PRD.md](docs/LEAN_PRD.md) for product boundaries and [docs/VISUAL_DIRECTION.md](docs/VISUAL_DIRECTION.md) for the design system.

## Deploy to Vercel

Import the Git repository into Vercel. Vercel detects Next.js automatically; no environment variables or custom build settings are required for this milestone. The production command is `npm run build`.

Before publishing, update the placeholder deployment hostname in `src/app/sitemap.ts` and `src/app/robots.ts` to the assigned production domain.
