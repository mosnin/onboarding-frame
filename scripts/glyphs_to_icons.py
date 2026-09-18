"""Rewrite one template's Unicode glyphs as icon components.

Every template began with characters standing in for icons — ⌂ for a home
nav item, ⚙ for settings, 👤 for a person. They render in whatever face the
OS supplies, so weight, size and baseline vary per machine and none of it
resembles the icon sets the reference products draw (CLAUDE.md, rule 1).

This handles the mechanical part: the three shapes those characters appear in
(a `glyph: "x"` field, a `<span aria-hidden>x</span>`, and a bare character in
JSX) become the matching component from `ui/icons-solid.tsx`, and the import
is added. What it cannot do is decide whether the reference draws that icon
filled or outlined, or at what size — that is still a per-template judgement
against the reference image, which is why this runs on one file at a time and
is always followed by a capture and a side-by-side.

Usage:
    python3 scripts/glyphs_to_icons.py <file.tsx> [--dry-run]

Anything it cannot map is listed rather than guessed at, so the remainder is
visible instead of silently left behind.
"""
from __future__ import annotations

import pathlib
import re
import sys

# Glyph -> the export in ui/icons-solid.tsx. Only unambiguous ones are here;
# a character whose meaning depends on the screen is left for a human.
ICON = {
    "⌂": "HouseIcon", "🏠": "HouseIcon",
    "⌕": "SearchIcon", "🔍": "SearchIcon",
    "⚙": "GearIcon", "🛠": "WrenchIcon",
    "👤": "UserIcon", "👥": "UsersIcon",
    "📣": "MegaphoneIcon", "📢": "MegaphoneIcon",
    "🗓": "CalendarIcon", "📅": "CalendarIcon",
    "✓": "CheckIcon", "☑": "CheckSquareIcon",
    "⚠": "WarningIcon", "⚡": "LightningIcon",
    "🔒": "LockIcon", "🔑": "LockIcon",
    "🏢": "BuildingsIcon", "🏦": "BankSolid",
    "📋": "ClipboardIcon", "🗂": "ArticleIcon", "🗄": "HardDrivesIcon",
    "🗎": "FileTextIcon", "📄": "FileTextIcon",
    "🚀": "RocketIcon", "🏆": "TrophyIcon", "🎖": "TrophyIcon",
    "✉": "EnvelopeIcon", "📧": "EnvelopeIcon",
    "🧾": "ReceiptIcon", "📈": "ChartLineIcon", "📊": "ChartBarIcon",
    "🔗": "LinkChainIcon", "🌐": "GlobeIcon", "🧩": "CubeIcon",
    "🔭": "TargetIcon", "🏷": "TagIcon", "💬": "ChatDotsIcon",
    "🕐": "ClockIcon", "⏱": "ClockIcon", "↻": "ArrowClockwiseIcon",
    "⌾": "BellIcon", "🔔": "BellIcon", "✎": "PencilIcon",
    "▦": "GridFourIcon", "▥": "BrowsersIcon", "▤": "ArticleIcon",
    "▭": "CardIcon", "▬": "CardIcon", "▨": "CloudIcon", "▣": "CardIcon",
    "◎": "GlobeIcon", "◔": "ChartPieIcon", "◉": "BrowsersIcon",
    "☰": "ListChecksIcon", "≣": "ListChecksIcon",
    "⇅": "ArrowsUpDownIcon", "⇵": "ArrowsUpDownIcon",
    "⌄": "CaretDownIcon", "⌃": "CaretUpIcon",
    "›": "CaretRightIcon", "‹": "CaretLeftIcon",
    "⛉": "ShieldIcon", "⛁": "HardDrivesIcon", "⛑": "LifebuoyIcon",
    "✦": "SparkleIcon", "✷": "SparkleIcon", "✳": "SparkleIcon",
    "⑄": "PathIcon", "⚯": "FlowArrowIcon", "⚑": "FlagIcon",
    "★": "StarIcon", "☆": "StarIcon", "◆": "StarIcon",
    "%": "PercentIcon", "⛰": "TreeIcon", "🎓": "TrophyIcon",
}

