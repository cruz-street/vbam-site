# Deployments

| Date | Environment | CF Pages URL | Commit | Notes |
|---|---|---|---|---|
| 2026-05-29 | **production (LAUNCH)** | https://verobeachadultmedicine.com + https://www.verobeachadultmedicine.com | 9e1f2e8 | 🚀 **Site live on the production domain.** GoDaddy nameservers swapped to Cloudflare (`adam` / `annabel`), CF zone activated, legacy GoDaddy A records removed from DNS, apex + www CNAMEs added pointing to `vbam-site-prod.pages.dev` (both Proxied), Pages custom domains for both hostnames flipped to Active with CF-managed Google Trust Services SSL. HTTP/2 200 verified on both apex and www. Backed by the `vbam-site-prod` Pages project in Jesse's CF account; deploys from `main` via GH Actions wrangler workflow |
| 2026-05-28 | staging | https://vbam-site.pages.dev | 9e1f2e8 | Dual-environment deploy workflow smoke-tested end-to-end. Push to `staging` triggers GH Actions run #26588904871 → builds Next.js → `wrangler pages deploy` to the `vbam-site` Pages project. Production deploy step correctly skipped (branch ≠ main). Staging URL serving updated content with `Server: cloudflare` |
| 2026-05-28 | production (preview) | https://vbam-site-prod.pages.dev | (run #26584216918) | First prod-side deploy of `vbam-site-prod` — Jesse's CF account, Direct Upload via wrangler from GH Actions. Klara widget loaded in HTML, HTTP 200 verified. Custom domains attached but not yet live (waiting on GoDaddy nameserver swap) |
| 2026-05-12 | preview | https://0b11eca0.vbam-site.pages.dev | btn-fix | Fix: primary button text invisible — added .btn-primary CSS class outside @layer to override Tailwind base reset on <a> elements |
| 2026-05-11 | preview | https://2a0a86eb.vbam-site.pages.dev | 0de91dc | Phase 3–5 complete — first deploy; 99 files uploaded |
