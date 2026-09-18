"""Find each template's scale error against its reference, automatically.

Every template measured by hand in this rebuild turned out to be uniformly
mis-scaled — 1.32x where the 2000px reference image was read instead of the
1512px render it was captured from, 1.16x, 0.78x. The error is invisible in
isolation because *everything* is off by the same amount, so the screen reads
as merely "a bit roomy" rather than as wrong. It is only visible against the
reference, and measuring one heading by hand per template is slow and easy to
get wrong when the window catches a neighbouring element.

This finds the factor directly. Both images are reduced to a one-dimensional
structure profile — per-column gradient energy, which peaks at every vertical
edge: rail borders, card edges, column rules, the left edge of a text block.
The profile is then rescaled about the left edge over a range of candidate
factors and correlated against the reference's. The factor with the highest
correlation is the template's scale error.

The left edge is the right pivot because these layouts are built from the
left: the rail starts at x=0 and everything follows it. Scaling about the
centre would smear the rail across the search.

Usage:
    python3 scripts/measure_scale.py                 # every mapped template
    python3 scripts/measure_scale.py wallet-home     # one

Reports the factor, the correlation, and how sharply the peak stands out. A
factor within about 1.5% of 1.0 is a match; further out is a real defect, and
the number is what `rescale_template.py` takes as its argument.

Read the confidence before acting on a factor. A template whose rail and main
pane were built at *different* scales — event-analytics was, and had to be
fixed in two parts — has no single factor that fits both, so the peak is flat
and the reported number is meaningless. So is a factor sitting on the edge of
the search range. Both are marked, and both mean: measure that one by hand.
"""
from __future__ import annotations

import pathlib
import re
import sys

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    print("Pillow is required: pip install pillow")
    raise SystemExit(2)

ROOT = pathlib.Path(__file__).resolve().parent.parent
REFS = ROOT / ".audit" / "refs1512"
SHOTS = ROOT / ".audit" / "shots1512"
DOC = ROOT / "docs" / "dashboard-references.md"

# The candidate range. Wider than any error seen so far, stepped finely enough
# that the answer is usable as a rescale factor without a second pass.
LO, HI, STEP = 0.70, 1.45, 0.002


# Vertical structure only. Summing raw gradient energy per column scored text
# as loudly as rules, and since a capture and its reference are different
# heights the same band holds different content — community-traffic came back
# 0.708 when its rail had been measured to land within a pixel. Counting the
# *fraction of rows* that carry an edge at a given column ignores text (a few
# rows) and keeps rails, card edges and column rules (most rows).
EDGE = 10


def profile(path: pathlib.Path, height: int = 400) -> list[float]:
    """Per-column vertical-rule strength over the top band of an image."""
    im = Image.open(path).convert("L")
    w, h = im.size
    bh = min(height, h)
    band = im.crop((0, 0, w, bh))
    px = band.load()
    rows = list(range(0, bh, 2))
    out = []
    for x in range(1, w):
        hits = sum(1 for y in rows if abs(px[x, y] - px[x - 1, y]) > EDGE)
        out.append(hits / len(rows))
    return out


def rail_edge(prof: list[float], lo: int = 24, hi: int = 420) -> int | None:
    """The sidebar's outer edge: the first rule running nearly the full band.

    A wrong rail width does not show up in the scale factor, because the
    search knows only about scale and both profiles start at x=0.
    audience-analytics' heading measured 205 against the reference's 206 — an
    exact match — while its rail was 69px narrow, and nothing in the factor
    said so. So the rail is checked separately.

    The threshold is deliberately high. At 0.5 the detector picked a card edge
    in one image and an icon rail in the other, and confidently reported that
    a 74px rail "should be 236". A sidebar border runs essentially the whole
    height; a card edge does not.
    """
    for x in range(lo, min(hi, len(prof))):
        if prof[x] >= 0.9:
            return x
    return None


def normalise(v: list[float]) -> list[float]:
    m = sum(v) / len(v) if v else 0.0
    dev = (sum((x - m) ** 2 for x in v) / len(v)) ** 0.5 or 1.0
    return [(x - m) / dev for x in v]


def correlate(ref: list[float], mine: list[float], factor: float) -> float:
    """Correlation of `mine` rescaled by `factor` against `ref`."""
    n = min(len(ref), int(len(mine) / factor))
    if n < 50:
        return -1.0
    total = 0.0
    for i in range(n):
        j = i * factor
        k = int(j)
        if k + 1 >= len(mine):
            break
        frac = j - k
        total += ref[i] * (mine[k] * (1 - frac) + mine[k + 1] * frac)
    return total / n


