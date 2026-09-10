# Campaign pattern — short links, UTMs, QR codes

Reusable playbook for any offline/print campaign (event signage, business
cards, handouts) that needs a trackable link and a QR code. Distilled from
the Labor Day 2026 campaign (the first one built this way — see
`docs/decisions/site-decisions.md`, 2026-05-05/09-06 entries, for the
original design reasoning).

This directory does not itself contain a live campaign. Each campaign gets
its own subfolder, `docs/campaigns/<campaign-slug>/`, holding its QR assets
and any campaign-specific notes.

## 1. The short-link pattern (`app/public/_redirects`)

Offline/print campaigns get a vanity path in `app/public/_redirects` that
302-redirects to the canonical destination page with UTM parameters baked
into the query string:

```
# Campaign short links — QR codes and print signage.
# 302 (not 301) so the destination and UTM tags stay repointable after the
# campaign; a 301 would be cached in scanners' browsers indefinitely.
/<campaign-slug>   /for-patients/new-patient-registration/?utm_source=<source>&utm_medium=qr-code&utm_campaign=<campaign-slug>   302
/<campaign-slug>/  /for-patients/new-patient-registration/?utm_source=<source>&utm_medium=qr-code&utm_campaign=<campaign-slug>   302
```

**Always 302, never 301.** The `/register` short link is a permanent 301
alias and stays that way. A campaign link is different: its destination and
UTM tags are expected to change year over year (or if the landing page
changes), and a 301 gets cached indefinitely in the browser of every scanner
that ever hit the code — those scans can never be redirected again once
printed material is in the wild. 302 keeps it repointable.

Add both the bare path and the trailing-slash variant, matching the existing
`/register` precedent.

**Only use `utm_*` parameters.** See section 3 below — a non-standard key
like `source=` is silently dropped by the attribution mechanism.

Prune a campaign's `_redirects` lines once its printed assets are out of
circulation.

## 2. UTM naming conventions

| Parameter | Convention | Notes |
|---|---|---|
| `utm_source` | lowercase-hyphenated, names where the scan happens | e.g. `labor-day-bash` |
| `utm_medium` | lowercase-hyphenated, names the channel | e.g. `qr-code` |
| `utm_campaign` | lowercase-hyphenated, `<campaign-slug>-<year>` | groups every asset for the campaign in one GA4 report |
| `utm_content` | lowercase-hyphenated, optional | splits assets **within** a campaign — table tent vs. handout vs. banner — without breaking the source/medium/campaign rollup |

**Casing matters.** GA4 treats UTM values as case-sensitive. `Labor-Day-Bash`
and `labor-day-bash` report as two different sources. Pick a casing (always
lowercase-hyphenated) and keep every asset for a campaign consistent with it.

## 3. QR generation and print handling

Use `generate-qr.py` in this directory (`pip install segno && python3
generate-qr.py <url> <output-basename> [output-dir]`) to produce assets for
each campaign target. See the script's own docstring for full usage.

- **Two formats per target:** SVG (vector — use this for print, scales with
  no blur) and a ~2000px PNG for tools that won't take SVG.
- **Error correction level:** choose H (highest) for short, high-value links
  that will be printed small or handled a lot (business cards, table tents);
  Q is an acceptable middle ground for longer URLs. Both survive a scuff or
  thumbprint on a printed sheet — L/M are not recommended for print.
- **Brand color on white.** Use the brand's dark accent color as the
  foreground, white as the background (per the Brand Token Rule — no ad-hoc
  hex; pull the value from the existing color tokens). Do not invert to a
  light-on-dark code — many scanners will not read it.
- **Decode-verification is mandatory, not optional.** The script reads back
  every PNG it generates and confirms it decodes to the exact target URL.
  If verification is available (`pip install zxing-cpp
  opencv-python-headless`) and a code fails to decode, the script fails
  loudly (non-zero exit, listing which files not to print) rather than
  silently shipping a QR code nobody can scan.
- **Printing:** keep the white quiet-zone margin around the code (it's part
  of the generated file — don't crop it), print at least 1.5 in / 4 cm
  square for arm's-length scanning, bigger for anything read from further
  away.

## 4. Committing QR PNGs

`.gitignore` blanket-ignores `*.png` (screenshot review files). Campaign QR
PNGs are deliverables, not screenshots, so they need the narrowed negation
that carves out `docs/campaigns/**/*.png` — see the `.gitignore` entry
already in this repo. If a future campaign's assets live somewhere other
than `docs/campaigns/<slug>/`, extend the negation rather than committing
around it.

## 5. Attribution — what UTMs on a campaign link actually measure

UTM tags on a campaign link flow through the existing GTM container
(`GTM-WRKLM7XK`) with **no tag changes required** — GA4 (`G-TC69FM6KEW`)
picks them up automatically once the link is live. That answers "how many
people scanned and landed on the page" (Acquisition → Traffic acquisition,
filtered to the campaign).

It does **not** answer "how many people registered." The registration form
is a Jotform iframe (`JotformEmbed.tsx`) that pushes no `dataLayer`
submission event, so GA4 structurally cannot see a completed registration —
only the landing.

**Completed-registration attribution comes from the click-ID capture that
merged in PR #16** (`app/src/lib/click-attribution.ts` +
`ClickAttribution.tsx`), not from anything campaign-specific. It reads the
standard `utm_*` keys off the landing page plus the ad click IDs
(`gclid`, `gbraid`, `wbraid`, `msclkid`), persists them, and forwards them
into the Jotform submission. For a campaign's values to actually reach the
submission record, the Jotform form (`262025447324048` as of this writing)
must have hidden Short Text fields whose **Unique Name** matches exactly:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `gbraid`
- `wbraid`
- `msclkid`

No error is raised if a field is missing or its unique name drifts — the
parameter is just silently dropped and that channel's registrations go
unattributed. Test with a real scan/submission after standing up a new
campaign or touching the form.

**`source=` is dead.** An earlier design put attribution behind a
non-standard hidden `source` field. That approach was withdrawn before it
shipped, in favor of the click-ID mechanism above, which reads only the
standard `utm_*` keys and click IDs. Do not reintroduce a `source=`
parameter as a way to attribute a campaign — name the campaign with
`utm_campaign` instead. See `docs/decisions/site-decisions.md` (2026-09-08)
for the full reasoning.

## 6. Starting a new campaign

1. Create `docs/campaigns/<campaign-slug>/`.
2. Generate QR assets with `generate-qr.py`, targeting the UTM-tagged
   destination URL(s) per the conventions above.
3. If a short printable link is needed, add the two `/<campaign-slug>` /
   `/<campaign-slug>/` lines to `app/public/_redirects` per section 1.
4. Confirm the hidden Jotform fields listed in section 5 exist and are
   spelled exactly right, with a real test submission.
5. Once the campaign is over, prune the `_redirects` lines and leave the
   `docs/campaigns/<campaign-slug>/` folder as a record.
