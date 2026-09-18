"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, apiConsoleTokens } from "./tokens";
import { ApiConsoleSubpage } from "./api-console-pages";
import {
  Banner,
  Btn,
  Card,
  Chip,
  Main,
  SearchField,
  Shell,
  TopBar,
} from "./chrome";

import type { TemplateProps } from "./props";
import {
  AlertIcon,
  BellIcon,
  Check,
  ChevronDown,
  CpuIcon,
  FileIcon,
  GridIcon,
  HomeIcon,
  Icon,
  KeyIcon,
  LayersIcon,
  ReceiptIcon,
  RocketIcon,
  SettingsIcon,
  Sparkle,
  TerminalIcon,
  VideoIcon,
  WandIcon,
  type IconName,
} from "../../../ui/icons";

/** Pages this template implements, matching its own navigation. */
export type ApiConsolePage =
  | "home"
  | "explore"
  | "assets"
  | "serverless"
  | "usage";

export interface ApiConsoleProps extends TemplateProps {
  page?: ApiConsolePage;
}

const TABS: {
  id: string;
  label: string;
  icon: IconName;
  caret?: boolean;
  badge?: string;
}[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "explore", label: "Explore", icon: "grid" },
  { id: "assets", label: "Assets", icon: "layers" },
  { id: "generate", label: "Generate", icon: "wand", caret: true },
  { id: "serverless", label: "Serverless", icon: "rocket" },
  { id: "compute", label: "Compute", icon: "cpu", caret: true, badge: "Beta" },
  { id: "settings", label: "Settings", icon: "settings", caret: true },
];

const SETUP = [
  { id: "account", label: "Create an account", done: true },
  { id: "payment", label: "Add a payment method", action: "Set up billing", primary: true },
  { id: "credits", label: "Add credits", action: "Add credits" },
  { id: "media", label: "Generate your first media", action: "Try the sandbox", icon: "terminal" },
];

const API_LINKS: {
  id: string;
  label: string;
  Glyph: typeof KeyIcon;
  tone: string;
  ink: string;
}[] = [
  { id: "key", label: "Get an API key", Glyph: KeyIcon, tone: "#efe7ff", ink: "#7c4dcc" },
  { id: "docs", label: "Go to documentation", Glyph: FileIcon, tone: "#eef2fb", ink: "#5b7cc2" },
  { id: "quickstart", label: "Quickstart: call your first model", Glyph: FileIcon, tone: "#eef2fb", ink: "#5b7cc2" },
  { id: "sdk", label: "Use the SDK (JS, Python, cURL)", Glyph: FileIcon, tone: "#eef2fb", ink: "#5b7cc2" },
];

const MODELS = [
  { id: "m1", org: "northwind", name: "motion-2.0/image-to-video", desc: "Our most advanced image-to-video model. Animate still images into cinemat…" },
  { id: "m2", org: "", name: "prism-2/turbo", desc: "Generate high-fidelity images from text in seconds with Prism 2 Turbo, the speed-opti…" },
  { id: "m3", org: "lumaworks", name: "swift-horse/v1.1/image-to-video", desc: "Swift Horse 1.1 is the top-ranked video model. This image-to-video endpoint ani…" },
];

/**
 * API console home.
 *
 * A developer-platform dashboard where onboarding lives as a dismissible
 * "getting started" band above the real usage metrics: setup checklist, API
 * quickstart links and a model catalogue, with credit and error strips below.
 */
