import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          PolitiViral is a premium political creator activation platform built for campaigns,
          PACs, advocacy groups, and creators.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="transition hover:text-slate-950" href="/for-campaigns">
            For campaigns
          </Link>
          <Link className="transition hover:text-slate-950" href="/for-creators">
            For creators
          </Link>
          <Link className="transition hover:text-slate-950" href="/pricing">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
}
