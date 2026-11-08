import { cp, access, mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const deployDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(deployDir, "..");
const appBuild = join(repositoryRoot, "excalidraw-app", "build");
const siteRoot = join(deployDir, "site");

try {
  await access(join(appBuild, "index.html"));
} catch {
  throw new Error("WI Draw build missing. Run `yarn --cwd excalidraw-app build:app:deploy` first.");
}

await rm(siteRoot, { recursive: true, force: true });
await mkdir(join(siteRoot, "app"), { recursive: true });
await cp(join(deployDir, "landing"), siteRoot, { recursive: true });
await cp(appBuild, join(siteRoot, "app"), { recursive: true });

console.log(`Static release assembled at ${siteRoot}`);
