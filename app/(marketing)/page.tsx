import { redirect } from "next/navigation";

import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageHero } from "@/components/marketing/page-hero";
import { PlatformIdeaGrid, type PlatformIdea } from "@/components/marketing/platform-idea-grid";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getOptionalUser } from "@/lib/auth/session";

const featureCards = [
  {
    kicker: "Campaign ops",
    title: "Turn creator outreach into a real operating layer",
    description:
      "Replace scattered spreadsheets, DMs, and intake notes with a workspace built for political teams that need structure, speed, and credibility.",
  },
  {
    kicker: "Creator fit",
    title: "Let political creators present themselves like strategic partners",
    description:
      "Profiles center platform, audience, voice, and political fit so campaigns can make decisions faster without generic marketplace clutter.",
  },
  {
    kicker: "Political focus",
    title: "Stay purpose-built for Democratic and center-left work",
    description:
      "The product is tuned for campaigns, PACs, advocacy groups, and aligned organizations that want premium creator infrastructure, not a broad sponsorship bazaar.",
  },
];

const platformIdeas: PlatformIdea[] = [
  {
    platform: "TikTok",
    headline: "Fast-cut persuasion that feels native",
    description:
      "Political content makers on TikTok thrive on fast reaction formats, issue explainers, direct-to-camera persuasion, and cultural framing that lands without sounding scripted.",
    formatIdeas: [
      "Rapid response to campaign moments",
      "Issue explainer cutdowns and stitched reactions",
      "Opinion videos that turn policy into plain language",
    ],
  },
  {
    platform: "Instagram",
    headline: "Polished credibility with stronger visual control",
    description:
      "Instagram is ideal for creators who mix political commentary with visual polish, lifestyle context, behind-the-scenes storytelling, and clean reel-first communication.",
    formatIdeas: [
      "Reels that humanize candidates and organizers",
      "Carousel-style argument framing adapted into video",
      "Campaign-day moments that feel elevated, not staged",
    ],
  },
  {
    platform: "Facebook",
    headline: "Community trust and local amplification",
    description:
      "Facebook still matters for local networks, persuasion inside existing communities, volunteer energy, and creators who know how to move older and regional audiences.",
    formatIdeas: [
      "Local issue explainers and organizer recaps",
      "Community proof for events, merch, and actions",
      "Share-friendly civic clips for existing networks",
    ],
  },
  {
    platform: "Bluesky",
    headline: "High-context political conversation",
    description:
      "Bluesky rewards creators who can speak fluently to politically engaged audiences, shape opinion with clarity, and participate in fast-moving issue discourse credibly.",
    formatIdeas: [
      "Narrative framing around fast-moving moments",
      "Commentary that translates online discourse into video hooks",
      "Credibility-building takes for high-information audiences",
    ],
  },
  {
    platform: "X",
    headline: "Rapid-response influence and narrative pressure",
    description:
      "X is strongest for creators who move fast, react in real time, and help campaigns reinforce talking points, quote moments, and pressure-cycle narratives.",
    formatIdeas: [
      "Live-event clips and debate reactions",
      "Thread-to-video commentary pipelines",
      "Opinion-led amplification around campaign moments",
    ],
  },
];

const workflowSteps = [
  {
    title: "Set the operating model",
    description:
      "Campaign teams and creators enter through role-specific flows that establish fit, platform focus, goals, and readiness.",
  },
  {
    title: "Clarify the content lanes",
    description:
      "The product stays anchored in political deliverables like persuasion videos, opinion content, interviews, promo assets, and tracked actions.",
  },
  {
    title: "Land in a real workspace",
    description:
      "Instead of ending at signup, milestone 1 gets both sides into a cleaner dashboard shell prepared for briefs, invites, and future program operations.",
  },
];

