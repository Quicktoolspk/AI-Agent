// /lib/generateCore.js
// Shared logic used by BOTH api/generate.js (Vercel) and server.js (plain local dev server).

export const FORBIDDEN_PHRASES = [
  "in today's fast-paced world", "whether you're", "look no further",
  "unlock the secrets", "elevate your style", "game-changer", "seamlessly",
  "in the world of fashion", "when it comes to"
];

export const SITE_LINKS = [
  { label: "Home", url: "https://www.softgarments.com/" },
  { label: "New Arrivals", url: "../../collection.html" },
  { label: "Ready To Wear", url: "../../collection-RTW.html" },
  { label: "Fabrics", url: "../../collection-fabrics.html" },
  { label: "Garments", url: "../../garments.html" },
  { label: "Sale", url: "../../collection-sale.html" }
];

export const SYSTEM_PROMPT = `You are the content engine for the Softgarments AI Blog Agent.

SOFTGARMENTS BRAND:
- Positioning: "Best Online Clothing Brand in Pakistan" — premium women's clothing, everyday fashion, comfort, quality fabrics, ready-to-wear, modern style.
- Audience: modern women, Pakistani online fashion shoppers.
- Nationwide Cash on Delivery, WhatsApp ordering, free delivery over Rs. 3,000.
- Tone: human, natural, friendly, helpful, practical, modern, professional. Simple English. NOT robotic, NOT keyword-stuffed, NOT overly salesy.
- Never invent product specs, prices, sizes, fabric composition, or availability. If the caption doesn't state a fact, don't state it as fact.
- NEVER use these generic AI phrases or anything equivalent to them: ${FORBIDDEN_PHRASES.join("; ")}.
- The only site links that exist (use ONLY these for internal links, never invent a URL):
${SITE_LINKS.map(l => `  - ${l.label}: ${l.url}`).join("\n")}

TASK:
Given a social media caption, produce a genuinely useful blog article — NOT a rewritten sales caption. Find a specific, practical angle (styling advice, fabric/fit guidance, occasion guidance, seasonal context, Pakistani fashion context) that a reader can actually use. Reference Softgarments naturally, at most once or twice, never repeating "buy now" language.

OUTPUT FORMAT:
Return ONLY valid JSON (no markdown fences, no commentary) matching exactly this shape:

{
  "analysis": {
    "topic": string,
    "audience": string,
    "searchIntent": string,
    "contentType": string,
    "season": string,
    "opportunity": string
  },
  "seo": {
    "primaryKeyword": string,
    "secondaryKeywords": string[5..10],
    "longTail": string[5..10],
    "questions": string[5..10],
    "semantic": string[10..20]
  },
  "angle": {
    "common": string,
    "unique": string,
    "why": string
  },
  "blog": {
    "title": string,
    "category": string,
    "slug": string,
    "excerpt": string,
    "bodyHtml": string,
    "faq": [{"q": string, "a": string}],
    "internalLinks": [{"label": string, "url": string}]
  },
  "metadata": {
    "metaTitle": string,
    "metaDescription": string,
    "ogTitle": string,
    "ogDescription": string
  },
  "image": {
    "prompt": string,
    "altText": string
  }
}

RULES FOR bodyHtml:
- Raw HTML fragment only (no <html>/<body>). Use <p>, <h2>, <ul><li>, <strong> as needed. No <h1> (the page template renders the H1 separately from "blog.title").
- 1000-1800 words unless the topic genuinely needs less.
- Include: short engaging intro, practical/useful main content, an unusually specific practical insight, common mistakes, a natural Softgarments mention, and a short conclusion. Do NOT include the FAQ inside bodyHtml — FAQ is returned separately.
- slug: lowercase, hyphenated, short, no dates, matches the pattern used at blog/posts/<slug>.html
- category must be one of: Fashion, Style, Fabric, Garments, Trends, Sale, Designer (pick the closest fit)
- internalLinks: 2-4 entries max, chosen ONLY from the allowed list above, relevant to the content`;

export async function callAnthropic({ apiKey, model, messages, system }) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: model || "claude-sonnet-4-6",
      max_tokens: 4096,
      system,
      messages
    })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Anthropic API error (${resp.status}): ${text}`);
  }
  const data = await resp.json();
  const textBlock = (data.content || []).find(b => b.type === "text");
  return textBlock ? textBlock.text : "";
}

export async function callOpenAI({ apiKey, model, messages, system }) {
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || "gpt-4.1",
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.7
    })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenAI API error (${resp.status}): ${text}`);
  }
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || "";
}

export function extractJson(raw) {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Model did not return JSON");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function runGeneration({ action, caption, currentDraft, instruction, passcode }, env) {
  if (env.AGENT_PASSCODE && passcode !== env.AGENT_PASSCODE) {
    throw Object.assign(new Error("Incorrect passcode."), { status: 401 });
  }

  if (!action || (action !== "analyze" && action !== "command")) {
    throw Object.assign(new Error("Missing or invalid 'action' (expected 'analyze' or 'command')."), { status: 400 });
  }

  const provider = (env.AI_PROVIDER || "anthropic").toLowerCase();
  const model = env.AI_MODEL;

  let userContent;
  if (action === "analyze") {
    if (!caption || !caption.trim()) {
      throw Object.assign(new Error("Missing 'caption'."), { status: 400 });
    }
    userContent = `Social media caption:\n"""\n${caption}\n"""\n\nAnalyze it and produce the full JSON output as instructed.`;
  } else {
    if (!currentDraft || !instruction || !instruction.trim()) {
      throw Object.assign(new Error("Missing 'currentDraft' or 'instruction' for a command action."), { status: 400 });
    }
    userContent = `Here is the CURRENT draft JSON:\n${JSON.stringify(currentDraft)}\n\nApply this instruction: "${instruction}"\n\nReturn the FULL updated JSON in the exact same shape, with the instruction applied. Keep everything else unchanged unless the instruction implies it should change.`;
  }

  const messages = [{ role: "user", content: userContent }];

  let raw;
  if (provider === "openai") {
    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    raw = await callOpenAI({ apiKey, model, messages, system: SYSTEM_PROMPT });
  } else {
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
    raw = await callAnthropic({ apiKey, model, messages, system: SYSTEM_PROMPT });
  }

  return extractJson(raw);
}
