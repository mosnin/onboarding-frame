"use client";

import { Avatar } from "../../../ui/avatar";
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
  userName = "Alex Rivera",
  brandName = "Northwind",
  page = "home",
  className,
}: ApiConsoleProps) {
  return (
    <Surface tokens={apiConsoleTokens}>
    <Shell className={cn("flex-col", className)}>
      <Banner tone="dark">
        <span className="flex items-center gap-[5px] font-semibold">
          <Sparkle width={11} height={11} /> {brandName} Assets is now live!
          <Sparkle width={11} height={11} />
        </span>
      </Banner>

      <TopBar>
        <Avatar name={brandName} size={24} rounded={7} />
        <span className="text-[color:var(--ob-muted)]">/</span>
        <span className="font-semibold">Home</span>
        <SearchField
          placeholder="Search anything"
          shortcut="⌘K"
          rounded="md"
          className="ml-auto hidden w-[275px] md:flex"
        />
        <div className="hidden items-center gap-[6px] rounded-[6px] border border-[color:var(--ob-border)] px-[10px] py-[6px] text-[0.696rem] sm:flex">
          <GridIcon width={11} height={11} className="opacity-45" />
          <span className="text-[color:var(--ob-muted)]">Credits:</span>
          <span className="font-semibold">$0.00</span>
        </div>
        {/*
          The reference splits this: "Docs" opens the docs, the caret beside it
          opens a menu, with a hairline between the two halves.
        */}
        <div className="hidden items-center rounded-[6px] border border-[color:var(--ob-border-strong)] sm:flex">
          <button type="button" className="px-[10px] py-[5px] text-[0.696rem] font-semibold">
            Docs
          </button>
          <span className="h-[16px] w-px bg-[color:var(--ob-border)]" />
          <button type="button" aria-label="Docs menu" className="px-[6px] py-[5px]">
            <ChevronDown width={11} height={11} className="opacity-50" />
          </button>
        </div>
        <button type="button" aria-label="Notifications" className="px-[3px] opacity-55">
          <BellIcon width={15} height={15} />
        </button>
        <Avatar name={userName} size={24} />
      </TopBar>

      {/* Second-level product navigation */}
      <nav className="flex items-center gap-[16px] overflow-x-auto border-b border-[color:var(--ob-border)] px-[13px] sm:px-[19px]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-current={tab.id === page ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-[5px] whitespace-nowrap border-b-2 py-[10px] text-[0.728rem] transition-colors",
              tab.id === page
                ? "border-[color:var(--ob-fg)] font-semibold"
                : "border-transparent text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]",
            )}
          >
            <Icon name={tab.icon} width={12} height={12} className="opacity-70" />
            {tab.label}
            {tab.caret && <ChevronDown width={11} height={11} className="opacity-40" />}
            {tab.badge && (
              <span className="absolute -top-[2px] right-[0px] translate-x-full rounded-full bg-[#efe7ff] px-[5px] text-[0.485rem] font-bold text-[#6b46e5]">
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
        <div className="border-b border-[color:var(--ob-border)] px-[19px] py-[23px] sm:px-[32px]">
          <div className="flex flex-wrap items-end gap-[13px]">
            <div className="min-w-[0px] flex-1">
              <h1 className="text-[1.618rem] font-extrabold tracking-tight">Dashboard</h1>
              <p className="mt-[3px] text-[color:var(--ob-muted)]">
                Start exploring {brandName}&apos;s capabilities{" "}
                <span className="px-[3px]">·</span>
                <button type="button" className="hover:text-[color:var(--ob-fg)]">
                  Hide getting started guide
                </button>
              </p>
            </div>
            <div className="flex min-w-[0px] items-center gap-[6px] text-[0.728rem]">
              <span className="text-[color:var(--ob-muted)]">I&apos;m here</span>
              <span className="font-mono opacity-60">&lt;/&gt;</span>
              <span className="font-semibold">To build with code</span>
              <ChevronDown width={11} height={11} className="opacity-40" />
            </div>
          </div>
        </div>

        <div className="grid gap-[32px] px-[19px] py-[26px] sm:px-[32px]">
          <section className="grid gap-[16px]">
            <div className="flex flex-wrap items-end gap-[13px]">
              <div className="min-w-[0px] flex-1">
                <h2 className="text-xl font-extrabold tracking-tight">Getting started</h2>
                <p className="mt-[2px] text-[0.744rem] text-[color:var(--ob-muted)]">
                  Start exploring {brandName}&apos;s capabilities
                </p>
              </div>
              <Btn tone="neutral" size="sm">Don&apos;t show this</Btn>
            </div>

            <div className="grid min-w-[0px] divide-y divide-[color:var(--ob-border)] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {/* Setup checklist */}
              <div className="flex min-w-[0px] flex-col gap-[16px] p-[19px]">
                <div>
                  <h3 className="font-bold">Welcome to {brandName}!</h3>
                  <p className="mt-[3px] text-[0.744rem] text-[color:var(--ob-muted)]">
                    Let&apos;s get your account ready to generate content or call the API.
                  </p>
                </div>
                <ul className="mt-auto grid gap-[10px]">
                  {SETUP.map((item) => (
                    <li key={item.id} className="flex items-center gap-[10px]">
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-[19px] shrink-0 place-items-center rounded-full text-[0.566rem]",
                          item.done
                            ? "bg-[color-mix(in_oklab,var(--ob-success)_18%,transparent)] text-[color:var(--ob-success)]"
                            : "bg-[color:var(--ob-surface-3)]",
                        )}
                      >
                        {item.done ? <Check width={10} height={10} /> : null}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-[0.769rem]",
                          item.done && "text-[color:var(--ob-muted)] line-through",
                        )}
                      >
                        {item.label}
                      </span>
                      {item.action && (
                        <Btn tone={item.primary ? "dark" : "neutral"} size="sm">
                          {item.icon && (
                            <Icon name={item.icon as IconName} width={11} height={11} />
                          )}
                          {item.action}
                        </Btn>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* API quickstart */}
              <div className="flex min-w-[0px] flex-col gap-[16px] p-[19px]">
                <div>
                  <h3 className="font-bold">Getting started with the API</h3>
                  <p className="mt-[3px] text-[0.744rem] text-[color:var(--ob-muted)]">
                    Start building with {brandName} in minutes.
                  </p>
                </div>
                <ul className="mt-auto grid gap-[13px]">
                  {API_LINKS.map((link) => (
                    <li key={link.id} className="flex items-center gap-[10px]">
                      <span
                        aria-hidden
                        className="grid size-[26px] shrink-0 place-items-center rounded-[6px]"
                        style={{ background: link.tone, color: link.ink }}
                      >
                        <link.Glyph width={13} height={13} />
                      </span>
                      <span className="text-[0.793rem]">{link.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Model catalogue */}
              <div className="flex min-w-[0px] flex-col gap-[13px] p-[19px]">
                <div>
                  <h3 className="font-bold">Explore the latest models</h3>
                  <p className="mt-[3px] text-[0.744rem] text-[color:var(--ob-muted)]">
                    Top tools for image, video and audio generation.
                  </p>
                </div>
                <div className="flex items-center gap-[10px] rounded-[6px] border border-[color:var(--ob-border)] p-[8px]">
                  <AlertIcon width={12} height={12} className="shrink-0 text-[#d99b22]" />
                  <span className="flex-1 text-[0.696rem]">
                    Add a payment method to use {brandName}
                  </span>
                  <Btn tone="dark" size="sm">Learn more</Btn>
                </div>
                <ul className="grid min-w-[0px] gap-[10px]">
                  {MODELS.map((model) => (
                    <li key={model.id} className="flex min-w-[0px] gap-[10px]">
                      <span
                        aria-hidden
                        className="grid size-[21px] shrink-0 place-items-center rounded-[5px]"
                        style={{ background: "#e4edfd", color: "#3f72d4" }}
                      >
                        <VideoIcon width={11} height={11} />
                      </span>
                      <div className="min-w-[0px]">
                        <p className="truncate text-[0.728rem]">
                          {model.org && (
                            <span className="text-[color:var(--ob-muted)]">{model.org}/</span>
                          )}
                          <span className="font-bold">{model.name}</span>
                        </p>
                        <p className="truncate text-[0.647rem] text-[color:var(--ob-muted)]">
                          {model.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-[10px]">
                  <GridIcon width={12} height={12} className="opacity-60" />
                  <span className="text-[0.793rem] font-semibold">Explore all models</span>
                </div>
              </div>
            </div>
          </section>

          {/* Usage strip */}
          <div className="grid min-w-[0px] divide-y divide-[color:var(--ob-border)] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div className="flex flex-wrap gap-[32px] p-[16px]">
              <div>
                <p className="text-[0.696rem] text-[color:var(--ob-muted)]">Credits balance</p>
                <p className="mt-[3px] text-2xl font-extrabold">$0.00</p>
              </div>
              <div>
                <p className="text-[0.696rem] text-[color:var(--ob-muted)]">
                  Cost estimate in the last 7 days
                </p>
                <p className="mt-[3px] text-2xl font-extrabold">$0.00</p>
              </div>
              <Btn tone="neutral" size="sm" className="mt-auto">
                <ReceiptIcon width={11} height={11} /> Go to billing
              </Btn>
            </div>

            {[
              { id: "requests", label: "Requests in the last 7 days", color: "#7c4dff" },
              { id: "errors", label: "Errors in the last 7 days", color: "#e8365d" },
            ].map((strip) => (
              <div key={strip.id} className="flex items-center gap-[16px] p-[16px]">
                <div className="shrink-0">
                  <p className="text-[0.696rem] text-[color:var(--ob-muted)]">{strip.label}</p>
                  <p className="mt-[3px] text-2xl font-extrabold">0</p>
                  <Btn tone="neutral" size="sm" className="mt-[10px]">
                    {strip.id === "requests" ? "Check usage" : "See analytics"}
                  </Btn>
                </div>
                {/* Zero-state series: a flat dashed baseline rather than a fake trend. */}
                <div className="flex h-[78px] flex-1 items-end rounded-[6px] bg-[color:var(--ob-surface-2)] p-[10px]">
                  <div
                    className="h-[2px] w-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, ${strip.color} 0 10px, transparent 10px 16px)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <section className="grid gap-[13px]">
            <h2 className="text-xl font-extrabold tracking-tight">Recently active models</h2>
            <Card className="grid min-h-[146px] place-items-center">
              <div className="grid justify-items-center gap-[10px] text-center">
                <span
                  aria-hidden
                  className="grid size-[32px] place-items-center rounded-[6px] border border-[color:var(--ob-border)]"
                >
                  ∿
                </span>
                <p className="text-[0.728rem] text-[color:var(--ob-muted)]">
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
