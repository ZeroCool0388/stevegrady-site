import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { projects } from "../src/config/site.ts";
const url = process.env.QA_URL || "http://localhost:3000";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
const results = [];
for (const [index, project] of projects.entries()) {
  const card = page.locator(".work-card").nth(index);
  const image = card.locator("img");
  await image.scrollIntoViewIfNeeded();
  const rect = await image.boundingBox();
  const hit = await page.evaluate(
    ({ x, y }) =>
      document.elementFromPoint(x, y)?.closest("a")?.getAttribute("href"),
    { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 },
  );
  assert.equal(hit, project.href);
  const pending = page.waitForEvent("popup");
  await page.mouse.click(rect.x + rect.width / 2, rect.y + rect.height / 2);
  const popup = await pending;
  await popup.waitForLoadState("domcontentloaded");
  assert.equal(new URL(popup.url()).href, new URL(project.href).href);
  await popup.close();
  if (project.repo) {
    const pendingRepo = page.waitForEvent("popup");
    await card.locator(".repo-link").click();
    const repo = await pendingRepo;
    await repo.waitForLoadState("domcontentloaded");
    assert.equal(repo.url(), project.repo);
    await repo.close();
  }
  results.push({
    project: project.name,
    wholeCardThumbnailClick: true,
    separateRepositoryLink: !!project.repo,
  });
}
const touch = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  hasTouch: true,
});
await touch.goto(url);
assert.equal(
  await touch
    .locator(".spotlight")
    .evaluate((el) => getComputedStyle(el).display),
  "none",
);
await writeFile(
  "docs/link-check.json",
  JSON.stringify(
    {
      url,
      checkedAt: new Date().toISOString(),
      results,
      desktopTouchSpotlightOff: true,
    },
    null,
    2,
  ),
);
console.log(JSON.stringify(results));
await browser.close();
