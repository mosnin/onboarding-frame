"use client";

import type { ReactNode } from "react";
import { Donut } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, complianceTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

export type CompliancePage = "controls" | "frameworks" | "policies";

export interface ComplianceControlsProps extends TemplateProps {
  page?: CompliancePage;
}

const TOP = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "tests", label: "Tests", glyph: "☑" },
  { id: "reports", label: "Reports", glyph: "▥" },
];

const COMPLIANCE = [
  { id: "frameworks", label: "Frameworks" },
  { id: "controls", label: "Controls" },
  { id: "policies", label: "Policies" },
  { id: "documents", label: "Documents" },
  { id: "audits", label: "Audits" },
];

const REST = [
  { id: "trust", label: "Trust Center", glyph: "⛉" },
  { id: "risk", label: "Risk", glyph: "!" },
  { id: "vendor", label: "Vendor", glyph: "▭" },
  { id: "assets", label: "Assets", glyph: "⛁" },
  { id: "personnel", label: "Personnel", glyph: "👥" },
];

const FILTERS = [
  "Framework",
  "Owner",
  "Domain",
  "Source",
  "Framework code",
  "Status",
  "Trust Center",
  "Risk",
];

const CONTROLS = [
  {
    id: "AST-1",
    title: "Asset disposal procedures utilized",
    body: "The company has electronic media containing confidential information purged or destroyed in accordance with best practices,…",
    codes: ["SOC 2 · CC 6.5", "SOC 2 · C 1.2"],
    tests: "2/2",
  },
  {
    id: "AST-2",
    title: "Data retention procedures established",
    body: "The company has formal retention and disposal procedures in place to guide the secure retention and disposal of company and custom…",
    codes: ["SOC 2 · CC 5.3", "SOC 2 · CC 6.5"],
    extra: "+2",
    tests: "2/2",
  },
  {
    id: "AST-3",
    title: "Production inventory maintained",
    body: "The company maintains a formal inventory of production system assets.",
    codes: ["SOC 2 · CC 6.1"],
    tests: "3/3",
  },
  {
    id: "BCD-1",
    title: "Continuity and Disaster Recovery plans established",
    body: "The company has Business Continuity and Disaster Recovery Plans in place that outline communication plans in order to maintain…",
    codes: ["SOC 2 · CC 9.1"],
    tests: "2/2",
  },
  {
    id: "BCD-2",
    title: "Continuity and disaster recovery plans tested",
    body: "The company has a documented business continuity/disaster recovery (BC/DR) plan and tests it at least annually.",
    codes: ["SOC 2 · CC 3.2", "SOC 2 · CC 7.5"],
    tests: "3/3",
  },
];

/**
 * Compliance controls.
 *
 * Two progress stories sit side by side and deliberately disagree: 99% of
 * controls pass their automated tests, but only 4% have a human owner. Keeping
 * both on the page — rather than leading with the flattering number — is the
 * point of the screen, so the assignment donut is drawn as a mostly-grey ring
 * with a sliver of brand colour instead of being scaled to look fuller.
 */
