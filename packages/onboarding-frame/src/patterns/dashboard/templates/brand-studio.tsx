"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, brandStudioTokens } from "./tokens";
import { Btn, Card, Chip, Main, Shell, Sidebar, TopBar } from "./chrome";
import {
  ArchiveIcon,
  ChevronDown,
  CoinsIcon,
  ExternalIcon,
  Icon,
  LightbulbIcon,
  Lock,
  MoreIcon,
  PaletteIcon,
  SidebarIcon,
  UploadIcon,
  UserPlusIcon,
  type IconName,
} from "../../../ui/icons";
import type { TemplateProps } from "./props";

const NAV = [
  { id: "overview", label: "Overview", icon: "home", active: true },
  { id: "images", label: "Images", icon: "image" },
  { id: "ideas", label: "Ideas", icon: "lightbulb" },
  { id: "ads", label: "Ad library", icon: "archive", badge: "NEW" },
];

const ASSETS = [
  { id: "uploads", label: "Uploads", icon: "upload" },
  { id: "brand", label: "Brand", icon: "palette" },
];

const FOOTER = [
  { id: "agent", label: "Agent", icon: "sparkle" },
  { id: "mcp", label: "MCP", icon: "code" },
];

const SUPPORT = [
  { id: "feedback", label: "Feedback", icon: "chat" },
  { id: "help", label: "Help", icon: "lifebuoy" },
  { id: "community", label: "Community", icon: "users", external: true },
];

const IDEA_TILES = [
  { id: "social", label: "Social media", icon: "tag" },
  { id: "advertising", label: "Advertising", icon: "megaphone" },
  { id: "product", label: "Product shot", icon: "box" },
  { id: "blog", label: "Blog & content", icon: "file" },
];

/**
 * Brand studio overview.
 *
 * Editorial serif headings against a near-white canvas, with a wide ad-library
 * showcase and a bottom row that splits ideas, brand assets and uploads.
 */
