import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

type OnboardingSidePanelProps = {
  actionHref: string;
  actionLabel: string;
  badge: string;
  description: string;
  points: string[];
  title: string;
};

export function OnboardingSidePanel({
  actionHref,
  actionLabel,
  badge,
  description,
  points,
  title,
}: OnboardingSidePanelProps) {
  return (
    <SurfaceCard className="h-fit p-7 lg:sticky lg:top-24" variant="tint">
      <div className="space-y-6">
        <span className="eyebrow-pill">{badge}</span>
        <div className="space-y-3">
          <h2 className="display-font text-3xl leading-[0.98] text-slate-950">{title}</h2>
          <p className="text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <ul className="grid gap-3">
          {points.map((point) => (
            <li
              className="rounded-2xl border border-white/80 bg-white/72 px-4 py-3 text-sm leading-7 text-slate-600"
              key={point}
            >
              {point}
            </li>
          ))}
        </ul>
        <ButtonLink href={actionHref} variant="secondary">
          {actionLabel}
        </ButtonLink>
      </div>
    </SurfaceCard>
  );
}
