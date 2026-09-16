// server.js — plain Node server for LOCAL TESTING ONLY (optional; not needed for the GitHub/Vercel route).
// Run: node server.js
// Then open: http://localhost:3000/agent/

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runGeneration } from "./lib/generateCore.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  const env = { ...process.env };
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in env)) env[key] = value;
    }
  }
  return env;
}

const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };

const server = http.createServer(async (req, res) => {
  const env = loadEnv();

  if (req.method === "POST" && req.url === "/api/generate") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        const result = await runGeneration(parsed, env);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error(err);
        res.writeHead(err.status || 500, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: err.message || "Generation failed." }));
      }
    });
    return;
  }

  let filePath = req.url === "/" ? "/agent/index.html" : req.url;
  filePath = path.join(__dirname, decodeURIComponent(filePath.split("?")[0]));
  if (!filePath.startsWith(__dirname)) { res.writeHead(403); res.end("Forbidden"); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found: " + req.url); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { "content-type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\nSoftgarments AI Blog Agent running locally:`);
  console.log(`  http://localhost:${PORT}/agent/\n`);
  const env = loadEnv();
  if (!env.ANTHROPIC_API_KEY && !env.OPENAI_API_KEY) {
    console.log("WARNING: no API key found in .env yet — Analyze Post will fail until you add one.\n");
  }
});
