import Link from "next/link";

import { LogoMark } from "@/components/ui/logo-mark";

const footerSections = [
  {
    title: "Product",
    links: [
      { href: "/for-campaigns", label: "For campaigns" },
      { href: "/for-creators", label: "For creators" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Access",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Create account" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[34px] border border-white/70 bg-white/68 px-6 py-8 shadow-[0_24px_80px_rgba(8,16,40,0.08)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.25fr)_auto_auto] lg:px-8">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11 rounded-2xl" />
              <div>
                <p className="text-sm font-black tracking-[0.24em] text-blue-900 uppercase">
                  PolitiViral
                </p>
                <p className="text-sm text-slate-500">Political creator activation platform</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Premium operating infrastructure for Democratic and center-left campaigns, PACs,
              advocacy groups, and the creators shaping political attention across TikTok,
              Instagram, Facebook, Bluesky, and X.
            </p>
            <p className="text-sm text-slate-500">
              {currentYear} PolitiViral. Purpose-built for political creator programs, not a
              generic influencer marketplace.
            </p>
          </div>

          {footerSections.map((section) => (
            <div className="space-y-4" key={section.title}>
              <p className="text-sm font-black tracking-[0.18em] text-slate-500 uppercase">
                {section.title}
              </p>
              <div className="grid gap-3">
                {section.links.map((link) => (
                  <Link
                    className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
