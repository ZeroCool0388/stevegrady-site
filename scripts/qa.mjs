import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import {
  site,
  about,
  experience,
  projects,
} from "../src/config/site.ts";
const url = process.env.QA_URL || "http://localhost:3000";
const browser = await chromium.launch();
const results = [];
for (const width of [1440, 390, 360, 768, 1024]) {
  const context = await browser.newContext({
    viewport: { width, height: width >= 1024 ? 1000 : 844 },
    hasTouch: width < 1024,
    isMobile: width < 768,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.title(), `${site.name} | ${site.title}`);
  assert.equal(
    await page.locator('meta[name="description"]').getAttribute("content"),
    site.description,
  );
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    site.url,
  );
  assert.equal(await page.locator("h1").textContent(), site.name);
  assert.deepEqual(
    await page.locator(".about-copy p").allTextContents(),
    about,
  );
  assert.equal(await page.locator("main section").count(), 3);
  assert.equal(await page.locator(".experience-card").count(), 4);
  assert.equal(await page.locator(".work-card").count(), 4);
  assert.equal(
    (await page.locator("body").innerText()).includes("closed-won"),
    false,
  );
  assert.equal(await page.locator('a[href^="mailto:"]').count(), 0);
  for (const [i, role] of experience.entries()) {
    const card = page.locator(".experience-card").nth(i);
    assert.equal(await card.locator("h3").textContent(), role.title);
    assert.equal(await card.locator(".date").textContent(), role.date);
    assert.equal(
      await card.locator(".descriptor").textContent(),
      role.descriptor,
    );
    if (role.description)
      assert.equal(
        await card.locator(".card-description").textContent(),
        role.description,
      );
    assert.deepEqual(
      await card.locator(".pills li").allTextContents(),
      role.skills,
    );
    assert.equal(await card.locator("a").count(), 0);
  }
  for (const [i, project] of projects.entries()) {
    const card = page.locator(".work-card").nth(i);
    assert.equal(
      await card.locator(".project-link").getAttribute("href"),
      project.href,
    );
    assert.equal(
      await card.locator(".card-description").textContent(),
      project.description,
    );
    assert.deepEqual(
      await card.locator(".pills li").allTextContents(),
      project.skills,
    );
    if (project.repo)
      assert.equal(
        await card.locator(".repo-link").getAttribute("href"),
        project.repo,
      );
  }
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    `overflow at ${width}`,
  );
  const spotlightDisplay = await page
    .locator(".spotlight")
    .evaluate((el) => getComputedStyle(el).display);
  assert.equal(spotlightDisplay, width < 1024 ? "none" : "block");
  if (width === 1440 || width === 390)
    await page.screenshot({
      path: `docs/screenshots/${width === 1440 ? "desktop" : "mobile"}-top.png`,
    });
  for (const id of ["experience", "work"]) {
    if (width >= 1024) {
      await page
        .getByRole("navigation", { name: "Sections" })
        .getByRole("link", { name: id, exact: true })
        .click();
    } else await page.locator(`#${id}`).evaluate((el) => el.scrollIntoView());
    await page.waitForTimeout(1100);
    if (width >= 1024)
      assert.equal(
        await page.locator(`nav a[href="#${id}"]`).getAttribute("aria-current"),
        "location",
      );
    if (width < 1024) {
      assert.ok(
        (await page.locator("#identity").getAttribute("class")).includes(
          "compact",
        ),
      );
      assert.equal(
        await page
          .locator(".identity")
          .evaluate((el) => getComputedStyle(el).position),
        "sticky",
      );
      assert.equal(
        await page
          .locator(`#${id} .section-label`)
          .evaluate((el) => getComputedStyle(el).position),
        "sticky",
      );
    }
    if (id === "work")
      await page
        .locator("#work img")
        .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
    if (width === 1440 && id === "experience") {
      await page.locator(".experience-card").first().hover();
      await page.waitForTimeout(250);
      assert.equal(
        await page
          .locator(".experience-card")
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundColor),
        "rgba(30, 41, 59, 0.5)",
      );
    }
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `docs/screenshots/${width === 1440 ? "desktop" : "mobile"}-${id}.png`,
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
    await page.mouse.move(410, 240);
    assert.ok((await page.locator(".spotlight").getAttribute("style")).includes("410px"));
    const icon = page.locator("[data-magnetic]").first();
    await icon.scrollIntoViewIfNeeded();
    await icon.hover({position: {x: 3, y: 3}});
    await page.waitForTimeout(250);
    assert.notEqual(await icon.evaluate(el => getComputedStyle(el).transform), "none");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.classList.contains("lenis"),
    ),
    false,
  );
  const spotBefore = await page.locator(".spotlight").getAttribute("style");
  await page.mouse.move(300, 200);
  assert.equal(
    await page.locator(".spotlight").getAttribute("style"),
    spotBefore,
  );
  assert.equal(
    await page
      .locator(".spotlight")
      .evaluate((el) => getComputedStyle(el).display),
    width < 1024 ? "none" : "block",
  );
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to content",
  );
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "main");
  const keyboardPage = await context.newPage();
  await keyboardPage.emulateMedia({ reducedMotion: "reduce" });
  await keyboardPage.goto(url, { waitUntil: "networkidle" });
  const expected = await keyboardPage
    .locator("a[href]")
    .evaluateAll((links) =>
      links
        .filter(
          (a) =>
            a.getClientRects().length &&
            getComputedStyle(a).visibility !== "hidden",
        )
        .map((a) => a.getAttribute("href")),
    );
  const actual = [];
  for (let i = 0; i < expected.length; i++) {
    await keyboardPage.keyboard.press("Tab");
    const focused = await keyboardPage.evaluate(() => {
      const el = document.activeElement;
      return {
        href: el.getAttribute("href"),
        outline: getComputedStyle(
          el.classList.contains("project-link") ? el.closest(".card") : el,
        ).outlineStyle,
      };
    });
    actual.push(focused.href);
    assert.notEqual(focused.outline, "none");
  }
  assert.deepEqual(actual, expected);
  await keyboardPage.close();
  const pdf = await page.request.get(`${url}/cv/steve-grady-cv.pdf`);
  assert.equal(pdf.status(), 200);
  assert.ok((await pdf.body()).toString().includes("CV coming soon"));
  for (const route of [
    "/og.png",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/robots.txt",
    "/sitemap.xml",
  ])
    assert.equal((await page.request.get(url + route)).status(), 200, route);
  const response = await page.goto(url + "/missing-page", {
    waitUntil: "networkidle",
  });
  assert.equal(response.status(), 404);
  await page.getByRole("link", { name: "Back to home" }).click();
  await page.waitForURL(url + "/");
  assert.deepEqual(errors, []);
  results.push({
    width,
    exactCopy: true,
    overflow: false,
    axeViolations: 0,
    scrollSpy: width >= 1024,
    stickyMobileHeader: width < 1024,
    reducedMotion: true,
    keyboard: true,
    assets: true,
    custom404: true,
    errors,
  });
  await context.close();
}
const noJs = await browser.newPage({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
await noJs.goto(url);
assert.equal(await noJs.locator(".work-card").count(), 4);
assert.equal(await noJs.locator(".about-copy").isVisible(), true);
await noJs.close();
await writeFile(
  "docs/qa-results.json",
  JSON.stringify(
    { url, checkedAt: new Date().toISOString(), results, noJavaScript: true },
    null,
    2,
  ),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
