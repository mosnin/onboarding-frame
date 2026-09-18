/** Clamp `n` into the inclusive range [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Percentage (0-100) of `value` out of `total`, guarding divide-by-zero. */
export function percent(value: number, total: number): number {
  if (total <= 0) return 0;
  return clamp(Math.round((value / total) * 100), 0, 100);
}

/** Format a minor-unit amount (e.g. cents) using the given ISO currency code. */
export function formatMoney(
  amountMinor: number,
  currency = "USD",
  locale = "en-US",
): string {
  const major = amountMinor / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(major) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(major);
}

/** Stable key for list rendering when a config item omits an explicit id. */
export function fallbackId(prefix: string, index: number): string {
  return `${prefix}-${index}`;
}
