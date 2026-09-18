/**
 * Icons for the site chrome.
 *
 * These come from Lucide. They were previously drawn inline on the argument
 * that a small hand-made set would hold a more consistent stroke than a
 * general library — which was wrong twice over: Lucide is drawn on one grid at
 * one weight, and maintaining our own paths bought nothing but drift.
 *
 * The wrappers exist only to keep this module's call signature (`size`,
 * `className`) and to default to a 1.5 stroke, which is what the chrome is
 * drawn at.
 */
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  ArrowLeft as LuArrowLeft,
  ArrowUpDown,
  ArrowUpRight as LuArrowUpRight,
  Bookmark,
  Check,
  ChevronDown as LuChevronDown,
  ChevronRight as LuChevronRight,
  Code,
  Copy,
  Eye,
  LayoutGrid,
  Layers,
  List,
  Monitor,
  Moon,
  Plus,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  User,
} from "lucide-react";

type IconProps = { className?: string; size?: number };

const ic =
  (C: ComponentType<LucideProps>, fallback: number) =>
  ({ className, size = fallback }: IconProps) => (
    <C size={size} strokeWidth={1.5} aria-hidden className={className} />
  );

export const SearchIcon = ic(Search, 16);
export const ChevronDown = ic(LuChevronDown, 14);
export const ChevronRight = ic(LuChevronRight, 16);
export const ArrowLeft = ic(LuArrowLeft, 16);
export const ArrowUpRight = ic(LuArrowUpRight, 16);
export const SunIcon = ic(Sun, 18);
export const MoonIcon = ic(Moon, 18);
export const GridIcon = ic(LayoutGrid, 16);
export const ListIcon = ic(List, 16);
export const SortIcon = ic(ArrowUpDown, 16);
export const BookmarkIcon = ic(Bookmark, 16);
export const CopyIcon = ic(Copy, 15);
export const CodeIcon = ic(Code, 16);
export const EyeIcon = ic(Eye, 16);
export const LayersIcon = ic(Layers, 16);
export const SparkleIcon = ic(Sparkles, 16);
export const UserIcon = ic(User, 16);
export const DesktopIcon = ic(Monitor, 16);
export const TabletIcon = ic(Tablet, 16);
export const MobileIcon = ic(Smartphone, 16);
export const RefreshIcon = ic(RefreshCw, 16);
export const CheckIcon = ic(Check, 16);
export const PlusIcon = ic(Plus, 16);
