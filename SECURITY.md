# WI Draw Security Policy

## Scope

WI Draw is a client-side visual editor based on an upstream open-source codebase. Security reports may involve imported documents, image handling, browser storage, external integrations, collaboration, platform wrappers or dependencies.

## Reporting

Until a dedicated private security contact is published, do not post exploitable vulnerabilities, credentials or personal data in public issues. Contact the WI Arch maintainers through the private communication channel provided by the organization.

Include affected version/commit, reproduction steps, impact and any safe proof of concept. Do not include real user drawings or secrets.

## Current security requirements

- Do not commit `.env` files, credentials, private keys or production service configuration.
- Treat Vite `VITE_*` variables as public: they are bundled into client code.
- Firebase client configuration is not a secret, but project authorization must be enforced by server-side security rules.
- Validate and bound imported drawing files, embedded images, URLs and other untrusted content.
- Avoid unsafe HTML rendering and arbitrary remote resource loading.
- Review service-worker caching and update behavior.
- Keep collaboration servers, room authorization and storage rules under explicit operational ownership.
- Disable analytics/error-reporting integrations unless WI Arch has configured and reviewed them.
- Desktop wrappers must use least-privilege filesystem, shell and network permissions.
- Mobile wrappers must request only permissions required for an explicit feature.

## Security claims

Do not claim end-to-end encryption, zero-knowledge architecture, secure cloud sync or audited collaboration until the design, implementation, key lifecycle, threat model and tests have been reviewed.

## Fork and license

This project is based on Excalidraw under the MIT License. Preserve the original license and copyright notices. Removing a tracked environment file does not remove it from Git history; rotate any real credential that may have been exposed and review the fork history before production use.