export default async function HomePage() {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHero
        badge="Political creator activation"
        description="PolitiViral gives campaigns and creators a premium operating system for political content collaboration, from first signup through onboarding and dashboard readiness."
        primaryAction={{ href: "/signup", label: "Create account" }}
        secondaryAction={{ href: "/for-campaigns", label: "Explore campaign fit" }}
        stats={[
          {
            label: "Built for",
            value: "Democratic and center-left campaigns, PACs, advocacy groups, and political content makers.",
          },
          {
            label: "Content mix",
            value: "Persuasion videos, opinion content, interviews, promo creative, and tracked action or merch pushes.",
          },
          {
            label: "Product posture",
            value: "A polished political SaaS with real operating structure, not a generic influencer marketplace.",
          },
        ]}
        title="The premium creator operating system for modern political campaigns."
      />

      <section className="grid gap-10">
        <SectionHeading
          description="The product feels stronger when the system is tight: a clear audience, a serious political point of view, and a workflow built around campaign reality instead of generic creator tooling."
          eyebrow="What makes it credible"
          title="This is political creator infrastructure, not marketplace theater."
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
          description="PolitiViral should spark ideas for the kinds of political content makers campaigns actually want to activate. The point is not one monolithic creator type. It is a coordinated mix across the platforms where political attention already lives."
          eyebrow="Platform inspiration"
          title="Feature the creator formats campaigns are already thinking about across TikTok, Instagram, Facebook, Bluesky, and X."
        />

        <PlatformIdeaGrid items={platformIdeas} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-8 sm:p-10" variant="tint">
          <div className="space-y-6">
            <span className="eyebrow-pill">For campaigns</span>
            <div className="space-y-4">
              <h2 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
                Launch creator programs with clearer briefs, tighter intake, and a more credible internal story.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Set your organization, initiative, budget range, launch timeline, and creator goal in a product surface that feels ready for campaign staff, consultants, and stakeholders.
              </p>
            </div>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li className="rounded-2xl border border-white/75 bg-white/70 px-4 py-3">
                Structured campaign onboarding instead of scattered intake.
              </li>
              <li className="rounded-2xl border border-white/75 bg-white/70 px-4 py-3">
                Dashboard shell ready for creator program visibility.
              </li>
              <li className="rounded-2xl border border-white/75 bg-white/70 px-4 py-3">
                A product posture strong enough to support pilot pricing and stakeholder conversations.
              </li>
            </ul>
            <ButtonLink href="/for-campaigns" size="lg">
              See campaign workflows
            </ButtonLink>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-8 sm:p-10" variant="default">
          <div className="space-y-6">
            <span className="eyebrow-pill">For creators</span>
            <div className="space-y-4">
              <h2 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
                Help creators look campaign-ready from the first impression.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Creator onboarding highlights platform, audience, voice, and political fit so campaigns can quickly understand who should be in the mix and why.
              </p>
            </div>
            <ul className="grid gap-3 text-sm leading-7 text-slate-600">
              <li className="rounded-2xl border border-slate-200/75 bg-white/72 px-4 py-3">
                Cleaner profile structure for political creators, not generic sponsorship bios.
              </li>
              <li className="rounded-2xl border border-slate-200/75 bg-white/72 px-4 py-3">
                A dashboard shell prepared for future briefs, invites, and approvals.
              </li>
              <li className="rounded-2xl border border-slate-200/75 bg-white/72 px-4 py-3">
                Better signal for campaigns deciding between content makers across multiple platforms.
              </li>
            </ul>
            <ButtonLink href="/for-creators" size="lg" variant="secondary">
              See creator workflows
            </ButtonLink>
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-10">
        <SectionHeading
          description="Milestone 1 is intentionally narrow, but it already carries users from first touch into a working product shell. That shift alone makes the platform feel much more credible."
          eyebrow="Flow"
          title="A sharper path from first click to a usable political creator workspace."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <SurfaceCard className="p-7 sm:p-8" key={step.title} variant={index === 1 ? "tint" : "default"}>
              <div className="space-y-5">
                <span className="text-sm font-black tracking-[0.16em] text-blue-700 uppercase">
                  Step {index + 1}
                </span>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">{step.description}</p>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <CtaBand
        actionHref="/signup"
        actionLabel="Start with PolitiViral"
        description="Create an account, choose your side of the platform, and land in a polished onboarding flow and dashboard shell built for political creator operations."
        eyebrow="Launch the workspace"
        title="Make the product feel as serious as the campaigns and creators you want to attract."
      />
    </div>
  );
}
