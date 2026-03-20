import Link from "next/link";
import { redirect } from "next/navigation";

import {
  audienceCards,
  buyerSignals,
  creatorChannels,
  faqItems,
  marketplaceStats,
  platformBenefits,
  platformFeatureCards,
  productModules,
  useCases,
  workflowSteps,
} from "@/components/marketing/homepage-data";
import {
  CreatorChannelTile,
  HeroMarketplacePreview,
  SectionIntro,
} from "@/components/marketing/homepage-primitives";
import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getOptionalUser } from "@/lib/auth/session";

export default async function HomePage() {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="pb-24">
      <section className="mx-auto max-w-[1240px] px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d7e5ff] bg-white px-4 py-2 text-sm font-medium text-[#0b4bb8] shadow-[0_12px_26px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span className="h-2.5 w-2.5 rounded-full bg-[#0b4bb8]" key={index} />
              ))}
            </div>
            <span>Built for campaigns, PACs, committees, causes, and creators</span>
          </div>

          <h1 className="mt-10 display-font text-[3.55rem] leading-[0.9] text-slate-950 sm:text-[4.75rem] lg:text-[6.85rem]">
            Launch creator campaigns that shape
            <span className="block bg-gradient-to-r from-[#0b4bb8] via-[#1663d7] to-[#39a7ff] bg-clip-text text-transparent">
              narrative, persuasion, and reach
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-700 sm:text-[1.45rem]">
            PolitiViral is the premium political creator marketplace where campaigns and
            aligned organizations launch message-driven creator campaigns, and creators
            join, get selected, and get paid for serious political work.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/signup" size="lg">
              Start a Campaign
            </ButtonLink>
            <ButtonLink href="/for-creators" size="lg" variant="secondary">
              Join as a Creator
            </ButtonLink>
          </div>

          <p className="mt-5 text-sm font-medium leading-7 text-slate-600">
            Campaigns launch fast. Creators apply quickly. Political content moves with more
            control.
          </p>
        </div>

        <div className="mt-16 lg:mt-20">
          <HeroMarketplacePreview />
        </div>

        <div className="mt-10 text-center">
          <p className="text-[0.72rem] font-bold tracking-[0.28em] text-[#0b4bb8] uppercase">
            Built for modern political operators
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {buyerSignals.map((signal) => (
              <span
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                key={signal}
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-[#f5f8fd]">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {marketplaceStats.map((stat) => (
              <div className="text-center xl:text-left" key={stat.label}>
                <p className="display-font text-[3.2rem] leading-none text-slate-950 sm:text-[3.65rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold tracking-[-0.01em] text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28" id="how-it-works">
        <SectionIntro
          description="The workflow is intentionally simple: campaign teams launch message campaigns, the platform helps match aligned creators, and political content moves into review and payment with less operational drag."
          eyebrow="Simple and effective"
          title="How it works"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {workflowSteps.map((step) => (
            <SurfaceCard className="h-full p-8 sm:p-10" key={step.step}>
              <div className="space-y-6">
                <p className="display-font text-[4.2rem] leading-none text-[#c9d4e7]">
                  {step.step}
                </p>
                <div className="space-y-4">
                  <h3 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-slate-950">
                    {step.title}
                  </h3>
                  <p className="text-base leading-8 text-slate-700">{step.description}</p>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-[#f5f8fd]">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <SectionIntro
            description="PolitiViral is meant to replace the patchwork of DMs, spreadsheets, and ad hoc creator ops with a marketplace product serious enough for modern campaign teams."
            eyebrow="Why PolitiViral"
            title="Built to replace the busywork"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {platformBenefits.map((benefit) => (
              <SurfaceCard className="h-full p-8 sm:p-9" key={benefit.title}>
                <div className="space-y-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-sm font-bold text-[#0b4bb8]">
                    {benefit.badge}
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-[1.85rem] font-semibold tracking-[-0.04em] text-slate-950">
                      {benefit.title}
                    </h3>
                    <p className="text-base leading-8 text-slate-700">{benefit.description}</p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <SectionIntro
          description="The marketplace needs to work for both sides at once: campaigns need real control and creator visibility, while creators need a legitimate path to selection and paid political work."
          eyebrow="Two-sided marketplace"
          title="Built for political buyers and political creators"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {audienceCards.map((card, index) => (
            <SurfaceCard className="h-full p-8 sm:p-10" key={card.title} variant={index === 0 ? "default" : "tint"}>
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <span className="eyebrow-pill">{card.eyebrow}</span>
                  <div className="space-y-4">
                    <h3 className="display-font text-[2.6rem] leading-[0.94] text-slate-950 sm:text-[3.15rem]">
                      {card.title}
                    </h3>
                    <p className="text-base leading-8 text-slate-700">{card.description}</p>
                  </div>
                  <ul className="grid gap-3">
                    {card.points.map((point) => (
                      <li
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700"
                        key={point}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <ButtonLink href={card.href} size="lg" variant={index === 0 ? "primary" : "secondary"}>
                  {card.action}
                </ButtonLink>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-[#f5f8fd]">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <SectionIntro
            description="The product surface needs to feel like a serious marketplace platform: creator discovery, briefs, reviews, and payments arranged in one clean operating layer."
            eyebrow="Platform"
            title="Everything you need to run message-driven creator campaigns"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {productModules.map((module) => (
              <SurfaceCard className="overflow-hidden p-5 sm:p-6" key={module.title}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{module.title}</p>
                    <p className="mt-2 max-w-sm text-sm leading-7 text-slate-700">{module.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-[#f7fbff] px-3 py-1 text-xs font-semibold text-slate-700">
                    {module.metric}
                  </span>
                </div>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#fbfdff] p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                      <div className="h-2.5 w-16 rounded-full bg-slate-100" />
                    </div>
                    <div className="rounded-full bg-[#0b4bb8] px-3 py-1 text-[0.7rem] font-semibold text-white">
                      Live
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {module.tags.map((tag) => (
                      <span
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="h-10 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]" />
                    <div className="h-10 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]" />
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {platformFeatureCards.map((card) => (
              <SurfaceCard className="h-full p-8" key={card.title}>
                <div className="space-y-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-sm font-bold text-[#0b4bb8]">
                    +
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-[1.85rem] font-semibold tracking-[-0.04em] text-slate-950">
                      {card.title}
                    </h3>
                    <p className="text-base leading-8 text-slate-700">{card.description}</p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <SectionIntro
          description="Political attention does not live in one channel, and neither should the creator marketplace. The strongest campaigns activate different creator types across the platforms where audiences actually spend time."
          eyebrow="Creator ecosystem"
          title="Find creators in the channels where political attention moves"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-12" id="use-cases">
          {creatorChannels.map((channel, index) => (
            <div
              className={index < 2 ? "xl:col-span-6" : "xl:col-span-4"}
              key={channel.platform}
            >
              <CreatorChannelTile {...channel} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-[#f5f8fd]">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <SectionIntro
            description="PolitiViral is designed for the kinds of political creator campaigns serious teams actually need to run, from candidate persuasion to issue education and rapid-response narrative work."
            eyebrow="Featured use cases"
            title="Message categories and campaign types built for political media"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {useCases.map((useCase) => (
              <SurfaceCard className="h-full p-8 sm:p-9" key={useCase.title}>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className="eyebrow-pill">{useCase.label}</span>
                    <h3 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-950">
                      {useCase.title}
                    </h3>
                    <p className="text-base leading-8 text-slate-700">{useCase.description}</p>
                  </div>

                  <div className="grid gap-3">
                    {useCase.points.map((point) => (
                      <div
                        className="rounded-2xl border border-slate-200 bg-[#fbfdff] px-4 py-3 text-sm font-medium text-slate-700"
                        key={point}
                      >
                        {point}
                      </div>
                    ))}
                  </div>

                  <Link className="text-sm font-semibold text-[#0b4bb8]" href="/signup">
                    Launch this type of campaign
                  </Link>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <SectionIntro
          description="The first questions are the structural ones: who the marketplace is for, what kind of work runs here, and whether creators can really move into paid political campaigns."
          eyebrow="FAQ"
          title="Questions political teams and creators will ask first"
        />

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqItems.map((item) => (
            <details
              className="group rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              key={item.question}
            >
              <summary className="cursor-pointer list-none text-left text-[1.1rem] font-semibold tracking-[-0.02em] text-slate-950">
                {item.question}
              </summary>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-[#f5f8fd]">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <SurfaceCard className="px-6 py-12 text-center sm:px-10 sm:py-14">
            <div className="mx-auto max-w-4xl">
              <span className="eyebrow-pill">Final call</span>
              <h2 className="mt-5 display-font text-[3rem] leading-[0.92] text-slate-950 sm:text-[4.2rem]">
                A premium political creator marketplace for campaigns that need reach and creators who move audiences
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-slate-700">
                Launch message campaigns through trusted creators, activate authentic
                political influence at scale, and give creators a serious platform to join,
                get selected, and get paid.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink href="/signup" size="lg">
                  Start a Campaign
                </ButtonLink>
                <ButtonLink href="/for-creators" size="lg" variant="secondary">
                  Join as a Creator
                </ButtonLink>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </div>
  );
}
