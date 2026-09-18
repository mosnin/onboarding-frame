"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { shelves } from "@/lib/shelves";

export function SiteHeader() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.siteTheme = dark ? "dark" : "light";
  }, [dark]);

  const links = [
    ...shelves.map((shelf) => ({
      href: `/shelf/${shelf.id}`,
      label: shelf.name,
      match: `/shelf/${shelf.id}`,
    })),
    { href: "/playground", label: "Playground", match: "/playground" },
    { href: "/docs", label: "Docs", match: "/docs" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--site-border)] bg-[color:var(--site-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-[7px] bg-[color:var(--site-fg)] text-[0.7rem] text-[color:var(--site-bg)]"
          >
            of
          </span>
          <span className="hidden sm:inline">onboarding-frame</span>
        </Link>

        <nav className="ml-auto flex items-center gap-0.5 overflow-x-auto">
          {links.map((link) => {
            const active = pathname.startsWith(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[color:var(--site-surface)] text-[color:var(--site-fg)]"
                    : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            aria-label="Toggle site theme"
            className="ml-1 grid size-8 shrink-0 place-items-center rounded-full text-[color:var(--site-muted)] transition-colors hover:bg-[color:var(--site-surface)] hover:text-[color:var(--site-fg)]"
          >
            {dark ? "☾" : "☀"}
          </button>
        </nav>
      </div>
    </header>
  );
}
