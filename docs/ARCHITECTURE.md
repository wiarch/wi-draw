# WI Draw — Architecture

## Current inherited foundation

The repository is a Yarn workspaces monorepo using React, TypeScript and Vite. It contains a web application, reusable drawing packages, examples, build tooling and a documentation site.

Main areas:

- `excalidraw-app/`: current web/PWA application.
- `packages/excalidraw/`: reusable editor component and drawing interactions.
- `packages/element/`, `packages/math/`, `packages/common/`, `packages/utils/`: shared drawing model and utilities.
- `examples/`: integration examples.
- `dev-docs/`: inherited developer documentation.

The current folder and package names are not yet fully WI-branded. Renaming them is a separate refactor.

## Target logical architecture

1. **Drawing core:** scene model, elements, rendering, selection, history and serialization.
2. **Editor UI:** toolbars, dialogs, properties, libraries and accessibility.
3. **Application shell:** navigation, document lifecycle, settings and PWA behavior.
4. **Platform adapters:** filesystem, share sheet, clipboard, window controls and native capabilities.
5. **Optional services:** identity, synchronization, collaboration, telemetry and remote asset storage.

The drawing core must not depend directly on WI authentication or remote APIs.

## Platform direction

- Web/PWA: primary initial runtime.
- Desktop: evaluate Tauri for Linux, Windows and macOS.
- Mobile: evaluate Capacitor and native integration for Android/iOS; verify stylus, gestures, file access and lifecycle behavior.

No native desktop/mobile wrapper is declared complete by this architecture document.

## Data and compatibility

- Preserve inherited scene serialization and import/export compatibility where possible.
- Add explicit schema versions before changing persisted document structures.
- Validate imported JSON and image data before processing.
- Bound file sizes and resource consumption.
- Keep local persistence recoverable and avoid silently overwriting user documents.

## Service boundaries

- Identity adapter: optional WI account integration.
- Storage adapter: local storage first, remote sync only when configured.
- Collaboration adapter: separate WI-managed signaling/room service.
- Telemetry adapter: disabled by default until WI privacy policy and deployment are defined.

## Upstream relationship

The current implementation is derived from the MIT-licensed Excalidraw repository. Keep upstream notices and track upstream security fixes. WI-specific changes should be documented and isolated where practical.
