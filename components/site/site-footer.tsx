import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";

const footerSections = [
  {
    title: "Marketplace",
    links: [
      { href: "/for-campaigns", label: "For campaigns" },
      { href: "/for-creators", label: "For creators" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#use-cases", label: "Creator network" },
      { href: "/signup", label: "Create account" },
    ],
  },
  {
    title: "Access",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/signup", label: "Join marketplace" },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-slate-200/80 bg-[#f5f8fd]">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[34px] border border-slate-200 bg-white px-6 py-8 shadow-[0_18px_44px_rgba(15,23,42,0.04)] sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,0.72fr))]">
          <div className="space-y-6">
            <LogoMark className="h-[3.4rem] w-auto sm:h-[3.8rem]" kind="lockup" />

            <p className="max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
              PolitiViral helps campaigns, PACs, committees, issue groups, and aligned
              organizations launch message-driven creator campaigns with modern political
              content makers.
            </p>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/signup" size="md">
                Start a Campaign
              </ButtonLink>
              <ButtonLink href="/for-creators" size="md" variant="secondary">
                Join as a Creator
              </ButtonLink>
            </div>
          </div>

          {footerSections.map((section) => (
            <div className="space-y-4" key={section.title}>
              <p className="text-[0.72rem] font-bold tracking-[0.24em] text-[#0b4bb8] uppercase">
                {section.title}
              </p>
              <div className="grid gap-3">
                {section.links.map((link) => (
                  <Link
                    className="text-sm font-semibold text-slate-700 transition hover:text-[#0b4bb8]"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{currentYear} PolitiViral. Built for modern political creator campaigns.</p>
          <p>Serious political creator infrastructure, not generic influencer software.</p>
        </div>
      </div>
    </footer>
  );
}
