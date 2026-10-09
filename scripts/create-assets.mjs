import { chromium } from "playwright";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => {
  const font = getComputedStyle(document.body).fontFamily;
  document.body.innerHTML =
    '<div style="position:absolute;inset:0;background:#0f172a;padding:90px 80px;display:flex;flex-direction:column;justify-content:center"><div style="width:64px;height:2px;background:#5eead4;margin-bottom:36px"></div><div style="font-size:76px;font-weight:700;letter-spacing:-3px;color:#e2e8f0">Steve Grady</div><div style="font-size:32px;margin-top:24px;color:#94a3b8">Senior Technical Solutions Consultant</div></div>';
  document.body.style.fontFamily = font;
});
await page.screenshot({ path: "public/og.png" });
await page.setViewportSize({ width: 180, height: 180 });
await page.evaluate(() => {
  document.body.innerHTML =
    '<div style="position:absolute;inset:0;background:#0f172a;color:#5eead4;display:flex;align-items:center;justify-content:center;font-size:72px;font-weight:700;letter-spacing:-4px">SG</div>';
});
const icon = await page.screenshot();
await writeFile("public/apple-touch-icon.png", icon);
const png = await sharp(icon).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png]));
await browser.close();
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];
const stream = "BT /F1 24 Tf 72 740 Td (CV coming soon) Tj ET";
objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
let pdf = "%PDF-1.4\n";
const offsets = [0];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 6\n0000000000 65535 f \n${offsets
  .slice(1)
  .map((n) => String(n).padStart(10, "0") + " 00000 n ")
  .join(
    "\n",
  )}\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
await writeFile("public/cv/steve-grady-cv.pdf", pdf);
console.log("Inter sharing image, icons and one-page CV created.");
