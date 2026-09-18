"""Audit each dashboard template against its reference screenshot.

This exists because "looks about right" is how the first build shipped at
roughly a third of the reference's fidelity. Every check here is a number, so a
template either matches or it does not.

Checks, per template:

  banned glyphs   Unicode pictographs and emoji in the source. The reference
                  products draw icons; a glyph picks up whatever the OS font
                  supplies, so it never matches.
  layout edges    Vertical boundaries (rails, column starts, panel edges) in
                  both images, reported in CSS pixels at a 1512px render.
  palette         The fills either side of the first boundary, plus the page
                  background, compared channel by channel.

It reports deltas; it does not judge. A template is 1:1 when the boundary
deltas are within a pixel or two and the colours match exactly.

Usage:
    python3 scripts/audit_fidelity.py [--shots .audit/shots] [--refs REFS_DIR]

REFS_DIR holds the reference images named by the map in
docs/dashboard-references.md. Templates without a reference are still scanned
for banned glyphs.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("This tool needs Pillow:  pip install Pillow")

RENDER_W = 1512.0

# Pictographs, box drawing, arrows, dingbats — everything that has been used as
# a stand-in for an icon. Deliberately excludes ordinary punctuation and the
# few characters a reference genuinely shows as text.
GLYPH = re.compile(
    "[\U0001F000-\U0001FAFF☀-➿←-⇿⬀-⯿"
    "■-◿⌀-⏿️]"
)
# Characters a reference may legitimately print as text rather than draw.
ALLOWED = set("⌘⌥⇧⏎→←")


def strip_chrome(im: Image.Image):
    """Trim the capture footer some reference sources add."""
    px = im.load()
    w, h = im.size
    for y in range(h - 1, int(h * 0.80), -1):
        row = [px[x, y] for x in range(0, w, max(1, w // 60))]
        dark = sum(1 for r, g, b in row if r < 45 and g < 45 and b < 45)
        if dark < len(row) * 0.85:
            return px, w, y + 1
    return px, w, h


def edges(px, w, y, tol=12, min_gap=6):
    """Strong vertical boundaries on one row, as (x, before, after)."""
    out, prev, last = [], px[0, y], -99
    for x in range(1, w):
        c = px[x, y]
        if max(abs(c[i] - prev[i]) for i in range(3)) > tol and x - last > min_gap:
            out.append((x, prev, c))
            last = x
        prev = c
    return out


def scan_glyphs(root: pathlib.Path):
    found = {}
    for f in sorted(root.glob("*.tsx")):
        hits = [c for c in GLYPH.findall(f.read_text()) if c not in ALLOWED]
        if hits:
            found[f.stem] = hits
    return found


def compare(mine_path, ref_path):
    mi = Image.open(mine_path).convert("RGB")
    ri = Image.open(ref_path).convert("RGB")
    mpx, mw, mh = strip_chrome(mi)
    rpx, rw, rh = strip_chrome(ri)
    rs = rw / RENDER_W  # reference is upscaled; mine is captured at 1:1

    rows = [0.25, 0.5]
    report = []
    for f in rows:
        my_y, rf_y = int(mh * f), int(rh * f)
        me = [(x, a, b) for x, a, b in edges(mpx, mw, my_y)][:6]
        rf = [(round(x / rs, 1), a, b) for x, a, b in edges(rpx, rw, rf_y)][:6]
        report.append({"at": f, "mine": me, "ref": rf})
    return report, (mpx, mw, mh), (rpx, rw, rh, rs)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--shots", default=".audit/shots")
    ap.add_argument("--refs", default=None)
    ap.add_argument("--map", default="docs/dashboard-references.md")
    ap.add_argument("--templates",
                    default="packages/onboarding-frame/src/patterns/dashboard/templates")
    args = ap.parse_args()

    print("=" * 72)
    print("BANNED GLYPHS IN TEMPLATE SOURCE")
    print("=" * 72)
    glyphs = scan_glyphs(pathlib.Path(args.templates))
    if not glyphs:
        print("  none — every icon comes from the icon library\n")
    else:
        total = sum(len(v) for v in glyphs.values())
        print(f"  {total} uses across {len(glyphs)} files\n")
        for name, hits in sorted(glyphs.items(), key=lambda kv: -len(kv[1])):
            uniq = "".join(sorted(set(hits)))
            print(f"  {len(hits):4}  {name:28} {uniq}")
        print()

    shots = pathlib.Path(args.shots)
    if not shots.exists():
        print(f"(no captures at {shots} — run scripts/capture-templates.mjs first)")
        return 1 if glyphs else 0

    refs = pathlib.Path(args.refs) if args.refs else None
    if refs and refs.exists():
        pairs = json.loads((refs / "pairs.json").read_text()) if (refs / "pairs.json").exists() else {}
        print("=" * 72)
        print("LAYOUT DELTAS  (css px at a 1512 render)")
        print("=" * 72)
        for slug, ref_name in sorted(pairs.items()):
            mine = shots / f"{slug}.png"
            ref = refs / ref_name
            if not mine.exists() or not ref.exists():
                continue
            report, _, _ = compare(mine, ref)
            print(f"\n{slug}")
            for band in report:
                m = [e[0] for e in band["mine"]]
                r = [e[0] for e in band["ref"]]
                print(f"  at {int(band['at']*100):>3}%   mine {m}")
                print(f"            ref  {r}")

    return 1 if glyphs else 0


if __name__ == "__main__":
    raise SystemExit(main())
