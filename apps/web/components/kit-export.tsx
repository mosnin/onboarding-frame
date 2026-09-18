"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { presets, type OnboardingTheme, type PatternKind } from "onboarding-frame";
import { useKit } from "@/lib/kit";
import { shelves, type ShelfItem } from "@/lib/shelves";
import { kitPrompt, type KitPiece } from "@/lib/snippets";
import { CodeBlock } from "./code-block";
import { ItemPreview } from "./item-preview";

function resolveConfig(item: ShelfItem): { config?: unknown; theme?: OnboardingTheme } {
  if (item.kind === "dashboard") return {};
  const group = presets[item.kind as PatternKind] as Record<string, unknown>;
  const entry = group?.[item.variant];
  if (entry && typeof entry === "object" && "config" in entry) {
    return entry as { config: unknown; theme?: OnboardingTheme };
  }
  return { config: entry };
}

export function KitExport() {
  const { kit, ready, select, clear, count } = useKit();
  const [projectName, setProjectName] = useState("");
  const [tab, setTab] = useState<"prompt" | "json">("prompt");

  const pieces = useMemo<(KitPiece & { item: ShelfItem; shelfId: string })[]>(() => {
    const out: (KitPiece & { item: ShelfItem; shelfId: string })[] = [];
    for (const shelf of shelves) {
      const ids =
        shelf.id === "addons"
          ? kit.addons
          : [kit[shelf.id as "onboarding" | "dashboard" | "pricing"]].filter(
              (id): id is string => Boolean(id),
            );
      for (const id of ids) {
        const item = shelf.items.find((entry) => entry.id === id);
        if (!item) continue;
        const { config, theme } = resolveConfig(item);
        out.push({
          shelf: shelf.noun,
          shelfId: shelf.id,
          name: item.name,
          kind: item.kind,
          variant: item.variant,
          config,
          theme,
          item,
        });
      }
    }
    return out;
  }, [kit]);

  const prompt = useMemo(
    () => kitPrompt(pieces, projectName.trim() || "my app"),
    [pieces, projectName],
  );

  const json = useMemo(
    () =>
      JSON.stringify(
        {
          $schema: "https://onboarding-frame.dev/schema/kit-v1.json",
          project: projectName.trim() || "my app",
          pieces: pieces.map((piece) => ({
            shelf: piece.shelfId,
            name: piece.name,
            kind: piece.kind,
            variant: piece.variant,
            theme: piece.theme,
            config: piece.config,
          })),
        },
        null,
        2,
      ),
    [pieces, projectName],
  );

  if (!ready) return null;

  if (count === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-[2.25rem] font-extrabold tracking-tight">Your kit is empty</h1>
        <p className="mt-3 text-pretty leading-relaxed text-[color:var(--site-muted)]">
          Pick an onboarding flow, a dashboard and a pricing page. They&apos;re
          independent — take one of each, or just the one you need.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {shelves.map((shelf) => (
            <Link
              key={shelf.id}
              href={`/shelf/${shelf.id}`}
              className="rounded-full border border-[color:var(--site-border)] px-4 py-2 text-sm font-semibold"
            >
              <span aria-hidden className="mr-1.5">{shelf.glyph}</span>
              {shelf.name}
            </Link>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end gap-4">
        <div className="flex-1">
          <h1 className="text-[2.25rem] font-extrabold tracking-tight">Your kit</h1>
          <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
            {count} piece{count === 1 ? "" : "s"}. Hand the prompt below to your
            coding agent — it carries every config inline, so there&apos;s nothing
            left to guess at.
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-[color:var(--site-border)] px-4 py-2 text-sm font-semibold text-[color:var(--site-muted)]"
        >
          Clear kit
        </button>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr]">
        <div className="grid content-start gap-4">
          <label className="grid gap-2">
            <span className="text-[0.72rem] font-bold uppercase tracking-wide text-[color:var(--site-muted)]">
              Project name
            </span>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my app"
              className="w-full rounded-lg border border-[color:var(--site-border)] bg-[color:var(--site-bg)] px-3 py-2 text-sm"
            />
          </label>

          {pieces.map((piece) => (
            <article
              key={`${piece.shelfId}-${piece.item.id}`}
              className="overflow-hidden rounded-xl border border-[color:var(--site-border)]"
            >
              <ItemPreview
                kind={piece.kind}
                variant={piece.variant}
                height={120}
                scale={0.22}
              />
              <div className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.72rem] font-bold uppercase tracking-wide text-[color:var(--site-muted)]">
                    {piece.shelf}
                  </p>
                  <p className="truncate font-semibold">{piece.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    select(piece.shelfId as "onboarding", piece.item.id)
                  }
                  aria-label={`Remove ${piece.name}`}
                  className="shrink-0 rounded-full px-2 py-1 text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                >
                  ✕
                </button>
              </div>
            </article>
          ))}

          <div className="grid gap-2">
            {shelves.map((shelf) => {
              const filled =
                shelf.id === "addons"
                  ? kit.addons.length > 0
                  : Boolean(kit[shelf.id as "onboarding"]);
              if (filled) return null;
              return (
                <Link
                  key={shelf.id}
                  href={`/shelf/${shelf.id}`}
                  className="rounded-lg border border-dashed border-[color:var(--site-border)] px-3 py-2.5 text-sm font-semibold text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                >
                  <span aria-hidden className="mr-1.5">{shelf.glyph}</span>
                  Add {shelf.noun}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid min-w-0 content-start gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "prompt", label: "Agent prompt" },
                { id: "json", label: "Kit JSON" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  tab === item.id
                    ? "bg-[color:var(--site-surface)] text-[color:var(--site-fg)]"
                    : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "prompt" ? (
            <CodeBlock
              code={prompt}
              language="markdown"
              title="Paste into Claude Code, Cursor, ChatGPT — anything"
              maxHeight="42rem"
            />
          ) : (
            <CodeBlock
              code={json}
              language="json"
              title="kit.json"
              maxHeight="42rem"
            />
          )}
        </div>
      </div>
    </main>
  );
}
