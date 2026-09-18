"use client";

import type { ComponentProps, ComponentType } from "react";
import {
  ArrowCircleUpRight,
  ArrowClockwise,
  ArrowDown,
  ArrowLeft,
  ArrowLineLeft,
  ArrowRight,
  ArrowSquareOut,
  ArrowUp,
  ArrowUpRight,
  ArrowsClockwise,
  ArrowsDownUp,
  ArrowsLeftRight,
  Article,
  Bank,
  Barcode,
  Bell,
  BookBookmark,
  BookOpen,
  Bookmark,
  Books,
  Briefcase,
  Broadcast,
  Browsers,
  Buildings,
  Cake,
  CalendarBlank,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretLineLeft,
  CaretRight,
  CaretUp,
  CaretUpDown,
  ChartBar,
  ChartLine,
  ChartLineUp,
  ChartPieSlice,
  Chat,
  ChatCenteredText,
  ChatCircleDots,
  Chats,
  Check,
  CheckCircle,
  CheckSquare,
  Circle,
  CircleDashed,
  CircleNotch,
  CirclesThree,
  ClipboardText,
  Clock,
  Cloud,
  Code,
  Coin,
  Confetti,
  Copy,
  Copyright,
  Cpu,
  CreditCard,
  Crosshair,
  Crown,
  Cube,
  CurrencyCircleDollar,
  CurrencyDollar,
  Database,
  DotsThree,
  DotsThreeVertical,
  DownloadSimple,
  Envelope,
  FileText,
  Flag,
  FlowArrow,
  Flower,
  Folder,
  FunnelSimple,
  Gear,
  Gift,
  GitBranch,
  Globe,
  GridFour,
  HardDrives,
  Heartbeat,
  House,
  IdentificationCard,
  Info,
  Leaf,
  Lifebuoy,
  Lightbulb,
  Lightning,
  Link,
  LinkSimple,
  ListBullets,
  ListChecks,
  Lock,
  LockKey,
  MagnifyingGlass,
  MapPin,
  Megaphone,
  Money,
  MonitorPlay,
  NavigationArrow,
  Note,
  NotePencil,
  Notepad,
  Nut,
  Package,
  Palette,
  PaperPlaneTilt,
  Paperclip,
  Path,
  PauseCircle,
  PencilSimple,
  Percent,
  Phone,
  Plugs,
  PlugsConnected,
  Plus,
  Pulse,
  QrCode,
  Question,
  Receipt,
  Robot,
  Rocket,
  ShareNetwork,
  Shield,
  ShieldCheck,
  ShieldStar,
  Sidebar,
  SidebarSimple,
  Signpost,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  Stack,
  Star,
  Storefront,
  Sun,
  Table,
  Tag,
  Target,
  Terminal,
  TerminalWindow,
  ThumbsUp,
  Ticket,
  Tree,
  TreeStructure,
  TrendUp,
  Triangle,
  Trophy,
  User,
  UserCircleDashed,
  UserPlus,
  Users,
  UsersThree,
  VideoCamera,
  Warning,
  Waves,
  Wrench,
  X,
  XCircle,
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

/**
 * The default weight below is the one most references draw, but not all of
 * them: StackAI's rail is a step heavier than Cloudflare's at the same size,
 * and an ink measurement puts the difference at 8-28%. A template therefore
 * sets the weight its own reference shows, at the call site. Changing the
 * shared export to suit one template is the batch edit that has broken this
 * catalogue before (CLAUDE.md, rule 4).
 */
export type SolidIconProps = PhosphorProps;

const solid =
  (
    C: ComponentType<PhosphorProps>,
    weight: PhosphorProps["weight"] = "fill",
    size = 18,
  ) =>
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
export const CaretDoubleLeftIcon = solid(CaretDoubleLeft, "bold", 12);
export const CaretRightIcon = solid(CaretRight, "bold", 12);
export const MoreVerticalIcon = solid(DotsThreeVertical, "bold");
export const LinkIcon = solid(LinkSimple, "regular");
export const UsersThreeIcon = solid(UsersThree, "regular");
export const MapPinIcon = solid(MapPin, "regular");

export const CaretUpIcon = solid(CaretUp, "bold", 12);
export const CheckIcon = solid(Check, "bold", 12);
export const CrosshairIcon = solid(Crosshair, "regular");
export const CurrencyIcon = solid(CurrencyDollar, "regular");

/* Stripe's rail is a hairline outline set at 15px. */
export const BooksIcon = solid(Books, "regular");
export const ArrowsLeftRightIcon = solid(ArrowsLeftRight, "regular");
export const PackageIcon = solid(Package, "regular");
export const ClockIcon = solid(Clock, "regular");
export const ReceiptIcon = solid(Receipt, "regular");
export const DotsThreeIcon = solid(DotsThree, "bold");
export const TerminalIcon = solid(TerminalWindow, "regular");
export const BellIcon = solid(Bell, "regular");
export const GridFourIcon = solid(GridFour, "regular");

export const ArrowsUpDownIcon = solid(ArrowsDownUp, "bold", 12);
export const WarningIcon = solid(Warning, "fill", 14);
export const CrossIcon = solid(X, "bold", 12);

/* Customer.io and Mercury draw hairline outline rails. */
export const MegaphoneIcon = solid(Megaphone, "regular");
export const BroadcastIcon = solid(Broadcast, "regular");
export const DatabaseIcon = solid(Database, "regular");
export const CubeIcon = solid(Cube, "regular");
export const CirclesThreeIcon = solid(CirclesThree, "regular");
export const PulseIcon = solid(Pulse, "regular");
export const ChartPieIcon = solid(ChartPieSlice, "regular");
export const InfoIcon = solid(Info, "regular", 13);
export const CaretLeftIcon = solid(CaretLeft, "bold", 12);
export const CaretFirstIcon = solid(CaretDoubleLeft, "bold", 12);
export const CaretLastIcon = solid(CaretDoubleRight, "bold", 12);
export const FileTextIcon = solid(FileText, "regular");
export const NoteIcon = solid(Note, "regular");
export const BookmarkIcon = solid(Bookmark, "regular");
export const FunnelIcon = solid(FunnelSimple, "regular");
export const SlidersIcon = solid(SlidersHorizontal, "regular");
export const ListChecksIcon = solid(ListChecks, "regular");
export const TableIcon = solid(Table, "regular");
export const TrendUpIcon = solid(TrendUp, "regular");
export const MoneyIcon = solid(Money, "regular");

export const EnvelopeIcon = solid(Envelope, "regular");
export const SparkleIcon = solid(Sparkle, "fill", 14);
export const CircleFillIcon = solid(Circle, "fill", 8);

export const CardIcon = solid(CreditCard, "regular");

export const ArrowDownIcon = solid(ArrowDown, "bold", 13);
export const ArrowLeftIcon = solid(ArrowLeft, "bold", 13);
export const ArrowRightIcon = solid(ArrowRight, "bold", 13);
export const PaperclipIcon = solid(Paperclip, "regular");
export const PlusIcon = solid(Plus, "bold", 13);

/* Cloudflare, Vercel, Whop and Sweatpals rails. */
export const ClipboardIcon = solid(ClipboardText, "regular");
export const RobotIcon = solid(Robot, "regular");
export const ChartLineIcon = solid(ChartLine, "regular");
export const ShieldIcon = solid(Shield, "regular");
export const ShieldCheckIcon = solid(ShieldCheck, "regular");
export const LightningIcon = solid(Lightning, "regular");
export const HardDrivesIcon = solid(HardDrives, "regular");
export const CloudIcon = solid(Cloud, "regular");
export const GlobeIcon = solid(Globe, "regular");
export const PathIcon = solid(Path, "regular");
export const TagIcon = solid(Tag, "regular");
export const LinkChainIcon = solid(Link, "regular");
export const TrophyIcon = solid(Trophy, "regular");
export const RocketIcon = solid(Rocket, "regular");
export const StorefrontIcon = solid(Storefront, "regular");
export const FlagIcon = solid(Flag, "regular");
export const CpuIcon = solid(Cpu, "regular");
export const LifebuoyIcon = solid(Lifebuoy, "regular");
export const TicketIcon = solid(Ticket, "regular");
export const StarIcon = solid(Star, "regular");
export const PercentIcon = solid(Percent, "regular");
export const BarcodeIcon = solid(Barcode, "regular");
export const UsersIcon = solid(Users, "regular");
export const CodeIcon = solid(Code, "regular");
export const LockIcon = solid(Lock, "regular");
export const ArticleIcon = solid(Article, "regular");
export const TreeIcon = solid(Tree, "regular");
export const FlowArrowIcon = solid(FlowArrow, "regular");
export const BrowsersIcon = solid(Browsers, "regular");
export const WrenchIcon = solid(Wrench, "regular");
export const SignpostIcon = solid(Signpost, "regular");
export const CoinIcon = solid(Coin, "regular");

export const TriangleIcon = solid(Triangle, "fill", 14);

export const CakeIcon = solid(Cake, "regular");
export const UserPlusIcon = solid(UserPlus, "regular");

export const PencilIcon = solid(PencilSimple, "regular");
export const PaletteIcon = solid(Palette, "regular");
export const BriefcaseIcon = solid(Briefcase, "regular");
export const HeartbeatIcon = solid(Heartbeat, "regular");
export const PhoneIcon = solid(Phone, "regular");
export const CaretUpDownIcon = solid(CaretUpDown, "bold", 13);
export const TableGridIcon = solid(Table, "regular");
export const TerminalWindowIcon = solid(Terminal, "regular");
export const LockKeyIcon = solid(LockKey, "regular");
export const FolderIcon = solid(Folder, "regular");
export const ListBulletsIcon = solid(ListBullets, "regular");
export const CircleNotchIcon = solid(CircleNotch, "regular");
export const BookOpenIcon = solid(BookOpen, "regular");
export const CurrencyCircleIcon = solid(CurrencyCircleDollar, "regular");
export const CaretLineLeftIcon = solid(CaretLineLeft, "regular");
export const ArrowCircleOutIcon = solid(ArrowCircleUpRight, "regular");
export const CopyrightIcon = solid(Copyright, "regular");
export const ChatBarsIcon = solid(ChatCenteredText, "regular");
export const ChatCircleDotsIcon = solid(ChatCircleDots, "regular");
export const CrossCircleIcon = solid(XCircle, "regular");
export const FlowerIcon = solid(Flower, "regular");
export const ArrowUpRightIcon = solid(ArrowUpRight, "regular");
export const CopyIcon = solid(Copy, "regular");
export const QrCodeIcon = solid(QrCode, "regular");
export const NutIcon = solid(Nut, "regular");
export const MonitorPlayIcon = solid(MonitorPlay, "regular");
export const GiftIcon = solid(Gift, "regular");
export const ChartLineUpIcon = solid(ChartLineUp, "regular");
export const WavesIcon = solid(Waves, "regular");
export const PaperPlaneIcon = solid(PaperPlaneTilt, "fill");
export const SidebarSimpleIcon = solid(SidebarSimple, "regular");
export const CrownIcon = solid(Crown, "fill");
export const ShieldStarIcon = solid(ShieldStar, "fill");
export const DownloadIcon = solid(DownloadSimple, "regular");
export const ShareIcon = solid(ShareNetwork, "regular");
export const ThumbsUpIcon = solid(ThumbsUp, "fill");
export const SlidersHorizontalIcon = solid(SlidersHorizontal, "regular");
export const ArrowsDownUpIcon = solid(ArrowsDownUp, "regular");
export const ConfettiIcon = solid(Confetti, "fill");
export const GitBranchIcon = solid(GitBranch, "regular");
export const NotePencilIcon = solid(NotePencil, "regular");
export const PlugsIcon = solid(Plugs, "regular");
export const PlugsConnectedIcon = solid(PlugsConnected, "regular");
export const VideoCameraIcon = solid(VideoCamera, "regular");
export const TreeStructureIcon = solid(TreeStructure, "regular");
export const SunIcon = solid(Sun, "regular");
export const PauseIcon = solid(PauseCircle, "regular");

export const ArrowUpIcon = solid(ArrowUp, "bold", 13);

export const CheckCircleIcon = solid(CheckCircle, "fill");
export const UserCircleDashedIcon = solid(UserCircleDashed, "regular");
export const ArrowLineLeftIcon = solid(ArrowLineLeft, "regular");
