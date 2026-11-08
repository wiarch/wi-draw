# Deploy WI Draw with the VPS Nginx

This guide serves the static landing page at `/` and the existing Vite app at `/app/` through the VPS's host Nginx. It does not use Docker or expose development ports.

## Requirements

- Ubuntu/Debian VPS with the existing Nginx service and a DNS A record pointing the chosen hostname to the VPS.
- SSH access and sudo rights on the server.
- Node.js 18+ and Corepack/Yarn 1.22.22 for building the app.
- Certbot for HTTPS.

The existing `wi-draw` Nginx site should be updated in place. Back it up before replacing its config; avoid adding a second enabled server block with the same domain.

## 1. Install build and certificate tools

```sh
sudo apt-get update
sudo apt-get install -y nginx certbot gettext-base git
node --version
corepack enable
corepack prepare yarn@1.22.22 --activate
```

If Node.js is not installed, install a supported Node.js 18+ release before continuing.

## 2. Clone and configure

```sh
git clone https://github.com/wiarch/wi-draw.git
cd wi-draw
cp .env.example .env
```

Edit `.env`: set `DOMAIN` to the public hostname, `CERTBOT_EMAIL` to the certificate contact address, and confirm `DEPLOY_ROOT`. Keep the Certbot paths at their defaults so the operating-system renewal timer can find the certificate.

## 3. Build the app and assemble the static site

```sh
corepack yarn install --frozen-lockfile
corepack yarn --cwd ./excalidraw-app build:app:deploy
node deploy/build-site.mjs
```

The resulting `deploy/site/` contains the landing at its root and the app under `app/`. The build script targets `/app/` and keeps tracking/Sentry disabled. It is generated output and is excluded from Git.

Create a release and atomically point Nginx at it:

```sh
set -a
. ./.env
set +a
release="$DEPLOY_ROOT/releases/$(date -u +%Y%m%d%H%M%S)"
sudo mkdir -p "$release"
sudo cp -a deploy/site/. "$release/"
sudo chown -R www-data:www-data "$release"
sudo find "$release" -type d -exec chmod 755 {} +
sudo find "$release" -type f -exec chmod 644 {} +
sudo ln -sfn "$release" "$DEPLOY_ROOT/current"
```

## 4. Configure Nginx for HTTP and the ACME challenge

Create the webroot directory, back up the existing site config, render the template using `.env`, then validate and reload Nginx:

```sh
sudo mkdir -p "$CERTBOT_WEBROOT/.well-known/acme-challenge"
sudo cp -a /etc/nginx/sites-available/wi-draw \
  "/etc/nginx/sites-available/wi-draw.backup.$(date -u +%Y%m%d%H%M%S)"
envsubst '${DOMAIN} ${DEPLOY_ROOT} ${CERTBOT_WEBROOT}' \
  < deploy/nginx-http.conf.template \
  | sudo tee /etc/nginx/sites-available/wi-draw >/dev/null
sudo nginx -t
sudo systemctl reload nginx
```

The existing enabled symlink can remain in place. Verify `http://$DOMAIN/` shows the landing and `http://$DOMAIN/app/` shows WI Draw.

The landing and editor language selectors use the same saved preference. On a first visit, they choose Spanish when the browser's preferred system language is Spanish, and English otherwise. Both pages can be switched manually between English and Spanish.

## 5. Issue the certificate and enable HTTPS

```sh
sudo certbot certonly \
  --webroot -w "$CERTBOT_WEBROOT" \
  --config-dir "$CERTBOT_CONFIG" \
  --work-dir "$CERTBOT_WORK" \
  --logs-dir "$CERTBOT_LOGS" \
  --non-interactive --agree-tos --email "$CERTBOT_EMAIL" \
  -d "$DOMAIN"
```

After Certbot succeeds, render the HTTPS template over the same site config and reload:

```sh
envsubst '${DOMAIN} ${DEPLOY_ROOT} ${CERTBOT_WEBROOT} ${CERTBOT_CONFIG}' \
  < deploy/nginx-https.conf.template \
  | sudo tee /etc/nginx/sites-available/wi-draw >/dev/null
sudo nginx -t
sudo systemctl reload nginx
curl -I "https://$DOMAIN/"
curl -I "https://$DOMAIN/app/"
SMOKE_BASE_URL="https://$DOMAIN" node deploy/smoke-test.mjs
```

Certbot's system timer can renew the certificate. The certificate already uses the default Certbot config paths; use a deploy hook to reload Nginx after renewal:

```sh
sudo certbot renew --deploy-hook "systemctl reload nginx"
```

## Offline use

The landing caches its HTML, styles, language script, and icon with a small service worker. The editor's PWA service worker caches the app shell and static files. Open both pages once while online so the browser can install their service workers and cache the editor. After that, the landing and local drawing features can be opened offline. Cloud-backed features still need a network connection. Browser storage or private-browsing settings can limit offline persistence.

## Local preview

From the repository root, build and assemble the site as above, then serve it on loopback:

```sh
corepack yarn http-server deploy/site -a 127.0.0.1 -p 8080
```

In another terminal, run `SMOKE_BASE_URL=http://127.0.0.1:8080 node deploy/smoke-test.mjs` and open `http://127.0.0.1:8080/`.

## Security review

- The HTTPS template sets HSTS for this hostname, CSP, `X-Content-Type-Options`, and `Referrer-Policy`. It intentionally does not set HSTS `includeSubDomains`.
- Review `connect-src` and `frame-src` in the templates and narrow them to exact origins if optional external integrations are configured later.
- Keep `VITE_*` values free of secrets: Vite embeds them into browser assets.
- The landing and app use no external scripts or fonts. The app font asset base points to the same origin.
- The landing copy contains HTML TODO comments for product-owner confirmation.
