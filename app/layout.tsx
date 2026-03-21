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
    "PolitiViral is the premium political creator marketplace for campaigns, PACs, advocacy groups, and modern political content makers.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        <main className="relative overflow-x-clip">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
