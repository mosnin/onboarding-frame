"use client";

import type { ComponentProps, ComponentType } from "react";
import {
  ArrowClockwise,
  ArrowSquareOut,
  ArrowsClockwise,
  Bank,
  BookBookmark,
  CalendarBlank,
  ChartBar,
  Chat,
  Chats,
  CircleDashed,
  CreditCard,
  Gear,
  Buildings,
  CaretDown,
  CaretRight,
  CaretUp,
  Check,
  Crosshair,
  CurrencyDollar,
  CheckSquare,
  ChatCircleDots,
  DotsThreeVertical,
  House,
  IdentificationCard,
  LinkSimple,
  MagnifyingGlass,
  MapPin,
  Notepad,
  SquaresFour,
  Target,
  User,
  UsersThree,
  Leaf,
  Lightbulb,
  NavigationArrow,
  Question,
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

/*
 * Buffer's rail is drawn at a hairline, unlike Copilot's — same library, the
 * weight the reference shows. "Start Page" is an ID card, not a bookmark, and
 * "Community" is the two-bubble Chats rather than a single one.
 */
export const HouseIcon = solid(House, "regular");
export const LightbulbIcon = solid(Lightbulb, "regular");
export const CalendarIcon = solid(CalendarBlank, "regular");
export const ChatsIcon = solid(Chats, "regular");
export const IdCardIcon = solid(IdentificationCard, "regular");
export const ChartBarIcon = solid(ChartBar, "regular");
export const ExternalSquareIcon = solid(ArrowSquareOut, "regular", 14);
export const LeafIcon = solid(Leaf, "regular");
export const QuestionIcon = solid(Question, "regular");
export const StackMark = solid(Stack, "fill", 20);

/*
 * Twenty's rail sets each mark in a tinted tile, so these are drawn at
 * regular weight and coloured by the call site rather than filled.
 */
export const BuildingsIcon = solid(Buildings, "regular");
export const UserIcon = solid(User, "regular");
export const TargetIcon = solid(Target, "regular");
export const CheckSquareIcon = solid(CheckSquare, "regular");
export const NotepadIcon = solid(Notepad, "regular");
export const SquaresFourIcon = solid(SquaresFour, "regular");
export const SearchIcon = solid(MagnifyingGlass, "regular");
export const ChatDotsIcon = solid(ChatCircleDots, "regular");
export const CaretDownIcon = solid(CaretDown, "bold", 12);
export const CaretRightIcon = solid(CaretRight, "bold", 12);
export const MoreVerticalIcon = solid(DotsThreeVertical, "bold");
export const LinkIcon = solid(LinkSimple, "regular");
export const UsersThreeIcon = solid(UsersThree, "regular");
export const MapPinIcon = solid(MapPin, "regular");

export const CaretUpIcon = solid(CaretUp, "bold", 12);
export const CheckIcon = solid(Check, "bold", 12);
export const CrosshairIcon = solid(Crosshair, "regular");
export const CurrencyIcon = solid(CurrencyDollar, "regular");
