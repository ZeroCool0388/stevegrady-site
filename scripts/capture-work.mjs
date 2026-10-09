import { chromium } from "playwright";
import sharp from "sharp";
import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const browser = await chromium.launch();
const captures = [];
for (const [slug, url] of [
  ["vendor-risk-triage", "https://vendor-risk-triage-zerocool0388.vercel.app"],
  ["renewal-radar", "https://renewal-radar-azure.vercel.app"],
  ["scopeforge", "https://scopeforge-sable.vercel.app"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const response = await page.goto(url, { waitUntil: "networkidle" });
  if (response.status() !== 200)
    throw new Error(`${slug}: ${response.status()}`);
  await page.evaluate(() => document.fonts.ready);
  const file = `public/work/${slug}.webp`;
  await sharp(await page.screenshot())
    .webp({ quality: 82 })
    .toFile(file);
  captures.push({
    file,
    url,
    width: 1280,
    height: 800,
    capturedAt: new Date().toISOString(),
  });
  await page.close();
}
await browser.close();
const diagram = await readFile("public/work/personal-ai-system.png");
const metadata = await sharp(diagram).metadata();
const source =
  "https://raw.githubusercontent.com/ZeroCool0388/personal-ai-system/main/diagram-v2.png";
const remote = Buffer.from(await (await fetch(source)).arrayBuffer());
if (!remote.equals(diagram)) throw new Error("Diagram changed from original");
await writeFile(
  "docs/asset-provenance.json",
  JSON.stringify(
    {
      captures,
      diagram: {
        file: "public/work/personal-ai-system.png",
        source,
        width: metadata.width,
        height: metadata.height,
        sha256: createHash("sha256").update(diagram).digest("hex"),
        unchanged: true,
      },
    },
    null,
    2,
  ),
);
console.log(
  "Captured three demos. Original diagram:",
  metadata.width,
  metadata.height,
);
