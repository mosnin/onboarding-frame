"use client";

import {
  ArrowsDownUpIcon,
  ArrowsUpDownIcon,
  ArticleIcon,
  BrowsersIcon,
  BuildingsIcon,
  CardIcon,
  CaretRightIcon,
  CheckIcon,
  ClipboardIcon,
  CloudIcon,
  FlowArrowIcon,
  GearIcon,
  GlobeIcon,
  HouseIcon,
  LinkChainIcon,
  LockIcon,
  PathIcon,
  PencilIcon,
  ShieldIcon,
  SparkleIcon,
  UserIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { cn } from "../../../lib/cn";
import { Surface, authTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type AuthPage = "home" | "users" | "organizations";

export interface AuthConsoleProps extends TemplateProps {
  page?: AuthPage;
}

const TOP = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "users", label: "Users", Icon: UserIcon },
  { id: "organizations", label: "Organizations", Icon: BuildingsIcon },
];

const CONFIGURE = [
  { id: "auth", label: "User & Authentication", Icon: UserIcon, chevron: true },
  { id: "orgsettings", label: "Organizations Settings", Icon: ClipboardIcon },
  { id: "sessions", label: "Sessions", Icon: ArticleIcon },
  { id: "portal", label: "Account Portal", Icon: BrowsersIcon },
  {
    id: "customization",
    label: "Customization",
    Icon: PencilIcon,
    chevron: true,
  },
  { id: "integrations", label: "Integrations", Icon: PathIcon },
  { id: "jwt", label: "JWT Templates", Icon: SparkleIcon },
  { id: "webhooks", label: "Webhooks", Icon: FlowArrowIcon },
];

const DEVELOPERS = [
  { id: "keys", label: "API Keys", Icon: LockIcon },
  { id: "paths", label: "Paths", Icon: LinkChainIcon },
  { id: "domains", label: "Domains", Icon: GlobeIcon },
];

const APPLICATION = [
  { id: "billing", label: "Plan & Billing", Icon: CardIcon },
  { id: "settings", label: "Settings", Icon: GearIcon },
];

const LEARN = [
  { id: "deploy", Icon: CheckIcon, label: "Deploy your app to production" },
  { id: "auth", Icon: ShieldIcon, label: "Learn about authentication" },
  {
    id: "custom",
    Icon: CloudIcon,
    label: "Learn about Component Customization",
  },
];

const STATS = [
  { id: "total", title: "Total users", sub: "All time", value: "2" },
  { id: "active", title: "Active users", sub: "April 2024", value: "2" },
  { id: "signups", title: "Sign-ups", sub: "April 2024", value: "2" },
  { id: "signins", title: "Sign-ins", sub: "April 2024", value: "1" },
];

const SIGNUPS = [
  { id: "s1", email: "jonsmith@example.com", when: "Wed Apr 24, 15:57" },
  { id: "s2", email: "jsmith2@example.com", when: "Wed Apr 24, 15:54" },
];

const SIGNINS = [
  { id: "i1", email: "jsmith2@example.com", when: "Thu Apr 25, 11:25" },
];

/**
 * Authentication console.
 *
 * The environment badge hangs off the top edge of the content area rather than
 * sitting in a bar — a small thing, but it is how the product keeps
 * "you are looking at development data" visible without spending a full row on
 * it. The counts are two users and one sign-in, which is what "your
 * application now has users" actually means on day one.
 */
