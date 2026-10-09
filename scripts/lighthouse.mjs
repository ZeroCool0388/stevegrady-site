import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const url = process.env.QA_URL || "http://localhost:3000";
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
const scores = {};
try {
  for (const formFactor of ["mobile", "desktop"]) {
    const options = {
      port: chrome.port,
      output: "json",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      logLevel: "error",
    };
    if (formFactor === "desktop") {
      options.formFactor = "desktop";
      options.screenEmulation = {
        mobile: false,
        width: 1440,
        height: 1000,
        deviceScaleFactor: 1,
        disabled: false,
      };
      options.throttling = {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      };
    }
    const { lhr } = await lighthouse(url, options);
    scores[formFactor] = Object.fromEntries(
      Object.entries(lhr.categories).map(([k, v]) => [
        k,
        Math.round(v.score * 100),
      ]),
    );
    const issues = Object.entries(lhr.audits)
      .filter(([, v]) => v.score !== null && v.score < 0.9)
      .map(([id, v]) => ({
        id,
        title: v.title,
        score: v.score,
        displayValue: v.displayValue,
        details: v.details,
      }));
    await writeFile(
      `docs/lighthouse-${formFactor}.json`,
      JSON.stringify(
        {
          url,
          fetchTime: lhr.fetchTime,
          lighthouseVersion: lhr.lighthouseVersion,
          scores: scores[formFactor],
          issues,
        },
        null,
        2,
      ),
    );
    console.log(formFactor, scores[formFactor]);
  }
  await writeFile(
    "docs/lighthouse-scores.json",
    JSON.stringify({ url, scores }, null, 2),
  );
} finally {
  await chrome.kill();
}
