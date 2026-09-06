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

Three targets, each as SVG (**use this for print** — vector, scales with no
blur) and a ~2000px PNG for tools that will not take SVG.

| File | Target | Needs |
|---|---|---|
| `vbam-laborday-qr.*` | `/laborday` short link | Deploy + hidden field |
| `vbam-laborday-qr-direct.*` | Full UTM URL, no redirect | Deploy + hidden field |
| `vbam-laborday-qr-jotform.*` | Straight to the Jotform | **Hidden field only** |

All three are verified to decode at their shipped size by `generate-qr.py`,
which fails loudly rather than emitting a code it cannot read back.

Every one of them needs the hidden `source` field to attribute registrations.
Only the third works with no deploy at all.

Both QRs are Atlantic (`#0A3D4A`) on white. The short-link QR uses error
correction level H, the direct one level Q — both survive a scuff or a
thumbprint on a printed sheet.

**Printing:** keep the white margin around the code (it is part of the file —
do not crop it), print at least 1.5 in / 4 cm square for arm's-length scanning,
and go bigger for anything read from more than a few feet. Do not recolor to a
light foreground on a dark background; many scanners will not invert.

Regenerate with `pip install segno && python3 generate-qr.py`.

## Reading the results

Two different questions, two different places to look.

### Who *registered* from the QR — Jotform

This is the number that matters, and it requires **one manual setup step in the
Jotform builder that has to happen before the event:**

1. Open form `262025447324048` in the Jotform builder.
2. Add a **Short Text** element. Label it `Source`.
3. In its **Advanced** properties, set the **Unique Name** to exactly `source`
   (lowercase), and toggle **Hidden** on.
4. Save. Do a test scan and confirm the submission records
   `source = labor-day-2026`.

Once that field exists, every registration that came through the QR carries
`source = labor-day-2026` in the submission row itself. Open the form's
Submissions table, add the Source column, and sort or filter on it. That is a
direct count of registrations attributable to the event — not an estimate.

Without that field, the parameter arrives at the form and is silently
discarded, and there is no way to tell an event registration from any other.

**Why this needs code:** an iframe does not inherit the parent page's query
string, so the UTM tags on the page URL never reached the form on their own.
`JotformEmbed.tsx` now forwards an allowlist (`source`, `utm_source`,
`utm_medium`, `utm_campaign`, `utm_content`) onto the iframe `src`. It is an
allowlist rather than a pass-through so a crafted link cannot prefill arbitrary
fields on a HIPAA form. Any future campaign gets the same treatment for free;
adding another hidden field named after one of those params captures it.

### How many *saw* the page — GA4

GA4 → Reports → Acquisition → Traffic acquisition, filter Session campaign =
`labor-day-2026`. Rides the existing GTM container (`GTM-WRKLM7XK`); no tag
changes were needed. This measures reach — scans that landed on the page,
including people who then didn't fill anything out. Comparing it against the
Jotform count gives the drop-off.

GA4 still cannot see the submission itself: the form is a cross-origin iframe
that pushes no `dataLayer` event. That is why the Jotform field, not GA4, is
the system of record for registrations.

### No-deploy fallback

If the code change does not reach production in time, point the QR straight at
the form and skip the website entirely:

```
https://form.jotform.com/262025447324048?source=labor-day-2026
```

Prefill works natively on a direct Jotform URL, so this needs only the hidden
field — no deploy at all. The trade-off is that scanners land on a bare Jotform
page instead of the branded VBAM page. At an event table, that is arguably the
better experience anyway: one less tap between the code and the first question.
