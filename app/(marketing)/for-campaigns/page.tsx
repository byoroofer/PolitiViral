import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

const featureCards = [
  {
    kicker: "Vetting",
    title: "Start with better creator readiness signals",
    description:
      "Collect structured profiles, platform focus, audience context, and creator voice without piecing it together from bios, inboxes, and scattered docs.",
  },
  {
    kicker: "Briefing",
    title: "Orient the program around campaign outputs that matter",
    description:
      "Persuasion videos, opinion content, interviews, promo assets, and tracked actions belong inside one political operating model instead of scattered one-off asks.",
  },
  {
    kicker: "Program ops",
    title: "Give the team a more credible system immediately",
    description:
      "Even before live billing and deeper workflow tooling, milestone 1 creates a polished product surface that helps campaigns move with more discipline.",
  },
];

const programTracks = [
  {
    title: "Rapid response",
    description:
      "Use X and Bluesky fluent creators to react to campaign moments, shape narrative pressure, and turn live events into fast content loops.",
  },
  {
    title: "Persuasion",
    description:
      "Activate TikTok and Instagram-native creators for issue framing, values-led arguments, and creator-led video that moves voters without feeling canned.",
  },
  {
    title: "Community lift",
    description:
      "Bring Facebook and locally trusted creators into event pushes, volunteer momentum, local persuasion, and share-driven civic organizing.",
  },
];

const platformLabels = ["TikTok", "Instagram", "Facebook", "Bluesky", "X"];

export default function ForCampaignsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHero
        badge="For campaigns"
        description="PolitiViral is designed for campaign teams that need a premium creator activation layer, not a broad influencer marketplace. It gives you a clearer system for onboarding, organizing, and preparing creator workstreams that move voters."
        primaryAction={{ href: "/signup", label: "Set up your campaign" }}
        secondaryAction={{ href: "/pricing", label: "View pilot pricing" }}
        stats={[
          {
            label: "Use cases",
            value: "Persuasion videos, opinion content, interviews, promo creative, and tracked action or merch links.",
          },
          {
            label: "Audience",
            value: "Democratic and center-left candidates, PACs, advocacy groups, and aligned political organizations.",
          },
          {
            label: "Why it sells",
            value: "The product feels intentional enough to support internal alignment and external stakeholder confidence from day one.",
          },
        ]}
        title="A campaign creator program should feel like a system, not a scramble."
      />

      <section className="grid gap-10">
        <SectionHeading
          description="Milestone 1 is focused on the surfaces campaign teams need first: better structure, cleaner onboarding, and a more premium internal operating layer."
          eyebrow="Campaign foundations"
          title="Build the creator program posture before the workflow complexity arrives."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((card) => (
            <FeatureCard
              description={card.description}
              kicker={card.kicker}
              key={card.title}
              title={card.title}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-10">
        <SectionHeading
          description="A strong political creator program is not one creator archetype. It is a coordinated mix of content makers who know how to move attention differently across the platforms that matter."
          eyebrow="Program mix"
          title="Plan around the political content lanes different platforms handle best."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {programTracks.map((track, index) => (
            <SurfaceCard className="p-7 sm:p-8" key={track.title} variant={index === 1 ? "tint" : "default"}>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {track.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">{track.description}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_360px]">
        <SurfaceCard className="p-8 sm:p-10" variant="tint">
          <div className="space-y-6">
            <span className="eyebrow-pill">What milestone 1 gets you</span>
            <div className="space-y-4">
              <h2 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
                A campaign-facing workspace that already feels premium enough to operate from.
              </h2>
              <p className="max-w-3xl text-base leading-8 text-slate-600">
                The current release covers campaign onboarding, structured fields for organization and goals, and a cleaner dashboard shell for creator activation planning.
              </p>
            </div>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li className="rounded-2xl border border-white/80 bg-white/72 px-4 py-3">
                Organization, initiative, budget, and launch details captured in one place.
              </li>
              <li className="rounded-2xl border border-white/80 bg-white/72 px-4 py-3">
                A dashboard shell built for creator operations instead of marketplace browsing.
              </li>
              <li className="rounded-2xl border border-white/80 bg-white/72 px-4 py-3">
                A stronger foundation for future invites, briefs, tracked links, and reporting layers.
              </li>
            </ul>
          </div>
        </SurfaceCard>

        <div className="grid gap-6">
          <SurfaceCard className="p-7" variant="default">
            <div className="space-y-4">
              <span className="eyebrow-pill">Pilot fit</span>
              <p className="text-sm leading-7 text-slate-600">
                PolitiViral is especially strong for teams that already believe creators matter and now need a cleaner product story and operating structure to scale the work.
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-7" variant="default">
            <div className="space-y-4">
              <span className="eyebrow-pill">Platform coverage</span>
              <div className="flex flex-wrap gap-2">
                {platformLabels.map((label) => (
                  <span
                    className="rounded-full border border-slate-200/80 bg-white/74 px-3 py-2 text-sm font-semibold text-slate-700"
                    key={label}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>

      <CtaBand
        actionHref="/signup"
        actionLabel="Create campaign account"
        description="Start with campaign onboarding, define the operating basics, and land in a dashboard shell designed for creator activation instead of generic marketplace behavior."
        eyebrow="Campaign launch"
        title="Give your creator strategy a product surface that matches the stakes."
      />
    </div>
  );
}
