"use client";

import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, guidedSetupTokens } from "./tokens";
import { Btn, Card, Chip, Fab, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  BarChartIcon,
  BellIcon,
  BuildingIcon,
  ChevronDown,
  ChevronRight,
  FileIcon,
  Icon,
  LightbulbIcon,
  MegaphoneIcon,
  Plus,
  RobotIcon,
  SendIcon,
  UploadIcon,
  UserIcon,
  WandIcon,
  type IconName,
} from "../../../ui/icons";

const RAIL: IconName[] = [
  "lightbulb",
  "upload",
  "user",
  "robot",
  "file",
  "barChart",
];
const RAIL_BOTTOM: IconName[] = ["send", "megaphone", "bell"];

const STEPS = [
  {
    n: 1,
    title: "Send some text to try it out",
    body: "See how capture works on any content",
    action: "Generate sample text",
    expanded: true,
  },
  {
    n: 2,
    title: "Review the captured feedback",
    body: "Complete step 1 first",
    action: "Review",
    disabled: true,
  },
  {
    n: 3,
    title: "Install feedback sources",
    body: "Automatically capture feedback from your tools",
    chevron: true,
  },
];

/**
 * Guided setup dashboard.
 *
 * A two-column activation page: product picker on the left, and a numbered
 * sequence on the right where only the current step is interactive. Later
 * steps stay visible but disabled, so the path is legible without being noisy.
 */
export function GuidedSetupTemplate({
  userName = "Alex Rivera",
  brandName = "Signal",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={guidedSetupTokens}>
      <Shell className={cn(className)}>
        {/* Narrow icon rail */}
        {/* Measured off the reference: a 48px icon rail on #eaecff. */}
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-6 bg-[#eaecff] py-4 sm:flex">
          <Avatar name={brandName} size={22} rounded={6} />
          <nav className="grid gap-[22px] text-[color:var(--ob-fg-soft)]">
            {RAIL.map((name) => (
              <button
                key={name}
                type="button"
                className="opacity-65 hover:opacity-100"
              >
                <Icon name={name} width={19} height={19} />
              </button>
            ))}
          </nav>
          <div className="mt-auto grid gap-[22px] text-[color:var(--ob-fg-soft)]">
            {RAIL_BOTTOM.map((name, i) => (
              <button
                key={name}
                type="button"
                className="relative opacity-65 hover:opacity-100"
              >
                <Icon name={name} width={19} height={19} />
                {i === 1 && (
                  <span className="absolute -right-1 -top-1 size-[7px] rounded-full bg-[#ef4444]" />
                )}
              </button>
            ))}
            <Avatar name={userName} size={26} />
          </div>
        </aside>

        <Main className="relative">
          {/* Measured: the rail is 48px, content starts at 104, the left column
            runs to 553 and the panel from 650 to 1449 — so 449 + a 97px gutter
            + 800. At the old 420 the subtitle and the Autopilot description
            both wrapped, which the reference does not do. */}
          <div className="grid gap-[97px] px-6 py-10 sm:px-14 lg:grid-cols-[minmax(0,449px)_minmax(0,800px)]">
            <div className="grid content-start gap-7">
              <div>
                <h1 className="text-[2.6rem] font-extrabold tracking-[-0.025em]">
                  Welcome to {brandName} 🎉
                </h1>
                <p className="mt-2 text-[1.05rem] text-[color:var(--ob-muted)]">
                  We&apos;ve customized this getting started dashboard for you
                </p>
              </div>

              {/*
              The chip sits on the title's row only. Sharing a flex row with
              the description narrowed it enough to wrap onto a second line,
              which the reference does not do.
            */}
              <Card className="border-[color:var(--ob-border-strong)] p-5">
                <div className="flex items-start gap-3">
                  <h3 className="flex-1 font-bold">Autopilot</h3>
                  <Chip tone="success" className="px-2.5 py-1">
                    Start
                  </Chip>
                </div>
                <p className="mt-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                  Automatically capture feedback from your sources
                </p>
              </Card>

              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 py-2 text-left font-semibold"
                >
                  <span className="flex-1">Set up other products</span>
                  <ChevronDown width={17} height={17} className="opacity-45" />
                </button>
                <div className="flex items-start gap-3 py-3">
                  <div className="flex-1">
                    <h4 className="font-bold">Portal</h4>
                    <p className="mt-0.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                      Let users post and vote on feedback
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Add portal"
                    className="opacity-45"
                  >
                    <Plus width={17} height={17} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid content-start gap-4">
              <h2 className="text-xl font-extrabold tracking-tight">
                Let us show you the magic of Autopilot ✨
              </h2>

              {STEPS.map((step) => (
                <Card
                  key={step.n}
                  className={cn("p-5", step.disabled && "opacity-60")}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[0.78rem] font-bold text-[color:var(--ob-muted)]"
                    >
                      {step.n}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="mt-0.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                        {step.body}
                      </p>
                    </div>
                    {step.action && (
                      <Btn
                        tone="neutral"
                        size="sm"
                        className={step.disabled ? "opacity-60" : undefined}
                      >
                        {step.n === 1 && <WandIcon width={15} height={15} />}
                        {step.action}
                      </Btn>
                    )}
                    {step.chevron && (
                      <ChevronRight
                        width={18}
                        height={18}
                        className="opacity-40"
                      />
                    )}
                  </div>

                  {step.expanded && (
                    <div className="mt-4 grid gap-3">
                      <div className="rounded-[10px] border border-[color:var(--ob-border)] p-4 text-[0.92rem] leading-relaxed text-[color:var(--ob-muted)]">
                        Paste text that could contain product feedback. For
                        example, an email, a chat message, a support
                        conversation, or a call transcript.
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {["User", "Company"].map((label) => (
                          <button
                            key={label}
                            type="button"
                            className="flex items-center gap-2 rounded-[10px] border border-[color:var(--ob-border)] px-3.5 py-2.5 text-left text-[0.92rem] text-[color:var(--ob-muted)]"
                          >
                            {label === "User" ? (
                              <UserIcon
                                width={16}
                                height={16}
                                className="opacity-55"
                              />
                            ) : (
                              <BuildingIcon
                                width={16}
                                height={16}
                                className="opacity-55"
                              />
                            )}
                            <span className="flex-1">{label}</span>
                            <ChevronDown
                              width={15}
                              height={15}
                              className="opacity-45"
                            />
                          </button>
                        ))}
                      </div>
                      <Btn
                        tone="neutral"
                        size="sm"
                        className="justify-self-end opacity-60"
                      >
                        Submit
                      </Btn>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <Fab tone="#5b5bd6" />
        </Main>
      </Shell>
    </Surface>
  );
}
