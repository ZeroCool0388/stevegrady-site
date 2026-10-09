import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const url = process.env.QA_URL || "http://localhost:3000";
const browser = await chromium.launch();
await mkdir("docs/screenshots", { recursive: true });
const results = [];
for (const width of [1440, 390, 360]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 1440 ? 1000 : 844 },
    hasTouch: width < 760,
    isMobile: width < 760,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page.locator("h1").getAttribute("aria-label"),
    "I design AI-native solutions that get bought and used.",
  );
  assert.equal(await page.locator("article.project").count(), 4);
  assert.equal(
    await page
      .locator("body")
      .innerText()
      .then((t) => t.includes("closed-won")),
    false,
  );
  assert.equal(await page.locator('a[href^="mailto:"]').count(), 0);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    `overflow at ${width}`,
  );
  if (width !== 360)
    await page.screenshot({
      path: `docs/screenshots/${width === 1440 ? "desktop" : "mobile"}-hero.png`,
    });
  await page.getByRole("link", { name: "View my work", exact: true }).click();
  await page.waitForFunction(
    () =>
      Math.abs(document.querySelector("#work").getBoundingClientRect().top) <
      70,
  );
  await page.waitForTimeout(1100);
  assert.ok(Math.abs((await page.locator("#work").boundingBox()).y) < 70);
  await page
    .locator("#work img")
    .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
  if (width !== 360) {
    await page.screenshot({
      path: `docs/screenshots/${width === 1440 ? "desktop" : "mobile"}-work.png`,
    });
    await page
      .locator("#work")
      .screenshot({
        path: `docs/screenshots/${width === 1440 ? "desktop" : "mobile"}-work-full.png`,
      });
  }
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    axe.violations,
    [],
    JSON.stringify(
      axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ),
  );
  if (width === 1440) {
    for (const section of ["about", "approach", "contact"]) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await page
        .locator(`#${section}`)
        .screenshot({ path: `docs/screenshots/desktop-${section}.png` });
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(
    await page
      .locator(".spotlight")
      .evaluate((el) => getComputedStyle(el).display),
    "none",
  );
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.classList.contains("lenis"),
    ),
    false,
  );
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to content",
  );
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "main");
  const pdf = await page.request.get(`${url}/cv/steve-grady-cv.pdf`);
  assert.equal(pdf.status(), 200);
  assert.ok((await pdf.body()).toString().includes("CV coming soon"));
  if (width === 1440) {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.reload({ waitUntil: "networkidle" });
    await page.mouse.move(400, 300);
    assert.ok(
      await page
        .locator(".spotlight")
        .evaluate((el) => el.style.getPropertyValue("--pointer-x")),
    );
    await page.locator("a[data-magnetic]").first().hover();
    assert.notEqual(
      await page
        .locator("a[data-magnetic]")
        .first()
        .evaluate((el) => el.style.translate),
      "",
    );
  }
  const response = await page.goto(`${url}/page-that-does-not-exist`, {
    waitUntil: "networkidle",
  });
  assert.equal(response.status(), 404);
  await page.getByRole("link", { name: "Back to home" }).click();
  await page.waitForURL(url + "/");
  assert.deepEqual(errors, []);
  results.push({
    width,
    overflow: false,
    axeViolations: 0,
    anchors: true,
    reducedMotion: true,
    skipLink: true,
    cv: true,
    notFound: true,
    errors,
  });
  await context.close();
}
const page = await browser.newPage({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
await page.goto(url);
assert.equal(await page.locator("article.project").count(), 4);
assert.equal(await page.locator("h1").isVisible(), true);
await page.close();
await writeFile(
  "docs/qa-results.json",
  JSON.stringify({ url, results, noJavaScript: true }, null, 2),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
