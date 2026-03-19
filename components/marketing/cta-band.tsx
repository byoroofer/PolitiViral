import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

type CtaBandProps = {
  actionHref: string;
  actionLabel: string;
  description: string;
  eyebrow: string;
  title: string;
};

export function CtaBand({
  actionHref,
  actionLabel,
  description,
  eyebrow,
  title,
}: CtaBandProps) {
  return (
    <SurfaceCard className="overflow-hidden px-8 py-9 sm:px-10 sm:py-10" variant="dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_24%),radial-gradient(circle_at_left,rgba(37,99,235,0.36),transparent_34%)]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[0.72rem] font-black tracking-[0.18em] text-blue-100 uppercase">
            {eyebrow}
          </span>
          <div className="space-y-4">
            <h2 className="display-font text-4xl leading-[0.98] text-white sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-blue-50/84">{description}</p>
          </div>
        </div>
        <ButtonLink
          className="border-white/20 bg-white text-slate-950 hover:border-white"
          href={actionHref}
          size="lg"
          variant="secondary"
        >
          {actionLabel}
        </ButtonLink>
      </div>
    </SurfaceCard>
  );
}
