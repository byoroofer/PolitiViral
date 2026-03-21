"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { cx } from "@/lib/utils";

const navigationItems = [
  { href: "/for-campaigns", label: "For Campaigns", paths: ["/for-campaigns"] },
  { href: "/for-creators", label: "For Creators", paths: ["/for-creators"] },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#use-cases", label: "Creator Network" },
  { href: "/pricing", label: "Pricing", paths: ["/pricing"] },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[rgba(255,255,255,0.94)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[92px] items-center justify-between gap-4">
          <Link className="flex min-w-0 items-center" href="/" onClick={() => setMobileOpen(false)}>
            <LogoMark className="h-[3rem] w-auto sm:h-[3.2rem]" kind="lockup" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => {
              const isActive = item.paths?.some(
                (path) => pathname === path || pathname.startsWith(`${path}/`),
              );

              return (
                <Link
                  className={cx(
                    "text-[0.96rem] font-semibold transition",
                    isActive ? "text-slate-950" : "text-slate-700 hover:text-[#0b4bb8]",
                  )}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="/login" size="md" variant="ghost">
              Log in
            </ButtonLink>
            <ButtonLink href="/signup" size="md">
              Join Marketplace
            </ButtonLink>
          </div>

          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-[0_8px_20px_rgba(15,23,42,0.04)] lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            type="button"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200/80 py-4 lg:hidden">
            <div className="grid gap-2">
              {navigationItems.map((item) => (
                <Link
                  className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f7fbff] hover:text-[#0b4bb8]"
                  href={item.href}
                  key={item.label}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <ButtonLink className="w-full" href="/login" size="md" variant="secondary">
                Log in
              </ButtonLink>
              <ButtonLink className="w-full" href="/signup" size="md">
                Join Marketplace
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
