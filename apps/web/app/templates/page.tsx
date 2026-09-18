import { TemplatesBrowser } from "@/components/templates-browser";

export const metadata = {
  title: "Dashboard templates",
  description:
    "Full-page recreations of real product surfaces, each with its own palette, radius and type scale.",
};

export default function TemplatesPage() {
  return <TemplatesBrowser />;
}
