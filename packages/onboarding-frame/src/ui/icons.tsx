import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} width={20} height={20} {...p}><path d="m15 18-6-6 6-6" /></svg>
);
export const ChevronRight = (p: IconProps) => (
  <svg {...base} width={20} height={20} {...p}><path d="m9 18 6-6-6-6" /></svg>
);
export const ChevronDown = (p: IconProps) => (
  <svg {...base} width={20} height={20} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const ArrowRight = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
export const ArrowLeft = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
);
export const Check = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M20 6 9 17l-5-5" /></svg>
);
export const Cross = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
export const Sparkle = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
  </svg>
);
export const Lock = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
export const Sun = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
export const Spinner = (p: IconProps) => (
  <svg {...base} width={24} height={24} {...p}>
    <path d="M21 12a9 9 0 1 1-6.2-8.6" />
  </svg>
);
export const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden {...p}>
    <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.7L12 17.3 5.9 20.5l1.4-6.7-5-4.7 6.8-.8Z" />
  </svg>
);
export const Plus = (p: IconProps) => (
  <svg {...base} width={18} height={18} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const Info = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" />
  </svg>
);

export const Shuffle = (p: IconProps) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);
export const Gift = (p: IconProps) => (
  <svg {...base} width={20} height={20} {...p}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    <path d="M12 8 9.5 5.5a2 2 0 1 1 2.5-2 2 2 0 1 1 2.5 2L12 8Z" />
  </svg>
);

/* -------------------------------------------------------------------------
 * Dashboard icon set
 *
 * Product chrome is drawn at 14–18px, where a 2px stroke reads as heavy and
 * muddy, so these use 1.5 and a 24px grid. They exist because the templates
 * previously used Unicode glyphs and emoji (▦, ⚙, 🚀) as icons: those pick up
 * whatever the OS font supplies, so weight, size and baseline vary per machine
 * and none of it matches the line-art the reference products actually use.
 * ---------------------------------------------------------------------- */

const line = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ic =
  (body: React.ReactNode, size = 16) =>
  (p: IconProps) => (
    <svg {...line} width={size} height={size} {...p}>
      {body}
    </svg>
  );

/* navigation & layout */
export const HomeIcon = ic(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /></>);
export const GridIcon = ic(<><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></>);
export const ListIcon = ic(<><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></>);
export const LayoutIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>);
export const SidebarIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></>);
export const LayersIcon = ic(<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>);
export const PanelIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>);
export const ColumnsIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M15 4v16" /></>);
export const TableIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 10v10" /></>);
export const KanbanIcon = ic(<><rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="9.5" y="4" width="5" height="11" rx="1.5" /><rect x="16" y="4" width="5" height="14" rx="1.5" /></>);

