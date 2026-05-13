# Content Editor Setup Guide

This guide explains how to activate the Decap CMS editor at `/admin/` so the client can edit site content without touching code or GitHub.

**Time required:** ~20–30 minutes  
**Who does this:** Ashwin (one-time setup before handing off to client)

---

## How it works

1. Client visits `https://vbadultmedicine.com/admin/`
2. They click "Login with GitHub" — a GitHub OAuth popup appears
3. They log in with their GitHub account (or you create one for them)
4. They see a form-based editor for all page content
5. They click Save → a commit is pushed to `cruz-street/vbam-site` on `main`
6. CF Pages detects the push and rebuilds the site (~2 minutes)

---

## Step 1 — Create a GitHub OAuth App

1. Go to: https://github.com/organizations/cruz-street/settings/applications/new  
   *(Or your personal account: https://github.com/settings/developers → "New OAuth App")*

2. Fill in:
   - **Application name:** `VBAM Content Editor`
   - **Homepage URL:** `https://vbadultmedicine.com`
   - **Authorization callback URL:** `https://vbam-cms-auth.<YOUR_SUBDOMAIN>.workers.dev/callback`  
     *(You'll fill in the subdomain after Step 2 — come back and update this)*

3. Click **Register application**

4. Note down:
   - `GITHUB_CLIENT_ID` — shown immediately
   - `GITHUB_CLIENT_SECRET` — click "Generate a new client secret" and copy it **now** (shown once)

---

## Step 2 — Deploy the sveltia-cms-auth Cloudflare Worker

This Worker handles the GitHub OAuth handshake. It runs on Cloudflare Workers (free tier is fine).

### 2a. Clone and deploy

```bash
git clone https://github.com/sveltia/sveltia-cms-auth.git
cd sveltia-cms-auth
npm install
npx wrangler deploy
```

When prompted, log in to Cloudflare. After deploy you'll see a URL like:
```
https://sveltia-cms-auth.<YOUR_ACCOUNT_SUBDOMAIN>.workers.dev
```

Copy this URL.

### 2b. Go back and update the OAuth App callback URL

In the GitHub OAuth App settings, update the **Authorization callback URL** to:
```
https://sveltia-cms-auth.<YOUR_ACCOUNT_SUBDOMAIN>.workers.dev/callback
```

### 2c. Add secrets to the Worker

```bash
npx wrangler secret put GITHUB_CLIENT_ID
# paste the client ID when prompted

npx wrangler secret put GITHUB_CLIENT_SECRET
# paste the client secret when prompted
```

---

## Step 3 — Update config.yml with the Worker URL

In `app/public/admin/config.yml`, replace the placeholder:

```yaml
backend:
  base_url: https://vbam-cms-auth.REPLACE_WITH_YOUR_SUBDOMAIN.workers.dev
```

With the real URL from Step 2:

```yaml
backend:
  base_url: https://sveltia-cms-auth.<YOUR_ACCOUNT_SUBDOMAIN>.workers.dev
```

Commit and push.

---

## Step 4 — Connect CF Pages to the GitHub repo (Git integration)

Right now CF Pages may be set to direct upload. To get auto-deploy on push:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → `vbam-site`
2. Settings → Build & deployments → Connect to Git
3. Authorize GitHub → select `cruz-street/vbam-site`
4. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `cd app && pnpm build`
   - **Build output directory:** `app/out`
5. Save

From now on: every push to `main` triggers a new CF Pages build automatically.

---

## Step 5 — Add CF Pages environment variable

In CF Pages → Settings → Environment variables → Production:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | *(your Web3Forms access key)* |

---

## Step 6 — Grant client GitHub access to the repo

The client needs a GitHub account with **write** access to `cruz-street/vbam-site` to save edits.

Options:
- **Option A:** Create a GitHub account for them (e.g., `vbam-editor`) and add as collaborator with Write access
- **Option B:** If they already have GitHub, add their account as collaborator

To add collaborator:  
https://github.com/cruz-street/vbam-site/settings/access → Invite a collaborator

---

## Verification checklist

- [ ] `https://vbadultmedicine.com/admin/` loads the Decap CMS login screen
- [ ] Login with GitHub succeeds and shows the editor
- [ ] "Homepage" collection shows all fields
- [ ] Edit a field, click Save → new commit appears in GitHub `main` branch
- [ ] CF Pages build triggers and completes (~2 min)
- [ ] Change is live on the site

---

## What the client can edit

All content is in `app/src/content/*.json`. The editor exposes:

| Editor section | File |
|----------------|------|
| Homepage | `home.json` |
| Our Doctors | `doctors.json` |
| About Page | `about.json` |
| Services Page | `services.json` |
| For Patients Page | `for-patients.json` |
| Contact Page | `contact.json` |

Images uploaded via the editor go to `app/public/images/`.

---

## Notes

- The client does **not** need to know anything about git, JSON, or code
- Each Save creates one commit on `main` — full history is preserved
- If they make a mistake, you can revert the commit from GitHub or fix it yourself
- The `/admin/` route is excluded from search engines (`noindex` in the HTML)
