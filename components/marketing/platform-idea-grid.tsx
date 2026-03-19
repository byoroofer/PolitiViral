import { SurfaceCard } from "@/components/ui/surface-card";

export type PlatformIdea = {
  description: string;
  formatIdeas: string[];
  headline: string;
  platform: string;
};

type PlatformIdeaGridProps = {
  items: PlatformIdea[];
};

export function PlatformIdeaGrid({ items }: PlatformIdeaGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item, index) => (
        <SurfaceCard
          className="h-full p-6"
          key={item.platform}
          variant={index % 2 === 0 ? "tint" : "default"}
        >
          <div className="space-y-5">
            <span className="eyebrow-pill">{item.platform}</span>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {item.headline}
              </h3>
              <p className="text-sm leading-7 text-slate-600">{item.description}</p>
            </div>

            <ul className="grid gap-3">
              {item.formatIdeas.map((format) => (
                <li
                  className="rounded-2xl border border-slate-200/75 bg-white/72 px-4 py-3 text-sm font-medium leading-6 text-slate-700"
                  key={format}
                >
                  {format}
                </li>
              ))}
            </ul>
          </div>
        </SurfaceCard>
      ))}
    </div>
  );
}
