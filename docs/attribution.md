# Registration attribution — what actually measures what

## GTM/GA4 sees the landing, not the registration

A UTM-tagged link flows through the existing GTM container (`GTM-WRKLM7XK`)
with no tag changes required — GA4 (`G-TC69FM6KEW`) picks it up automatically
once the link is live. That answers "how many people landed on the page"
(Acquisition → Traffic acquisition).

It does **not** answer "how many people registered." The registration form
is a Jotform iframe (`JotformEmbed.tsx`) that pushes no `dataLayer`
submission event, so GA4 structurally cannot see a completed registration —
only the landing.

## Completed-registration attribution comes from click-attribution.ts

Real registration-level attribution comes from `app/src/lib/click-attribution.ts`
+ `ClickAttribution.tsx` (merged in PR #16, extended 2026-09-14 with referrer
capture). It reads the standard `utm_*` keys and ad click IDs (`gclid`,
`gbraid`, `wbraid`, `msclkid`) off the landing page, plus `document.referrer`
for traffic with no UTM tag at all, persists them (localStorage, 90-day TTL),
and forwards them into the Jotform submission on the way to `/for-patients/
new-patient-registration/`.

For a value to actually reach the submission record, the Jotform form
(`262025447324048` as of this writing) must have hidden Short Text fields
whose **Unique Name** matches exactly:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `gbraid`
- `wbraid`
- `msclkid`
- `landing_referrer`

No error is raised if a field is missing or its unique name drifts — the
value is just silently dropped and that channel's registrations go
unattributed. Test with a real submission after touching the form.

## `source=` is dead

An earlier design put attribution behind a non-standard hidden `source`
field. That approach was withdrawn before it shipped, in favor of the
mechanism above, which reads only the standard `utm_*` keys, click IDs, and
referrer. Do not reintroduce a `source=` parameter — use `utm_campaign` (and
`utm_source`/`utm_medium`/`utm_content` as appropriate) instead. See
`docs/decisions/site-decisions.md` (2026-09-08) for the full reasoning.

## Anything that wants a UTM-tagged link (email, SMS, social, ads)

There's no campaign-specific machinery beyond the above — any link, from
any channel, that lands on this site with the right query params gets
picked up the same way. Follow this convention so it rolls up cleanly in
GA4:

| Parameter | Convention | Notes |
|---|---|---|
| `utm_source` | lowercase-hyphenated, names where the click happens | e.g. `klara`, `facebook`, `phreesia` |
| `utm_medium` | lowercase-hyphenated, names the channel | e.g. `sms`, `email`, `organic-social` |
| `utm_campaign` | lowercase-hyphenated, `<name>-<year>` | groups every asset for one send/campaign in a single GA4 report |
| `utm_content` | lowercase-hyphenated, optional | splits assets **within** a campaign without breaking the source/medium/campaign rollup |

Casing matters — GA4 treats UTM values as case-sensitive. Pick lowercase-
hyphenated and keep every asset for a campaign consistent with it.

`landing_referrer` needs no manual tagging — it's captured automatically
from the browser for any organic click that arrives without a UTM tag at
all (e.g. a bare link in an Instagram/Facebook caption). It only identifies
the referring domain, not a specific post, and does nothing for SMS/QR/
print, which never have a referring webpage — those channels need a real
`utm_source` on the link itself.
