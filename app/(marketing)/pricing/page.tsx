import { CtaBand } from "@/components/marketing/cta-band";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cx } from "@/lib/utils";

const pricingCards = [
  {
    title: "Creator",
    price: "Free",
    description:
      "Join the platform, complete creator onboarding, and maintain a campaign-ready profile.",
    points: [
      "Creator onboarding",
      "Creator dashboard shell",
      "Prepared for future campaign briefs and invites",
    ],
  },
  {
    title: "Campaign pilot",
    price: "Contact us",
    description:
      "For teams launching creator operations and needing a premium foundation without generic marketplace clutter.",
    points: [
      "Campaign onboarding",
      "Campaign dashboard shell",
      "Foundational creator program setup",
    ],
    featured: true,
  },
  {
    title: "Coordinated program",
    price: "Custom",
    description:
      "For larger campaigns, PACs, and advocacy groups that want a deeper partnership as the platform expands.",
    points: [
      "Pilot planning support",
      "Expansion path for creator workflows",
      "White-glove implementation direction as the platform grows",
    ],
  },
];

const supportCards = [
  {
    title: "Live now",
    description:
      "Account creation, role selection, onboarding, dashboard shells, and premium marketing and product presentation are all live in milestone 1.",
  },
  {
    title: "Handled manually for now",
    description:
      "Campaign pricing posture is present, but live Stripe billing is intentionally held for a later milestone rather than faked in the product.",
  },
  {
    title: "What comes next",
    description:
      "Deeper creator workflow layers such as invites, briefs, tracked links, and more advanced campaign operations can build on top of the current foundation.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHero
        badge="Pricing"
        description="Milestone 1 includes polished pricing presentation, but live billing is intentionally out of scope for this release. Creator access is simple, and campaign plans are positioned honestly as pilot or custom."
        primaryAction={{ href: "/signup", label: "Create account" }}
        secondaryAction={{ href: "/for-campaigns", label: "See campaign fit" }}
        stats={[
          {
            label: "Creator access",
            value: "Creators can join, complete onboarding, and maintain a campaign-ready presence without paying in milestone 1.",
          },
          {
            label: "Campaign plans",
            value: "Campaign pricing is positioned as pilot or custom while live Stripe workflows stay intentionally deferred.",
          },
          {
            label: "Why it matters",
            value: "The product can sell itself credibly now without pretending billing infrastructure is already finished.",
          },
        ]}
        title="Simple, credible pricing for an early premium political SaaS."
      />

      <section className="grid gap-10">
        <SectionHeading
          description="The pricing posture stays honest: easy creator entry, premium campaign partnerships, and no fake sense of billing completeness before the Stripe milestone is actually ready."
          eyebrow="Pricing posture"
          title="Position the product with confidence now, then wire full billing later."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingCards.map((card) => (
            <SurfaceCard
              className={cx("flex h-full flex-col p-8 sm:p-9", card.featured ? "lg:-translate-y-2" : "")}
              key={card.title}
              variant={card.featured ? "dark" : "default"}
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h2
                        className={cx(
                          "text-2xl font-semibold tracking-[-0.03em]",
                          card.featured ? "text-white" : "text-slate-950",
                        )}
                      >
                        {card.title}
                      </h2>
                      {card.featured ? (
                        <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-black tracking-[0.18em] text-blue-100 uppercase">
                          Recommended
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cx(
                        "display-font text-5xl leading-none",
                        card.featured ? "text-white" : "text-slate-950",
                      )}
                    >
                      {card.price}
                    </p>
                    <p className={cx("text-sm leading-7", card.featured ? "text-blue-50/84" : "text-slate-600")}>
                      {card.description}
                    </p>
                  </div>

                  <ul className="grid gap-3">
                    {card.points.map((point) => (
                      <li
                        className={cx(
                          "rounded-2xl px-4 py-3 text-sm leading-6",
                          card.featured
                            ? "border border-white/10 bg-white/8 text-blue-50"
                            : "border border-slate-200/75 bg-white/74 text-slate-700",
                        )}
                        key={point}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <ButtonLink href="/signup" size="lg" variant={card.featured ? "secondary" : "primary"}>
                  {card.title === "Creator" ? "Join free" : "Start onboarding"}
                </ButtonLink>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-10">
        <SectionHeading
          description="This keeps the current release honest and conversion-ready: the product looks polished, the onboarding is real, and the parts not yet wired are clearly represented."
          eyebrow="What to expect"
          title="A premium pricing surface without pretending unfinished billing is complete."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {supportCards.map((card, index) => (
            <SurfaceCard className="p-7 sm:p-8" key={card.title} variant={index === 0 ? "tint" : "default"}>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {card.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">{card.description}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <CtaBand
        actionHref="/signup"
        actionLabel="Start onboarding"
        description="Create an account now, pick your role, and move into the onboarding flow that matches how campaigns and creators actually start using the product."
        eyebrow="Ready to start"
        title="Use the current release to establish fit now, then layer billing depth in the next milestone."
      />
    </div>
  );
}