export function ApiConsoleTemplate({
  brandName = "Northwind",
  page = "home",
  className,
}: ApiConsoleProps) {
  return (
    <Surface tokens={apiConsoleTokens}>
    <Shell className={cn("flex-col", className)}>
      <Banner tone="dark">
        <span className="flex items-center gap-1.5 font-semibold">
          <Sparkle width={13} height={13} /> {brandName} Assets is now live!
          <Sparkle width={13} height={13} />
        </span>
      </Banner>

      <TopBar>
        <Placeholder width={30} height={30} radius={7} />
        <span className="text-[color:var(--ob-muted)]">/</span>
        <span className="font-semibold">Home</span>
        <SearchField
          placeholder="Search anything"
          shortcut="⌘K"
          rounded="md"
          className="ml-auto hidden w-[340px] md:flex"
        />
        <div className="hidden items-center gap-2 rounded-[8px] border border-[color:var(--ob-border)] px-3 py-2 text-[0.86rem] sm:flex">
          <GridIcon width={14} height={14} className="opacity-45" />
          <span className="text-[color:var(--ob-muted)]">Credits:</span>
          <span className="font-semibold">$0.00</span>
        </div>
        {/*
          The reference splits this: "Docs" opens the docs, the caret beside it
          opens a menu, with a hairline between the two halves.
        */}
        <div className="hidden items-center rounded-[8px] border border-[color:var(--ob-border-strong)] sm:flex">
          <button type="button" className="px-3 py-1.5 text-[0.86rem] font-semibold">
            Docs
          </button>
          <span className="h-5 w-px bg-[color:var(--ob-border)]" />
          <button type="button" aria-label="Docs menu" className="px-2 py-1.5">
            <ChevronDown width={14} height={14} className="opacity-50" />
          </button>
        </div>
        <button type="button" aria-label="Notifications" className="px-1 opacity-55">
          <BellIcon width={18} height={18} />
        </button>
        <Placeholder shape="circle" width={30} height={30} />
      </TopBar>

      {/* Second-level product navigation */}
      <nav className="flex items-center gap-5 overflow-x-auto border-b border-[color:var(--ob-border)] px-4 sm:px-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-current={tab.id === page ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-1.5 whitespace-nowrap border-b-2 py-3 text-[0.9rem] transition-colors",
              tab.id === page
                ? "border-[color:var(--ob-fg)] font-semibold"
                : "border-transparent text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]",
            )}
          >
            <Icon name={tab.icon} width={15} height={15} className="opacity-70" />
            {tab.label}
            {tab.caret && <ChevronDown width={13} height={13} className="opacity-40" />}
            {tab.badge && (
              <span className="absolute -top-0.5 right-0 translate-x-full rounded-full bg-[#efe7ff] px-1.5 text-[0.6rem] font-bold text-[#6b46e5]">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <Main>
        {page !== "home" ? (
          <ApiConsoleSubpage page={page} brandName={brandName} />
        ) : (
        <>
        <div className="border-b border-[color:var(--ob-border)] px-6 py-7 sm:px-10">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1">
              <h1 className="text-[2rem] font-extrabold tracking-tight">Dashboard</h1>
              <p className="mt-1 text-[color:var(--ob-muted)]">
                Start exploring {brandName}&apos;s capabilities{" "}
                <span className="px-1">·</span>
                <button type="button" className="hover:text-[color:var(--ob-fg)]">
                  Hide getting started guide
                </button>
              </p>
            </div>
            <div className="flex items-center gap-2 text-[0.9rem]">
              <span className="text-[color:var(--ob-muted)]">I&apos;m here</span>
              <span className="font-mono opacity-60">&lt;/&gt;</span>
              <span className="font-semibold">To build with code</span>
              <ChevronDown width={14} height={14} className="opacity-40" />
            </div>
          </div>
        </div>

        <div className="grid gap-10 px-6 py-8 sm:px-10">
          <section className="grid gap-5">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-extrabold tracking-tight">Getting started</h2>
                <p className="mt-0.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                  Start exploring {brandName}&apos;s capabilities
                </p>
              </div>
              <Btn tone="neutral" size="sm">Don&apos;t show this</Btn>
            </div>

            <div className="grid divide-y divide-[color:var(--ob-border)] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {/* Setup checklist */}
              <div className="flex flex-col gap-5 p-6">
                <div>
                  <h3 className="font-bold">Welcome to {brandName}!</h3>
                  <p className="mt-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Let&apos;s get your account ready to generate content or call the API.
                  </p>
                </div>
                <ul className="mt-auto grid gap-3">
                  {SETUP.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full text-[0.7rem]",
                          item.done
                            ? "bg-[color-mix(in_oklab,var(--ob-success)_18%,transparent)] text-[color:var(--ob-success)]"
                            : "bg-[color:var(--ob-surface-3)]",
                        )}
                      >
                        {item.done ? <Check width={12} height={12} /> : null}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-[0.95rem]",
                          item.done && "text-[color:var(--ob-muted)] line-through",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.action && (
                        <Btn tone={item.primary ? "dark" : "neutral"} size="sm">
                          {item.icon && (
                            <Icon name={item.icon as IconName} width={13} height={13} />
                          )}
                          {item.action}
                        </Btn>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* API quickstart */}
              <div className="flex flex-col gap-5 p-6">
                <div>
                  <h3 className="font-bold">Getting started with the API</h3>
                  <p className="mt-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Start building with {brandName} in minutes.
                  </p>
                </div>
                <ul className="mt-auto grid gap-4">
                  {API_LINKS.map((link) => (
                    <li key={link.id} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="grid size-8 shrink-0 place-items-center rounded-[8px]"
                        style={{ background: link.tone, color: link.ink }}
                      >
                        <link.Glyph width={16} height={16} />
                      </span>
                      <span className="text-[0.98rem]">{link.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Model catalogue */}
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <h3 className="font-bold">Explore the latest models</h3>
                  <p className="mt-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Top tools for image, video and audio generation.
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-[8px] border border-[color:var(--ob-border)] p-2.5">
                  <AlertIcon width={15} height={15} className="shrink-0 text-[#d99b22]" />
                  <span className="flex-1 text-[0.86rem]">
                    Add a payment method to use {brandName}
                  </span>
                  <Btn tone="dark" size="sm">Learn more</Btn>
                </div>
                <ul className="grid gap-3">
                  {MODELS.map((model) => (
                    <li key={model.id} className="flex gap-3">
                      <span
                        aria-hidden
                        className="grid size-[26px] shrink-0 place-items-center rounded-[6px]"
                        style={{ background: "#e4edfd", color: "#3f72d4" }}
                      >
                        <VideoIcon width={14} height={14} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[0.9rem]">
                          {model.org && (
                            <span className="text-[color:var(--ob-muted)]">{model.org}/</span>
                          )}
                          <span className="font-bold">{model.name}</span>
                        </p>
                        <p className="truncate text-[0.8rem] text-[color:var(--ob-muted)]">
                          {model.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3">
                  <GridIcon width={15} height={15} className="opacity-60" />
                  <span className="text-[0.98rem] font-semibold">Explore all models</span>
                </div>
              </div>
            </div>
          </section>

          {/* Usage strip */}
          <div className="grid divide-y divide-[color:var(--ob-border)] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div className="flex flex-wrap gap-10 p-5">
              <div>
                <p className="text-[0.86rem] text-[color:var(--ob-muted)]">Credits balance</p>
                <p className="mt-1 text-2xl font-extrabold">$0.00</p>
              </div>
              <div>
                <p className="text-[0.86rem] text-[color:var(--ob-muted)]">
                  Cost estimate in the last 7 days
                </p>
                <p className="mt-1 text-2xl font-extrabold">$0.00</p>
              </div>
              <Btn tone="neutral" size="sm" className="mt-auto">
                <ReceiptIcon width={14} height={14} /> Go to billing
              </Btn>
            </div>

            {[
              { id: "requests", label: "Requests in the last 7 days", color: "#7c4dff" },
              { id: "errors", label: "Errors in the last 7 days", color: "#e8365d" },
            ].map((strip) => (
              <div key={strip.id} className="flex items-center gap-5 p-5">
                <div className="shrink-0">
                  <p className="text-[0.86rem] text-[color:var(--ob-muted)]">{strip.label}</p>
                  <p className="mt-1 text-2xl font-extrabold">0</p>
                  <Btn tone="neutral" size="sm" className="mt-3">
                    {strip.id === "requests" ? "Check usage" : "See analytics"}
                  </Btn>
                </div>
                {/* Zero-state series: a flat dashed baseline rather than a fake trend. */}
                <div className="flex h-24 flex-1 items-end rounded-[8px] bg-[color:var(--ob-surface-2)] p-3">
                  <div
                    className="h-0.5 w-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, ${strip.color} 0 10px, transparent 10px 16px)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <section className="grid gap-4">
            <h2 className="text-xl font-extrabold tracking-tight">Recently active models</h2>
            <Card className="grid min-h-[180px] place-items-center">
              <div className="grid justify-items-center gap-3 text-center">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-[8px] border border-[color:var(--ob-border)]"
                >
                  ∿
                </span>
                <p className="text-[0.9rem] text-[color:var(--ob-muted)]">
                  Models you call will appear here.
                </p>
              </div>
            </Card>
          </section>
        </div>
        </>
        )}
      </Main>
    </Shell>
    </Surface>
  );
}
