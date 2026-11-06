# WI Draw — AI Engineering Instructions

## Mission

Develop WI Draw as the independent visual workspace in the WI Arch ecosystem. It is based on the MIT-licensed Excalidraw codebase. Preserve the inherited drawing engine where useful while progressively replacing upstream product branding, external service assumptions and product-specific integrations with WI Draw equivalents.

## Non-negotiable rules

- Inspect the existing implementation before changing it. Do not replace working code with speculative scaffolding.
- Preserve the MIT license and upstream copyright notices. Do not remove attribution from inherited files or substantial copies.
- Do not copy Excalidraw trademarks, logos, product artwork, commercial upsell flows or company-specific assets into WI Draw branding.
- Do not claim a feature is implemented merely because an upstream implementation exists; verify that it works in this fork and is configured for WI Draw.
- Do not introduce credentials, production endpoints, private keys or real user data into the repository.
- Keep local editing and export usable without a WI account.
- Treat collaboration, synchronization, authentication and cloud storage as separate services with explicit security boundaries.
- Do not claim E2EE, zero-knowledge, secure sharing or compliance without design evidence, tests and review.
- Prefer small, reversible changes. Preserve upstream compatibility until a migration is planned and validated.

## Repository architecture

- `excalidraw-app/`: inherited React web application. The directory name is upstream-derived and may be renamed in a dedicated refactor.
- `packages/excalidraw/`: reusable drawing editor package.
- `packages/common/`, `packages/element/`, `packages/math/`, `packages/utils/` and other packages: shared engine and utilities.
- `examples/`: integration examples.
- `dev-docs/`: inherited documentation site.
- Root package manager: Yarn Classic workspaces. Follow the checked-in `yarn.lock`.

## Product architecture direction

- Core: framework-independent drawing model and editor package.
- Web: React/TypeScript responsive app and PWA.
- Desktop: planned Tauri shell for Linux, Windows and macOS.
- Mobile: planned touch-first shell; evaluate Capacitor and native platform APIs before committing.
- Storage: local-first document persistence with explicit import/export formats.
- Cloud: optional WI-managed identity, sync and collaboration services; do not bind the core editor directly to cloud services.
- Integration: define adapters for authentication, storage, telemetry and collaboration.

## Development workflow

1. Read the relevant product/architecture/security docs.
2. Trace the existing code path and identify upstream dependencies.
3. Make the smallest cohesive change.
4. Add or update tests for behavior changes.
5. Run relevant checks:
   - `yarn test:typecheck`
   - `yarn test:code`
   - `yarn test:app --watch=false`
   - `yarn build`
6. Report exactly which checks ran and their outcomes. If a check was not run, say so.

Do not run snapshot update commands as a routine validation step. Update snapshots only when the intended UI behavior changes and the diff has been reviewed.

## Branding and upstream migration

- User-facing name: WI Draw.
- Organization: WI Arch.
- Do not rename internal packages, storage keys, serialized formats or import paths in bulk. Plan migrations and compatibility tests first.
- Keep the upstream origin documented so security fixes and useful upstream improvements can be evaluated.
- Remove inherited third-party service integrations only after identifying their runtime dependencies and replacing or disabling them safely.

## Security requirements

See `SECURITY.md` and `docs/ARCHITECTURE.md`. In particular:
- Treat all imported drawing files and embedded images as untrusted input.
- Validate size, MIME type, URL schemes and parser boundaries.
- Avoid unsafe HTML rendering and arbitrary remote resource loading.
- Do not expose server credentials through Vite `VITE_*` variables.
- Review Firebase rules, collaboration room behavior, analytics and error reporting before enabling production services.
- Keep secrets out of Git history; removing a file from the current branch does not erase prior commits. Rotate any credential that may have been exposed.

## Definition of done

A change is complete only when implementation, tests, documentation and product claims agree. Distinguish implemented behavior from planned work in every user-facing document.
