"use client";

import Link from "next/link";
import { useState } from "react";
import { templateCatalog } from "onboarding-frame";
import { useKit } from "@/lib/kit";
import { CopyButton } from "./copy-button";
import { TemplateBody } from "./template-viewer";
import {
  ArrowLeft,
  CheckIcon,
  DesktopIcon,
  MobileIcon,
  PlusIcon,
  RefreshIcon,
  TabletIcon,
} from "./icons";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<Device, number | null> = {
  desktop: null,
  tablet: 900,
  mobile: 420,
};

/**
 * Template detail.
 *
 * The toolbar carries what someone actually does here: switch pages, resize to
 * check the layout, copy the eject command, and copy a prompt for an agent.
 * The device sizes are real container widths rather than a simulated viewport,
 * so what you see is the template reflowing at that width.
 */
export function TemplateViewerShell({ slug }: { slug: string }) {
  const entry = templateCatalog.find((item) => item.slug === slug);
  const index = templateCatalog.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? templateCatalog[index - 1] : undefined;
  const next =
    index < templateCatalog.length - 1 ? templateCatalog[index + 1] : undefined;

  const [page, setPage] = useState(entry?.pages[0]?.id ?? "home");
  const [device, setDevice] = useState<Device>("desktop");
  // Bumping this remounts the template, which resets any state it holds.
  const [nonce, setNonce] = useState(0);
  const { select, has, ready } = useKit();

  if (!entry) return null;

  const picked = ready && has("dashboard", entry.slug);
  const width = DEVICE_WIDTHS[device];

  const agentPrompt = [
    `Build the "${entry.name}" dashboard surface.`,
    "",
    entry.blurb,
    "",
    `Pages to implement: ${entry.pages.map((item) => item.label).join(", ")}.`,
    "",
    "Use the onboarding-frame library:",
    "",
    "```bash",
    "npm install onboarding-frame",
    "```",
    "",
    "```tsx",
    `import { ${componentFor(entry.slug)} } from "onboarding-frame";`,
    'import "onboarding-frame/styles.css";',
    "",
    `<${componentFor(entry.slug)} page="${page}" />`,
    "```",
    "",
    "Or copy the source into the project instead:",
    "",
    "```bash",
    `npx onboarding-frame add ${entry.slug}`,
    "```",
    "",
    "Every image, logo and avatar renders as a labelled dotted placeholder.",
    "Replace them with real assets; keep the reserved space.",
  ].join("\n");

  return (
    <div className="mx-auto max-w-[1700px] px-4 py-6 sm:px-6">
      <Link
        href="/templates"
        className="inline-flex items-center gap-2 text-[0.98rem] font-medium text-[color:var(--site-muted)] transition-colors hover:text-[color:var(--site-fg)]"
      >
        <ArrowLeft /> Back to templates
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-[2.6rem] font-bold leading-tight tracking-[-0.02em]">
            {entry.name}
          </h1>
          <p className="mt-2 max-w-3xl text-[1.08rem] leading-relaxed text-[color:var(--site-muted)]">
            {entry.blurb}
          </p>
        </div>

        <button
          type="button"
          onClick={() => select("dashboard", entry.slug)}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-[0.98rem] font-semibold transition-opacity hover:opacity-90 ${
            picked
              ? "bg-[color:var(--site-accent)] text-white"
              : "bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
          }`}
        >
          {picked ? (
            <>
              <CheckIcon /> In your kit
            </>
          ) : (
            <>
              <PlusIcon /> Add to kit
            </>
          )}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {entry.pages.length > 1 && (
          <div className="flex items-center gap-1 rounded-xl border border-[color:var(--site-border)] p-1">
            {entry.pages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                aria-pressed={page === item.id}
                className={`rounded-lg px-3.5 py-1.5 text-[0.92rem] font-medium transition-colors ${
                  page === item.id
                    ? "bg-[color:var(--site-bg)] shadow-[var(--site-shadow)] ring-1 ring-[color:var(--site-border)]"
                    : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <span className="flex items-center gap-2 rounded-xl border border-[color:var(--site-border)] py-1.5 pl-3.5 pr-1.5 text-[0.92rem]">
          <code style={{ fontFamily: "var(--font-mono)" }}>{entry.slug}</code>
          <CopyButton value={`npx onboarding-frame add ${entry.slug}`} />
        </span>

        <div className="ml-auto flex items-center gap-3">
          <CopyButton value={agentPrompt} label="Copy for AI" />

          <div className="flex items-center gap-1 rounded-xl border border-[color:var(--site-border)] p-1">
            {[
              {
                id: "desktop" as const,
                icon: <DesktopIcon />,
                label: "Desktop",
              },
              { id: "tablet" as const, icon: <TabletIcon />, label: "Tablet" },
              { id: "mobile" as const, icon: <MobileIcon />, label: "Mobile" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDevice(item.id)}
                aria-label={item.label}
                aria-pressed={device === item.id}
                className={`grid size-9 place-items-center rounded-lg transition-colors ${
                  device === item.id
                    ? "bg-[color:var(--site-bg)] shadow-[var(--site-shadow)] ring-1 ring-[color:var(--site-border)]"
                    : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setNonce((value) => value + 1)}
            aria-label="Reset the preview"
            className="grid size-10 place-items-center rounded-xl border border-[color:var(--site-border)] text-[color:var(--site-muted)] transition-colors hover:text-[color:var(--site-fg)]"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--site-border)] bg-[color:var(--site-surface)]">
        <div
          className="mx-auto overflow-hidden transition-[max-width] duration-300"
          style={{ maxWidth: width ?? "100%" }}
        >
          <TemplateBody
            key={`${page}-${nonce}-${device}`}
            slug={entry.slug}
            page={page}
          />
        </div>
      </div>

      <nav className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--site-border)] pt-6">
        {previous ? (
          <Link
            href={`/templates/${previous.slug}`}
            className="group flex items-center gap-3 text-left"
          >
            <ArrowLeft className="text-[color:var(--site-muted)] transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="block text-[0.85rem] text-[color:var(--site-muted)]">
                Previous
              </span>
              <span className="block font-semibold">{previous.name}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next && (
          <Link
            href={`/templates/${next.slug}`}
            className="group flex items-center gap-3 text-right"
          >
            <span>
              <span className="block text-[0.85rem] text-[color:var(--site-muted)]">
                Next
              </span>
              <span className="block font-semibold">{next.name}</span>
            </span>
            <ArrowLeft className="rotate-180 text-[color:var(--site-muted)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </nav>
    </div>
  );
}

/** Slug to exported component name, matching the library's naming. */
function componentFor(slug: string): string {
  const pascal = slug
    .split("-")
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join("");
  return `${pascal}Template`;
}
