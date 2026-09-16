# Softgarments AI Blog Agent — Phase 1 (GitHub upload version)

Yeh version **bina Terminal ke** live chal jayega, seedha aap ki GitHub repo aur Vercel ke zariye — jo already aap ki asal website ke liye use ho rahe hain.

Iske baad aap `https://<aap-ki-site>/agent/` par kisi bhi phone/laptop se dashboard use kar sakenge.

---

## Step 1 — Files GitHub par upload karein (website ke browser se, koi Terminal nahi)

1. Browser mein jayein: `https://github.com/Quicktoolspk/Softgarments`
2. **"Add file"** button dabayein (upar right side), phir **"Upload files"** chunein.
3. Is zip ko pehle apne computer par extract kar lein. Phir extracted folder ke andar se **`agent`**, **`api`**, aur **`lib`** — yeh teeno folders GitHub ke upload box mein drag-and-drop kar dein (Finder se seedha drag kar saktay hain).
4. Neeche scroll karein, commit message mein kuch likh dein (masalan "Add AI blog agent"), aur **"Commit changes"** dabayein.

Bas — files ab GitHub par hain, aap ki asal website ki files ke saath, alag folders mein (unhe touch nahi kiya).

## Step 2 — Vercel deployment ka intezar karein

Agar aap ki site pehle se Vercel se GitHub jurri hui hai (jaisa lagta hai, kyun ke site live hai), to yeh commit khud he ek naya deployment shuru kar dega.

1. `https://vercel.com/dashboard` par jayein, apna Softgarments project kholein.
2. **"Deployments"** tab mein dekhein — ek naya deployment "Building" ya "Ready" dikhega. Ready hone ka intezar karein (1-2 minute).

## Step 3 — API key aur passcode set karein (Vercel website se, koi Terminal nahi)

1. Usi project mein **"Settings"** &rarr; **"Environment Variables"** par jayein.
2. Yeh 3 variables add karein (Add button se ek ek kar ke):

   | Name | Value |
   |---|---|
   | `AI_PROVIDER` | `anthropic` |
   | `ANTHROPIC_API_KEY` | apni asal key (console.anthropic.com se) |
   | `AGENT_PASSCODE` | koi bhi password jo aap yaad rakh sakein |

3. Save karne ke baad, **"Deployments"** tab mein jayein, sab se upar wale deployment ke "..." menu par click karein, **"Redeploy"** chunein (naye env vars sirf redeploy ke baad load hotay hain).

## Step 4 — Use karein

Apni site ka URL kholein aur uske baad `/agent/` lagayein, masalan:

```
https://softgarments.vercel.app/agent/
```

(ya agar custom domain hai to `https://www.softgarments.com/agent/`)

Pehli baar passcode maangega (wahi jo aap ne `AGENT_PASSCODE` mein set kiya) — ek dafa daalne ke baad wo us browser mein yaad reh jata hai.

---

## Istemal kaise karein

1. Caption paste karein &rarr; "Analyze Post"
2. Analysis &amp; SEO dekhein
3. Blog draft edit karein, ya command box: "make it shorter", "add FAQ", wagera
4. Quality score aur preview dekhein
5. "Approve & Export" &rarr; 2 files download hongi:
   - `<slug>.html` &rarr; apni repo ke `blog/posts/` folder mein GitHub web upload se daal dein
   - `<slug>.posts-entry.json` &rarr; is ka content `blog/posts.json` ki `"posts"` array mein add karein (id khud set karein: jo highest id already hai us se +1), phir commit karein
6. Homepage ka "Latest Blog" khud update ho jayega (already dynamic hai).

## Zaroori: apni asal key kabhi kisi ko na dikhayein

`ANTHROPIC_API_KEY` sirf Vercel ke Environment Variables mein rahay — kabhi kisi file mein commit na karein, kisi ko message na karein.

---

## (Optional) Local testing

Agar kabhi apne Mac par bhi test karna ho: is folder mein `.env.example` ko `.env` naam se copy karein, values bhar dein, phir `node server.js` chalayein &rarr; `http://localhost:3000/agent/`

---

## Phase 2 mein kya add hoga

- GitHub se seedha commit/push (dashboard se hi, koi manual upload nahi)
- `posts.json` aur blog file khud update
- Commit SHA / changed files dashboard par dikhna
