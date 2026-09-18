"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GETTING_STARTED, SHELF_LINKS } from "@/lib/navigation";
import { BookmarkIcon, ChevronRight, GridIcon, SearchIcon } from "./icons";

export interface SidebarCategory {
  id: string;
  label: string;
  href: string;
  /** Right-aligned count. Real numbers only — never a decorative badge. */
  count?: number;
  muted?: boolean;
}

/**
 * The browse rail.
 *
 * Rows carry counts rather than "New" badges: the catalogue has no reliable
 * publication dates, and a badge that cannot be earned is decoration. A count
 * gives the same visual rhythm while saying something true.
 */
export function BrowseSidebar({
  title,
  total,
  titleHref,
  categories,
  categoriesLabel = "Categories",
  filter,
  onFilterChange,
}: {
  title: string;
  total: number;
  titleHref: string;
  categories: SidebarCategory[];
  categoriesLabel?: string;
  filter?: string;
  onFilterChange?: (value: string) => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[320px] shrink-0 lg:block">
      <div className="sticky top-[88px] max-h-[calc(100vh-112px)] overflow-hidden rounded-2xl border border-[color:var(--site-border)] bg-[color:var(--site-bg)]">
        <div className="site-scroll max-h-[calc(100vh-112px)] overflow-y-auto p-3">
          <Link
            href={titleHref}
            className="flex items-center gap-3 rounded-xl border border-[color:var(--site-border)] bg-[color:var(--site-surface)] px-3.5 py-3 transition-colors hover:border-[color:var(--site-muted)]"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[color:var(--site-border)] bg-[color:var(--site-bg)]">
              <GridIcon />
            </span>
            <span className="flex-1 text-[1.05rem] font-semibold">{title}</span>
            <span className="text-[0.95rem] text-[color:var(--site-muted)]">{total}</span>
            <ChevronRight className="text-[color:var(--site-muted)]" />
          </Link>

          {onFilterChange && (
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[color:var(--site-border)] px-3.5 py-2.5">
              <SearchIcon className="shrink-0 text-[color:var(--site-muted)]" />
              <input
                value={filter ?? ""}
                onChange={(event) => onFilterChange(event.target.value)}
                placeholder="Filter…"
                aria-label="Filter this list"
                className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-[color:var(--site-muted)]"
              />
            </div>
          )}

          <Section label="Get started" />
          {GETTING_STARTED.map((entry) => (
            <Row key={entry.id} href={entry.href} active={pathname === entry.href}>
              {entry.label}
            </Row>
          ))}
          <Row href="/kit" active={pathname === "/kit"} icon={<BookmarkIcon />}>
            Your kit
          </Row>

          <Section label="Browse" />
          {SHELF_LINKS.map((shelf) => (
            <Row
              key={shelf.id}
              href={shelf.href}
              active={pathname === shelf.href}
              count={shelf.count}
            >
              {shelf.label}
            </Row>
          ))}

          {categories.length > 0 && (
            <>
              <Section label={categoriesLabel} count={categories.length} />
              {categories.map((category) => (
                <Row
                  key={category.id}
                  href={category.href}
                  active={pathname === category.href}
                  count={category.count}
                  muted={category.muted}
                >
                  {category.label}
                </Row>
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function Section({ label, count }: { label: string; count?: number }) {
  return (
    <p className="flex items-center gap-2 px-3.5 pb-1.5 pt-6 text-[1.02rem] font-semibold">
      {label}
      {count !== undefined && (
        <span className="text-[0.9rem] font-normal text-[color:var(--site-muted)]">
          {count}
        </span>
      )}
    </p>
  );
}

function Row({
  href,
  children,
  active,
  count,
  muted,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  count?: number;
  muted?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-[0.98rem] transition-colors ${
        active
          ? "bg-[color:var(--site-surface)] font-semibold"
          : muted
            ? "text-[color:var(--site-muted)] hover:bg-[color:var(--site-surface)]"
            : "text-[color:var(--site-fg)] hover:bg-[color:var(--site-surface)]"
      }`}
    >
      {icon && <span className="text-[color:var(--site-muted)]">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {count !== undefined && (
        <span className="shrink-0 text-[0.9rem] tabular-nums text-[color:var(--site-muted)]">
          {count}
        </span>
      )}
    </Link>
  );
}
