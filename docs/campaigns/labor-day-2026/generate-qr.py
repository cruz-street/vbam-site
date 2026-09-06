#!/usr/bin/env python3
"""Regenerate the Labor Day Bash 2026 QR assets.

Usage:  pip install segno && python3 generate-qr.py

Outputs SVG (vector, use this for print) and a 2000px PNG for each target.
Brand colors only: Atlantic #0A3D4A on white (Rule 1 — no ad-hoc hex in the
app; these are print assets, values mirror the vbam-atlantic token).
"""
import pathlib
import segno

OUT = pathlib.Path(__file__).parent
DARK = "#0A3D4A"   # vbam-atlantic
LIGHT = "#ffffff"

TARGETS = {
    # Primary: short vanity link. Repointable, and short enough to print small
    # and still scan from across a table.
    "vbam-laborday-qr": (
        "https://verobeachadultmedicine.com/laborday",
        "h",
    ),
    # Backup: the full UTM URL, no redirect involved. Works even if the
    # /laborday redirect has not been promoted to production yet.
    "vbam-laborday-qr-direct": (
        "https://verobeachadultmedicine.com/for-patients/new-patient-registration/"
        "?utm_source=labor-day-bash&utm_medium=qr-code&utm_campaign=labor-day-2026",
        "q",
    ),
}

for name, (url, ecc) in TARGETS.items():
    qr = segno.make(url, error=ecc)
    qr.save(OUT / f"{name}.svg", scale=10, dark=DARK, light=LIGHT, border=4)
    qr.save(OUT / f"{name}.png", scale=1, dark=DARK, light=LIGHT, border=4)
    # re-save PNG at print resolution
    modules = qr.symbol_size(scale=1, border=4)[0]
    qr.save(OUT / f"{name}.png", scale=max(1, 2000 // modules),
            dark=DARK, light=LIGHT, border=4)
    print(f"{name}: version {qr.version}, ecc {ecc.upper()}, "
          f"{modules} modules -> {qr.symbol_size(scale=max(1, 2000 // modules), border=4)[0]}px PNG")
    print(f"  {url}")
