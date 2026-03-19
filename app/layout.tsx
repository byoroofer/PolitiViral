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
    "PolitiViral is a premium political creator activation platform for campaigns, PACs, advocacy groups, and creators.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_left,rgba(14,165,233,0.08),transparent_26%)]" />
        <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-72 bg-[radial-gradient(circle_at_bottom,rgba(191,219,254,0.55),transparent_58%)]" />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
