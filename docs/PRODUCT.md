# WI Draw — Product Definition

## Vision

WI Draw is the visual thinking and diagramming workspace in the WI Arch ecosystem. It provides a simple, hand-drawn canvas for turning ideas into visual artifacts.

## Audience and use cases

- Developers documenting software architecture, APIs and infrastructure.
- Teams mapping processes, workflows and product ideas.
- Students and educators explaining concepts visually.
- Product designers creating rough wireframes and user flows.
- Individuals organizing thoughts with mind maps and sketches.

## Core experience

- Infinite canvas with pan and zoom.
- Freehand drawing, shapes, lines, arrows and connectors.
- Text, image placement, grouping, selection and editing.
- Undo/redo and keyboard shortcuts.
- Reusable shape libraries.
- Import/export and local document persistence.
- Light and dark appearance.
- Responsive pointer, touch and stylus interaction.

These capabilities originate in the inherited codebase and must be verified in the WI Draw build before being advertised as production-ready.

## Product principles

1. **Local-first:** a user can create and export work without registering.
2. **Portable:** documents should not be trapped in a proprietary cloud.
3. **Cross-platform:** a consistent model and interaction language across web, desktop and mobile.
4. **Privacy-conscious:** optional services, minimal telemetry and clear data handling.
5. **Interoperable:** preserve compatible open document formats where practical.
6. **Accessible:** keyboard, screen reader, contrast and touch considerations.

## Platform strategy

- Web/PWA is the first supported delivery target.
- Tauri is the preferred candidate for desktop packaging, pending a technical spike.
- Capacitor/native wrappers are candidates for mobile, pending a touch UX and plugin review.
- Shared editor logic must remain separate from platform-specific APIs.

## Not in scope for the initial foundation

- A WI account requirement.
- Paid plans or commercial upsell.
- A cloud-only document model.
- AI generation or editing.
- Real-time collaboration operated by WI Arch.
- Claims of audited end-to-end encryption or zero-knowledge storage.

These can be considered later through separate product and security designs.
