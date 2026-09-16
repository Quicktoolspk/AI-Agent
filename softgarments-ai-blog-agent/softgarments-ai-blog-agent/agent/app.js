(function () {
  "use strict";

  const PASSCODE_KEY = "sg_agent_passcode";

  // ─────────────────────────────────────────────────────────────
  // PASSCODE LOCK
  // ─────────────────────────────────────────────────────────────
  function getPasscode() {
    return localStorage.getItem(PASSCODE_KEY) || "";
  }

  async function tryUnlock(code) {
    // A cheap ping using the 'command' action's validation path would need a draft,
    // so we validate by calling analyze with a throwaway caption — the server checks
    // the passcode before doing anything else and returns 401 immediately if wrong.
    const resp = await fetch("/api/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "analyze", caption: "ping", passcode: code })
    });
    if (resp.status === 401) return false;
    return true; // any other response (incl. a downstream AI error) means the passcode itself was accepted
  }

  document.getElementById("lockBtn").addEventListener("click", unlockFlow);
  document.getElementById("lockInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") unlockFlow();
  });

  async function unlockFlow() {
    const code = document.getElementById("lockInput").value;
    const btn = document.getElementById("lockBtn");
    const err = document.getElementById("lockError");
    err.hidden = true;
    btn.disabled = true;
    btn.textContent = "Checking…";
    try {
      const ok = await tryUnlock(code);
      if (!ok) {
        err.textContent = "Wrong passcode.";
        err.hidden = false;
        return;
      }
      localStorage.setItem(PASSCODE_KEY, code);
      document.getElementById("lockOverlay").hidden = true;
      document.getElementById("shellRoot").hidden = false;
    } catch (e) {
      err.textContent = "Couldn't reach the server. Try again.";
      err.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = "Unlock";
    }
  }

  // if we already have a saved passcode, skip the lock screen immediately
  // (it will still be sent with every real request; if it's wrong the request will fail with a clear error)
  if (getPasscode()) {
    document.getElementById("lockOverlay").hidden = true;
    document.getElementById("shellRoot").hidden = false;
  }

  // ─────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────
  let draft = null;      // the full generated/edited object
  let currentStep = "input";
  const STEP_ORDER = ["input", "analysis", "draft", "publish"];
  const DRAFTS_KEY = "sg_blog_agent_drafts_v1";

  const FORBIDDEN_PHRASES = [
    "in today's fast-paced world", "whether you're", "look no further",
    "unlock the secrets", "elevate your style", "game-changer", "seamlessly"
  ];

  const ALLOWED_LINKS = [
    { label: "Home", url: "https://www.softgarments.com/" },
    { label: "New Arrivals", url: "../../collection.html" },
    { label: "Ready To Wear", url: "../../collection-RTW.html" },
    { label: "Fabrics", url: "../../collection-fabrics.html" },
    { label: "Garments", url: "../../garments.html" },
    { label: "Sale", url: "../../collection-sale.html" }
  ];

  // ─────────────────────────────────────────────────────────────
  // DOM SHORTCUTS
  // ─────────────────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);

  // ─────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────
  function goto(step) {
    if (step === "analysis" || step === "draft" || step === "publish") {
      if (!draft) return;
    }
    currentStep = step;
    STEP_ORDER.forEach((s) => {
      $("panel-" + s).hidden = s !== step;
    });
    document.querySelectorAll(".pipeline-step").forEach((btn) => {
      const s = btn.dataset.step;
      btn.classList.toggle("is-active", s === step);
      if (draft && STEP_ORDER.indexOf(s) < STEP_ORDER.indexOf(currentStep)) {
        btn.classList.add("is-done");
      }
      btn.disabled = !draft && s !== "input";
    });
    if (step === "publish") {
      renderScore();
      renderPreview();
    }
  }

  document.querySelectorAll(".pipeline-step").forEach((btn) => {
    btn.addEventListener("click", () => goto(btn.dataset.step));
  });
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => goto(btn.dataset.goto));
  });

  // ─────────────────────────────────────────────────────────────
  // ANALYZE
  // ─────────────────────────────────────────────────────────────
  $("analyzeBtn").addEventListener("click", async () => {
    const caption = $("captionInput").value.trim();
    $("inputError").hidden = true;
    if (!caption) {
      showError("inputError", "Paste a caption first.");
      return;
    }
    setBusy($("analyzeBtn"), true, "Analyzing…");
    try {
      const result = await callApi({ action: "analyze", caption });
      draft = normalizeDraft(result);
      renderAnalysis();
      renderDraftForm();
      setLastAction("Generated from caption");
      goto("analysis");
    } catch (err) {
      showError("inputError", err.message);
    } finally {
      setBusy($("analyzeBtn"), false, "Analyze Post");
    }
  });

  // ─────────────────────────────────────────────────────────────
  // COMMAND BAR
  // ─────────────────────────────────────────────────────────────
  $("commandBtn").addEventListener("click", runCommand);
  $("commandInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runCommand();
  });

  async function runCommand() {
    const instruction = $("commandInput").value.trim();
    if (!instruction || !draft) return;
    setBusy($("commandBtn"), true, "Working…");
    try {
      syncFormToDraft(); // capture any manual edits first
      const result = await callApi({ action: "command", currentDraft: draft, instruction });
      draft = normalizeDraft(result);
      renderAnalysis();
      renderDraftForm();
      setLastAction('Applied: "' + instruction + '"');
      $("commandInput").value = "";
    } catch (err) {
      alert("Command failed: " + err.message);
    } finally {
      setBusy($("commandBtn"), false, "Run");
    }
  }

  // ─────────────────────────────────────────────────────────────
  // API CALL
  // ─────────────────────────────────────────────────────────────
  async function callApi(body) {
    const resp = await fetch("/api/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...body, passcode: getPasscode() })
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      throw new Error(data.error || "Request failed (" + resp.status + ")");
    }
    return data;
  }

  function normalizeDraft(d) {
    d.blog = d.blog || {};
    d.blog.faq = d.blog.faq || [];
    d.blog.internalLinks = (d.blog.internalLinks || []).filter((l) =>
      ALLOWED_LINKS.some((a) => a.url === l.url)
    );
    d.metadata = d.metadata || {};
    d.image = d.image || {};
    d.seo = d.seo || {};
    d.analysis = d.analysis || {};
    d.angle = d.angle || {};
    if (!d.blog.publishedDate) d.blog.publishedDate = new Date().toISOString().slice(0, 10);
    return d;
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: ANALYSIS + SEO
  // ─────────────────────────────────────────────────────────────
  function renderAnalysis() {
    const a = draft.analysis;
    $("analysisKv").innerHTML = [
      ["Topic", a.topic], ["Audience", a.audience], ["Search intent", a.searchIntent],
      ["Content type", a.contentType], ["Season", a.season], ["Opportunity", a.opportunity]
    ].map(([k, v]) => kvRow(k, v)).join("");

    const g = draft.angle;
    $("angleKv").innerHTML = [
      ["Common angle", g.common], ["Recommended angle", g.unique], ["Why it's useful", g.why]
    ].map(([k, v]) => kvRow(k, v)).join("");

    renderChips("kwPrimary", [draft.seo.primaryKeyword]);
    renderChips("kwSecondary", draft.seo.secondaryKeywords);
    renderChips("kwLongtail", draft.seo.longTail);
    renderChips("kwQuestions", draft.seo.questions);
    renderChips("kwSemantic", draft.seo.semantic);
  }

  function kvRow(label, value) {
    return "<dt>" + esc(label) + "</dt><dd>" + esc(value || "\u2014") + "</dd>";
  }

  function renderChips(id, items) {
    $(id).innerHTML = (items || []).filter(Boolean).map((t) =>
      '<span class="chip">' + esc(t) + "</span>"
    ).join("");
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: DRAFT FORM
  // ─────────────────────────────────────────────────────────────
  function renderDraftForm() {
    const b = draft.blog, m = draft.metadata, img = draft.image;
    $("fieldTitle").value = b.title || "";
    $("fieldCategory").value = b.category || "Fashion";
    $("fieldSlug").value = b.slug || "";
    $("fieldDate").value = b.publishedDate || "";
    $("fieldExcerpt").value = b.excerpt || "";
    $("fieldBody").value = b.bodyHtml || "";
    $("fieldMetaTitle").value = m.metaTitle || "";
    $("fieldMetaDesc").value = m.metaDescription || "";
    $("fieldImagePrompt").value = img.prompt || "";
    $("fieldAltText").value = img.altText || "";
    renderFaqEditor();
    updateCharCounts();
  }

  function renderFaqEditor() {
    const wrap = $("faqEditor");
    wrap.innerHTML = "";
    (draft.blog.faq || []).forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "faq-row";
      row.innerHTML =
        '<div class="faq-fields">' +
        '<input type="text" data-faq-q="' + i + '" placeholder="Question" value="' + escAttr(item.q) + '" />' +
        '<textarea data-faq-a="' + i + '" rows="2" placeholder="Answer">' + esc(item.a) + "</textarea>" +
        "</div>" +
        '<button class="faq-del" data-faq-del="' + i + '" title="Remove">&times;</button>';
      wrap.appendChild(row);
    });
    wrap.querySelectorAll("[data-faq-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        draft.blog.faq.splice(Number(btn.dataset.faqDel), 1);
        renderFaqEditor();
      });
    });
  }

  $("addFaqBtn").addEventListener("click", () => {
    draft.blog.faq = draft.blog.faq || [];
    draft.blog.faq.push({ q: "", a: "" });
    renderFaqEditor();
  });

  ["fieldMetaTitle", "fieldMetaDesc"].forEach((id) => {
    $(id).addEventListener("input", updateCharCounts);
  });

  function updateCharCounts() {
    const t = $("fieldMetaTitle").value.length;
    const d = $("fieldMetaDesc").value.length;
    $("metaTitleCount").textContent = t + " chars (aim 50\u201360)";
    $("metaDescCount").textContent = d + " chars (aim 140\u2013160)";
  }

  // pull current form values back into `draft`
  function syncFormToDraft() {
    if (!draft) return;
    draft.blog.title = $("fieldTitle").value;
    draft.blog.category = $("fieldCategory").value;
    draft.blog.slug = $("fieldSlug").value;
    draft.blog.publishedDate = $("fieldDate").value;
    draft.blog.excerpt = $("fieldExcerpt").value;
    draft.blog.bodyHtml = $("fieldBody").value;
    draft.metadata.metaTitle = $("fieldMetaTitle").value;
    draft.metadata.metaDescription = $("fieldMetaDesc").value;
    draft.image.prompt = $("fieldImagePrompt").value;
    draft.image.altText = $("fieldAltText").value;
    const faq = [];
    document.querySelectorAll("[data-faq-q]").forEach((input) => {
      const i = Number(input.dataset.faqQ);
      faq[i] = faq[i] || { q: "", a: "" };
      faq[i].q = input.value;
    });
    document.querySelectorAll("[data-faq-a]").forEach((ta) => {
      const i = Number(ta.dataset.faqA);
      faq[i] = faq[i] || { q: "", a: "" };
      faq[i].a = ta.value;
    });
    draft.blog.faq = faq.filter((f) => f.q || f.a);
  }

  // ─────────────────────────────────────────────────────────────
  // QUALITY SCORE (computed locally, no AI call)
  // ─────────────────────────────────────────────────────────────
  function computeScore() {
    syncFormToDraft();
    const b = draft.blog, m = draft.metadata, img = draft.image;
    const warnings = [];
    let score = 0;
    const wordCount = stripTags(b.bodyHtml).split(/\s+/).filter(Boolean).length;

    check(!!b.title, 10, "Title is missing.");
    check(!!m.metaTitle && m.metaTitle.length <= 60, 8, "Meta title missing or over 60 characters.");
    check(!!m.metaDescription && m.metaDescription.length >= 120 && m.metaDescription.length <= 160, 8, "Meta description should be ~140\u2013160 characters.");
    check(!!b.slug && /^[a-z0-9-]+$/.test(b.slug), 8, "Slug should be lowercase letters, numbers, and hyphens only.");
    check(!!draft.seo.primaryKeyword && b.title.toLowerCase().includes(draft.seo.primaryKeyword.toLowerCase().split(" ")[0]), 8, "Primary keyword doesn't clearly appear in the title.");
    check(wordCount >= 700 && wordCount <= 2000, 12, "Body is " + wordCount + " words \u2014 aim for roughly 1000\u20131800.");
    check(!!img.altText, 8, "Image alt text is missing.");
    check(!!img.prompt, 6, "Featured image prompt is missing.");
    check((b.faq || []).length > 0, 8, "No FAQ items yet.");
    check((b.internalLinks || []).length > 0, 6, "No internal links added.");
    const forbiddenHit = FORBIDDEN_PHRASES.find((p) => stripTags(b.bodyHtml).toLowerCase().includes(p));
    check(!forbiddenHit, 10, forbiddenHit ? 'Generic AI phrase found: "' + forbiddenHit + '".' : "");
    check(!!b.excerpt && b.excerpt.length <= 200, 8, "Excerpt missing or too long.");

    function check(pass, points, warnText) {
      if (pass) { score += points; }
      else if (warnText) { warnings.push(warnText); }
    }
    return { score, warnings, wordCount };
  }

  function renderScore() {
    const { score, warnings } = computeScore();
    $("scoreNumber").textContent = score;
    $("scoreRing").style.borderColor = score >= 80 ? "#5B7A63" : score >= 55 ? "#B4863C" : "#C15A5A";
    $("scoreWarnings").innerHTML = warnings.length
      ? warnings.map((w) => '<div class="warn">' + esc(w) + "</div>").join("")
      : "<div>No critical issues found.</div>";
  }

  // ─────────────────────────────────────────────────────────────
  // BLOG HTML TEMPLATE (matches blog/posts/*.html on the live site)
  // ─────────────────────────────────────────────────────────────
  function buildFaqHtml(faq) {
    if (!faq || !faq.length) return "";
    return "<h2>FAQs</h2>" + faq.map((f) =>
      "<h3>" + esc(f.q) + "</h3><p>" + esc(f.a) + "</p>"
    ).join("");
  }

  function buildLinksHtml(links) {
    if (!links || !links.length) return "";
    return "<p>Explore more: " + links.map((l) =>
      '<a href="' + escAttr(l.url) + '">' + esc(l.label) + "</a>"
    ).join(" &middot; ") + "</p>";
  }

  function buildBlogHtml() {
    const b = draft.blog, m = draft.metadata, img = draft.image;
    const dateDisplay = new Date(b.publishedDate + "T00:00:00").toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    });
    const imageSrc = "../../assets/images/blog/" + (b.slug || "post") + ".jpg";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(m.metaTitle || b.title)} | Softgarments Blog</title>
    <meta name="description" content="${escAttr(m.metaDescription || b.excerpt)}" />
    <meta property="og:title" content="${escAttr(m.ogTitle || b.title)}" />
    <meta property="og:description" content="${escAttr(m.ogDescription || b.excerpt)}" />
    <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&display=swap" rel="stylesheet" />
    <style>
        :root { --ivory:#FFF8F0; --ivory-deep:#FBEFE6; --rose:#D8A7B1; --rose-soft:#E8C4CB; --deep-rose:#A75A69; --ink:#4A3B3E; --ink-soft:#8A7377; --glass-dark:#4b252f; --glass-dark-deep:#321a21; --white:#fff; --radius-sm:12px; --site-max:min(100% - 48px,1680px); --site-pad-x:clamp(20px,4vw,64px); --nav-pad-top:10px; --nav-shell-h:68px; --nav-height:calc(var(--nav-pad-top) + var(--nav-shell-h)); --nav-shell-h-scrolled:56px; --nav-height-scrolled:calc(var(--nav-pad-top) + var(--nav-shell-h-scrolled)); --nav-glass-fill:rgba(75,37,47,.86); --nav-glass-fill-scrolled:rgba(50,26,33,.94); --nav-glass-border:rgba(216,167,177,.45); --nav-text:var(--ivory); --nav-text-hover:var(--white); --nav-link-hover-bg:rgba(167,90,105,.55); --ann-h:38px; }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; overflow-x:clip; }
        body { color:var(--ink); background:var(--ivory); font-family:Poppins,sans-serif; line-height:1.7; overflow-x:hidden; }
        a { color:inherit; text-decoration:none; }
        .nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:var(--nav-pad-top) var(--site-pad-x) 0; }
        .nav-shell { position:relative; max-width:var(--site-max); margin:auto; min-height:var(--nav-shell-h); border:1px solid var(--nav-glass-border); border-radius:999px; background:var(--nav-glass-fill); backdrop-filter:blur(40px) saturate(1.7); box-shadow:0 20px 50px rgba(50,26,33,.55); }
        .nav-inner { position:relative; z-index:2; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:12px; min-height:var(--nav-shell-h); padding:0 24px; }
        .brand { display:flex; align-items:center; justify-self:start; }
        .brand-logo { display:block; width:auto; height:clamp(52px,6.8vw,66px); max-width:min(420px,58vw); object-fit:contain; filter:brightness(0) invert(1); }
        .links { display:flex; align-items:center; justify-self:center; gap:6px; }
        .links a { padding:7px 12px; border-radius:999px; color:var(--nav-text); font-size:13px; white-space:nowrap; }
        .nav-cta { display:flex; align-items:center; justify-self:end; gap:10px; }
        .order { display:inline-flex; align-items:center; padding:8px 16px; background:var(--deep-rose); color:#fff; border-radius:999px; font-size:12.5px; font-weight:600; white-space:nowrap; }
        .article-page { padding:calc(var(--nav-height) + 24px) var(--site-pad-x) 80px; }
        .article-header { max-width:1100px; margin:0 auto 34px; padding:52px 20px 42px; text-align:center; background:linear-gradient(135deg,#f8f0ec,#fcf9f7); border-bottom:2px solid #f0e4de; }
        .category { display:inline-block; margin-bottom:14px; padding:5px 16px; border-radius:20px; color:var(--deep-rose); background:#f5ede9; font-size:11px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; }
        h1,h2 { font-family:'Cormorant Garamond',serif; font-weight:500; line-height:1.2; }
        h1 { max-width:820px; margin:0 auto 12px; font-size:clamp(34px,4.5vw,50px); }
        .date { color:var(--ink-soft); font-size:14px; }
        .article-container { max-width:1100px; margin:auto; }
        .article-image { display:block; width:100%; max-height:520px; object-fit:cover; margin-bottom:40px; border-radius:16px; }
        .article-body { max-width:820px; margin:auto; }
        h2 { margin:40px 0 16px; font-size:clamp(28px,3vw,36px); }
        h3 { margin:26px 0 10px; font-size:20px; color:var(--ink); }
        p { margin-bottom:20px; color:var(--ink-soft); font-size:17px; }
        ul { margin:20px 0 25px 25px; color:var(--ink-soft); }
        li { margin-bottom:10px; font-size:16px; }
        .back { display:inline-flex; margin-top:20px; padding:12px 24px; background:var(--deep-rose); color:#fff; border-radius:999px; font-size:13px; font-weight:600; }
        footer { padding:56px var(--site-pad-x) 28px; background:linear-gradient(180deg,#3d3235,var(--ink)); color:var(--ivory-deep); }
        .footer-grid { display:grid; grid-template-columns:minmax(220px,1.15fr) repeat(3,minmax(130px,1fr)); gap:clamp(36px,5vw,64px); max-width:var(--site-max); margin:auto; padding-bottom:40px; border-bottom:1px solid rgba(255,255,255,.1); }
        .footer-brand { display:flex; flex-direction:column; gap:18px; max-width:300px; }
        .footer-brand .brand-logo { height:clamp(62px,7vw,76px); max-width:360px; filter:none; }
        .footer-brand p { margin:0; color:rgba(255,248,240,.68); font-size:13.5px; }
        .footer-col h5 { margin:0 0 18px; color:rgba(255,255,255,.92); font-size:12px; letter-spacing:.12em; text-transform:uppercase; }
        .footer-col ul { display:flex; flex-direction:column; gap:10px; margin:0; padding:0; list-style:none; }
        .footer-col ul a,.footer-contact-list li { color:rgba(255,248,240,.72); font-size:14px; }
        .footer-bottom { display:flex; justify-content:space-between; max-width:var(--site-max); margin:auto; padding-top:22px; color:rgba(255,248,240,.5); font-size:12.5px; }
        @media (max-width:900px) { .links { display:none; } .article-header { padding:40px 20px 30px; } h1 { font-size:30px; } }
        @media (max-width:640px) { .footer-grid { grid-template-columns:1fr; gap:28px; } .article-image { max-height:240px; border-radius:12px; } p { font-size:15px; } }
    </style>
</head>
<body>
    <header class="nav" id="siteHeader">
        <div class="nav-shell">
            <div class="nav-inner">
                <a href="https://www.softgarments.com/" class="brand"><img class="brand-logo" src="../../assets/logo.png" alt="Softgarments" width="380" height="58" /></a>
                <nav class="links" aria-label="Main navigation">
                    <a href="https://www.softgarments.com/">Home</a>
                    <a href="../../collection.html">New Arrivals</a>
                    <a href="../../collection-RTW.html">Ready To Wear</a>
                    <a href="../../collection-fabrics.html">Fabrics</a>
                    <a href="../../garments.html">Garments</a>
                    <a href="../../collection-sale.html">Sale</a>
                    <a href="../index.html">Blog</a>
                </nav>
                <div class="nav-cta"><a class="order" href="https://wa.me/923379022920" target="_blank" rel="noopener">Order Now</a></div>
            </div>
        </div>
    </header>
    <main class="article-page" id="main">
        <header class="article-header">
            <span class="category">${esc(b.category)}</span>
            <h1>${esc(b.title)}</h1>
            <span class="date">${esc(dateDisplay)}</span>
        </header>
        <div class="article-container">
            <img class="article-image" src="${escAttr(imageSrc)}" alt="${escAttr(img.altText || b.title)}" loading="eager" />
            <div class="article-body">
                ${b.bodyHtml || ""}
                ${buildFaqHtml(b.faq)}
                ${buildLinksHtml(b.internalLinks)}
                <a href="../index.html" class="back">&larr; Back to Blog</a>
            </div>
        </div>
    </main>
    <footer>
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="https://www.softgarments.com/" class="brand"><img class="brand-logo" src="../../assets/logo.png" alt="Softgarments" width="360" height="72" /></a>
                <p>Discover effortless style with Softgarments premium clothing designed for modern everyday wear.</p>
            </div>
            <div class="footer-col"><h5>Shop</h5><ul><li><a href="../../collection.html">New Arrivals</a></li><li><a href="../../collection-RTW.html">Ready To Wear</a></li><li><a href="../../collection-fabrics.html">Fabrics</a></li><li><a href="../../collection-sale.html">Sale</a></li></ul></div>
            <div class="footer-col"><h5>Company</h5><ul><li><a href="https://www.softgarments.com/">Home</a></li><li><a href="../index.html">Blog</a></li></ul></div>
            <div class="footer-col"><h5>Contact</h5><ul><li><a href="https://wa.me/923379022920">WhatsApp: +92 337 9022920</a></li></ul></div>
        </div>
        <div class="footer-bottom"><span>&copy; 2026 Softgarments - Comfort You Deserve</span><span>Made with care in Islamabad, Pakistan</span></div>
    </footer>
</body>
</html>`;
  }

  function buildPostsJsonEntry() {
    const b = draft.blog, img = draft.image;
    return {
      id: "<< set to (highest id in posts.json) + 1 >>",
      title: b.title,
      slug: b.slug,
      category: b.category,
      image: "assets/images/blog/" + (b.slug || "post") + ".jpg",
      excerpt: b.excerpt,
      description: b.excerpt,
      url: "blog/posts/" + (b.slug || "post") + ".html",
      publishedAt: b.publishedDate + "T10:00:00+05:00",
      published: true
    };
  }

  function renderPreview() {
    $("previewFrame").srcdoc = buildFaqSafe(buildBlogHtml);
  }
  function buildFaqSafe(fn) {
    try { return fn(); } catch (e) { return "<p>Preview error: " + esc(e.message) + "</p>"; }
  }

  $("downloadHtmlBtn").addEventListener("click", () => {
    syncFormToDraft();
    const html = buildBlogHtml();
    downloadFile((draft.blog.slug || "post") + ".html", html, "text/html");
  });

  $("copyJsonBtn").addEventListener("click", async () => {
    syncFormToDraft();
    const json = JSON.stringify(buildPostsJsonEntry(), null, 2);
    try {
      await navigator.clipboard.writeText(json);
      showExportNote("posts.json entry copied \u2014 paste it into the \"posts\" array in blog/posts.json.");
    } catch {
      downloadFile((draft.blog.slug || "post") + ".posts-entry.json", json, "application/json");
    }
  });

  $("approveBtn").addEventListener("click", () => {
    syncFormToDraft();
    const html = buildBlogHtml();
    const json = JSON.stringify(buildPostsJsonEntry(), null, 2);
    downloadFile((draft.blog.slug || "post") + ".html", html, "text/html");
    setTimeout(() => downloadFile((draft.blog.slug || "post") + ".posts-entry.json", json, "application/json"), 300);
    showExportNote(
      "Downloaded both files. Drop the .html file into blog/posts/, add the JSON object into the \"posts\" array in blog/posts.json, then commit &amp; push \u2014 your homepage's Latest Blog section updates automatically. GitHub auto-commit lands in Phase 2."
    );
  });

  function showExportNote(html) {
    const box = $("exportNote");
    box.innerHTML = html;
    box.hidden = false;
  }

  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ─────────────────────────────────────────────────────────────
  // DRAFTS (localStorage — this is a standalone site the user deploys, not a Claude artifact)
  // ─────────────────────────────────────────────────────────────
  $("saveDraftBtn").addEventListener("click", () => {
    syncFormToDraft();
    const all = loadAllDrafts();
    const id = "d_" + Date.now();
    all[id] = { savedAt: new Date().toISOString(), draft };
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(all));
    renderDraftsList();
    setLastAction("Draft saved");
  });

  function loadAllDrafts() {
    try { return JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {}; }
    catch { return {}; }
  }

  function renderDraftsList() {
    const all = loadAllDrafts();
    const ids = Object.keys(all).sort().reverse();
    const list = $("draftsList");
    if (!ids.length) {
      list.innerHTML = '<div class="rail-drafts-empty">No saved drafts yet</div>';
      return;
    }
    list.innerHTML = ids.map((id) => {
      const title = (all[id].draft.blog && all[id].draft.blog.title) || "Untitled draft";
      return '<div class="draft-item"><button data-load="' + id + '">' + esc(title) + '</button><span class="draft-del" data-del="' + id + '">&times;</span></div>';
    }).join("");
    list.querySelectorAll("[data-load]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const all2 = loadAllDrafts();
        draft = normalizeDraft(all2[btn.dataset.load].draft);
        renderAnalysis();
        renderDraftForm();
        goto("draft");
      });
    });
    list.querySelectorAll("[data-del]").forEach((span) => {
      span.addEventListener("click", () => {
        const all2 = loadAllDrafts();
        delete all2[span.dataset.del];
        localStorage.setItem(DRAFTS_KEY, JSON.stringify(all2));
        renderDraftsList();
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // UTIL
  // ─────────────────────────────────────────────────────────────
  function setBusy(btn, busy, label) {
    btn.disabled = busy;
    btn.textContent = label;
  }
  function showError(id, msg) {
    const box = $(id);
    box.textContent = msg;
    box.hidden = false;
  }
  function setLastAction(text) {
    $("lastActionRow").hidden = false;
    $("lastActionText").textContent = text;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escAttr(s) {
    return esc(s).replace(/"/g, "&quot;");
  }
  function stripTags(html) {
    return String(html || "").replace(/<[^>]*>/g, " ");
  }

  // sync fields on manual edit so the score/preview stay fresh without extra clicks
  ["fieldTitle","fieldCategory","fieldSlug","fieldDate","fieldExcerpt","fieldBody","fieldMetaTitle","fieldMetaDesc","fieldImagePrompt","fieldAltText"]
    .forEach((id) => $(id).addEventListener("input", () => { if (draft) syncFormToDraft(); }));

  renderDraftsList();
  goto("input");
})();