export function BrandStudioTemplate({
  brandName = "Bloom",
  userName = "Alex",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={brandStudioTokens}>
      <Shell className={cn("flex-col", className)}>
        {/*
          The reference's top bar spans the whole window with the rail beneath
          it, so the workspace switcher sits above the navigation rather than
          beside it.
        */}
        <TopBar className="shrink-0">
          <Placeholder width={24} height={24} radius={12} />
          <span className="text-[color:var(--ob-muted)]">/</span>
          <span className="font-semibold">{userName}&apos;s team</span>
          <ChevronDown width={14} height={14} className="opacity-40" />
          <button type="button" aria-label="Collapse rail" className="opacity-45">
            <SidebarIcon width={17} height={17} />
          </button>
          <button
            type="button"
            className="ml-3 flex items-center gap-2 rounded-[8px] border border-[color:var(--ob-border)] px-3 py-1.5 text-[0.88rem]"
          >
            example.com <ChevronDown width={14} height={14} className="opacity-40" />
          </button>
          <button type="button" aria-label="More" className="opacity-50">
            <MoreIcon width={17} height={17} />
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-2.5">
            <Btn tone="neutral" size="sm">
              <CoinsIcon width={15} height={15} /> Upgrade
            </Btn>
            <Btn tone="neutral" size="sm">
              <UserPlusIcon width={15} height={15} /> Invite team
            </Btn>
            <Placeholder shape="circle" width={30} height={30} />
          </div>
        </TopBar>

        <div className="flex min-h-0 flex-1">
        <Sidebar width={225} bg="var(--ob-surface)">
          <nav className="grid gap-0.5 px-3 pt-4">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem]",
                  item.active
                    ? "bg-[color:var(--ob-surface-2)] font-semibold"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <Icon name={item.icon as IconName} width={17} height={17} className="shrink-0 opacity-70" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded bg-[color:var(--ob-brand-soft)] px-1.5 py-0.5 text-[0.62rem] font-extrabold text-[color:var(--ob-brand)]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mx-3 my-4 h-px bg-[color:var(--ob-border)]" />

          <nav className="grid gap-0.5 px-3">
            {ASSETS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <Icon name={item.icon as IconName} width={17} height={17} className="shrink-0 opacity-70" />
                {item.label}
              </button>
            ))}
          </nav>

          <nav className="mt-auto grid gap-0.5 px-3 pb-2">
            {FOOTER.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <Icon name={item.icon as IconName} width={17} height={17} className="shrink-0 opacity-70" />
                {item.label}
              </button>
            ))}
            <div className="my-2 h-px bg-[color:var(--ob-border)]" />
            {SUPPORT.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <Icon name={item.icon as IconName} width={17} height={17} className="shrink-0 opacity-70" />
                <span className="flex-1">{item.label}</span>
                {item.external && (
                  <ExternalIcon width={13} height={13} className="opacity-40" />
                )}
              </button>
            ))}
          </nav>
        </Sidebar>

        <Main>

          <div className="grid gap-5 px-6 py-8 sm:px-8">
            <header>
              <h1
                className="text-[2.2rem] tracking-tight"
                style={{ fontFamily: "var(--ob-font-display)" }}
              >
                Get started
              </h1>
              <p className="mt-1.5 text-[color:var(--ob-muted)]">
                Discover what you can create with your brand
              </p>
            </header>

            {/* Ad library showcase */}
            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <Card className="grid gap-6 p-6 sm:grid-cols-2 sm:items-center">
                <div>
                  <p className="flex items-center gap-2 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <ArchiveIcon width={16} height={16} /> Ad library
                  </p>
                  <h2
                    className="mt-4 text-[2rem] leading-[1.1] tracking-tight"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Recreate ads from top{" "}
                    <span className="text-[color:var(--ob-brand)]">software</span> brands
                  </h2>
                  <button type="button" className="mt-5 font-semibold">
                    Browse →
                  </button>
                </div>
                {/* Collage of reference ads, each an explicit slot. */}
                <div className="grid grid-cols-3 gap-2">
                  {[120, 90, 150, 100, 140, 80, 110, 130, 95].map((height, i) => (
                    <Placeholder key={i} height={height} radius={8} label="Ad" />
                  ))}
                </div>
              </Card>

              <Card className="grid content-center justify-items-center gap-5 p-6 text-center">
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="relative">
                      <Placeholder width={62} height={80} radius={8} />
                      {i > 0 && (
                        <span className="absolute inset-0 grid place-items-center text-[color:var(--ob-muted)]">
                          <Lock width={15} height={15} />
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-[1.6rem] tracking-tight"
                  style={{ fontFamily: "var(--ob-font-display)" }}
                >
                  Create your own image
                </h3>
                <button type="button" className="text-[0.95rem] font-semibold">
                  Try a custom prompt →
                </button>
              </Card>
            </div>

            {/* Ideas / brand / uploads */}
            <div className="grid gap-5 lg:grid-cols-3">
              <Card className="flex flex-col gap-5 p-6">
                <div className="grid grid-cols-2 gap-3">
                  {IDEA_TILES.map((tile) => (
                    <div
                      key={tile.id}
                      className="grid gap-2 rounded-[10px] border border-[color:var(--ob-border)] p-4"
                    >
                      <Icon
                        name={tile.icon as IconName}
                        width={19}
                        height={19}
                        className="opacity-55"
                      />
                      <span className="text-[0.85rem] text-[color:var(--ob-muted)]">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <p className="flex items-center gap-2 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <LightbulbIcon width={16} height={16} /> Ideas
                  </p>
                  <h3
                    className="mt-2 text-[1.5rem] tracking-tight"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    41+ creative concepts
                  </h3>
                  <button type="button" className="mt-2 text-[0.95rem] font-semibold">
                    Explore →
                  </button>
                </div>
              </Card>

              <Card className="flex flex-col gap-5 p-6">
                <Placeholder
                  ratio={16 / 9}
                  radius={10}
                  label="Brand logo on brand colour"
                />
                <div className="mt-auto">
                  <p className="flex items-center gap-2 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <PaletteIcon width={16} height={16} /> Brand
                  </p>
                  <div className="mt-2 flex items-start gap-3">
                    <h3
                      className="flex-1 truncate text-[1.5rem] tracking-tight"
                      style={{ fontFamily: "var(--ob-font-display)" }}
                    >
                      {brandName} kit
                    </h3>
                    <span className="flex shrink-0 gap-1.5">
                      <span className="size-7 rounded bg-[#111]" />
                      <span className="size-7 rounded border border-[color:var(--ob-border)] bg-white" />
                      <span className="size-7 rounded bg-[#3f3f46]" />
                      <span className="grid size-7 place-items-center rounded bg-[color:var(--ob-surface-3)] text-[0.68rem] font-bold">
                        +2
                      </span>
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button type="button" className="text-[0.95rem] font-semibold">
                      See details →
                    </button>
                    <span className="ml-auto flex gap-1.5">
                      {["Modern", "Professional", "Clean", "+2"].map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="flex flex-col gap-5 p-6">
                <div className="grid aspect-[16/9] place-items-center rounded-[10px] bg-[color:var(--ob-surface-2)] text-[color:var(--ob-muted)]">
                  <UploadIcon width={34} height={34} />
                </div>
                <div className="mt-auto">
                  <p className="flex items-center gap-2 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <UploadIcon width={16} height={16} /> Uploads
                  </p>
                  <h3
                    className="mt-2 text-[1.5rem] tracking-tight"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Uploads
                  </h3>
                  <button type="button" className="mt-2 text-[0.95rem] font-semibold">
                    Upload images →
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </Main>
        </div>
      </Shell>
    </Surface>
  );
}