export function ComplianceControlsTemplate({
  className,
  page = "controls",
}: ComplianceControlsProps) {
  return (
    <Surface tokens={complianceTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-[color:var(--ob-border)] px-6">
          <WordmarkSlot width={92} height={20} label="" />
          <span className="ml-auto flex items-center gap-4 text-[color:var(--ob-fg-soft)]">
            {["?", "📣", "⚙"].map((glyph) => (
              <span key={glyph} aria-hidden>
                {glyph}
              </span>
            ))}
            <AvatarSlot size={30} />
          </span>
        </header>

        <div className="flex min-h-0 flex-1">
          <Sidebar width={300} bg="var(--ob-surface)">
            <div className="px-4 pb-3 pt-4">
              <div className="flex items-center gap-2 rounded-full bg-[color:var(--ob-surface-2)] px-3.5 py-2 text-[0.92rem] text-[color:var(--ob-muted)]">
                <span aria-hidden>⌕</span>
                <span className="flex-1">Help…</span>
                <span className="text-[0.82rem]">⌘+K</span>
              </div>
            </div>

            <nav className="grid gap-0.5 px-3">
              {TOP.map((item) => (
                <NavItem key={item.id} label={item.label} glyph={item.glyph} />
              ))}
            </nav>

            <div className="mx-4 my-3 border-t border-[color:var(--ob-border)]" />

            {/* The open parent carries a brand rule, its child the fill. */}
            <div className="border-l-[3px] border-[color:var(--ob-brand)] pl-[calc(0.75rem-3px)] pr-3">
              <NavItem
                label="Compliance"
                glyph="📋"
                trailing={
                  <span aria-hidden className="text-[0.7rem] opacity-50">
                    ⌄
                  </span>
                }
              />
            </div>
            <nav className="grid gap-0.5 px-3">
              {COMPLIANCE.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  indent
                  active={item.id === page}
                />
              ))}
            </nav>

            <nav className="grid gap-0.5 px-3 pt-2">
              {REST.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={item.glyph}
                  trailing={
                    <span aria-hidden className="text-[0.8rem] opacity-40">
                      ›
                    </span>
                  }
                />
              ))}
            </nav>

            <div className="mx-4 my-3 border-t border-[color:var(--ob-border)]" />
            <nav className="grid gap-0.5 px-3">
              <NavItem label="Integrations" glyph="⑄" />
            </nav>

            <span
              aria-hidden
              className="mt-auto px-5 pb-5 text-right text-[color:var(--ob-muted)]"
            >
              ⇤
            </span>
          </Sidebar>

          <Main className="overflow-auto p-8">
            <div className="flex items-center gap-3">
              <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">
                Controls
              </h1>
              <span className="inline-flex items-center gap-6 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[0.95rem] font-medium">
                More
                <span aria-hidden className="text-[0.7rem] opacity-60">
                  ⌄
                </span>
              </span>
              {/* Nothing can be added until a framework is picked, so it is off. */}
              <span
                aria-disabled
                className="inline-flex items-center gap-6 rounded-[var(--ob-radius)] px-4 py-2.5 text-[0.95rem] font-medium text-[color:var(--ob-muted)] opacity-60"
              >
                Add control
                <span aria-hidden className="text-[0.7rem]">
                  ⌄
                </span>
              </span>
            </div>

            <div className="grid gap-5 pt-5 lg:grid-cols-2">
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-7">
                <h2 className="pb-5 text-[1.35rem] font-bold">Assignment</h2>
                <div className="flex items-center gap-10">
                  <Donut
                    size={205}
                    thickness={11}
                    segments={[
                      { id: "assigned", value: 4, color: "var(--ob-brand)" },
                      { id: "unassigned", value: 96, color: "var(--ob-surface-3)" },
                    ]}
                    center={
                      <span className="grid place-items-center">
                        <span className="text-[2rem] font-bold leading-none">4%</span>
                        <span className="pt-1 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
                          Assigned
                        </span>
                      </span>
                    }
                  />
                  <ul className="grid flex-1 gap-4">
                    {[
                      { label: "Unassigned", value: 100, color: "var(--ob-surface-3)" },
                      { label: "Assigned", value: 4, color: "var(--ob-brand)" },
                      { label: "Needs reassignment", value: 0, color: "#e0562d" },
                    ].map((row) => (
                      <li key={row.label} className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="size-3 rounded-[3px]"
                          style={{ background: row.color }}
                        />
                        <span className="flex-1 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                          {row.label}
                        </span>
                        <span className="text-[1.05rem] tabular-nums">{row.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-7">
                <h2 className="pb-5 text-[1.35rem] font-bold">Completion</h2>
                <div className="flex gap-8">
                  <div className="min-w-0 flex-1">
                    <p className="text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                      Controls OK
                    </p>
                    <p className="pt-1 text-[2.2rem] font-bold leading-none tabular-nums">
                      99%
                    </p>
                    <span className="mt-5 block h-2 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
                      <span
                        className="block h-full rounded-full bg-[color:var(--ob-success)]"
                        style={{ width: "99%" }}
                      />
                    </span>
                    <p className="flex pt-2 text-[1rem] text-[color:var(--ob-fg-soft)]">
                      <span className="flex-1">103 controls</span>
                      <span>104 total</span>
                    </p>
                  </div>

                  <div className="grid w-[240px] shrink-0 content-start gap-3">
                    <SubMeter label="Test" count="132/133" pct={99} />
                    <SubMeter label="Document" count="37/38" pct={97} />
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-6">
              <div className="flex w-[280px] items-center gap-2 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2.5 text-[0.95rem] text-[color:var(--ob-muted)]">
                <span aria-hidden>⌕</span> Search controls
              </div>
              {FILTERS.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center gap-1.5 text-[1rem] font-semibold"
                >
                  {filter}
                  <span aria-hidden className="text-[0.7rem] opacity-60">
                    ⌄
                  </span>
                </span>
              ))}
              <span
                aria-hidden
                className="ml-auto grid size-10 place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)]"
              >
                ⇵
              </span>
            </div>

            <div className="mt-5 overflow-hidden rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)]">
              <div className="grid grid-cols-[120px_minmax(0,1.5fr)_200px_160px_240px_120px_60px] bg-[color:var(--ob-surface-2)] px-6 py-3.5 text-[0.95rem] font-semibold">
                <span className="flex items-center gap-1.5">
                  ID <InfoDot />
                </span>
                <span>Control</span>
                <span>Owner</span>
                <span>Source</span>
                <span>Frameworks</span>
                <span>Tests</span>
                <span />
              </div>

              {CONTROLS.map((control) => (
                <div
                  key={control.id}
                  className="grid grid-cols-[120px_minmax(0,1.5fr)_200px_160px_240px_120px_60px] items-center border-t border-[color:var(--ob-border)] px-6 py-5"
                >
                  <span className="self-start pt-1 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
                    {control.id}
                  </span>
                  <span className="pr-8">
                    <span className="block text-[1.05rem] font-semibold">
                      {control.title}
                    </span>
                    <span className="block pt-1 text-[0.95rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                      {control.body}
                    </span>
                  </span>
                  <span className="flex items-center gap-2.5 text-[1rem]">
                    {/* A dashed ring reads as "no one here yet" rather than a person. */}
                    <span
                      aria-hidden
                      className="grid size-7 place-items-center rounded-full border border-dashed border-[color:var(--ob-border-strong)] text-[0.75rem] text-[color:var(--ob-muted)]"
                    >
                      👤
                    </span>
                    Unassigned
                  </span>
                  <span className="flex items-center gap-2.5 text-[1rem]">
                    <LogoSlot size={22} label="" radius={5} />
                    Acme
                  </span>
                  <span className="grid justify-items-start gap-1.5">
                    {control.codes.map((code, index) => (
                      <span key={code} className="flex items-center gap-1.5">
                        <span className="rounded-[4px] bg-[color:var(--ob-surface-2)] px-2 py-1 text-[0.88rem]">
                          {code}
                        </span>
                        {index === control.codes.length - 1 && control.extra && (
                          <span className="text-[0.88rem] text-[color:var(--ob-muted)]">
                            {control.extra}
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center gap-2 text-[1rem]">
                    <span
                      aria-hidden
                      className="grid size-5 place-items-center rounded-full bg-[color:var(--ob-success)] text-[0.65rem] text-white"
                    >
                      ✓
                    </span>
                    {control.tests}
                  </span>
                  <span aria-hidden className="text-right text-[color:var(--ob-muted)]">
                    ···
                  </span>
                </div>
              ))}
            </div>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function SubMeter({ label, count, pct }: { label: string; count: string; pct: number }) {
  return (
    <div className="rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-4 py-3">
      <p className="flex items-center gap-2 text-[1rem]">
        <span className="flex flex-1 items-center gap-1.5 font-medium">
          {label}
          <span aria-hidden className="text-[0.75rem] text-[color:var(--ob-muted)]">
            ↗
          </span>
        </span>
        <span className="tabular-nums text-[color:var(--ob-fg-soft)]">{count}</span>
      </p>
      <p className="flex items-center gap-2 pt-2">
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
          <span
            className="block h-full rounded-full bg-[color:var(--ob-success)]"
            style={{ width: `${pct}%` }}
          />
        </span>
        <span className="text-[0.92rem] tabular-nums text-[color:var(--ob-fg-soft)]">
          {pct}%
        </span>
      </p>
    </div>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}
