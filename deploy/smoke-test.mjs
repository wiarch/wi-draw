const baseUrl = new URL(process.env.SMOKE_BASE_URL || "http://localhost");

const checkPage = async (path, expectedText) => {
  const url = new URL(path, baseUrl);
  const response = await fetch(url);
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`${url.pathname} returned HTTP ${response.status}`);
  }

  if (!body.includes(expectedText)) {
    throw new Error(`${url.pathname} did not contain expected content: ${expectedText}`);
  }

  return body;
};

const checkAsset = async (path) => {
  const url = new URL(path, baseUrl);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url.pathname} returned HTTP ${response.status}`);
  }
};

const landing = await checkPage("/", "Make ideas");
const app = await checkPage("/app/", "WI Draw");

if (!/<main\b/i.test(landing)) {
  throw new Error("/ did not contain a semantic main element");
}

if (!/<title>WI Draw/i.test(app) || !/src="\/app\/(?:assets|index)/i.test(app)) {
  throw new Error("/app did not load the WI Draw page and its app bundle");
}

await checkAsset("/language.js");
await checkAsset("/sw.js");
await checkAsset("/app/sw.js");

console.log(
  `Smoke checks passed for ${baseUrl.origin}: landing, app, and offline assets`,
);