SIZE = 14


def convert(src: str) -> tuple[str, int, set[str], list[str]]:
    used: set[str] = set()
    count = 0

    def note(name: str) -> str:
        used.add(name)
        return name

    # 1. data fields: glyph: "⌂"  ->  Icon: HouseIcon
    def field(m: re.Match[str]) -> str:
        nonlocal count
        icon = ICON.get(m.group(1))
        if not icon:
            return m.group(0)
        count += 1
        return f"Icon: {note(icon)}"

    src = re.sub(r'glyph:\s*"(.)"', field, src)

    # 2. glyph="⌂"  ->  glyph={<HouseIcon size={14} />}
    def attr(m: re.Match[str]) -> str:
        nonlocal count
        icon = ICON.get(m.group(1))
        if not icon:
            return m.group(0)
        count += 1
        return f"glyph={{<{note(icon)} size={{{SIZE}}} />}}"

    src = re.sub(r'glyph="(.)"', attr, src)

    # 3. <span aria-hidden ...>⌂</span>  ->  <HouseIcon size={14} />
    def span(m: re.Match[str]) -> str:
        nonlocal count
        icon = ICON.get(m.group(2).strip())
        if not icon:
            return m.group(0)
        count += 1
        return f"<{note(icon)} size={{{SIZE}}} />"

    src = re.sub(
        r'<span[^>]*\baria-hidden\b[^>]*>\s*([^<]*?)?\s*([^\s<])\s*</span>',
        lambda m: span(m) if not (m.group(1) or "").strip() else m.group(0),
        src,
    )

    # 4. render sites that read the field we just renamed
    def render(m: re.Match[str]) -> str:
        nonlocal count
        count += 1
        return f"glyph={{<{m.group(1)}.Icon size={{{SIZE}}} />}}"

    before = src
    src = re.sub(r"glyph=\{(\w+)\.glyph\}", render, src)
    src = re.sub(
        r"<span[^>]*\baria-hidden\b[^>]*>\s*\{(\w+)\.glyph\}\s*</span>",
        lambda m: f"<{m.group(1)}.Icon size={{{SIZE}}} />",
        src,
    )
    src = re.sub(r"(?<![\w.]){(\w+)\.glyph}", lambda m: f"<{m.group(1)}.Icon size={{{SIZE}}} />", src)
    if src != before:
        count += 1

    leftover = sorted({c for c in re.findall(r"[\U0001F000-\U0001FAFF☀-➿←-⇿⬀-⯿■-◿⌀-⏿]", src)})
    return src, count, used, leftover


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__)
        return 2
    path = pathlib.Path(args[0])
    src = path.read_text()
    out, count, used, leftover = convert(src)

    if used:
        names = sorted(used)
        marker = '} from "../../../ui/icons-solid";'
        if marker in out:
            # Merge into the module's existing import.
            start = out.rindex("import {", 0, out.index(marker))
            end = out.index(marker) + len(marker)
            existing = re.findall(r"[A-Za-z][A-Za-z0-9]*", out[start + len("import {"): out.index("}", start)])
            names = sorted(set(existing) | used)
            block = "import {\n" + "".join(f"  {n},\n" for n in names) + marker
            out = out[:start] + block + out[end:]
        else:
            block = "import {\n" + "".join(f"  {n},\n" for n in names) + marker + "\n"
            i = out.index("import { cn }")
            out = out[:i] + block + out[i:]

    print(f"{path.name}: {count} glyph sites -> icons; {len(used)} icons imported")
    if leftover:
        print(f"  still by hand: {' '.join(leftover)}")
    if "--dry-run" not in sys.argv:
        path.write_text(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
