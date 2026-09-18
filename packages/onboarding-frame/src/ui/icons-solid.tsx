"use client";

import type { ComponentProps, ComponentType } from "react";
import {
  ArrowClockwise,
  ArrowsClockwise,
  Bank,
  BookBookmark,
  ChartBar,
  Chat,
  CircleDashed,
  CreditCard,
  Gear,
  NavigationArrow,
  Sidebar,
  Stack,
} from "@phosphor-icons/react";

/**
 * Solid icons.
 *
 * Lucide is outline-only, and a good number of the reference products draw a
 * filled set — Copilot Money's whole rail is solid. Rendering those as
 * hairline outlines is the loudest possible tell that a recreation is
 * approximate: it is visible at a glance, before any question of spacing or
 * type. Phosphor ships the same coverage in six weights, so it is what those
 * templates use.
 *
 * This is a separate module rather than an addition to `icons.tsx` so that
 * opting in is per template, against that template's own reference. Nothing
 * here changes what an existing template renders.
 *
 * Sizes default to 18, which is what these rails are drawn at; any call site
 * can override.
 */

type PhosphorProps = ComponentProps<typeof NavigationArrow>;
export type SolidIconProps = Omit<PhosphorProps, "weight">;

const solid =
  (C: ComponentType<PhosphorProps>, weight: PhosphorProps["weight"] = "fill", size = 18) =>
  (p: SolidIconProps) => <C size={size} weight={weight} aria-hidden {...p} />;

/* Filled — the reference draws these as solid shapes. */
export const NavigationSolid = solid(NavigationArrow);
export const StackSolid = solid(Stack);
export const CreditCardSolid = solid(CreditCard);
export const ChartBarSolid = solid(ChartBar);
export const BankSolid = solid(Bank);

/*
 * Bold — an outline, but a heavy one. `fill` on the dashed ring closes the
 * gaps into a disc, which is not what the reference draws; bold a shade
 * larger gives the thick arcs with the gaps intact.
 */
export const CircleDashedSolid = solid(CircleDashed, "bold", 19);
export const SidebarBold = solid(Sidebar, "bold");
export const ArrowClockwiseIcon = solid(ArrowClockwise, "bold");

/* Regular — drawn at a hairline in the reference. */
export const BookBookmarkIcon = solid(BookBookmark, "regular");
export const ChatSquareIcon = solid(Chat, "regular");
export const GearIcon = solid(Gear, "regular");

/**
 * A filled disc with a glyph knocked out of it.
 *
 * Copilot's "Recurrings" mark is a solid circle with white refresh arrows
 * inside, which no single icon in either library is. Both halves are still
 * library shapes — the disc is a `<span>`, the arrows are Phosphor — so this
 * is composition, not a hand-drawn path.
 */
export function RecurringSolid({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        borderRadius: "9999px",
        background: "currentColor",
      }}
    >
      <ArrowsClockwise
        size={Math.round(size * 0.62)}
        weight="bold"
        color="#ffffff"
        style={{ display: "block" }}
      />
    </span>
  );
}
