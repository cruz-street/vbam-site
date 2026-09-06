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
        "?source=labor-day-2026"
        "&utm_source=labor-day-bash&utm_medium=qr-code&utm_campaign=labor-day-2026",
        "q",
    ),
    # Last resort: straight to the Jotform, skipping the website. Needs no
    # deploy at all — only the hidden `source` field on the form. Loses the
    # branded page; keeps the registration attribution, which matters more.
    "vbam-laborday-qr-jotform": (
        "https://form.jotform.com/262025447324048?source=labor-day-2026",
        "h",
    ),
}

try:
    import cv2
    import zxingcpp
except ImportError:  # verification is optional, generation is not
    cv2 = zxingcpp = None

failures = []

for name, (url, ecc) in TARGETS.items():
    qr = segno.make(url, error=ecc)
    modules = qr.symbol_size(scale=1, border=4)[0]
    scale = max(1, 2000 // modules)

    qr.save(OUT / f"{name}.svg", scale=10, dark=DARK, light=LIGHT, border=4)
    qr.save(OUT / f"{name}.png", scale=scale, dark=DARK, light=LIGHT, border=4)

    check = "not verified (pip install zxing-cpp opencv-python-headless)"
    if zxingcpp is not None:
        found = zxingcpp.read_barcodes(cv2.imread(str(OUT / f"{name}.png")))
        ok = bool(found) and found[0].text == url
        check = "decodes OK" if ok else "*** DOES NOT DECODE ***"
        if not ok:
            failures.append(name)

    print(f"{name}: version {qr.version}, ecc {ecc.upper()}, "
          f"{modules} modules -> {modules * scale}px PNG — {check}")
    print(f"  {url}")

if failures:
    raise SystemExit(f"\nFAILED to verify: {', '.join(failures)} — do not print these.")
