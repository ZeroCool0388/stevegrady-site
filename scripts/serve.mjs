import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".json": "application/json",
};
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = resolve(root, "." + path);
    if (!file.startsWith(root + "/") && file !== root) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = resolve(file, "index.html");
    } catch {
      try {
        await stat(file + ".html");
        file += ".html";
      } catch {
        file = resolve(root, "404.html");
        status = 404;
      }
    }
    const extension = extname(file);
    let content = await readFile(file);
    const headers = {
      "Content-Type": mime[extension] || "application/octet-stream",
      "Cache-Control": file.includes("/_next/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
    };
    if (
      /\.(html|css|js|txt|xml|json)$/.test(file) &&
      req.headers["accept-encoding"]?.includes("gzip")
    ) {
      content = gzipSync(content);
      headers["Content-Encoding"] = "gzip";
      headers.Vary = "Accept-Encoding";
    }
    res.writeHead(status, headers);
    res.end(content);
  } catch {
    res.writeHead(500);
    res.end();
  }
}).listen(3000, () => console.log("Static site at http://localhost:3000"));
