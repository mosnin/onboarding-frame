"use client";

import { useId, type ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * A small, dependency-free chart kit.
 *
 * Everything is inline SVG sized by viewBox and stretched with
 * `preserveAspectRatio`, so charts stay crisp at any container width and read
 * correctly in both colour schemes. Strokes use `vectorEffect` so they do not
 * distort when the viewBox is scaled non-uniformly.
 */

export interface Series {
  id: string;
  points: number[];
  color?: string;
  /** Render the tail of the line dashed, e.g. a forecast. */
  dashedFrom?: number;
  /** Fill the area under the line. */
  area?: boolean;
  /**
   * Mark the final point with a dot. Set per series so a chart can highlight
   * where the real data ends without also dotting a reference or forecast
   * line drawn beside it.
   */
  endDot?: boolean;
}

function scale(points: number[], min: number, max: number, height: number) {
  const span = max - min || 1;
  return points.map((value) => height - ((value - min) / span) * height);
}

function linePath(ys: number[], stepX: number, smooth: boolean) {
  if (ys.length === 0) return "";
  if (!smooth) {
    return ys
      .map((y, i) => `${i === 0 ? "M" : "L"}${i * stepX},${y}`)
      .join(" ");
  }
  // Catmull-Rom style smoothing, expressed as cubic segments.
  let d = `M0,${ys[0]}`;
  for (let i = 0; i < ys.length - 1; i++) {
    const x0 = i * stepX;
    const x1 = (i + 1) * stepX;
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${ys[i]} ${cx},${ys[i + 1]} ${x1},${ys[i + 1]}`;
  }
  return d;
}

export interface LineChartProps {
  series: Series[];
  height?: number;
  /** Labels along the x axis. */
  xLabels?: string[];
  /** Labels along the y axis, top value first. */
  yLabels?: string[];
  /** Which side the value scale sits on. Some products set it right. */
  yLabelSide?: "left" | "right";
  min?: number;
  max?: number;
  smooth?: boolean;
  gridLines?: number;
  /** Draw a dot at the end of every line; a series can opt in individually. */
  endDot?: boolean;
  className?: string;
}

export function LineChart({
  series,
  height = 180,
  xLabels,
  yLabels,
  yLabelSide = "left",
  min,
  max,
  smooth = false,
  gridLines = 4,
  endDot = false,
  className,
}: LineChartProps) {
  const uid = useId().replace(/:/g, "");
  const all = series.flatMap((s) => s.points);
  const lo = min ?? Math.min(0, ...all);
  const hi = max ?? Math.max(1, ...all);
  const width = 600;
  const count = Math.max(...series.map((s) => s.points.length), 2);
  const stepX = width / (count - 1);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex gap-3",
          yLabelSide === "right" && "flex-row-reverse",
        )}
      >
        {yLabels && (
          <div
            className={cn(
              "flex shrink-0 flex-col justify-between text-[0.7rem] tabular-nums text-[color:var(--ob-muted)]",
              yLabelSide === "right" ? "text-left" : "text-right",
            )}
            style={{ height }}
          >
            {yLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="w-full overflow-visible"
          style={{ height }}
          role="img"
        >
          {/*
            gridLines={0} means "none". Dividing by it would make the single
            remaining line's y NaN, which renders as an invalid SVG attribute
            rather than as nothing, so the empty case is handled explicitly.
          */}
          {gridLines > 0 &&
            Array.from({ length: gridLines + 1 }, (_, i) => {
              const y = (height / gridLines) * i;
              return (
                <line
                  key={i}
                  x1={0}
                  x2={width}
                  y1={y}
                  y2={y}
                  stroke="var(--ob-border)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

          {series.map((s) => {
            const ys = scale(s.points, lo, hi, height);
            const color = s.color ?? "var(--ob-brand)";
            const split = s.dashedFrom ?? ys.length;
            const solid = ys.slice(0, Math.min(split + 1, ys.length));
            const dashed = ys.slice(Math.min(split, ys.length - 1));

            return (
              <g key={s.id}>
                {s.area && (
                  <>
                    <defs>
                      <linearGradient
                        id={`${uid}-${s.id}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={color}
                          stopOpacity={0.28}
                        />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${linePath(ys, stepX, smooth)} L${width},${height} L0,${height} Z`}
                      fill={`url(#${uid}-${s.id})`}
                    />
                  </>
                )}
                <path
                  d={linePath(solid, stepX, smooth)}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {dashed.length > 1 && (
                  <path
                    d={linePath(dashed, stepX, smooth)}
                    transform={`translate(${Math.min(split, ys.length - 1) * stepX},0)`}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
                {(s.endDot ?? endDot) && ys.length > 0 && (
                  <circle
                    cx={(ys.length - 1) * stepX}
                    cy={ys[ys.length - 1]}
                    r={4}
                    fill="var(--ob-surface)"
                    stroke={color}
                    strokeWidth={2.5}
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {xLabels && (
        <div className="mt-2 flex justify-between text-[0.7rem] text-[color:var(--ob-muted)]">
          {xLabels.map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export interface BarChartProps {
  values: number[];
  xLabels?: string[];
  yLabels?: string[];
  height?: number;
  color?: string;
  max?: number;
  /** Draws a dashed reference line with a chip, e.g. an average. */
  average?: { value: number; label?: string };
  /** Which side the value scale sits on. Some products set it right. */
  yLabelSide?: "left" | "right";
  className?: string;
}

export function BarChart({
  values,
  xLabels,
  yLabels,
  yLabelSide = "left",
  height = 180,
  color = "var(--ob-brand)",
  max,
  average,
  className,
}: BarChartProps) {
  const hi = max ?? Math.max(1, ...values);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex gap-3",
          yLabelSide === "right" && "flex-row-reverse",
        )}
      >
        {yLabels && (
          <div
            className={cn(
              "flex shrink-0 flex-col justify-between text-[0.7rem] tabular-nums text-[color:var(--ob-muted)]",
              yLabelSide === "right" ? "text-left" : "text-right",
            )}
            style={{ height }}
          >
            {yLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        <div className="relative flex-1">
          <div
            className="flex items-end justify-around gap-1.5 border-b border-[color:var(--ob-border)]"
            style={{ height }}
          >
            {values.map((value, i) => (
              <div
                key={i}
                className="w-full max-w-[46px] rounded-t-[3px] transition-[height] duration-500"
                style={{
                  height: `${Math.max((value / hi) * 100, value > 0 ? 2 : 0)}%`,
                  background: color,
                }}
              />
            ))}
          </div>
          {average && (
            <div
              className="pointer-events-none absolute inset-x-0 flex items-center"
              style={{ bottom: `${(average.value / hi) * 100}%` }}
            >
              <span className="rounded border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-1.5 py-0.5 text-[0.68rem] font-semibold">
                {average.label ?? "Average"}{" "}
                <span className="tabular-nums">{average.value}</span>
              </span>
              <span className="h-px flex-1 border-t border-dashed border-[color:var(--ob-border-strong)]" />
            </div>
          )}
        </div>
      </div>
      {xLabels && (
        <div className="mt-2 flex justify-around text-[0.7rem] text-[color:var(--ob-muted)]">
          {xLabels.map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Donut with an optional value in the middle. */
export function Donut({
  segments,
  size = 180,
  thickness = 18,
  center,
  className,
}: {
  segments: { id: string; value: number; color?: string }[];
  size?: number;
  thickness?: number;
  center?: ReactNode;
  className?: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" role="img">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ob-surface-3)"
          strokeWidth={thickness}
        />
        {segments.map((segment) => {
          const length = (segment.value / total) * circumference;
          const dash = `${length} ${circumference - length}`;
          const node = (
            <circle
              key={segment.id}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color ?? "var(--ob-brand)"}
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += length;
          return node;
        })}
      </svg>
      {center && (
        <div className="absolute inset-0 grid place-items-center text-center">
          {center}
        </div>
      )}
    </div>
  );
}

/** Circular progress badge used in stat strips. */
export function Ring({
  value,
  size = 48,
  thickness = 4,
  color = "var(--ob-brand)",
  label,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  label?: ReactNode;
}) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ob-surface-3)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[0.8rem] font-bold">{label}</span>
    </div>
  );
}

/** Compact trend line for KPI cards. */
export function Sparkline({
  points,
  color = "var(--ob-brand)",
  height = 28,
  className,
}: {
  points: number[];
  color?: string;
  height?: number;
  className?: string;
}) {
  const lo = Math.min(...points);
  const hi = Math.max(...points);
  const ys = scale(points, lo, hi, height - 4).map((y) => y + 2);
  const stepX = 100 / Math.max(points.length - 1, 1);

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
      aria-hidden
    >
      <path
        d={linePath(ys, stepX, true)}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Day/hour intensity grid. */
export function Heatmap({
  rows,
  columns = 24,
  color = "var(--ob-brand)",
  className,
}: {
  /** Each row is a list of 0-1 intensities. */
  rows: { label: string; values: number[] }[];
  columns?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1", className)}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <div className="flex flex-1 gap-1">
            {Array.from({ length: columns }, (_, i) => {
              const value = row.values[i] ?? 0;
              return (
                <span
                  key={i}
                  className="aspect-square flex-1 rounded-[3px] border border-[color:var(--ob-border)]"
                  style={{
                    background:
                      value > 0
                        ? `color-mix(in oklab, ${color} ${Math.round(value * 100)}%, transparent)`
                        : "transparent",
                  }}
                />
              );
            })}
          </div>
          <span className="w-8 shrink-0 text-[0.7rem] text-[color:var(--ob-muted)]">
            {row.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Ranked horizontal bars, as in a "top products" list. */
export function BarList({
  items,
  className,
}: {
  items: {
    id: string;
    label: string;
    value: number;
    display?: string;
    color?: string;
  }[];
  className?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <div key={item.id} className="grid gap-1.5">
          <p className="truncate text-[0.82rem] text-[color:var(--ob-fg-soft)]">
            {item.label}
          </p>
          <div className="flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-[3px] bg-[color:var(--ob-surface-3)]">
              <div
                className="h-full rounded-[3px]"
                style={{
                  width: `${(item.value / max) * 100}%`,
                  background: item.color ?? "var(--ob-brand)",
                }}
              />
            </div>
            <span className="shrink-0 text-[0.82rem] font-semibold tabular-nums">
              {item.display ?? item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
