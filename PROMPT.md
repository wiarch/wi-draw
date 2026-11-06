# WI Draw — Project Implementation Prompt

You are working inside the WI Arch ecosystem on WI Draw, a cross-platform visual workspace based on the MIT-licensed Excalidraw codebase.

## Goal

Evolve the inherited React/TypeScript drawing application into a WI Arch product for creating diagrams, flowcharts, wireframes, mind maps, technical sketches and visual plans.

## Product requirements

- Keep the canvas fast, intuitive, accessible and local-first.
- Preserve existing document compatibility and drawing behavior unless a migration is explicitly designed.
- Support web/PWA first; prepare desktop packaging for Linux, Windows and macOS, then touch-first Android/iOS experiences.
- Keep core drawing independent from authentication, cloud storage and collaboration.
- Make cloud sync and collaboration optional and based on WI-controlled services.
- Provide clear import/export and resilient local persistence.
- Maintain responsive layouts, keyboard accessibility, touch gestures and stylus support.

## Implementation constraints

1. Inspect the current architecture and related tests before coding.
2. Preserve MIT license notices and upstream attribution.
3. Do not reuse upstream logos, brand assets, commercial upsell, analytics accounts or service credentials.
4. Do not bulk-rename internal packages, storage keys or serialized formats without a compatibility plan.
5. Do not introduce secrets or production service endpoints in source control.
6. Treat imported files, images, URLs and shared scenes as untrusted.
7. Do not claim native desktop/mobile support, E2EE or zero-knowledge until implemented and validated.
8. Keep changes small and reversible; document upstream-derived behavior and WI-specific changes.

## Suggested delivery order

1. Remove upstream product branding and external service configuration safely.
2. Stabilize the web editor, PWA, local persistence and file import/export.
3. Define platform adapters and package the desktop application.
4. Design WI identity and account integration without making local use depend on login.
5. Build optional WI sync and collaboration services with threat modeling and security tests.
6. Deliver mobile touch UX and native integrations.

## Validation

Run the relevant project checks and report actual outcomes. At minimum, consider type checking, linting, unit tests and production build. Never report a check as passing unless it was executed successfully.
