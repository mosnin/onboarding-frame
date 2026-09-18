"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SHELF_LINKS } from "@/lib/navigation";
import { CommandPalette, useCommandPalette } from "./command-palette";
import { ChevronDown, MoonIcon, SearchIcon, SunIcon, UserIcon } from "./icons";

interface MenuLink {
  label: string;
  href: string;
  blurb?: string;
}

const MENUS: { id: string; label: string; links: MenuLink[] }[] = [
  {
    id: "library",
    label: "Library",
    links: SHELF_LINKS.map((shelf) => ({
      label: shelf.label,
      href: shelf.href,
      blurb: `${shelf.count} ${shelf.count === 1 ? "piece" : "pieces"}`,
    })),
  },
  {
    id: "resources",
    label: "Resources",
    links: [
      { label: "All templates", href: "/templates", blurb: "Every dashboard surface" },
      { label: "Docs", href: "/docs", blurb: "Install and theme" },
      { label: "Registry", href: "/registry", blurb: "Source for the CLI" },
    ],
  },
  {
    id: "build",
    label: "Build",
    links: [
      { label: "Playground", href: "/playground", blurb: "Tune a config live" },
      { label: "Your kit", href: "/kit", blurb: "Export one agent prompt" },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const palette = useCommandPalette();
  const [dark, setDark] = useState<boolean | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Read the stored preference once, then keep the attribute in sync.
  useEffect(() => {
    const stored = window.localStorage.getItem("onboarding-frame:theme");
    if (stored === "dark" || stored === "light") {
      setDark(stored === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (dark === null) return;
    document.documentElement.dataset.siteTheme = dark ? "dark" : "light";
    window.localStorage.setItem("onboarding-frame:theme", dark ? "dark" : "light");
  }, [dark]);

  // Close an open menu on outside click or route change.
  useEffect(() => setMenu(null), [pathname]);
  useEffect(() => {
    if (!menu) return;
    function onDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setMenu(null);
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [menu]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:var(--site-border)] bg-[color:var(--site-bg)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1700px] items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-[9px] bg-[color:var(--site-fg)] text-[0.75rem] font-bold text-[color:var(--site-bg)]"
            >
              of
            </span>
            <span className="hidden text-[1.15rem] font-bold tracking-tight sm:inline">
              onboarding-frame
            </span>
            <span className="hidden rounded-full border border-[color:var(--site-border)] px-2.5 py-0.5 text-[0.72rem] font-semibold md:inline">
              Catalogue
            </span>
          </Link>

          <nav ref={navRef} className="relative mx-auto hidden items-center gap-1 lg:flex">
            {MENUS.map((entry) => (
              <div key={entry.id} className="relative">
                <button
                  type="button"
                  onClick={() => setMenu(menu === entry.id ? null : entry.id)}
                  aria-expanded={menu === entry.id}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[0.98rem] font-medium transition-colors ${
                    menu === entry.id
                      ? "text-[color:var(--site-fg)]"
                      : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                  }`}
                >
                  {entry.label}
                  <ChevronDown
                    className={`transition-transform ${menu === entry.id ? "rotate-180" : ""}`}
                  />
                </button>

                {menu === entry.id && (
                  <div className="absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-xl border border-[color:var(--site-border)] bg-[color:var(--site-bg)] p-1.5 shadow-[var(--site-shadow-lift)]">
                      {entry.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-[color:var(--site-surface)]"
                        >
                          <span className="block text-[0.95rem] font-medium">
                            {link.label}
                          </span>
                          {link.blurb && (
                            <span className="block text-[0.82rem] text-[color:var(--site-muted)]">
                              {link.blurb}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/templates"
              className={`rounded-lg px-3.5 py-2 text-[0.98rem] font-medium transition-colors ${
                pathname.startsWith("/templates")
                  ? "text-[color:var(--site-fg)]"
                  : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
              }`}
            >
              Templates
            </Link>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => palette.setOpen(true)}
              className="flex items-center gap-2.5 rounded-xl border border-[color:var(--site-border)] px-3.5 py-2.5 text-[0.92rem] text-[color:var(--site-muted)] transition-colors hover:text-[color:var(--site-fg)]"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search…</span>
              <kbd className="ml-4 hidden rounded bg-[color:var(--site-surface)] px-1.5 py-0.5 text-[0.7rem] font-semibold sm:inline">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              aria-label="Toggle theme"
              className="grid size-9 place-items-center rounded-lg text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-surface)] hover:text-[color:var(--site-fg)]"
            >
              {/* Render nothing until the preference is known, or the icon flips on hydrate. */}
              {dark === null ? null : dark ? <MoonIcon /> : <SunIcon />}
            </button>

            <span aria-hidden className="hidden h-6 w-px bg-[color:var(--site-border)] sm:block" />

            <Link
              href="/kit"
              className="flex items-center gap-2 rounded-xl bg-[color:var(--site-fg)] px-4 py-2.5 text-[0.95rem] font-semibold text-[color:var(--site-bg)] transition-opacity hover:opacity-90"
            >
              <UserIcon />
              <span className="hidden sm:inline">Your kit</span>
            </Link>
          </div>
        </div>
      </header>

      <CommandPalette open={palette.open} onClose={() => palette.setOpen(false)} />
    </>
  );
}
