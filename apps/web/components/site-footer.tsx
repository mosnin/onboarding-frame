import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--site-border)]">
      <div className="mx-auto grid max-w-[1700px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-[9px] bg-[color:var(--site-fg)] text-[0.75rem] font-bold text-[color:var(--site-bg)]"
            >
              of
            </span>
            <span className="text-[1.15rem] font-bold tracking-tight">
              onboarding-frame
            </span>
            <span className="rounded-full border border-[color:var(--site-border)] px-2.5 py-0.5 text-[0.72rem] font-semibold">
              Catalogue
            </span>
          </div>
          <p className="mt-4 max-w-[38ch] text-pretty leading-relaxed text-[color:var(--site-muted)]">
            Onboarding flows, dashboards and pricing pages you assemble into a
            kit, then hand to your coding agent. Import them, or own the source.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="text-[1.05rem] font-semibold">{column.title}</h2>
            <ul className="mt-4 grid gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--site-muted)] transition-colors hover:text-[color:var(--site-fg)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1700px] px-4 pb-10 sm:px-6">
        <p className="text-[0.92rem] text-[color:var(--site-muted)]">
          MIT licensed. Every image, logo and avatar in these templates is a
          labelled placeholder — nothing here impersonates a real product.
        </p>
      </div>
    </footer>
  );
}
