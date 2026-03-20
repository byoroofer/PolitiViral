import { SurfaceCard } from "@/components/ui/surface-card";
import { cx } from "@/lib/utils";

import { heroCreators } from "@/components/marketing/homepage-data";

type SectionIntroProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function SectionIntro({ description, eyebrow, title }: SectionIntroProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="eyebrow-pill">{eyebrow}</span>
      <h2 className="mt-5 display-font text-[3rem] leading-[0.95] text-slate-950 sm:text-[4rem]">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-9 text-slate-600">{description}</p>
    </div>
  );
}

export function HeroMarketplacePreview() {
  return (
    <SurfaceCard className="overflow-hidden p-0">
      <div className="border-b border-slate-200/80 px-6 py-4 text-center text-sm text-slate-500">
        Campaigns launch within days. Creators apply fast. Content moves with message discipline.
      </div>

      <div className="grid lg:grid-cols-[220px_270px_minmax(0,1fr)]">
        <div className="hidden border-r border-slate-200/80 bg-[#fbfbfd] p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
              PV
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">PolitiViral</p>
              <p className="text-xs text-slate-500">Campaign workspace</p>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            {["Campaigns", "Search", "Lists", "Creators", "Payments"].map((item, index) => (
              <div
                className={cx(
                  "rounded-2xl px-4 py-3 text-sm font-medium",
                  index === 1 ? "bg-white text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.04)]" : "text-slate-500",
                )}
                key={item}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-[26px] border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold tracking-[0.18em] text-slate-500 uppercase">Campaign type</p>
            <p className="mt-2 text-sm font-semibold text-slate-950">Statewide persuasion push</p>
          </div>
        </div>

        <div className="border-r border-slate-200/80 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-950">Find creators</p>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              Clear all
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-[#dcdffc] bg-white px-4 py-3 shadow-[0_0_0_3px_rgba(57,88,255,0.08)]">
            <p className="text-sm font-medium text-slate-700">progressive creators in swing states</p>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              "Geography: Pennsylvania, Michigan, Arizona",
              "Content lane: Persuasion and rapid response",
              "Platform: TikTok, Instagram, X",
              "Audience fit: 18-34 and political listeners",
            ].map((filter) => (
              <div className="rounded-2xl border border-slate-200 bg-[#fbfbfd] px-4 py-3 text-sm text-slate-600" key={filter}>
                {filter}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">Results</p>
              <p className="text-xs text-slate-500">Matched political creators</p>
            </div>
            <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white">
              Invite all
            </span>
          </div>

          <div className="mt-4 grid gap-4">
            {heroCreators.map((creator) => (
              <HeroCreatorCard key={creator.name} {...creator} />
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

type HeroCreatorCardProps = {
  audience: string;
  fit: string;
  handle: string;
  lane: string;
  location: string;
  name: string;
  platform: string;
  summary: string;
};

function HeroCreatorCard({
  audience,
  fit,
  handle,
  lane,
  location,
  name,
  platform,
  summary,
}: HeroCreatorCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff] text-sm font-bold text-slate-950">
            {name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold text-slate-950">{name}</p>
              <span className="rounded-full bg-[#f2efff] px-2.5 py-1 text-[0.68rem] font-semibold text-[#7c5cff]">
                {platform}
              </span>
              <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[0.68rem] font-semibold text-[#3958ff]">
                {lane}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{handle}</p>
          </div>
        </div>

        <div className="grid gap-2 text-right">
          <span className="rounded-2xl bg-[#eef2ff] px-3 py-2 text-xs font-bold text-[#3958ff]">
            {audience}
          </span>
          <span className="rounded-2xl bg-[#eaf9ef] px-3 py-2 text-xs font-bold text-[#1f8a48]">
            {fit}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {["Opinion", "Explainers", "Rapid response", location].map((item) => (
          <span
            className="rounded-full border border-slate-200 bg-[#fbfbfd] px-3 py-1 text-xs font-semibold text-slate-600"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {["Clip", "Reel", "Post", "Story"].map((thumb) => (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f3f4f7] text-[0.68rem] font-semibold text-slate-500"
              key={thumb}
            >
              {thumb}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <span className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
            Save
          </span>
          <span className="rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
            Invite
          </span>
        </div>
      </div>
    </div>
  );
}

type CreatorChannelTileProps = {
  accent: string;
  chips: string[];
  description: string;
  platform: string;
  title: string;
};

export function CreatorChannelTile({
  accent,
  chips,
  description,
  platform,
  title,
}: CreatorChannelTileProps) {
  return (
    <div
      className={cx(
        "group relative min-h-[390px] overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br p-5 text-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/65 after:via-black/12 after:to-transparent",
        accent,
      )}
    >
      <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold tracking-[0.16em] text-white uppercase">
          {platform}
        </span>
        <span className="rounded-full border border-white/18 bg-black/20 px-3 py-1 text-[0.68rem] font-semibold text-white/90">
          Political creators
        </span>
      </div>

      <div className="absolute inset-x-5 top-20 z-10 space-y-3">
        {chips.map((chip, index) => (
          <div
            className={cx(
              "w-fit rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 shadow-[0_8px_18px_rgba(0,0,0,0.12)]",
              index % 2 === 0 ? "ml-0" : "ml-6",
            )}
            key={chip}
          >
            {chip}
          </div>
        ))}
      </div>

      <div className="absolute left-5 right-5 top-40 rounded-[26px] border border-white/14 bg-white/8 p-4 shadow-[0_20px_44px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <span className="rounded-full bg-white/14 px-2.5 py-1 text-[0.68rem] font-semibold text-white/90">
            Live feed
          </span>
        </div>
        <div className="mt-4 grid gap-2">
          <div className="h-9 rounded-2xl bg-white/12" />
          <div className="h-9 rounded-2xl bg-white/10" />
          <div className="h-9 rounded-2xl bg-white/8" />
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-10">
        <h3 className="text-[2rem] font-semibold tracking-[-0.04em] text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/82">{description}</p>
      </div>
    </div>
  );
}
