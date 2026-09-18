"use client";

import { TemplateBody } from "./template-viewer";

/**
 * Scaled-down live template.
 *
 * The real component rendered at full width and transformed down, so a card
 * preview can never drift from the template it links to. The wrapper clips and
 * the inner layer is inert, so a preview cannot steal focus or a click from the
 * card's own link.
 */
export function TemplatePreview({
  slug,
  page,
  height = 250,
  width = 1600,
}: {
  slug: string;
  page: string;
  height?: number;
  width?: number;
}) {
  // Scale so the full template width fits the card, whatever the card's size.
  const scale = 0.24;

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-xl border border-[color:var(--site-border)] bg-[color:var(--site-surface)]"
      style={{ height }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
        style={{
          transform: `scale(${scale})`,
          width,
          height: height / scale,
        }}
      >
        <TemplateBody slug={slug} page={page} />
      </div>
    </div>
  );
}