/* files */
export const FileIcon = ic(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /></>);
export const FilesIcon = ic(<><path d="M9 3h5l4 4v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4" /><path d="M5 7v12a2 2 0 0 0 2 2h8" /></>);
export const FolderIcon = ic(<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />);
export const ArchiveIcon = ic(<><rect x="3" y="4" width="18" height="4.5" rx="1.5" /><path d="M5 8.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5" /><path d="M10 13h4" /></>);
export const ImageIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" /></>);
export const VideoIcon = ic(<><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10.5 5-3v9l-5-3" /></>);
export const MicIcon = ic(<><rect x="9.5" y="3" width="5" height="10" rx="2.5" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" /></>);
export const PaletteIcon = ic(<><path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 1.6-3.2 2 2 0 0 1 1.6-3.2H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z" /><circle cx="7.5" cy="12" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="15" cy="8" r="1" /></>);

/* people */
export const UserIcon = ic(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>);
export const UsersIcon = ic(<><circle cx="9.5" cy="8" r="3.2" /><path d="M3.5 20a6 6 0 0 1 12 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.9M17.5 14.5a6 6 0 0 1 3 5.5" /></>);
export const UserPlusIcon = ic(<><circle cx="9.5" cy="8" r="3.2" /><path d="M3.5 20a6 6 0 0 1 12 0" /><path d="M18 8v6M15 11h6" /></>);
export const BuildingIcon = ic(<><rect x="4" y="3" width="11" height="18" rx="1.5" /><path d="M15 9h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4" /><path d="M7.5 7h4M7.5 11h4M7.5 15h4" /></>);
export const BankIcon = ic(<><path d="m3 9 9-5 9 5" /><path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9" /><path d="M3 21h18" /></>);
export const StoreIcon = ic(<><path d="M4 4h16l1 5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0l1-5Z" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></>);

/* comms */
export const ChatIcon = ic(<path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" />);
export const MailIcon = ic(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>);
export const BellIcon = ic(<><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6Z" /><path d="M10.5 20a2 2 0 0 0 3 0" /></>);
export const MegaphoneIcon = ic(<><path d="m3 11 14-6v14L3 13V11Z" /><path d="M17 8.5a3 3 0 0 1 0 7" /><path d="M7 14v4a2 2 0 0 0 4 0v-3" /></>);
export const SendIcon = ic(<><path d="m21 3-9.5 9.5" /><path d="M21 3 15 21l-3.5-8.5L3 9l18-6Z" /></>);
export const PhoneIcon = ic(<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />);

/* time */
export const CalendarIcon = ic(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>);
export const ClockIcon = ic(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>);
export const TimerIcon = ic(<><circle cx="12" cy="13.5" r="7.5" /><path d="M12 9.5v4M9.5 2h5" /></>);
export const HistoryIcon = ic(<><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3 9" /><path d="M3 4v5h5" /><path d="M12 8v4.2l3 1.8" /></>);

/* charts */
export const BarChartIcon = ic(<><path d="M4 20V11M9.5 20V5M15 20v-6M20.5 20V8" /></>);
export const LineChartIcon = ic(<><path d="M4 4v16h16" /><path d="m7 15 4-4.5 3 2.5 5-6" /></>);
export const PieChartIcon = ic(<><path d="M12 3a9 9 0 1 0 9 9h-9V3Z" /><path d="M15 3.6A9 9 0 0 1 20.4 9H15V3.6Z" /></>);
export const TrendUpIcon = ic(<><path d="m3 17 6-6 4 4 8-8" /><path d="M16 7h5v5" /></>);
export const TrendDownIcon = ic(<><path d="m3 7 6 6 4-4 8 8" /><path d="M16 17h5v-5" /></>);
export const ActivityIcon = ic(<path d="M3 12h4l3-8 4 16 3-8h4" />);
export const TargetIcon = ic(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>);
export const GaugeIcon = ic(<><path d="M4 18a9 9 0 1 1 16 0" /><path d="m12 14 4-4" /></>);

/* money */
export const CreditCardIcon = ic(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M6.5 15h3" /></>);
export const WalletIcon = ic(<><path d="M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" /><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2Z" /><path d="M17.5 13h.01" /></>);
export const ReceiptIcon = ic(<><path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3Z" /><path d="M9 8h6M9 12h6" /></>);
export const DollarIcon = ic(<><path d="M12 3v18" /><path d="M16.5 7.5A3.5 3.5 0 0 0 13 5h-1.5a3 3 0 0 0 0 6h1a3 3 0 0 1 0 6H11a3.5 3.5 0 0 1-3.5-2.5" /></>);
export const CoinsIcon = ic(<><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3" /><path d="M3 11v4c0 1.7 2.7 3 6 3 .7 0 1.4-.06 2-.17" /><ellipse cx="17" cy="15" rx="4" ry="2" /><path d="M13 15v3c0 1.1 1.8 2 4 2s4-.9 4-2v-3" /></>);

/* actions */
export const SearchIcon = ic(<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>);
export const FilterIcon = ic(<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />);
export const SortIcon = ic(<><path d="M7 4v16M7 20l-3-3M7 20l3-3" /><path d="M17 20V4M17 4l-3 3M17 4l3 3" /></>);
export const RefreshIcon = ic(<><path d="M20 11a8 8 0 0 0-13.7-5.3L3 9" /><path d="M3 4v5h5" /><path d="M4 13a8 8 0 0 0 13.7 5.3L21 15" /><path d="M21 20v-5h-5" /></>);
export const DownloadIcon = ic(<><path d="M12 3v12" /><path d="m7.5 11 4.5 4.5 4.5-4.5" /><path d="M4 20h16" /></>);
export const UploadIcon = ic(<><path d="M12 16V4" /><path d="M7.5 8.5 12 4l4.5 4.5" /><path d="M4 20h16" /></>);
export const ShareIcon = ic(<><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>);
export const CopyIcon = ic(<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></>);
export const EditIcon = ic(<><path d="M4 20h4L20 8l-4-4L4 16v4Z" /><path d="m14 6 4 4" /></>);
export const TrashIcon = ic(<><path d="M4 7h16" /><path d="M9 7V4.5h6V7" /><path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" /><path d="M10 11v6M14 11v6" /></>);
export const MoreIcon = ic(<><circle cx="5" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="19" cy="12" r="1.3" /></>);
export const MoreVerticalIcon = ic(<><circle cx="12" cy="5" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="12" cy="19" r="1.3" /></>);
export const SettingsIcon = ic(<><circle cx="12" cy="12" r="3" /><path d="M19.4 14.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-3-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-3l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 2.9-1.2V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 3 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z" /></>);
export const SlidersIcon = ic(<><path d="M5 20v-7M5 9V4M12 20v-9M12 7V4M19 20v-4M19 12V4" /><path d="M3 13h4M10 7h4M17 16h4" /></>);
export const ExternalIcon = ic(<><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>);
export const LinkIcon = ic(<><path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" /><path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" /></>);
export const ExpandIcon = ic(<><path d="M9 3H3v6M3 3l7 7" /><path d="M15 21h6v-6M21 21l-7-7" /></>);
export const CommandIcon = ic(<path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" />);

/* status */
export const AlertIcon = ic(<><path d="M12 4 2.5 20h19L12 4Z" /><path d="M12 10v4M12 17h.01" /></>);
export const ShieldIcon = ic(<path d="M12 3 5 6v5.5c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6l-7-3Z" />);
export const ShieldCheckIcon = ic(<><path d="M12 3 5 6v5.5c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>);
export const KeyIcon = ic(<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8 2 2-2 2 2 2-2 2-2-2-2 2" /></>);
export const UnlockIcon = ic(<><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.5-2" /></>);
export const ZapIcon = ic(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />);
export const FlagIcon = ic(<><path d="M5 21V4" /><path d="M5 4h11l-2 3.5L16 11H5" /></>);
export const HeartIcon = ic(<path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />);
export const CheckCircleIcon = ic(<><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>);
export const XCircleIcon = ic(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>);
export const CircleIcon = ic(<circle cx="12" cy="12" r="8.5" />);
export const DotIcon = ic(<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />);
export const PauseIcon = ic(<><path d="M9 4v16M15 4v16" /></>);
export const PlayIcon = ic(<path d="M7 4.5 19 12 7 19.5v-15Z" />);

/* dev */
export const CodeIcon = ic(<><path d="m8 7-5 5 5 5M16 7l5 5-5 5" /><path d="m13.5 4-3 16" /></>);
export const TerminalIcon = ic(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>);
export const BranchIcon = ic(<><circle cx="7" cy="5" r="2.2" /><circle cx="7" cy="19" r="2.2" /><circle cx="17" cy="9" r="2.2" /><path d="M7 7.2v9.6M17 11.2c0 3-2 4.3-5 4.8" /></>);
export const DatabaseIcon = ic(<><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>);
export const ServerIcon = ic(<><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>);
export const CloudIcon = ic(<path d="M7 19a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.6 1.5A3.8 3.8 0 0 1 17.5 19H7Z" />);
export const GlobeIcon = ic(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></>);
export const CpuIcon = ic(<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>);
export const RocketIcon = ic(<><path d="M13.5 3.5c3 0 7 4 7 7 0 3-3.6 5.6-6 7l-5-5c1.4-2.4 4-9 4-9Z" /><path d="m9.5 12.5-3 3 2 2 3-3" /><path d="M6 17c-1.5 1.5-1.5 4-1.5 4s2.5 0 4-1.5" /><circle cx="15" cy="9" r="1.4" /></>);
export const BoxIcon = ic(<><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>);
export const PuzzleIcon = ic(<path d="M10 3h4v2.5a1.5 1.5 0 1 0 3 0V3h4v4h-2.5a1.5 1.5 0 1 0 0 3H21v4h-2.5a1.5 1.5 0 1 0 0 3H21v4h-4v-2.5a1.5 1.5 0 1 0-3 0V21h-4v-4H3v-4h2.5a1.5 1.5 0 1 0 0-3H3V7h4V3Z" />);
export const RobotIcon = ic(<><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4" /><circle cx="9" cy="14" r="1.2" /><circle cx="15" cy="14" r="1.2" /><path d="M2 13v3M22 13v3" /></>);

/* misc */
export const BookmarkIcon = ic(<path d="M6 3h12v18l-6-4.5L6 21V3Z" />);
export const TagIcon = ic(<><path d="M3 11.5V4a1 1 0 0 1 1-1h7.5L21 12.5 12.5 21 3 11.5Z" /><circle cx="7.5" cy="7.5" r="1.4" /></>);
export const MapIcon = ic(<><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>);
export const PinIcon = ic(<><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>);
export const LightbulbIcon = ic(<><path d="M9 17a6 6 0 1 1 6 0v2H9v-2Z" /><path d="M10 21h4" /></>);
export const BookIcon = ic(<><path d="M4 4.5A2 2 0 0 1 6 3h13v16H6a2 2 0 0 0-2 2V4.5Z" /><path d="M19 19v2H6" /></>);
export const TrophyIcon = ic(<><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5A3.5 3.5 0 0 1 16.5 11" /><path d="M12 14v4M8.5 21h7l-.7-3h-5.6l-.7 3Z" /></>);
export const CartIcon = ic(<><circle cx="9.5" cy="20" r="1.4" /><circle cx="17.5" cy="20" r="1.4" /><path d="M2.5 3.5h2.4l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6" /></>);
export const TruckIcon = ic(<><path d="M3 6h10v10H3V6Z" /><path d="M13 9h4l4 3.5V16h-8V9Z" /><circle cx="7" cy="18.5" r="1.6" /><circle cx="17.5" cy="18.5" r="1.6" /></>);
export const LeafIcon = ic(<><path d="M20 4c0 9-5.5 14-12 14a5 5 0 0 1 0-10c5 0 8-1.5 12-4Z" /><path d="M4 20c2-4 5-7 9-9" /></>);
export const WandIcon = ic(<><path d="m4 20 11-11" /><path d="m13 5 1.2 2.8L17 9l-2.8 1.2L13 13l-1.2-2.8L9 9l2.8-1.2L13 5Z" /><path d="M19 13v3M17.5 14.5h3" /></>);
export const HandIcon = ic(<path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11V4a1.5 1.5 0 0 1 3 0v7V6a1.5 1.5 0 0 1 3 0v9a6 6 0 0 1-6 6h-.5a5.5 5.5 0 0 1-4.6-2.5L4 15.5a1.6 1.6 0 0 1 2.6-1.8L8 15.5" />);


/* additions covering the remaining reference chrome */
export const ChevronUp = ic(<path d="m6 15 6-6 6 6" />);
export const ArrowUpIcon = ic(<><path d="M12 19V5" /><path d="m5.5 11.5 6.5-6.5 6.5 6.5" /></>);
export const ArrowDownIcon = ic(<><path d="M12 5v14" /><path d="m5.5 12.5 6.5 6.5 6.5-6.5" /></>);
export const MenuIcon = ic(<path d="M4 7h16M4 12h16M4 17h16" />);
export const MonitorIcon = ic(<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M9 20h6M12 16v4" /></>);
export const BriefcaseIcon = ic(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></>);
export const MusicIcon = ic(<><path d="M9 18V5l10-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></>);
export const SwapIcon = ic(<><path d="M4 8h13l-3-3M20 16H7l3 3" /></>);
export const LifebuoyIcon = ic(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.6" /><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" /></>);
export const MagnetIcon = ic(<><path d="M6 3v9a6 6 0 0 0 12 0V3" /><path d="M6 8h4M14 8h4" /></>);
export const ClipboardIcon = ic(<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5V6H9V4.5Z" /></>);
export const GemIcon = ic(<><path d="m3 9 4-5h10l4 5-9 11L3 9Z" /><path d="M3 9h18M8.5 9 12 20 15.5 9 13 4M11 4l-2.5 5" /></>);
export const RecordIcon = ic(<circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />);

/**
 * Icons addressed by name.
 *
 * Templates are data-driven — a nav or list is an array of plain objects — so
 * the rows carry an icon name and this maps it to the component. A missing
 * name renders nothing rather than a broken glyph.
 */
export const icons = {
  home: HomeIcon, grid: GridIcon, list: ListIcon, layout: LayoutIcon,
  sidebar: SidebarIcon, layers: LayersIcon, panel: PanelIcon, columns: ColumnsIcon,
  table: TableIcon, kanban: KanbanIcon,
  file: FileIcon, files: FilesIcon, folder: FolderIcon, archive: ArchiveIcon,
  image: ImageIcon, video: VideoIcon, mic: MicIcon, palette: PaletteIcon,
  user: UserIcon, users: UsersIcon, userPlus: UserPlusIcon,
  building: BuildingIcon, bank: BankIcon, store: StoreIcon,
  chat: ChatIcon, mail: MailIcon, bell: BellIcon, megaphone: MegaphoneIcon,
  send: SendIcon, phone: PhoneIcon,
  calendar: CalendarIcon, clock: ClockIcon, timer: TimerIcon, history: HistoryIcon,
  barChart: BarChartIcon, lineChart: LineChartIcon, pieChart: PieChartIcon,
  trendUp: TrendUpIcon, trendDown: TrendDownIcon, activity: ActivityIcon,
  target: TargetIcon, gauge: GaugeIcon,
  creditCard: CreditCardIcon, wallet: WalletIcon, receipt: ReceiptIcon,
  dollar: DollarIcon, coins: CoinsIcon,
  search: SearchIcon, filter: FilterIcon, sort: SortIcon, refresh: RefreshIcon,
  download: DownloadIcon, upload: UploadIcon, share: ShareIcon, copy: CopyIcon,
  edit: EditIcon, trash: TrashIcon, more: MoreIcon, moreVertical: MoreVerticalIcon,
  settings: SettingsIcon, sliders: SlidersIcon, external: ExternalIcon,
  link: LinkIcon, expand: ExpandIcon, command: CommandIcon,
  alert: AlertIcon, shield: ShieldIcon, shieldCheck: ShieldCheckIcon, key: KeyIcon,
  unlock: UnlockIcon, lock: Lock, zap: ZapIcon, flag: FlagIcon, heart: HeartIcon,
  checkCircle: CheckCircleIcon, xCircle: XCircleIcon, circle: CircleIcon,
  dot: DotIcon, pause: PauseIcon, play: PlayIcon, star: Star,
  code: CodeIcon, terminal: TerminalIcon, branch: BranchIcon, database: DatabaseIcon,
  server: ServerIcon, cloud: CloudIcon, globe: GlobeIcon, cpu: CpuIcon,
  rocket: RocketIcon, box: BoxIcon, puzzle: PuzzleIcon, robot: RobotIcon,
  bookmark: BookmarkIcon, tag: TagIcon, map: MapIcon, pin: PinIcon,
  lightbulb: LightbulbIcon, book: BookIcon, trophy: TrophyIcon, cart: CartIcon,
  truck: TruckIcon, leaf: LeafIcon, wand: WandIcon, hand: HandIcon,
  chevronUp: ChevronUp, arrowUp: ArrowUpIcon, arrowDown: ArrowDownIcon,
  menu: MenuIcon, monitor: MonitorIcon, briefcase: BriefcaseIcon,
  music: MusicIcon, swap: SwapIcon, lifebuoy: LifebuoyIcon, magnet: MagnetIcon,
  clipboard: ClipboardIcon, gem: GemIcon, record: RecordIcon, sun: Sun, moon: Moon,
  shuffle: Shuffle,
  sparkle: Sparkle, check: Check, cross: Cross, plus: Plus, info: Info,
  gift: Gift, chevronDown: ChevronDown, chevronRight: ChevronRight,
  chevronLeft: ChevronLeft, arrowRight: ArrowRight, arrowLeft: ArrowLeft,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const Cmp = icons[name];
  return Cmp ? <Cmp {...rest} /> : null;
}
