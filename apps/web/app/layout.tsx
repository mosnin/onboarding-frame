import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

// Variable weights keep the whole range available without extra requests.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "onboarding-frame — SaaS onboarding flows as a UI library",
    template: "%s · onboarding-frame",
  },
  description:
    "A library of production-grade SaaS onboarding flows: setup wizards, checklists, product tours, empty states, paywalls and activation dashboards. Every flow is config-driven, themeable and copyable.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
