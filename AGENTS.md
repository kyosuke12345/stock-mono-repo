# Repository Guidelines

## Project Structure & Module Organization
This Turbo + pnpm monorepo keeps runnable code in `apps/` and reusable libraries in `packages/`. `apps/collect-jquants-data/src` hosts the TypeScript CLI that fetches JPX J-Quants data and pipes it into the database. `packages/db` centralizes the Prisma schema, migrations (`prisma/migrations`), and the generated client consumed by the app. Shared TypeScript compiler options live in `tsconfig.base.json`, while workspace wiring is tracked through `pnpm-workspace.yaml` and `turbo.json`. Environment variables belong in the root `.env` (see `.env.example`), and `docker-compose.yml` provisions the local PostgreSQL instance the jobs depend on.

## Build, Test, and Development Commands
- `pnpm install`: installs all workspace dependencies with a single lockfile.
- `pnpm db:up` / `pnpm db:down`: start or tear down the Dockerized PostgreSQL instance used for development and tests.
- `pnpm --filter @repo/db run prisma:generate` (or `prisma:migrate`, `seed`, `prisma:studio`): manage the Prisma client and schema directly from the shared package while loading env vars from the repo root.
- `pnpm build`: runs `turbo run build`, compiling every package with a declared `build` script (currently the DB package).
- `pnpm --filter collect-jquants-data start`: launches the ingestion job via `tsx src/index.ts`; run this after seeding the database to validate flows end-to-end.

## Coding Style & Naming Conventions
All runtime code is TypeScript in ECMAScript modules with strict compiler settings from `tsconfig.base.json`. Use two-space indentation, prefer `const`, and keep modules small (fetchers, serializers, persistence). Name files and folders with kebab-case (`daily-quotes-fetcher.ts`), functions and variables with camelCase, and exported classes/interfaces with PascalCase. Prisma models mirror database tables in snake_case; align new fields with that style to keep diffs minimal. Run `pnpm build` locally to ensure the shared types compile before opening a PR.

## Testing Guidelines
There is no separate unit-test runner yet, so treat the ingestion job plus PostgreSQL state as the primary integration test. Use `pnpm --filter @repo/db run seed` to load fixtures, execute `pnpm --filter collect-jquants-data start`, and verify table counts with `psql` or Prisma Studio. When adding automated checks, colocate `.spec.ts` files next to the feature and invoke them with Node’s built-in test runner (`node --test src/**/*.spec.ts`) so they can be wired into Turbo/CI later. Describe any manual verification steps in the PR body until a full suite is in place.

## Commit & Pull Request Guidelines
Existing history favors concise, descriptive Japanese titles (e.g., `処理高速化`). Follow that style or its imperative English equivalent, avoid long-form descriptions in the subject, and group larger context in the body if needed. Before opening a PR, confirm migrations run cleanly, ingestion jobs finish without error, and env docs are up to date. PRs should include: summary of the change, linked issue or context, reproduction/integration steps, and screenshots or logs when touching data flows. Keep branches rebased on `main` so Turbo caches stay valid.

## Environment & Security Notes
Never commit `.env` files or real tokens; rely on `.env.example` for placeholders. Rotate `JQUANTS_*` credentials frequently and prefer short-lived refresh tokens. Database access goes through `DATABASE_URL`; update `docker-compose.yml` if ports change so every contributor uses the same defaults. When sharing logs, redact company codes and personal tokens.
