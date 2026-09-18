"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  className = "",
  icon,
}: {
  value: string;
  label?: string;
  className?: string;
  /** Rendered before the label; the copied state keeps it in place. */
  icon?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; leave the label unchanged rather than lying.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-lg border border-[color:var(--site-border)] px-3 py-1.5 text-[0.88rem] font-semibold transition-colors hover:bg-[color:var(--site-surface)] ${className}`}
    >
      {icon}
      {copied ? "Copied" : label}
    </button>
  );
}
