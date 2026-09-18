"use client";

import { Avatar, Thumb } from "../../../ui/avatar";
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
          <Avatar name={brandName} size={27} />
          <span className="text-[color:var(--ob-muted)]">/</span>
          <span className="font-semibold">{userName}&apos;s team</span>
          <ChevronDown width={16} height={16} className="opacity-40" />
          <button type="button" aria-label="Collapse rail" className="opacity-45">
            <SidebarIcon width={19} height={19} />
          </button>
          <button
            type="button"
            className="ml-[13px] flex items-center gap-[9px] rounded-[9px] border border-[color:var(--ob-border)] px-[13px] py-[7px] text-[0.98rem]"
          >
            example.com <ChevronDown width={16} height={16} className="opacity-40" />
          </button>
          <button type="button" aria-label="More" className="opacity-50">
            <MoreIcon width={19} height={19} />
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-[11px]">
            <Btn tone="neutral" size="sm">
              <CoinsIcon width={17} height={17} /> Upgrade
            </Btn>
            <Btn tone="neutral" size="sm">
              <UserPlusIcon width={17} height={17} /> Invite team
            </Btn>
            <Avatar name={userName} size={33} />
          </div>
        </TopBar>

        <div className="flex min-h-[0px] flex-1">
        <Sidebar width={225} bg="var(--ob-surface)">
          <nav className="grid gap-[2px] px-[13px] pt-[18px]">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-[11px] rounded-[8px] px-[12px] py-[8px] text-left text-[0.9rem]",
                  item.active
                    ? "bg-[color:var(--ob-surface-2)] font-semibold"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <Icon name={item.icon as IconName} width={19} height={19} className="shrink-0 opacity-70" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded bg-[color:var(--ob-brand-soft)] px-[7px] py-[2px] text-[0.69rem] font-extrabold text-[color:var(--ob-brand)]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mx-[13px] my-[18px] h-px bg-[color:var(--ob-border)]" />

          <nav className="grid gap-[2px] px-[13px]">
            {ASSETS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-[13px] rounded-[9px] px-[13px] py-[11px] text-left text-[1.058rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <Icon name={item.icon as IconName} width={19} height={19} className="shrink-0 opacity-70" />
                {item.label}
              </button>
            ))}
          </nav>

          <nav className="mt-auto grid gap-[2px] px-[13px] pb-[9px]">
            {FOOTER.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-[13px] rounded-[9px] px-[13px] py-[11px] text-left text-[1.058rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <Icon name={item.icon as IconName} width={19} height={19} className="shrink-0 opacity-70" />
                {item.label}
              </button>
            ))}
            <div className="my-[9px] h-px bg-[color:var(--ob-border)]" />
            {SUPPORT.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-[13px] rounded-[9px] px-[13px] py-[11px] text-left text-[1.058rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <Icon name={item.icon as IconName} width={19} height={19} className="shrink-0 opacity-70" />
                <span className="flex-1">{item.label}</span>
                {item.external && (
                  <ExternalIcon width={14} height={14} className="opacity-40" />
                )}
              </button>
            ))}
          </nav>
        </Sidebar>

        <Main>

          <div className="grid gap-[22px] px-[27px] py-[36px] sm:px-[36px]">
            <header>
              <h1
                className="text-[2.45rem] tracking-tight"
                style={{ fontFamily: "var(--ob-font-display)" }}
              >
                Get started
              </h1>
              <p className="mt-[7px] text-[color:var(--ob-muted)]">
                Discover what you can create with your brand
              </p>
            </header>

            {/* Ad library showcase */}
            <div className="grid gap-[22px] lg:grid-cols-[1.6fr_1fr]">
              <Card className="grid gap-[27px] p-[27px] sm:grid-cols-2 sm:items-center">
                <div>
                  <p className="flex items-center gap-[9px] text-[0.98rem] text-[color:var(--ob-muted)]">
                    <ArchiveIcon width={18} height={18} /> Ad library
                  </p>
                  <h2
                    className="mt-[18px] text-[2.227rem] leading-[1.1] tracking-tight"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Recreate ads from top{" "}
                    <span className="text-[color:var(--ob-brand)]">software</span> brands
                  </h2>
                  <button type="button" className="mt-[22px] font-semibold">
                    Browse →
                  </button>
                </div>
                {/* Collage of reference ads, each an explicit slot. */}
                <div className="grid grid-cols-3 gap-[9px]">
                  {[120, 90, 150, 100, 140, 80, 110, 130, 95].map((height, i) => (
                    <span key={i} className="block" style={{ height }}>
                      <Thumb seed={`ad-${i}`} radius={9} alt="Ad" />
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="grid content-center justify-items-center gap-[22px] p-[27px] text-center">
                <div className="flex max-w-full gap-[9px] overflow-x-auto">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="relative shrink-0">
                      <span className="block h-[89px] w-[69px]">
                        <Thumb seed={`style-${i}`} radius={9} alt="Style" />
                      </span>
                      {i > 0 && (
                        <span className="absolute inset-[0px] grid place-items-center text-[color:var(--ob-muted)]">
                          <Lock width={17} height={17} />
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-[1.782rem] tracking-tight"
                  style={{ fontFamily: "var(--ob-font-display)" }}
                >
                  Create your own image
                </h3>
                <button type="button" className="text-[1.058rem] font-semibold">
                  Try a custom prompt →
                </button>
              </Card>
            </div>

            {/* Ideas / brand / uploads */}
            <div className="grid gap-[22px] lg:grid-cols-3">
              <Card className="flex flex-col gap-[22px] p-[27px]">
                <div className="grid grid-cols-2 gap-[13px]">
                  {IDEA_TILES.map((tile) => (
                    <div
                      key={tile.id}
                      className="grid gap-[9px] rounded-[11px] border border-[color:var(--ob-border)] p-[18px]"
                    >
                      <Icon
                        name={tile.icon as IconName}
                        width={21}
                        height={21}
                        className="opacity-55"
                      />
                      <span className="text-[0.947rem] text-[color:var(--ob-muted)]">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <p className="flex items-center gap-[9px] text-[0.98rem] text-[color:var(--ob-muted)]">
                    <LightbulbIcon width={18} height={18} /> Ideas
                  </p>
                  <h3
                    className="mt-[9px] text-[1.67rem] tracking-tight"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    41+ creative concepts
                  </h3>
                  <button type="button" className="mt-[9px] text-[1.058rem] font-semibold">
                    Explore →
                  </button>
                </div>
              </Card>

              <Card className="flex flex-col gap-[22px] p-[27px]">
                <span className="block aspect-[16/9] w-full">
                  <Thumb seed={`${brandName}-kit`} radius={11} alt="Brand logo on brand colour" />
                </span>
                <div className="mt-auto">
                  <p className="flex items-center gap-[9px] text-[0.98rem] text-[color:var(--ob-muted)]">
                    <PaletteIcon width={18} height={18} /> Brand
                  </p>
                  <div className="mt-[9px] flex items-start gap-[13px]">
                    <h3
                      className="flex-1 truncate text-[1.67rem] tracking-tight"
                      style={{ fontFamily: "var(--ob-font-display)" }}
                    >
                      {brandName} kit
                    </h3>
                    <span className="flex shrink-0 gap-[7px]">
                      <span className="size-[31px] rounded bg-[#111]" />
                      <span className="size-[31px] rounded border border-[color:var(--ob-border)] bg-white" />
                      <span className="size-[31px] rounded bg-[#3f3f46]" />
                      <span className="grid size-[31px] place-items-center rounded bg-[color:var(--ob-surface-3)] text-[0.757rem] font-bold">
                        +2
                      </span>
                    </span>
                  </div>
                  <div className="mt-[13px] flex flex-wrap items-center gap-[9px]">
                    <button type="button" className="text-[1.058rem] font-semibold">
                      See details →
                    </button>
                    <span className="ml-auto flex gap-[7px]">
                      {["Modern", "Professional", "Clean", "+2"].map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="flex flex-col gap-[22px] p-[27px]">
                <div className="grid aspect-[16/9] place-items-center rounded-[11px] bg-[color:var(--ob-surface-2)] text-[color:var(--ob-muted)]">
                  <UploadIcon width={38} height={38} />
                </div>
                <div className="mt-auto">
                  <p className="flex items-center gap-[9px] text-[0.98rem] text-[color:var(--ob-muted)]">
                    <UploadIcon width={18} height={18} /> Uploads
                  </p>
                  <h3
                    className="mt-[9px] text-[1.67rem] tracking-tight"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Uploads
                  </h3>
                  <button type="button" className="mt-[9px] text-[1.058rem] font-semibold">
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