export function AuthConsoleTemplate({
  className,
  page = "home",
}: AuthConsoleProps) {
  return (
    <Surface tokens={authTokens} className={className}>
      <Shell>
        <Sidebar width={325} bg="var(--ob-bg)" className="border-r-0 p-[9px]">
          <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
            <div className="flex items-center gap-[9px] px-[11px] py-[9px]">
              <Avatar name="Personal account" size={25} />
              <span className="flex-1 text-[0.839rem] font-medium">
                Personal account
              </span>
              <ArrowsUpDownIcon size={11} />
            </div>
            <div className="flex items-center gap-[9px] border-t border-[color:var(--ob-border)] px-[11px] py-[9px]">
              <BrandMark brand="MyApp" size={23} label="MyApp" />
              <span className="flex-1 text-[0.839rem] font-medium">MyApp</span>
              <ArrowsUpDownIcon size={11} />
            </div>
          </div>

          <nav className="grid gap-[2px] pt-[6px]">
            {TOP.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                active={item.id === page}
                className={cn(
                  "text-[0.839rem]",
                  item.id === page &&
                    "border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] text-[color:var(--ob-brand)]",
                )}
              />
            ))}
          </nav>

          <NavSection label="Configure" />
          <nav className="grid gap-[2px]">
            {CONFIGURE.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                trailing={
                  item.chevron ? <CaretRightIcon size={11} /> : undefined
                }
                className="text-[0.839rem]"
              />
            ))}
          </nav>

          <NavSection label="Developers" />
          <nav className="grid gap-[2px]">
            {DEVELOPERS.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                className="text-[0.839rem]"
              />
            ))}
          </nav>

          <NavSection label="Application" />
          <nav className="grid gap-[2px]">
            {APPLICATION.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                className="text-[0.839rem]"
              />
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-[9px] px-[9px] py-[12px]">
            <Avatar name="Jane Doe" size={25} />
            <span className="text-[0.839rem] font-medium">Jane Doe</span>
          </div>
        </Sidebar>

        <Main className="relative overflow-auto bg-[color:var(--ob-surface)]">
          {/* The environment tab hangs from the top edge of the content pane. */}
          <span className="absolute left-1/2 top-[0px] -translate-x-1/2 rounded-b-[var(--ob-radius-sm)] bg-[color:var(--ob-danger)] px-[11px] py-[5px] text-[0.683rem] font-semibold text-white">
            Development{" "}
            <ArrowsDownUpIcon size={9} className="inline align-[-1px]" />
          </span>

          <div className="px-[37px] pb-[31px] pt-[43px]">
            <p className="flex items-center gap-[9px] text-[0.815rem]">
              <span className="text-[color:var(--ob-fg-soft)]">Home</span>
              <CaretRightIcon size={11} />
              <span className="font-medium">MyApp</span>
            </p>

            <h1 className="pt-[16px] text-[1.592rem] font-bold tracking-[-0.01em]">
              Congratulations, your application now has users!
            </h1>
            <p className="max-w-[72ch] pt-[9px] text-[0.87rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
              The platform handles all the authentication and user management
              pieces for you. Next, you can learn how to access this data and
              use it in your application, customize the look and feel of your
              components, and get your app ready for production.
            </p>

            <div className="grid gap-[16px] pt-[25px] lg:grid-cols-3">
              {LEARN.map((card) => (
                <section
                  key={card.id}
                  className="grid justify-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[19px] py-[25px]"
                >
                  <card.Icon size={11} />
                  <p className="pt-[12px] text-center text-[0.839rem] font-semibold">
                    {card.label}
                  </p>
                </section>
              ))}
            </div>

            <div className="grid gap-[16px] pt-[16px] sm:grid-cols-2 xl:grid-cols-4">
              {STATS.map((stat) => (
                <section
                  key={stat.id}
                  className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[19px] py-[19px]"
                >
                  <h2 className="text-[0.932rem] font-bold">{stat.title}</h2>
                  <p className="pt-[3px] text-[0.815rem] text-[color:var(--ob-muted)]">
                    {stat.sub}
                  </p>
                  <p className="pt-[19px] text-[1.32rem] font-medium tabular-nums leading-none">
                    {stat.value}
                  </p>
                </section>
              ))}
            </div>

            <div className="grid gap-[16px] pt-[16px] lg:grid-cols-2">
              <RecentCard title="Recent sign-ups" rows={SIGNUPS} />
              <RecentCard title="Recent sign-ins" rows={SIGNINS} />
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function RecentCard({
  title,
  rows,
}: {
  title: string;
  rows: { id: string; email: string; when: string }[];
}) {
  return (
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[22px] py-[19px]">
      <h2 className="pb-[16px] text-[0.932rem] font-bold">{title}</h2>
      <ul className="grid gap-[12px]">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center gap-[11px]">
            <Avatar name={row.email} size={26} />
            <span className="min-w-[0px] flex-1 truncate text-[0.839rem]">
              {row.email}
            </span>
            <span className="shrink-0 text-[0.815rem] text-[color:var(--ob-muted)]">
              {row.when}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