def mapping() -> dict[str, str]:
    """template slug -> reference file stem, from the references doc."""
    out: dict[str, str] = {}
    for line in DOC.read_text().splitlines():
        m = re.match(r"\|\s*\d+\s*\|\s*(\d{3})\s*\|[^|]*\|\s*([a-z0-9-]+)", line)
        if m:
            out.setdefault(m.group(2), m.group(1))
    return out


def measure(slug: str, ref_stem: str):
    ref_path = REFS / f"{ref_stem}.png"
    shot_path = SHOTS / f"{slug}.png"
    if not ref_path.exists() or not shot_path.exists():
        return None
    ref_raw = profile(ref_path)
    mine_raw = profile(shot_path)
    ref_rail = rail_edge(ref_raw)
    mine_rail = rail_edge(mine_raw)
    ref = normalise(ref_raw)
    mine = normalise(mine_raw)

    best, best_score = 1.0, -2.0
    scores = []
    f = LO
    while f <= HI:
        s = correlate(ref, mine, f)
        scores.append((f, s))
        if s > best_score:
            best, best_score = f, s
        f += STEP
    # Confidence: how far the peak rises above the best rival factor, relative
    # to the spread of the whole search. A flat landscape means no real peak.
    others = [s for f, s in scores if abs(f - best) > 0.05]
    baseline = max(others) if others else 0.0
    spread = max(s for _, s in scores) - min(s for _, s in scores) or 1.0
    return best, best_score, (best_score - baseline) / spread, ref_rail, mine_rail


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    m = mapping()
    slugs = args or sorted(m)
    if not REFS.exists() or not SHOTS.exists():
        print(f"need normalised images at {REFS} and {SHOTS}")
        return 2

    rows = []
    for slug in slugs:
        stem = m.get(slug)
        if not stem:
            continue
        r = measure(slug, stem)
        if r:
            rows.append((slug, stem, *r))

    def trusted(factor: float, score: float, conf: float) -> bool:
        # Three ways the answer can be meaningless, all seen in practice:
        # a peak sitting on the edge of the search range; a flat landscape
        # with no real peak; and a sharp peak on a correlation that is weak
        # overall, which is what a screen with few vertical rules gives —
        # freelance-analytics reported 1.10 twice, before and after being
        # rescaled by exactly that, on a fit of 0.21.
        edge = factor <= LO + STEP * 2 or factor >= HI - STEP * 2
        return score >= 0.35 and conf >= 0.08 and not edge

    rows.sort(key=lambda r: (not trusted(r[2], r[3], r[4]), -abs(r[2] - 1.0)))
    print("=" * 72)
    print("TEMPLATE SCALE AGAINST REFERENCE")
    print("=" * 72)
    print(f"  {'template':24} {'ref':>4}  {'factor':>7}  {'fit':>6}  {'conf':>5}  rail")
    act, unsure, rails = [], [], []
    for slug, stem, factor, score, conf, rr, mr in rows:
        if rr and mr and abs(rr - mr) > 3:
            rails.append((slug, rr, mr))
        off = abs(factor - 1.0)
        if not trusted(factor, score, conf):
            mark, note = "  ?", " no clear peak"
            unsure.append(slug)
        elif off >= 0.04:
            mark, note = "  X", ""
            act.append((slug, factor))
        elif off >= 0.015:
            mark, note = "  .", ""
        else:
            mark, note = "   ", ""
        rail = f"  {mr}/{rr}" if (rr and mr) else "     -"
        if rr and mr and abs(rr - mr) > 3:
            rail += " X"
        print(f"{mark} {slug:24} {stem:>4}  {factor:7.3f}  {score:6.3f}  {conf:5.2f}{rail}{note}")
    print()
    print(f"  X  {len(act)} templates to rescale:")
    for slug, factor in act:
        print(f"       python3 scripts/rescale_template.py "
              f"packages/onboarding-frame/src/patterns/dashboard/templates/{slug}.tsx {factor:.3f}")
    if rails:
        print(f"  rail  {len(rails)} sidebars are the wrong width (ours/reference):")
        for slug, rr, mr in rails:
            print(f"          {slug:24} {mr} should be {rr}")
    print()
    print(f"  ?  {len(unsure)} inconclusive — measure these by hand. Two common")
    print("     causes: the rail and the main pane were built at different")
    print("     scales, so no single factor fits; or the screen has too few")
    print("     vertical rules for the profiles to lock on.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
