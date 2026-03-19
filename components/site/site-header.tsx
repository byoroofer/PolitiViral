"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { cx } from "@/lib/utils";

const navigationItems = [
  { href: "/for-campaigns", label: "For campaigns" },
  { href: "/for-creators", label: "For creators" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[30px] border border-white/75 bg-white/74 px-4 py-4 shadow-[0_20px_56px_rgba(8,16,40,0.08)] backdrop-blur-2xl sm:px-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start justify-between gap-4">
              <Link className="flex min-w-0 items-center gap-3" href="/">
                <LogoMark />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black tracking-[0.24em] text-blue-900 uppercase">
                    PolitiViral
                  </span>
                  <span className="block text-sm leading-6 text-slate-600">
                    Creator infrastructure for campaigns and modern political content makers
                  </span>
                </span>
              </Link>

              <Link
                className="pt-1 text-sm font-semibold text-slate-500 transition hover:text-slate-950 sm:hidden"
                href="/login"
              >
                Log in
              </Link>
            </div>

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <nav className="flex flex-wrap gap-2">
                {navigationItems.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      className={cx(
                        "rounded-full px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]"
                          : "bg-white/65 text-slate-600 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)] hover:bg-white hover:text-slate-950",
                      )}
                      href={item.href}
                      key={item.href}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-950 sm:block"
                  href="/login"
                >
                  Log in
                </Link>
                <ButtonLink href="/signup" size="md">
                  Get started
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
