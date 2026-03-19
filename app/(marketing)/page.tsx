import { redirect } from "next/navigation";

import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getOptionalUser } from "@/lib/auth/session";

const featureCards = [
  {
    kicker: "Campaign ops",
    title: "Replace scattered creator outreach with a cleaner operating layer",
    description:
      "Bring creator discovery, vetting, onboarding, and future briefing workflows into one credible campaign product surface.",
  },
  {
    kicker: "Creator side",
    title: "Give creators a profile that reads like campaign fit",
    description:
      "Help creators show their platform, focus, audience, and point of view without forcing them into a generic influencer marketplace mold.",
  },
  {
    kicker: "Political focus",
    title: "Stay built for Democratic and center-left work",
    description:
      "PolitiViral is for candidates, PACs, advocacy groups, and aligned organizations that need a premium political SaaS, not a broad sponsorship bazaar.",
  },
];

export default async function HomePage() {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <PageHero
        badge="Political creator activation"
        description="PolitiViral helps campaigns and creators start organized from day one with cleaner onboarding, clearer fit signals, and dashboard shells built for political collaboration."
        primaryAction={{ href: "/signup", label: "Create account" }}
        secondaryAction={{ href: "/for-campaigns", label: "Explore campaign fit" }}
        stats={[
          {
            label: "Built for",
            value: "Democratic and center-left campaigns, PACs, advocacy groups, and political creators.",
          },
          {
            label: "Use cases",
            value: "Persuasion videos, opinion content, interview formats, promo assets, and tracked action or merch links.",
          },
          {
            label: "Positioning",
            value: "A clean, premium political SaaS instead of a generic influencer marketplace.",
          },
        ]}
        title="A premium creator activation platform for political teams and creators."
      />

      <section className="grid gap-10">
        <SectionHeading
          description="Milestone 1 is intentionally focused: auth, role selection, onboarding, polished marketing, and dashboard shells for the two sides of the platform."
          eyebrow="Milestone 1"
          title="Start with the parts that make the product feel credible fast."
        />

        <div className="grid gap-6 md:grid-cols-3">
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

      <section className="grid gap-6 lg:grid-cols-2">
        <SurfaceCard className="p-8 sm:p-10">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white uppercase">
              Campaigns
            </span>
            <div className="space-y-3">
              <h2 className="display-font text-4xl leading-none text-slate-950">
                Launch creator programs with more structure and less chaos.
              </h2>
              <p className="text-base leading-7 text-slate-600">
                Set organization details, campaign goals, budget range, and activation timing in
                one polished onboarding flow that prepares the product for future invites and
                briefs.
              </p>
            </div>
            <ButtonLink href="/for-campaigns" size="lg">
              For campaigns
            </ButtonLink>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8 sm:p-10">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase">
              Creators
            </span>
            <div className="space-y-3">
              <h2 className="display-font text-4xl leading-none text-slate-950">
                Build a campaign-ready creator profile without marketplace clutter.
              </h2>
              <p className="text-base leading-7 text-slate-600">
                Give campaigns the essentials they need to understand your voice, audience, and
                political content fit through a clear creator onboarding flow.
              </p>
            </div>
            <ButtonLink href="/for-creators" size="lg" variant="secondary">
              For creators
            </ButtonLink>
          </div>
        </SurfaceCard>
      </section>

      <CtaBand
        actionHref="/pricing"
        actionLabel="View pricing"
        description="Creators can join free in milestone 1, while campaign access is positioned as pilot or custom pricing until the full billing layer is introduced."
        eyebrow="Pricing posture"
        title="Polished enough to sell the product honestly before full billing arrives."
      />
    </div>
  );
}
