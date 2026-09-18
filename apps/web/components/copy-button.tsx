"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
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
      className={`rounded-full border border-[color:var(--site-border)] px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[color:var(--site-surface)] ${className}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
