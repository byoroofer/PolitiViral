import { LogoMark } from "@/components/ui/logo-mark";
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
      <p className="mt-5 text-lg leading-9 text-slate-700">{description}</p>
    </div>
  );
}

export function HeroMarketplacePreview() {
  return (
    <SurfaceCard className="overflow-hidden p-0">
      <div className="border-b border-slate-200/80 px-6 py-4 text-center text-sm font-medium text-slate-600">
        Campaigns launch within days. Creators apply fast. Content moves with more message discipline.
      </div>

      <div className="grid lg:grid-cols-[220px_270px_minmax(0,1fr)]">
        <div className="hidden border-r border-slate-200/80 bg-[#fbfbfd] p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
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
                  index === 1
                    ? "border border-[#d5e2ff] bg-white text-slate-950 shadow-[0_10px_24px_rgba(37,99,235,0.08)]"
                    : "text-slate-500",
                )}
                key={item}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-[26px] border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold tracking-[0.18em] text-[#0b4bb8] uppercase">Campaign type</p>
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

          <div className="mt-4 rounded-2xl border border-[#cadeff] bg-white px-4 py-3 shadow-[0_0_0_4px_rgba(37,99,235,0.08)]">
            <p className="text-sm font-medium text-slate-700">progressive creators in swing states</p>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              "Geography: Pennsylvania, Michigan, Arizona",
              "Content lane: Persuasion and rapid response",
              "Platform: TikTok, Instagram, X",
              "Audience fit: 18-34 and political listeners",
            ].map((filter) => (
              <div
                className="rounded-2xl border border-slate-200 bg-[#fbfdff] px-4 py-3 text-sm font-medium text-slate-600"
                key={filter}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">Results</p>
              <p className="text-xs font-medium text-slate-500">Matched political creators</p>
            </div>
            <span className="rounded-full bg-[#0b4bb8] px-4 py-2 text-xs font-semibold text-white">
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
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#0b4bb8] via-[#1663d7] to-[#44b0ff] text-sm font-bold text-white">
            {name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold text-slate-950">{name}</p>
              <span className="rounded-full border border-[#d7e5ff] bg-[#eef5ff] px-2.5 py-1 text-[0.68rem] font-semibold text-[#0b4bb8]">
                {platform}
              </span>
              <span className="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[0.68rem] font-semibold text-slate-700">
                {lane}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500">{handle}</p>
          </div>
        </div>

        <div className="grid gap-2 text-right">
          <span className="rounded-2xl bg-[#eef5ff] px-3 py-2 text-xs font-bold text-[#0b4bb8]">
            {audience}
          </span>
          <span className="rounded-2xl bg-[#eaf9ef] px-3 py-2 text-xs font-bold text-[#1f8a48]">
            {fit}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-700">{summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {["Opinion", "Explainers", "Rapid response", location].map((item) => (
          <span
            className="rounded-full border border-slate-200 bg-[#fbfdff] px-3 py-1 text-xs font-semibold text-slate-700"
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
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-[#f8fafc] text-[0.68rem] font-semibold text-slate-500"
              key={thumb}
            >
              {thumb}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <span className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
            Save
          </span>
          <span className="rounded-2xl bg-[#0b4bb8] px-3 py-2 text-xs font-semibold text-white">
            Invite
          </span>
        </div>
      </div>
    </div>
  );
}

type CreatorChannelTileProps = {
  accent: string;
  avatarTone: string;
  contentStyles: string[];
  description: string;
  engagement: string;
  followers: string;
  handle: string;
  lane: string;
  location: string;
  name: string;
  platform: string;
  status: string;
  title: string;
  trustCue: string;
};

export function CreatorChannelTile({
  accent,
  avatarTone,
  contentStyles,
  description,
  engagement,
  followers,
  handle,
  lane,
  location,
  name,
  platform,
  status,
  title,
  trustCue,
}: CreatorChannelTileProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <SurfaceCard className="h-full overflow-hidden p-0">
      <div className={cx("h-1.5 w-full bg-gradient-to-r", accent)} />

      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className={cx(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br text-sm font-black text-white shadow-[0_14px_28px_rgba(15,23,42,0.12)]",
                avatarTone,
              )}
            >
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-[1.05rem] font-semibold tracking-[-0.03em] text-slate-950">
                  {name}
                </p>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef5ff] text-[#0b4bb8]">
                  <svg aria-hidden="true" fill="none" height="11" viewBox="0 0 10 8" width="11">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </div>
              <p className="truncate text-sm font-medium text-slate-500">{handle}</p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-[#d7e5ff] bg-[#eef5ff] px-3 py-1 text-[0.68rem] font-bold tracking-[0.14em] text-[#0b4bb8] uppercase">
            {platform}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] px-4 py-3">
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-slate-500 uppercase">
              Followers
            </p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950">
              {followers}
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-[#fbfdff] px-4 py-3">
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-slate-500 uppercase">
              Engagement
            </p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950">
              {engagement}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-1 text-[0.72rem] font-semibold text-slate-700">
              {lane}
            </span>
            <span className="rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-1 text-[0.72rem] font-semibold text-slate-700">
              {location}
            </span>
          </div>

          <div>
            <h3 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-slate-950">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{description}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {contentStyles.map((style) => (
            <span
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              key={style}
            >
              {style}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] text-slate-500 uppercase">
              Trust cue
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{trustCue}</p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-[#0b4bb8] px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_26px_rgba(11,75,184,0.18)]">
            {status}
          </span>
        </div>
      </div>
    </SurfaceCard>
  );
}
