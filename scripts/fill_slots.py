"""Fill a template's empty avatar and logo slots with generated marks.

`AvatarSlot` and `LogoSlot` draw a dotted grey box. That is the right thing
for a slot whose point is that something is missing, and the wrong thing for
a face or a company logo the reference plainly shows: a screen with six of
them reads as failed image loads, not as a convention (CLAUDE.md, rule 3).

This swaps them for the generated marks in `ui/avatar.tsx` and `ui/brand.tsx`,
taking the seed from the label already beside the slot — the name in the next
span, or the expression the row renders. Those marks are stable for a given
seed, so screenshots stay comparable, and none of them is anyone's asset.

  AvatarSlot size={32}   ->  Avatar name="Jane Doe" size={32}
  LogoSlot size={17}     ->  BrandMark brand="newlandingpage" size={17}

A slot with no label near it is reported rather than guessed at, since the
seed is what makes the mark meaningful.

Usage:
    python3 scripts/fill_slots.py <file.tsx> [--dry-run]
"""
from __future__ import annotations

import pathlib
import re
import sys

# How far past the slot to look for the text that names it.
WINDOW = 260


def label_after(src: str, end: int) -> str | None:
    """The nearest human label following a slot, as a JSX attribute value.

    An expression is only usable if the slot sits *inside* the scope that binds
    it. A slot above a `.map((item) => ...)` is not: seeding from `{item.id}`
    there produced `Cannot find name 'item'` in two templates. So the search
    stops at the next callback that opens a new binding, and a name the tail
    introduces rather than inherits is rejected outright.
    """
    tail = src[end : end + WINDOW]
    stop = re.search(r"\.map\(|\.forEach\(|=>", tail)
    scope = tail[: stop.start()] if stop else tail
    # An expression the row renders: {row.email}, {member.name}
    m = re.search(r"\{([a-z][\w]*\.[\w.]+)\}", scope)
    expr = (m.start(), "{" + m.group(1) + "}") if m else None
    # A literal in the next element or bare in JSX.
    m2 = re.search(r">\s*([A-Za-z][\w .,'&/-]{2,40}?)\s*<", tail)
    if not m2:
        m2 = re.search(r"\n\s{6,}([A-Za-z][\w .'&/-]{2,40})\n", tail)
    lit = (m2.start(), '"' + m2.group(1).strip() + '"') if m2 else None

    best = min([c for c in (expr, lit) if c], key=lambda c: c[0], default=None)
    return best[1] if best else None


def convert(src: str) -> tuple[str, int, list[str]]:
    filled = 0
    missing: list[str] = []

    def swap(component: str, attr: str):
        def run(m: re.Match[str]) -> str:
            nonlocal filled
            props = m.group(1)
            size = re.search(r"size=\{(\d+)\}", props)
            radius = re.search(r"radius=\{(\d+)\}", props)
            name = label_after(src, m.end())
            if not name:
                missing.append(m.group(0)[:60])
                return m.group(0)
            filled += 1
            out = f"<{component} {attr}={name}"
            if size:
                out += f" size={{{size.group(1)}}}"
            if component == "Avatar" and radius:
                out += f" rounded={{{radius.group(1)}}}"
            if component == "BrandMark" and name.startswith('"'):
                out += f" label={name}"
            return out + " />"

        return run

    src = re.sub(r"<AvatarSlot([^/>]*)/>", swap("Avatar", "name"), src)
    src = re.sub(r"<LogoSlot([^/>]*)/>", swap("BrandMark", "brand"), src)
    return src, filled, missing


def fix_imports(src: str) -> str:
    """Point the module at the generated marks, keeping Placeholder if used."""
    needs = []
    if "<Avatar " in src:
        needs.append(("Avatar", '../../../ui/avatar'))
    if "<BrandMark " in src:
        needs.append(("BrandMark", '../../../ui/brand'))
    if not needs:
        return src

    m = re.search(r'import \{([^}]*)\} from "\.\./\.\./\.\./ui/placeholder";\n', src)
    if m:
        kept = [n.strip() for n in m.group(1).split(",") if n.strip()]
        kept = [n for n in kept if f"<{n}" in src]
        line = (
            f'import {{ {", ".join(kept)} }} from "../../../ui/placeholder";\n'
            if kept
            else ""
        )
        src = src[: m.start()] + line + src[m.end() :]

    added = ""
    for name, mod in needs:
        if f'from "{mod}"' not in src:
            added += f'import {{ {name} }} from "{mod}";\n'
    if added:
        i = src.index('import { cn }')
        src = src[:i] + added + src[i:]
    return src


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__)
        return 2
    path = pathlib.Path(args[0])
    out, filled, missing = convert(path.read_text())
    out = fix_imports(out)
    print(f"{path.name}: {filled} slots filled")
    for m in missing:
        print(f"  no label near: {m}")
    if "--dry-run" not in sys.argv:
        path.write_text(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
