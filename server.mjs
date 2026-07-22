// Tiny, dependency-free static server for the built Storybook (Railway runtime).
// Binds to Railway's injected $PORT on 0.0.0.0, serves ./storybook-static, and
// falls back to index.html so deep links to stories resolve.
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("./storybook-static/", import.meta.url));
const PORT = Number(process.env.PORT) || 8080;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
};

async function send(res, path, status = 200) {
  const body = await readFile(path);
  const ext = extname(path).toLowerCase();
  res.writeHead(status, {
    "content-type": TYPES[ext] ?? "application/octet-stream",
    "cache-control": ext === ".html" ? "no-cache" : "public, max-age=3600",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const filePath = normalize(join(ROOT, pathname));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    try {
      const info = await stat(filePath);
      if (info.isDirectory()) {
        await send(res, join(filePath, "index.html"));
        return;
      }
      await send(res, filePath);
    } catch {
      await send(res, join(ROOT, "index.html")); // SPA fallback
    }
  } catch {
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`MLZ Design playground on http://0.0.0.0:${PORT}`);
});
