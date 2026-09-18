"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

/**
 * A catalogue card.
 *
 * The whole card is a link, with the primary action sitting inside it as a
 * button. The warm wash along the bottom edge is a pseudo-element on the card
 * rather than a background on the preview, so it reads as light falling on the
 * card instead of as part of the artwork.
 */
export function PieceCard({
  href,
  title,
  blurb,
  preview,
  badge,
  action,
  meta,
  layout = "grid",
}: {
  href: string;
  title: string;
  blurb: string;
  preview: ReactNode;
  badge?: string;
  action?: ReactNode;
  meta?: ReactNode;
  layout?: "grid" | "list";
}) {
  if (layout === "list") {
    return (
      <Link
        href={href}
        className="group flex items-center gap-5 rounded-xl border border-[color:var(--site-border)] p-3 transition-colors hover:bg-[color:var(--site-surface)]"
      >
        <div className="h-[86px] w-[150px] shrink-0 overflow-hidden rounded-lg">
          {preview}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-semibold">
            {title}
            {badge && <Badge>{badge}</Badge>}
          </p>
          <p className="mt-1 line-clamp-2 text-[0.92rem] leading-relaxed text-[color:var(--site-muted)]">
            {blurb}
          </p>
          {meta && <div className="mt-2">{meta}</div>}
        </div>
        <ArrowUpRight className="shrink-0 text-[color:var(--site-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--site-border)] transition-shadow hover:shadow-[var(--site-shadow-lift)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--site-glow)" }}
      />

      <Link href={href} className="relative block p-3">
        {badge && (
          <span className="absolute left-5 top-5 z-10">
            <Badge>{badge}</Badge>
          </span>
        )}
        <div className="overflow-hidden rounded-xl">{preview}</div>
      </Link>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-1">
        <Link href={href} className="flex items-start gap-3">
          <h3 className="flex-1 text-[1.12rem] font-bold tracking-tight">{title}</h3>
          <ArrowUpRight className="mt-1 shrink-0 text-[color:var(--site-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
          {blurb}
        </p>

        {meta && <div className="mt-3">{meta}</div>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </article>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[color:var(--site-border)] bg-[color:var(--site-bg)] px-2.5 py-1 text-[0.72rem] font-semibold shadow-[var(--site-shadow)]">
      {children}
    </span>
  );
}

/** Full-width dark button, the card's primary action. */
export function CardButton({
  children,
  onClick,
  active,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-[0.98rem] font-semibold transition-opacity hover:opacity-90 ${
        active
          ? "bg-[color:var(--site-accent)] text-white"
          : "bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
      }`}
    >
      {children}
    </button>
  );
}
