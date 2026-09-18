/**
 * Line icons for the site chrome.
 *
 * Drawn inline rather than pulled from an icon package: the set is small, and
 * the reference's chrome relies on a consistent 1.5px stroke that a general
 * library would not guarantee across every glyph.
 */

type IconProps = { className?: string; size?: number };

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
}

export function SearchIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function ChevronDown({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronRight({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function ArrowUpRight({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function SunIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function GridIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function ListIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </svg>
  );
}

export function SortIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 4v16M7 20l-3-3M7 20l3-3" />
      <path d="M17 20V4M17 4l-3 3M17 4l3 3" />
    </svg>
  );
}

export function BookmarkIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M6 4h12v16l-6-4-6 4Z" />
    </svg>
  );
}

export function CopyIcon({ className, size = 15 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a1 1 0 0 1 1-1h9" />
    </svg>
  );
}

export function CodeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m9 17-5-5 5-5" />
      <path d="m15 7 5 5-5 5" />
    </svg>
  );
}

export function EyeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function LayersIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function SparkleIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
    </svg>
  );
}

export function UserIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function DesktopIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M9 21h6M12 17v4" />
    </svg>
  );
}

export function TabletIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <path d="M11.5 18.5h1" />
    </svg>
  );
}

export function MobileIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11.5 18.5h1" />
    </svg>
  );
}

export function RefreshIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20 11a8 8 0 1 0-.6 4" />
      <path d="M20 4v7h-7" />
    </svg>
  );
}

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function PlusIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
