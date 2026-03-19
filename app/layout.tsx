import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: {
    default: "PolitiViral",
    template: "%s | PolitiViral",
  },
  description:
    "PolitiViral is the premium political creator activation platform for campaigns, PACs, advocacy groups, and modern political content makers.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_48%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed bottom-0 left-1/2 -z-10 h-[28rem] w-[72rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(191,219,254,0.42),transparent_60%)]"
        />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
