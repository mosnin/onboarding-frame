/**
 * Capture every dashboard template at the reference render width.
 *
 * The reference screenshots were taken in a 1512px viewport, so the templates
 * are captured at the same width — otherwise every measurement has to be
 * rescaled by hand and small errors compound. The viewer frame is
 * min(1700, vw) - 48, so a 1560px viewport puts the template at 1512.
 *
 * Usage: node scripts/capture-templates.mjs [outDir] [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = process.argv[2] ?? ".audit/shots";
const BASE = process.argv[3] ?? "http://127.0.0.1:3111";
const CHROME = process.env.CHROMIUM_PATH ?? undefined;

mkdirSync(OUT, { recursive: true });

const catalogue = await fetch(`${BASE}/registry`).then((r) => r.json());
void catalogue;

// The template slugs come from the templates index page so this stays in step
// with the catalogue without importing the package.
const browser = await chromium.launch(
  CHROME ? { executablePath: CHROME } : undefined,
);
const page = await browser.newPage({
  viewport: { width: 1560, height: 1100 },
  deviceScaleFactor: 1,
});

await page.goto(`${BASE}/templates`, { waitUntil: "networkidle" });
const slugs = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="/templates/"]')]
    .map((a) => a.getAttribute("href").replace("/templates/", ""))
    .filter((s) => s && !s.includes("/")),
);
const unique = [...new Set(slugs)];
console.log(`capturing ${unique.length} templates`);

/**
 * A capture that renders unstyled still looks page-shaped, so it passes every
 * check the script used to make and silently overwrites a good capture with a
 * useless one. It has happened twice, both times because a stale server held
 * the port and served an older build's HTML against the new build's asset
 * hashes, 404ing every stylesheet. So: record failed asset requests per page,
 * and confirm the stylesheet actually applied before writing the file.
 */
const failed = [];
page.on("response", (r) => {
  if (r.status() >= 400 && /\.(css|js)(\?|$)/.test(r.url())) {
    failed.push(`${r.status()} ${r.url()}`);
  }
});

const results = [];
for (const slug of unique) {
  try {
    failed.length = 0;
    await page.goto(`${BASE}/templates/${slug}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    if (failed.length) {
      throw new Error(`assets 404ed (stale server?): ${failed[0]}`);
    }
    const styled = await page.evaluate(() => {
      const el = document.querySelector('[class*="transition-[max-width]"]');
      if (!el) return false;
      // Tailwind's preflight sets this; without the stylesheet the UA default
      // (usually a serif) comes through instead.
      return !/^(Times|serif)/i.test(getComputedStyle(document.body).fontFamily);
    });
    if (!styled) throw new Error("rendered unstyled - stylesheet did not apply");
    const frame = page.locator('[class*="transition-[max-width]"]').first();
    await frame.waitFor({ state: "visible", timeout: 15000 });
    // The site header is sticky and paints over the template's own chrome.
    await page.evaluate(() => {
      const f = document.querySelector('[class*="transition-[max-width]"]');
      for (const el of document.querySelectorAll('header, [class*="fixed"]')) {
        if (f && f.contains(el)) continue;
        el.style.display = "none";
      }
    });
    await page.waitForTimeout(300);
    const box = await frame.boundingBox();
    await frame.screenshot({ path: `${OUT}/${slug}.png` });
    results.push({ slug, width: box.width, height: box.height });
    console.log(`  ${slug.padEnd(24)} ${Math.round(box.width)}x${Math.round(box.height)}`);
  } catch (e) {
    results.push({ slug, error: e.message.slice(0, 120) });
    console.log(`  ${slug.padEnd(24)} FAILED ${e.message.slice(0, 80)}`);
  }
}

writeFileSync(`${OUT}/index.json`, JSON.stringify(results, null, 2));
await browser.close();
