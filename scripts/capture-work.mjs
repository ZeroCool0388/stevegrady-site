import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
await mkdir("public/work", { recursive: true });
for (const [slug, url] of [
  ["vendor-risk-triage", "https://vendor-risk-triage-zerocool0388.vercel.app"],
  ["renewal-radar", "https://renewal-radar-azure.vercel.app"],
  ["scopeforge", "https://scopeforge-sable.vercel.app"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const response = await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await sharp(await page.screenshot())
    .webp({ quality: 85 })
    .toFile(`public/work/${slug}.webp`);
  console.log(slug, response.status(), await page.title());
  await page.close();
}
await browser.close();
