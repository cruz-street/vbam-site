#!/usr/bin/env python3
"""Generate a print-ready QR code (SVG + PNG) for a campaign link.

Usage:
    pip install segno
    python3 generate-qr.py <url> <output-basename> [output-dir] [--ecc LEVEL]

Arguments:
    url              Target URL to encode (e.g. a campaign short link or a
                      full UTM-tagged destination).
    output-basename  Filename stem for the generated assets, e.g.
                      "vbam-<campaign>-qr" -> "<output-basename>.svg" /
                      "<output-basename>.png".
    output-dir       Directory to write the assets into. Defaults to the
                      current directory. Typically
                      "docs/campaigns/<campaign-slug>/".
    --ecc LEVEL      Error correction level: l, m, q, or h (default: h).
                      Use h for short, high-value links that get printed
                      small or handled a lot; q is an acceptable middle
                      ground for longer URLs. Avoid l/m for print.

Outputs SVG (vector, use this for print) and a ~2000px PNG for each target.
Brand colors only: dark accent on white (per the Brand Token Rule — no
ad-hoc hex in the app; these are print assets, pull the value from the
existing color tokens for whichever brand/campaign you're building for).

Decode-verification: if `zxing-cpp` + `opencv-python-headless` are
installed, every generated PNG is read back and compared against the
target URL. If it doesn't decode, the script exits non-zero and names the
file — that code must not go to print. Verification is optional at import
time (generation still runs without it) but is strongly recommended before
sending anything to a printer.
"""
import argparse
import pathlib
import sys

import segno

DARK = "#0A3D4A"  # vbam-atlantic — override with --dark for other brands
LIGHT = "#ffffff"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="Target URL to encode")
    parser.add_argument(
        "output_basename", help="Filename stem for the generated .svg/.png"
    )
    parser.add_argument(
        "output_dir",
        nargs="?",
        default=".",
        help="Directory to write assets into (default: current directory)",
    )
    parser.add_argument(
        "--ecc",
        choices=["l", "m", "q", "h"],
        default="h",
        help="Error correction level (default: h)",
    )
    parser.add_argument(
        "--dark", default=DARK, help=f"Foreground hex color (default: {DARK})"
    )
    parser.add_argument(
        "--light", default=LIGHT, help=f"Background hex color (default: {LIGHT})"
    )
    args = parser.parse_args()

    out = pathlib.Path(args.output_dir)
    out.mkdir(parents=True, exist_ok=True)

    try:
        import cv2
        import zxingcpp
    except ImportError:  # verification is optional, generation is not
        cv2 = zxingcpp = None

    qr = segno.make(args.url, error=args.ecc)
    modules = qr.symbol_size(scale=1, border=4)[0]
    scale = max(1, 2000 // modules)

    svg_path = out / f"{args.output_basename}.svg"
    png_path = out / f"{args.output_basename}.png"

    qr.save(svg_path, scale=10, dark=args.dark, light=args.light, border=4)
    qr.save(png_path, scale=scale, dark=args.dark, light=args.light, border=4)

    check = "not verified (pip install zxing-cpp opencv-python-headless)"
    failed = False
    if zxingcpp is not None:
        found = zxingcpp.read_barcodes(cv2.imread(str(png_path)))
        ok = bool(found) and found[0].text == args.url
        check = "decodes OK" if ok else "*** DOES NOT DECODE ***"
        failed = not ok

    print(
        f"{args.output_basename}: version {qr.version}, ecc {args.ecc.upper()}, "
        f"{modules} modules -> {modules * scale}px PNG — {check}"
    )
    print(f"  {args.url}")
    print(f"  -> {svg_path}")
    print(f"  -> {png_path}")

    if failed:
        print(
            f"\nFAILED to verify: {args.output_basename} — do not print this.",
            file=sys.stderr,
        )
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
