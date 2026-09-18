import { Suspense } from "react";
import { Playground } from "@/components/playground";

export const metadata = { title: "Playground" };

export default function PlaygroundPage() {
  return (
    <Suspense fallback={null}>
      <Playground />
    </Suspense>
  );
}
