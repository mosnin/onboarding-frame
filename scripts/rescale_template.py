"""Divide one template's dimensions by a constant factor.

Several templates were built by measuring the reference images directly. The
references are 2000px wide but were captured from a 1512px render, so every
number read off them is 1.323x too big — and because *everything* is scaled by
the same amount, the result looks self-consistent and reads as merely "a bit
roomy" rather than as wrong. It is why a rail came out 358 wide against a
reference's 269, and why body copy sat at 1.12rem against 0.85rem.

This rescales one template at a time, and is meant to be followed by a capture
and a side-by-side: the rail landing on the reference's edge is the check that
it worked.

What it touches:
  - arbitrary values: [18px], [1.12rem], including inside text-[...]
  - Tailwind's numeric spacing scale: p-6, gap-3, mt-1.5, w-72, size-10, ...
    rewritten to explicit pixels, since the 0.25rem grid has no room at the
    rescaled values
  - numeric component props: size={44}, width={358}, height={56}

What it leaves alone, because scaling them is wrong:
  - hairlines and 1px rules, border widths, ring widths
  - grid-cols-*, col-span-*, order-*, z-*, opacity-*, duration-*
  - colours, percentages, fractions (w-1/2), named sizes (text-sm, rounded-lg)
  - stroke widths, which are a weight rather than a length

Usage:
    python3 scripts/rescale_template.py <file.tsx> [factor]   # default 1.323
    python3 scripts/rescale_template.py <file.tsx> --dry-run
"""
from __future__ import annotations

import pathlib
import re
import sys

DEFAULT_FACTOR = 2000 / 1512  # the references' upscale

# Prefixes whose numeric suffix is a length on Tailwind's 0.25rem scale.
SPACING = (
    "p|px|py|pt|pb|pl|pr|ps|pe"
    "|m|mx|my|mt|mb|ml|mr|ms|me"
    "|gap-x|gap-y|gap"
    "|space-x|space-y"
    "|w|h|size|min-w|min-h|max-w|max-h"
    "|top|right|bottom|left|inset-x|inset-y|inset"
    "|translate-x|translate-y"
)
# Anything matching these keeps its number: they are not lengths.
KEEP = re.compile(
    r"^(grid-cols|grid-rows|col-span|col-start|row-span|row-start|order|z|"
    r"opacity|duration|delay|flex|basis|leading|tracking|border|ring|"
    r"outline|divide|stroke|line-clamp|aspect)"
)


# Parked while the numeric passes run, so a hairline is not scaled away.
HAIRLINE = "\uE000HAIRLINE\uE000"


def px(value: float) -> int:
    """Round to whole pixels, never collapsing a visible length to nothing."""
    out = round(value)
    return max(1, out) if value >= 0.5 else out


def rescale(src: str, factor: float) -> tuple[str, int]:
    count = 0

    def arb_px(m: re.Match[str]) -> str:
        nonlocal count
        count += 1
        return f"[{px(float(m.group(1)) / factor)}px]"

    def arb_rem(m: re.Match[str]) -> str:
        nonlocal count
        count += 1
        # Keep rem for type, where it is the readable unit; 3dp is plenty.
        return f"[{round(float(m.group(1)) / factor, 3):g}rem]"

    def tw(m: re.Match[str]) -> str:
        nonlocal count
        prefix, number = m.group(1), m.group(2)
        if KEEP.match(prefix):
            return m.group(0)
        count += 1
        # Tailwind's numeric scale is 0.25rem = 4px per step.
        return f"{prefix}-[{px(float(number) * 4 / factor)}px]"

    # A 1px hairline stays a hairline; scaling it away removes the rule.
    src = re.sub(r"\[1px\]", HAIRLINE, src)
    src = re.sub(r"\[(\d+(?:\.\d+)?)px\]", arb_px, src)
    src = re.sub(r"\[(\d+(?:\.\d+)?)rem\]", arb_rem, src)
    src = re.sub(rf"(?<![\w-])(-?(?:{SPACING}))-(\d+(?:\.5)?)(?![\w./-])", tw, src)
    src = re.sub(
        r"\b(size|width|height|thickness|radius)=\{(\d+(?:\.\d+)?)\}",
        lambda m: f"{m.group(1)}={{{px(float(m.group(2)) / factor)}}}",
        src,
    )
    src = src.replace(HAIRLINE, "[1px]")
    return src, count


def main() -> int:
    args = [a for a in sys.argv[1:] if a != "--dry-run"]
    dry = "--dry-run" in sys.argv
    if not args:
        print(__doc__)
        return 2
    path = pathlib.Path(args[0])
    factor = float(args[1]) if len(args) > 1 else DEFAULT_FACTOR
    out, count = rescale(path.read_text(), factor)
    print(f"{path.name}: {count} values / {factor:.4f}")
    if dry:
        return 0
    path.write_text(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
