import { SurfaceCard } from "@/components/ui/surface-card";

type FeatureCardProps = {
  description: string;
  kicker: string;
  title: string;
};

export function FeatureCard({ description, kicker, title }: FeatureCardProps) {
  return (
    <SurfaceCard className="h-full p-6 sm:p-7" variant="default">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow-pill">{kicker}</span>
          <span className="text-sm font-semibold text-blue-700">Built for v1</span>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
          <p className="text-sm leading-7 text-slate-600 sm:text-[0.96rem]">{description}</p>
        </div>
      </div>
    </SurfaceCard>
  );
}
