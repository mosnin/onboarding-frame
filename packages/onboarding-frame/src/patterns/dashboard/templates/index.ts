export { Surface } from "./tokens";
export type { TemplateTokens } from "./tokens";
export type { TemplateProps } from "./api-console";

export { ApiConsoleTemplate } from "./api-console";
export type { ApiConsolePage, ApiConsoleProps } from "./api-console";
export { SetupChecklistTemplate } from "./setup-checklist";
export { GuidedSetupTemplate } from "./guided-setup";
export { AssistantHomeTemplate } from "./assistant-home";
export { FileLibraryTemplate } from "./file-library";
export { CreativeStudioTemplate } from "./creative-studio";
export { DiscoveryFeedTemplate } from "./discovery-feed";
export { GuidesAssistantTemplate } from "./guides-assistant";
export { BrandStudioTemplate } from "./brand-studio";

export interface TemplateMeta {
  slug: string;
  name: string;
  blurb: string;
  /** Pages this template implements, beyond the reference page. */
  pages: { id: string; label: string }[];
}

/**
 * Template catalogue.
 *
 * Each entry is a distinct product surface with its own palette, radius and
 * type scale — not variants of one house style.
 */
export const templateCatalog: TemplateMeta[] = [
  {
    slug: "api-console",
    name: "API console",
    blurb:
      "Developer platform home: a dismissible getting-started band above credit, request and error strips.",
    pages: [
      { id: "home", label: "Home" },
      { id: "explore", label: "Explore" },
      { id: "assets", label: "Assets" },
      { id: "serverless", label: "Serverless" },
      { id: "usage", label: "Usage" },
    ],
  },
  {
    slug: "setup-checklist",
    name: "Setup checklist",
    blurb:
      "Near-black nav rail carrying persistent setup progress, with a step-by-step task list as the whole page.",
    pages: [{ id: "setup", label: "Setup" }],
  },
  {
    slug: "guided-setup",
    name: "Guided setup",
    blurb:
      "Numbered activation sequence where only the current step is interactive and later steps stay visible but disabled.",
    pages: [{ id: "home", label: "Getting started" }],
  },
  {
    slug: "assistant-home",
    name: "Assistant home",
    blurb:
      "A single centred prompt as the entire primary surface, with topic nav and suggestions arranged around it.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "file-library",
    name: "File library",
    blurb:
      "Project grid where the create affordance leads the grid, so an empty workspace still has an obvious next action.",
    pages: [{ id: "files", label: "My files" }],
  },
  {
    slug: "creative-studio",
    name: "Creative studio",
    blurb:
      "Oversized prompt hero on a textured band, with capability chips that teach what the tool can do.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "guides-assistant",
    name: "Guides with assistant",
    blurb:
      "Personalised setup guide down the middle with a docked assistant that suggests the next action.",
    pages: [{ id: "started", label: "Get started" }],
  },
  {
    slug: "brand-studio",
    name: "Brand studio",
    blurb:
      "Editorial serif headings on a near-white canvas, with an ad-library showcase and a brand asset row.",
    pages: [{ id: "overview", label: "Overview" }],
  },
  {
    slug: "discovery-feed",
    name: "Discovery feed",
    blurb:
      "Masonry gallery with almost no chrome, where the image carries the weight and metadata sits beneath.",
    pages: [{ id: "for-you", label: "For you" }],
  },
];
