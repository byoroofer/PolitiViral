import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

type HeroAction = {
  href: string;
  label: string;
};

type HeroStat = {
  label: string;
  value: string;
};

type PageHeroProps = {
  badge: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  stats: HeroStat[];
  title: string;
};

export function PageHero({
  badge,
  description,
  primaryAction,
  secondaryAction,
  stats,
  title,
}: PageHeroProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_380px] xl:items-start">
      <SurfaceCard className="overflow-hidden p-8 sm:p-10 lg:p-12" variant="tint">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_right,rgba(14,165,233,0.1),transparent_28%)]" />
        <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative space-y-10">
          <span className="eyebrow-pill">{badge}</span>

          <div className="space-y-6">
            <h1 className="display-font max-w-4xl text-5xl leading-[0.96] text-slate-950 sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryAction.href} size="lg">
              {primaryAction.label}
            </ButtonLink>
            {secondaryAction ? (
              <ButtonLink href={secondaryAction.href} size="lg" variant="secondary">
                {secondaryAction.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-4">
        {stats.map((stat, index) => (
          <SurfaceCard
            className="p-6 sm:p-7"
            key={stat.label}
            variant={index === 0 ? "tint" : "default"}
          >
            <div className="space-y-3">
              <p className="text-[0.72rem] font-black tracking-[0.18em] text-slate-500 uppercase">
                {stat.label}
              </p>
              <p className="text-lg font-semibold leading-7 text-slate-950">{stat.value}</p>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
