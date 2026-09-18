import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { KitBar } from "@/components/kit-bar";
import { SiteFooter } from "@/components/site-footer";

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
      <head>
        {/*
          Template typefaces. Each dashboard template names its own face so the
          set does not all render in one typeface; these are the faces those
          token sets reference, loaded by their real family names so the same
          stack works in an ejected copy.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400..700&family=DM+Sans:opsz,wght@9..40,400..700&family=Figtree:wght@400..800&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter+Tight:wght@400..700&family=Manrope:wght@400..800&family=Plus+Jakarta+Sans:wght@400..800&family=Schibsted+Grotesk:wght@400..700&family=Space+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <SiteHeader />
        <div className="min-h-[70vh]">{children}</div>
        <SiteFooter />
        <KitBar />
      </body>
    </html>
  );
}
