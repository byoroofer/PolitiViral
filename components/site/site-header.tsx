import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";

const navigationItems = [
  { href: "/for-campaigns", label: "For campaigns" },
  { href: "/for-creators", label: "For creators" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <LogoMark />
          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.24em] text-blue-800 uppercase">
              PolitiViral
            </span>
            <span className="text-sm text-slate-500">
              Political creator activation for campaigns and creators
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => (
            <Link
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-slate-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="hidden text-sm font-medium text-slate-500 transition hover:text-slate-950 sm:block"
            href="/login"
          >
            Log in
          </Link>
          <ButtonLink href="/signup" size="md">
            Get started
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
