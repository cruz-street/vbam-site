# Labor Day Bash 2026 — registration QR + UTM links

Campaign links for the Labor Day event. Destination is the live new-patient
registration page.

## The links

**Print / QR (primary)**

```
https://verobeachadultmedicine.com/laborday
```

302-redirects to the registration page with the UTM tags below attached.
Short enough to print small, say out loud, or type by hand.
**Requires the `_redirects` change on this branch to be deployed to production.**

**Direct link (no redirect — works today)**

```
https://verobeachadultmedicine.com/for-patients/new-patient-registration/?utm_source=labor-day-bash&utm_medium=qr-code&utm_campaign=labor-day-2026
```

Use this anywhere you can paste a long URL (email, Facebook post, text
message), and as the QR target if the short link is not live in time.

## UTM tags

| Parameter | Value | Why |
|---|---|---|
| `utm_source` | `labor-day-bash` | Where the scan happened — the event itself |
| `utm_medium` | `qr-code` | The channel, so QR traffic separates from social/email |
| `utm_campaign` | `labor-day-2026` | Groups every Labor Day asset in one GA4 report |

All values are lowercase and hyphenated. GA4 treats UTM values as
case-sensitive, so `Labor-Day-Bash` and `labor-day-bash` would report as two
different sources — keep this casing for any future variants.

Need to tell signage apart (table tent vs. handout vs. banner)? Add
`&utm_content=table-tent` etc. to the direct link. `utm_content` splits within
a campaign without breaking the source/medium rollup.

## QR files

| File | Use |
|---|---|
| `vbam-laborday-qr.svg` | **Print.** Vector — scales to any size with no blur |
| `vbam-laborday-qr.png` | 1980px raster, for tools that will not take SVG |
| `vbam-laborday-qr-direct.svg` | Backup — encodes the full UTM URL, no redirect needed |
| `vbam-laborday-qr-direct.png` | 1950px raster of the same |

Both QRs are Atlantic (`#0A3D4A`) on white. The short-link QR uses error
correction level H, the direct one level Q — both survive a scuff or a
thumbprint on a printed sheet.

**Printing:** keep the white margin around the code (it is part of the file —
do not crop it), print at least 1.5 in / 4 cm square for arm's-length scanning,
and go bigger for anything read from more than a few feet. Do not recolor to a
light foreground on a dark background; many scanners will not invert.

Regenerate with `pip install segno && python3 generate-qr.py`.

## Reading the results

GA4 → Reports → Acquisition → Traffic acquisition, then filter on Session
campaign = `labor-day-2026`. Data flows through the existing GTM container
(`GTM-WRKLM7XK`) already on every page; no tag changes were needed.

**Known limit:** the registration form is a Jotform iframe and does not push a
submission event to `dataLayer`. GA4 will therefore report how many people
*landed* on the registration page from the event, not how many *finished*
registering. Completion counts have to come from Jotform's own submission log
for now.
