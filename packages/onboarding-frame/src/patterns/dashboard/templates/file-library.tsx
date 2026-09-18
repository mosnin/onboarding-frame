"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, fileLibraryTokens } from "./tokens";
import { Btn, Main, Segmented, Select, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

const PROJECTS = [
  { id: "files", label: "My files", glyph: "✎", active: true },
  { id: "shared", label: "Shared with me", glyph: "🗎", badge: "1" },
  { id: "favorites", label: "Favourites", glyph: "♡" },
];

const RESOURCES = [
  { id: "community", label: "Community", glyph: "🌐" },
  { id: "docs", label: "Documentation", glyph: "📖" },
  { id: "blog", label: "Blog", glyph: "▤" },
  { id: "videos", label: "Videos", glyph: "▶" },
];

const FILES = [
  { id: "first", title: "My first project", sub: "Edited 2 seconds ago", kind: "file" },
  { id: "marketing", title: "Marketing and landing pages", sub: "Default library", kind: "library" },
  { id: "components", title: "Component library", sub: "Default library", kind: "library" },
  { id: "mobile", title: "Mobile library", sub: "Default library", kind: "library" },
];

/**
 * File library.
 *
 * A project grid where the create affordance is the first tile rather than a
 * toolbar button, so an empty workspace still has an obvious next action.
 */
export function FileLibraryTemplate({
  brandName = "Atlas",
  userName = "Sam Rivera",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={fileLibraryTokens}>
    <Shell className={cn(className)} bg="var(--ob-surface-2)">
      <Sidebar width={300} bg="var(--ob-surface-2)" className="border-r-0">
        <div className="flex items-center gap-2 p-5">
          <Placeholder width={24} height={24} radius={6} glyph="▦" />
          <button type="button" aria-label="Notifications" className="ml-auto opacity-50">
            ⌾
          </button>
        </div>

        <div className="mx-4 flex items-center gap-3 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-[#1b6b4a] text-[0.82rem] font-bold text-white">
            {userName.slice(0, 1)}
          </span>
          <span className="flex-1 truncate font-semibold">{userName}</span>
          <span aria-hidden className="opacity-40">⌄</span>
        </div>

        <p className="px-5 pb-1 pt-6 text-[0.82rem] text-[color:var(--ob-muted)]">Projects</p>
        <nav className="grid gap-0.5 px-3">
          {PROJECTS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[0.95rem] transition-colors",
                item.active
                  ? "bg-[color:var(--ob-surface)] font-semibold [box-shadow:var(--ob-shadow)]"
                  : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-3)]",
              )}
            >
              <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[0.82rem] text-[color:var(--ob-muted)]">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <p className="px-5 pb-1 pt-6 text-[0.82rem] text-[color:var(--ob-muted)]">Resources</p>
        <nav className="grid gap-0.5 px-3">
          {RESOURCES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-3)]"
            >
              <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mx-4 mt-6 flex items-center gap-3 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-3.5">
          <div className="flex-1">
            <p className="font-semibold">Create a team</p>
            <p className="text-[0.85rem] text-[color:var(--ob-muted)]">
              Start a shared workspace
            </p>
          </div>
          <span aria-hidden className="opacity-60">👥</span>
        </div>

        <div className="mt-auto p-4">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-2.5 text-[0.92rem] font-medium"
          >
            <span aria-hidden>⬇</span>
            <span className="flex-1 text-left">Download desktop app</span>
          </button>
          <div className="flex items-center gap-4 px-2 pt-4 text-[color:var(--ob-muted)]">
            <button type="button" aria-label="Theme">☀</button>
            <button type="button" aria-label="Help" className="ml-auto">?</button>
            <button type="button" aria-label="More">⋯</button>
          </div>
        </div>
      </Sidebar>

      <Main className="p-4">
        <div className="flex flex-1 flex-col rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-[1.9rem] font-extrabold tracking-tight">My files</h1>
            <Segmented
              items={[
                { id: "all", label: "All" },
                { id: "files", label: "Files" },
                { id: "libraries", label: "Libraries" },
              ]}
              active="all"
            />
            <div className="ml-auto flex items-center gap-2.5">
              <button type="button" aria-label="Search" className="px-2 opacity-60">⌕</button>
              <Select label="Last modified" />
              <div className="flex items-center rounded-[8px] border border-[color:var(--ob-border)]">
                <button type="button" aria-label="Grid view" className="px-2.5 py-1.5">▦</button>
                <button type="button" aria-label="List view" className="px-2.5 py-1.5 opacity-50">☰</button>
              </div>
              <Btn tone="primary" size="sm" className="bg-[#1b6b4a] text-white">
                New file <kbd className="opacity-70">⌘N</kbd>
              </Btn>
            </div>
          </div>

          <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Create tile leads the grid so an empty workspace still has a next step. */}
            <div>
              <button
                type="button"
                className="grid aspect-[4/3] w-full place-items-center rounded-[10px] border-2 border-dashed border-[color:var(--ob-border-strong)] text-2xl text-[color:var(--ob-muted)] transition-colors hover:border-[#1b6b4a] hover:text-[#1b6b4a]"
              >
                ＋
              </button>
              <p className="mt-3 font-semibold text-[#1b6b4a]">Create a new design</p>
            </div>

            {FILES.map((file) => (
              <div key={file.id}>
                <Placeholder
                  ratio={4 / 3}
                  radius={10}
                  label={file.kind === "library" ? "Library preview" : "File thumbnail"}
                />
                <div className="mt-3 flex items-start gap-2.5">
                  <Placeholder width={22} height={22} radius={5} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{file.title}</p>
                    <p className="truncate text-[0.85rem] text-[color:var(--ob-muted)]">
                      {file.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Main>
    </Shell>
    </Surface>
  );
}
