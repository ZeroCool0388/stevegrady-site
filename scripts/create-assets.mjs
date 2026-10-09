import sharp from "sharp";
import fs from "node:fs/promises";
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#0b0d12"/><text x="64" y="105" fill="#f3f3ed" font-family="sans-serif" font-weight="700" font-size="32">Steve Grady</text><text x="64" y="280" fill="#f3f3ed" font-family="sans-serif" font-weight="700" font-size="88">AI-native solutions.</text><text x="64" y="385" fill="#c6ff3d" font-family="sans-serif" font-weight="700" font-size="88">Built to work.</text><text x="64" y="520" fill="#a5a7af" font-family="sans-serif" font-size="27">AI-native solution design, integrations &amp; pre-sales</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og.png");
const icon = Buffer.from(
  `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" rx="36" fill="#0b0d12"/><text x="90" y="117" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="76" fill="#c6ff3d">SG</text></svg>`,
);
await sharp(icon).png().toFile("public/apple-touch-icon.png");
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
await fs.writeFile("public/favicon.ico", Buffer.concat([header, png]));
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];
const stream = "BT /F1 24 Tf 72 740 Td (CV coming soon) Tj ET";
objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
let pdf = "%PDF-1.4\n",
  offsets = [0];
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
await fs.writeFile("public/cv/steve-grady-cv.pdf", pdf);
