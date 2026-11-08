# WI Draw

**WI Draw** is the visual workspace of the WI Arch ecosystem: an open-source, hand-drawn whiteboard for diagrams, wireframes, flowcharts, mind maps, technical sketches and collaborative thinking.

WI Draw is an independent WI Arch product for drawing diagrams, sketches and plans. It uses an inherited open-source drawing engine; integrations, deployment and future capabilities are developed under WI Arch.

> Project status: foundation and rebranding in progress. This repository contains the inherited editor code. Native desktop/mobile applications, WI account integration, cloud workspaces and WI-specific collaboration services are not yet represented as completed features.

## Product direction

- A fast, infinite canvas with a deliberately simple drawing experience.
- Shapes, arrows, connectors, freehand drawing, text, images and reusable libraries.
- Diagrams, architecture maps, process flows, mind maps, planning boards and low-fidelity wireframes.
- Local-first editing with import/export and offline-capable web experience.
- A consistent experience across web, desktop and mobile form factors.
- Optional collaboration and synchronization through services controlled by WI Arch, after their security and operational design is complete.

## Platform strategy

| Platform | Direction | Status |
| --- | --- | --- |
| Web | Responsive web application and PWA | Inherited foundation; needs WI branding and validation |
| Linux | Desktop application, preferably Tauri | Planned |
| Windows | Desktop application, preferably Tauri | Planned |
| macOS | Desktop application, subject to packaging and signing | Planned |
| Android | Touch-first mobile application, evaluating Capacitor/native integration | Planned |
| iOS/iPadOS | Touch-first mobile application, evaluating Capacitor/native integration | Planned |

The current codebase is a React/TypeScript web monorepo. Desktop and mobile packaging are roadmap items, not existing capabilities.

## Technology foundation

- React and TypeScript
- Vite
- Yarn workspaces
- Canvas-based editor and internal drawing packages
- PWA/service-worker support inherited from the upstream codebase
- Existing collaboration integrations are under review before being adopted as WI services

Exact dependency and script versions are maintained in the workspace manifests. Do not upgrade or replace the package manager without checking the lockfile and workspace tooling.

## Development

### Requirements

- Node.js 18 or newer (use the version supported by the current CI configuration).
- Yarn 1.22.22, as declared by the root `package.json`.

### Install and run

```bash
yarn install
yarn start
```

### Validation

```bash
yarn test:typecheck
yarn test:code
yarn test:app --watch=false
yarn build
```

Run the relevant checks after changes. Do not assume that a successful dependency installation means the app builds or that platform packaging works.

## Repository layout

- `excalidraw-app/`: current web application entry point and app-specific features.
- `packages/`: reusable drawing engine and supporting packages.
- `examples/`: integration examples.
- `dev-docs/`: inherited developer documentation site.
- `scripts/`: build, release and maintenance tooling.

Some internal folder and package names still reflect the upstream project. They will be renamed only when all imports, build scripts, package references and published interfaces can be updated safely.

## WI Arch product principles

1. Keep the editor fast, accessible and usable without an account.
2. Do not require cloud connectivity for local drawing and export.
3. Treat drawings and embedded assets as user data.
4. Keep synchronization and collaboration opt-in until the WI services are ready.
5. Never claim end-to-end encryption, zero-knowledge storage or secure sharing without a documented design, implementation review and tests.
6. Keep platform-specific capabilities behind well-defined adapters rather than coupling the drawing engine to one operating system.

## Third-party notices

See [third-party notices](THIRD-PARTY-NOTICES.md) for inherited code and license information.

## Project documentation

- [Product definition](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Security policy](SECURITY.md)
- [VPS deployment guide](docs/DEPLOY.md)
- [Instructions for AI coding agents](CLAUDE.md)
- [Implementation prompt](PROMPT.md)

---
Part of the **WI Arch** ecosystem.
