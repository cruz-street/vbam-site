#!/usr/bin/env python3
"""Generate a print-ready QR code (SVG + PNG) for a campaign link.

Usage:
    pip install segno zxing-cpp opencv-python-headless
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
    --allow-unverified
                      Generate anyway when zxing-cpp/opencv-python-headless
                      are not installed, so decode-verification cannot run.
                      Loud warning, unverified files named in the output.
                      NEVER use this for anything going to print.

Outputs SVG (vector, use this for print) and a ~2000px PNG for each target.
Brand colors only: dark accent on white (per the Brand Token Rule — no
ad-hoc hex in the app; these are print assets, pull the value from the
existing color tokens for whichever brand/campaign you're building for).

Decode-verification is required, not optional. `zxing-cpp` and
`opencv-python-headless` must be installed alongside `segno`. Every
generated PNG is read back and compared against the target URL; a mismatch
exits non-zero and names the file — that code must not go to print. If the
verification libraries are missing, the script refuses to generate anything
and exits non-zero (a code this script cannot read back must not exist as
a "maybe it's fine" file on disk) unless `--allow-unverified` is passed,
in which case it generates anyway with an unmistakable warning.
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
    parser.add_argument(
        "--allow-unverified",
        action="store_true",
        help=(
            "Generate even if zxing-cpp/opencv-python-headless are missing "
            "and decode-verification cannot run. NEVER use for print."
        ),
    )
    args = parser.parse_args()

    try:
        import cv2
        import zxingcpp
    except ImportError:
        cv2 = zxingcpp = None

    if cv2 is None or zxingcpp is None:
        if not args.allow_unverified:
            print(
                "ERROR: decode-verification libraries are not installed "
                "(pip install zxing-cpp opencv-python-headless).\n"
                "Refusing to generate: a QR code this script cannot read "
                "back must not exist as a file that might get printed.\n"
                "Install the two packages above, or re-run with "
                "--allow-unverified to generate anyway (NEVER for print).",
                file=sys.stderr,
            )
            return 1
        print(
            f"*** WARNING: {args.output_basename} will be generated "
            "UNVERIFIED — zxing-cpp/opencv-python-headless are not "
            "installed, so decode-verification did not run. This QR code "
            "has NOT been confirmed to scan. DO NOT SEND IT TO PRINT. ***",
            file=sys.stderr,
        )

    out = pathlib.Path(args.output_dir)
    out.mkdir(parents=True, exist_ok=True)

    qr = segno.make(args.url, error=args.ecc)
    modules = qr.symbol_size(scale=1, border=4)[0]
    scale = max(1, 2000 // modules)

    svg_path = out / f"{args.output_basename}.svg"
    png_path = out / f"{args.output_basename}.png"

    qr.save(svg_path, scale=10, dark=args.dark, light=args.light, border=4)
    qr.save(png_path, scale=scale, dark=args.dark, light=args.light, border=4)

    verified = cv2 is not None and zxingcpp is not None
    failed = False
    if verified:
        found = zxingcpp.read_barcodes(cv2.imread(str(png_path)))
        ok = bool(found) and found[0].text == args.url
        check = "decodes OK" if ok else "*** DOES NOT DECODE ***"
        failed = not ok
    else:
        check = "*** UNVERIFIED (--allow-unverified) — DO NOT PRINT ***"

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
    if not verified:
        print(
            f"\nUNVERIFIED: {args.output_basename} was generated with "
            "--allow-unverified and has NOT been confirmed to scan. "
            "Do not print it.",
            file=sys.stderr,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
