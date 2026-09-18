import { CopyButton } from "./copy-button";

export function CodeBlock({
  code,
  title,
  language = "tsx",
  maxHeight = "28rem",
}: {
  code: string;
  title?: string;
  language?: string;
  maxHeight?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-[color:var(--site-border)] bg-[color:var(--site-surface)]">
      <figcaption className="flex items-center gap-3 border-b border-[color:var(--site-border)] px-4 py-2.5">
        <span className="text-xs font-semibold text-[color:var(--site-muted)]">
          {title ?? language}
        </span>
        <CopyButton value={code} className="ml-auto" />
      </figcaption>
      <pre
        className="overflow-auto p-4 text-[0.8rem] leading-relaxed"
        style={{ maxHeight, fontFamily: "var(--font-mono)" }}
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}
