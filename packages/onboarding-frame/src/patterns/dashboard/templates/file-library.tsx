"use client";

import { Avatar, Thumb } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, fileLibraryTokens } from "./tokens";
import { Btn, Main, Segmented, Select, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  BellIcon,
  ChevronDown,
  DownloadIcon,
  EyeIcon,
  GridIcon,
  Icon,
  ListIcon,
  MoreIcon,
  Plus,
  SearchIcon,
  Sun,
  UserPlusIcon,
  type IconName,
} from "../../../ui/icons";

type Row = { id: string; label: string; icon: IconName; active?: boolean; badge?: string };

const PROJECTS: Row[] = [
  { id: "files", label: "My files", icon: "edit", active: true },
  { id: "shared", label: "Shared with me", icon: "files", badge: "1" },
  { id: "favorites", label: "Favourites", icon: "heart" },
];

const RESOURCES: Row[] = [
  { id: "community", label: "Community", icon: "globe" },
  { id: "docs", label: "Documentation", icon: "book" },
  { id: "blog", label: "Blog", icon: "file" },
  { id: "videos", label: "Videos", icon: "play" },
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
      {/* Measured off the reference: 255px. */}
      <Sidebar width={255} bg="var(--ob-surface-2)" className="border-r-0">
        <div className="flex items-center gap-2 p-5">
          <Avatar name={brandName} size={24} rounded={6} />
          <button type="button" aria-label="Notifications" className="ml-auto opacity-50">
            <BellIcon width={18} height={18} />
          </button>
        </div>

        <div className="mx-4 flex items-center gap-3 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-[#1b6b4a] text-[0.82rem] font-bold text-white">
            {userName.slice(0, 1)}
          </span>
          <span className="flex-1 truncate font-semibold">{userName}</span>
          <ChevronDown width={15} height={15} className="opacity-40" />
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
              <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-70" />
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
              <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-70" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mx-3 mt-6 flex items-center gap-2 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Create a team</p>
            <p className="whitespace-nowrap text-[0.82rem] text-[color:var(--ob-muted)]">
              Start a shared workspace
            </p>
          </div>
          <UserPlusIcon width={18} height={18} className="shrink-0 opacity-60" />
        </div>

        <div className="mt-auto p-4">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-2.5 text-[0.92rem] font-medium"
          >
            <DownloadIcon width={16} height={16} />
            <span className="flex-1 text-left">Download desktop app</span>
          </button>
          <div className="flex items-center gap-4 px-2 pt-4 text-[color:var(--ob-muted)]">
            <button type="button" aria-label="Theme"><Sun width={17} height={17} /></button>
            <button type="button" aria-label="Help" className="ml-auto">
              <Icon name="info" width={17} height={17} />
            </button>
            <button type="button" aria-label="More"><MoreIcon width={17} height={17} /></button>
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
              activeClassName="bg-[#dcefe2] text-[#1b6b4a]"
            />
            <div className="ml-auto flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Search"
                className="grid size-9 place-items-center rounded-full border border-[color:var(--ob-border)] opacity-70"
              >
                <SearchIcon width={16} height={16} />
              </button>
              <Select label="Last modified" />
              <div className="flex items-center rounded-[8px] border border-[color:var(--ob-border)]">
                <button type="button" aria-label="Grid view" className="px-2.5 py-1.5">
                  <GridIcon width={16} height={16} />
                </button>
                <button type="button" aria-label="List view" className="px-2.5 py-1.5 opacity-50">
                  <ListIcon width={16} height={16} />
                </button>
              </div>
              <Btn tone="primary" size="sm" className="bg-[#1b6b4a] text-white">
                New file
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-white/20 px-1 text-[0.7rem]">⌘</kbd>
                  <kbd className="rounded bg-white/20 px-1 text-[0.7rem]">N</kbd>
                </span>
              </Btn>
            </div>
          </div>

          <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Create tile leads the grid so an empty workspace still has a next step. */}
            <div>
              <button
                type="button"
                className="grid aspect-[4/3] w-full place-items-center rounded-[10px] border-2 border-dashed border-[color:var(--ob-border-strong)] text-[color:var(--ob-muted)] transition-colors hover:border-[#1b6b4a] hover:text-[#1b6b4a]"
              >
                <Plus width={24} height={24} />
              </button>
              <p className="mt-3 font-semibold text-[#1b6b4a]">Create a new design</p>
            </div>

            {FILES.map((file) => (
              <div key={file.id}>
                <div className="relative">
                  <span className="block aspect-[4/3] w-full">
                    <Thumb
                      seed={file.id}
                      radius={10}
                      alt={file.kind === "library" ? "Library preview" : "File thumbnail"}
                    />
                  </span>
                  {file.kind === "library" && (
                    <span className="absolute right-2.5 top-2.5 text-[color:var(--ob-muted)]">
                      <EyeIcon width={16} height={16} />
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className="grid size-[22px] shrink-0 place-items-center rounded-[5px] bg-[#1d2b24] text-white">
                    <Icon
                      name={file.kind === "library" ? "monitor" : "file"}
                      width={12}
                      height={12}
                    />
                  </span>
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
