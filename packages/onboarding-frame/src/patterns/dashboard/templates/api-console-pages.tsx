"use client";

import { Placeholder } from "../../../ui/placeholder";
import { BarChart, LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { Btn, Card, Chip, SearchField, Select, Table } from "./chrome";
import type { ApiConsolePage } from "./api-console";

/**
 * Secondary pages for the API console.
 *
 * Each one is composed for this product specifically — model cards with
 * inference metadata, an asset table with storage classes, deployment rows,
 * a usage breakdown by endpoint — rather than a shared filler layout.
 */

const CATEGORIES = ["All", "Image", "Video", "Audio", "Language", "Embedding"];

const CATALOGUE = [
  { id: "c1", org: "northwind", name: "motion-2.0/image-to-video", tag: "Video", latency: "18.4s", price: "$0.080 / s" },
  { id: "c2", org: "", name: "prism-2/turbo", tag: "Image", latency: "1.2s", price: "$0.003 / image" },
  { id: "c3", org: "lumaworks", name: "swift-horse/v1.1", tag: "Video", latency: "24.1s", price: "$0.095 / s" },
  { id: "c4", org: "northwind", name: "echo-1/transcribe", tag: "Audio", latency: "0.9s", price: "$0.006 / min" },
  { id: "c5", org: "cinder", name: "relight/v3", tag: "Image", latency: "2.8s", price: "$0.011 / image" },
  { id: "c6", org: "northwind", name: "atlas-embed/v2", tag: "Embedding", latency: "0.2s", price: "$0.0001 / 1k" },
];

const ASSETS = [
  { id: "a1", name: "campaign-hero-01.mp4", kind: "Video", size: "48.2 MB", created: "2 hours ago", storage: "Standard" },
  { id: "a2", name: "product-shot-final.png", kind: "Image", size: "3.1 MB", created: "yesterday", storage: "Standard" },
  { id: "a3", name: "voiceover-take-3.wav", kind: "Audio", size: "12.7 MB", created: "3 days ago", storage: "Archive" },
  { id: "a4", name: "storyboard-frames.zip", kind: "Archive", size: "204 MB", created: "last week", storage: "Archive" },
];

const DEPLOYMENTS = [
  { id: "d1", name: "prism-2-turbo", status: "Running", region: "us-east", replicas: "2 / 2", cold: "410 ms" },
  { id: "d2", name: "echo-1-transcribe", status: "Running", region: "eu-west", replicas: "1 / 1", cold: "180 ms" },
  { id: "d3", name: "relight-v3", status: "Scaled to zero", region: "us-west", replicas: "0 / 3", cold: "2.4 s" },
];

const ENDPOINTS = [
  { id: "e1", path: "/v1/image/generate", calls: 18420, spend: "$62.40" },
  { id: "e2", path: "/v1/video/render", calls: 2140, spend: "$188.20" },
  { id: "e3", path: "/v1/audio/transcribe", calls: 9310, spend: "$21.05" },
  { id: "e4", path: "/v1/embed", calls: 142800, spend: "$14.28" },
];

export function ApiConsoleSubpage({
  page,
  brandName,
}: {
  page: ApiConsolePage;
  brandName: string;
}) {
  if (page === "explore") {
    return (
      <div className="grid gap-6 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1">
            <h1 className="text-[2rem] font-extrabold tracking-tight">Explore</h1>
            <p className="mt-1 text-[color:var(--ob-muted)]">
              Every model available on {brandName}, with live latency and pricing.
            </p>
          </div>
          <SearchField placeholder="Search models" rounded="md" className="w-[280px]" />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category, i) => (
            <button
              key={category}
              type="button"
              aria-pressed={i === 0}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.86rem] font-medium",
                i === 0
                  ? "border-transparent bg-[color:var(--ob-cta-bg)] text-[color:var(--ob-cta-fg)]"
                  : "border-[color:var(--ob-border)] text-[color:var(--ob-fg-soft)]",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATALOGUE.map((model) => (
            <Card key={model.id} className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Placeholder width={32} height={32} radius={7} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.95rem]">
                    {model.org && (
                      <span className="text-[color:var(--ob-muted)]">{model.org}/</span>
                    )}
                    <span className="font-bold">{model.name}</span>
                  </p>
                  <Chip className="mt-1.5">{model.tag}</Chip>
                </div>
              </div>
              <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-[color:var(--ob-border)] pt-3 text-[0.82rem]">
                <div>
                  <dt className="text-[color:var(--ob-muted)]">Median latency</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{model.latency}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--ob-muted)]">Price</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{model.price}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (page === "assets") {
    return (
      <div className="grid gap-6 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1">
            <h1 className="text-[2rem] font-extrabold tracking-tight">Assets</h1>
            <p className="mt-1 text-[color:var(--ob-muted)]">
              Everything you have generated or uploaded, with its storage class.
            </p>
          </div>
          <Select label="All types" />
          <Btn tone="dark" size="sm">Upload</Btn>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Objects stored", value: "1,284" },
            { label: "Storage used", value: "18.4 GB" },
            { label: "Egress this month", value: "2.1 GB" },
          ].map((stat) => (
            <Card key={stat.label}>
              <p className="text-[0.85rem] text-[color:var(--ob-muted)]">{stat.label}</p>
              <p className="mt-1.5 text-2xl font-extrabold tabular-nums">{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card padded={false}>
          <Table
            columns={["Name", "Type", "Size", "Created", "Storage class"]}
            align={["left", "left", "right", "right", "right"]}
            rows={ASSETS.map((asset) => [
              <span key="n" className="flex items-center gap-2.5">
                <Placeholder width={26} height={26} radius={5} />
                <span className="font-medium">{asset.name}</span>
              </span>,
              asset.kind,
              <span key="s" className="tabular-nums">{asset.size}</span>,
              <span key="c" className="text-[color:var(--ob-muted)]">{asset.created}</span>,
              <Chip key="st" tone={asset.storage === "Archive" ? "neutral" : "brand"}>
                {asset.storage}
              </Chip>,
            ])}
          />
        </Card>
      </div>
    );
  }

  if (page === "serverless") {
    return (
      <div className="grid gap-6 px-6 py-8 sm:px-10">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1">
            <h1 className="text-[2rem] font-extrabold tracking-tight">Serverless</h1>
            <p className="mt-1 text-[color:var(--ob-muted)]">
              Deployments scale to zero between requests. Cold start is the cost of that.
            </p>
          </div>
          <Btn tone="dark" size="sm">New deployment</Btn>
        </div>

        <Card padded={false}>
          <Table
            columns={["Deployment", "Status", "Region", "Replicas", "Cold start"]}
            align={["left", "left", "left", "right", "right"]}
            rows={DEPLOYMENTS.map((d) => [
              <span key="n" className="font-mono text-[0.86rem] font-medium">{d.name}</span>,
              <Chip key="s" tone={d.status === "Running" ? "success" : "neutral"}>
                {d.status}
              </Chip>,
              d.region,
              <span key="r" className="tabular-nums">{d.replicas}</span>,
              <span key="c" className="tabular-nums">{d.cold}</span>,
            ])}
          />
        </Card>

        <Card>
          <h3 className="font-bold">Requests per minute</h3>
          <p className="mt-0.5 text-[0.85rem] text-[color:var(--ob-muted)]">
            Across all deployments, last hour
          </p>
          <BarChart
            className="mt-5"
            values={[2, 6, 4, 9, 14, 8, 5, 11, 18, 12, 7, 3]}
            yLabels={["18", "9", "0"]}
            xLabels={["12:00", "12:15", "12:30", "12:45", "13:00"]}
            color="var(--ob-brand)"
            height={150}
          />
        </Card>
      </div>
    );
  }

  // usage
  return (
    <div className="grid gap-6 px-6 py-8 sm:px-10">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1">
          <h1 className="text-[2rem] font-extrabold tracking-tight">Usage</h1>
          <p className="mt-1 text-[color:var(--ob-muted)]">
            Spend and call volume for the current billing period.
          </p>
        </div>
        <Select label="Last 30 days" />
        <Btn tone="neutral" size="sm">Export CSV</Btn>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Spend", value: "$285.93" },
          { label: "Requests", value: "172,670" },
          { label: "Error rate", value: "0.21%" },
          { label: "Median latency", value: "1.4s" },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-[0.85rem] text-[color:var(--ob-muted)]">{stat.label}</p>
            <p className="mt-1.5 text-2xl font-extrabold tabular-nums">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-bold">Daily spend</h3>
        <LineChart
          className="mt-5"
          height={190}
          smooth
          series={[{ id: "spend", points: [4, 6, 5, 9, 14, 11, 8, 12, 18, 16, 21, 19, 24, 22], color: "var(--ob-brand)", area: true }]}
          yLabels={["$24", "$12", "$0"]}
          xLabels={["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 30"]}
        />
      </Card>

      <Card padded={false}>
        <div className="p-5 pb-0">
          <h3 className="font-bold">By endpoint</h3>
        </div>
        <Table
          className="mt-3"
          columns={["Endpoint", "Calls", "Spend"]}
          rows={ENDPOINTS.map((e) => [
            <span key="p" className="font-mono text-[0.86rem]">{e.path}</span>,
            <span key="c" className="tabular-nums">{e.calls.toLocaleString()}</span>,
            <span key="s" className="font-semibold tabular-nums">{e.spend}</span>,
          ])}
        />
      </Card>
    </div>
  );
}
