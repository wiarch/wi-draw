# WI Draw — Roadmap

Roadmap items are plans, not implemented features. Status changes only after code and validation are complete.

## Phase 0 — WI foundation

- [x] Establish WI Draw product direction and repository documentation.
- [x] Replace the main README and AI engineering guidance.
- [x] Begin replacing upstream app metadata and web title.
- [x] Stop tracking committed development/production environment files in the working branch.
- [ ] Complete the visual identity and audit remaining upstream branding.
- [ ] Review all external integrations and disable services not operated by WI Arch.
- [ ] Establish CI and dependency/security maintenance policy.

## Phase 1 — Stable web editor

- [ ] Verify canvas tools, undo/redo, import/export and local persistence.
- [ ] Verify PWA installability and offline behavior.
- [ ] Review accessibility, responsive layouts and touch/stylus interactions.
- [ ] Add WI Draw product-level smoke tests.
- [ ] Publish a reproducible web deployment guide.

## Phase 2 — Desktop

- [ ] Run a Tauri technical spike.
- [ ] Define secure filesystem and window permissions.
- [ ] Package Linux and Windows builds; evaluate macOS signing/notarization.
- [ ] Add auto-update only after signing and release integrity are designed.

## Phase 3 — Mobile

- [ ] Evaluate Capacitor versus native shells.
- [ ] Implement mobile-first toolbar, gestures, selection and stylus UX.
- [ ] Validate file import/export and share-sheet behavior.
- [ ] Package Android and iOS builds after device testing.

## Phase 4 — WI services

- [ ] Design optional WI identity integration.
- [ ] Define encrypted sync and conflict resolution.
- [ ] Design collaboration protocol, room authorization and abuse controls.
- [ ] Complete threat modeling and independent security review before making security claims.

## Phase 5 — Ecosystem integrations

- [ ] Integrate WI Draw with WI Note and WI Docs through documented import/embed interfaces.
- [ ] Evaluate WI-BI/AI assistance only as an optional, user-controlled capability.
- [ ] Provide stable extension points for future WI Arch products.
