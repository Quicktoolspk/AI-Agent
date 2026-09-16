// /api/generate.js — Vercel serverless entrypoint. Delegates to lib/generateCore.js.
import { runGeneration } from "../lib/generateCore.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }
  try {
    const json = await runGeneration(req.body || {}, process.env);
    res.status(200).json(json);
  } catch (err) {
    console.error("generate.js error:", err);
    res.status(err.status || 500).json({ error: err.message || "Generation failed." });
  }
}
