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
