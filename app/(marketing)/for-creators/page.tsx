import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageHero } from "@/components/marketing/page-hero";
import { PlatformIdeaGrid, type PlatformIdea } from "@/components/marketing/platform-idea-grid";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

const creatorFeatures = [
  {
    kicker: "Readiness",
    title: "Show campaigns how your political content actually fits",
    description:
      "Your profile captures the essentials campaigns need to understand platform, audience, voice, and campaign readiness without forcing you into a generic marketplace mold.",
  },
  {
    kicker: "Clarity",
    title: "Work from campaign asks that match political reality",
    description:
      "PolitiViral is tuned for persuasion, opinion, interview, promo, and action content instead of a random mix of unrelated brand sponsorship categories.",
  },
  {
    kicker: "Momentum",
    title: "Build repeat political partnerships on a stronger foundation",
    description:
      "You land in a premium creator dashboard shell that makes future campaign collaboration feel like an operating relationship, not a loose ad hoc gig.",
  },
];

const creatorPlatforms: PlatformIdea[] = [
  {
    platform: "TikTok",
    headline: "Creators who can move quickly and sound native",
    description:
      "TikTok political creators are strongest when they can react fast, explain issues clearly, and make persuasion content feel like culture instead of campaign copy.",
    formatIdeas: [
      "Direct-to-camera issue takes",
      "Stitched reactions to campaign moments",
      "Fast opinion videos that frame the argument",
    ],
  },
  {
    platform: "Instagram",
    headline: "Creators with polish and visual trust",
    description:
      "Instagram rewards creators who can pair political substance with stronger visual finish, whether through reels, behind-the-scenes content, or elevated messaging moments.",
    formatIdeas: [
      "Reels with polished political storytelling",
      "Visual recaps from events and field moments",
      "High-trust content around candidate voice and tone",
    ],
  },
  {
    platform: "Facebook",
    headline: "Creators anchored in real communities",
    description:
      "Facebook still matters for locally trusted voices, community-driven persuasion, and content that can travel through existing civic and regional networks.",
    formatIdeas: [
      "Community explainers with local context",
      "Event and action clips for share-driven reach",
      "Regional creator voices that feel familiar and trusted",
    ],
  },
  {
    platform: "Bluesky",
    headline: "Creators for high-context political audiences",
    description:
      "Bluesky is valuable for political content makers who can engage deeply informed audiences and turn discourse into persuasive, credible video hooks.",
    formatIdeas: [
      "High-context opinion framing",
      "Commentary built from live policy conversation",
      "Credibility content for politically fluent audiences",
    ],
  },
  {
    platform: "X",
    headline: "Creators who thrive in rapid-response cycles",
    description:
      "X remains useful for creators who excel at live reactions, narrative pressure, and real-time amplification around debates, interviews, and campaign developments.",
    formatIdeas: [
      "Debate-night and interview reactions",
      "Quote-driven commentary turned into short-form clips",
      "Opinion content for fast-moving political moments",
    ],
  },
];

export default function ForCreatorsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHero
        badge="For creators"
        description="PolitiViral helps political content makers join campaign programs through a workflow that feels organized, credible, and shaped for real campaign collaboration."
        primaryAction={{ href: "/signup", label: "Join as a creator" }}
        secondaryAction={{ href: "/for-campaigns", label: "See the campaign side" }}
        stats={[
          {
            label: "Built for",
            value: "Creators who want to work with campaigns, advocacy groups, PACs, and center-left political organizations.",
          },
          {
            label: "Not built for",
            value: "A broad marketplace where political creators get flattened into the same system as every unrelated sponsorship category.",
          },
          {
            label: "First milestone",
            value: "Creator onboarding, creator dashboard shell, and a cleaner bridge into future campaign briefs and approvals.",
          },
        ]}
        title="A political creator profile should feel campaign-ready from the first click."
      />

      <section className="grid gap-10">
        <SectionHeading
          description="The creator side of PolitiViral is meant to feel polished, serious, and legible to campaign teams without becoming heavy or generic."
          eyebrow="Creator structure"
          title="Less marketplace noise, more signal about how your content actually fits political work."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {creatorFeatures.map((card) => (
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
          description="Campaigns are looking for different political content-maker profiles across different platforms. Showing creators these lanes helps them understand where and how they can stand out."
          eyebrow="Platform ideas"
          title="Feature the political creator archetypes campaigns already want across TikTok, Instagram, Facebook, Bluesky, and X."
        />

        <PlatformIdeaGrid items={creatorPlatforms} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8 sm:p-10" variant="tint">
          <div className="space-y-6">
            <span className="eyebrow-pill">What you share</span>
            <div className="space-y-4">
              <h2 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
                Onboarding asks for just enough signal to make campaigns pay attention.
              </h2>
              <p className="text-base leading-8 text-slate-600">
                The profile is structured to help campaigns evaluate platform, audience, content lane, and political voice quickly.
              </p>
            </div>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li className="rounded-2xl border border-white/80 bg-white/74 px-4 py-3">
                Display name and primary platform
              </li>
              <li className="rounded-2xl border border-white/80 bg-white/74 px-4 py-3">
                Content focus, audience size, and home base
              </li>
              <li className="rounded-2xl border border-white/80 bg-white/74 px-4 py-3">
                Short bio explaining voice, audience, and political fit
              </li>
            </ul>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8 sm:p-10" variant="default">
          <div className="space-y-6">
            <span className="eyebrow-pill">What you get back</span>
            <div className="space-y-4">
              <h2 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
                A cleaner product surface for recurring political collaboration.
              </h2>
              <p className="text-base leading-8 text-slate-600">
                Milestone 1 lands you in a creator workspace that already feels more serious and campaign-ready than ad hoc intake or email-only coordination.
              </p>
            </div>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li className="rounded-2xl border border-slate-200/75 bg-white/74 px-4 py-3">
                Creator dashboard shell shaped for political campaign collaboration
              </li>
              <li className="rounded-2xl border border-slate-200/75 bg-white/74 px-4 py-3">
                A cleaner entry point into future campaign briefs and approvals
              </li>
              <li className="rounded-2xl border border-slate-200/75 bg-white/74 px-4 py-3">
                A product story that positions you like a strategic creator partner
              </li>
            </ul>
          </div>
        </SurfaceCard>
      </section>

      <CtaBand
        actionHref="/signup"
        actionLabel="Create creator account"
        description="Join PolitiViral, complete your creator onboarding, and land in a workspace built to make political campaign collaboration feel organized and premium."
        eyebrow="Creator launch"
        title="Make your first impression feel like serious campaign work, not generic creator marketplace noise."
      />
    </div>
  );
}
