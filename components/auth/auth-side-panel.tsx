import { SurfaceCard } from "@/components/ui/surface-card";

type AuthPanelItem = {
  copy: string;
  label: string;
};

type AuthSidePanelProps = {
  badge: string;
  description: string;
  items: AuthPanelItem[];
  title: string;
};

export function AuthSidePanel({
  badge,
  description,
  items,
  title,
}: AuthSidePanelProps) {
  return (
    <SurfaceCard className="hidden h-full p-10 lg:block" variant="dark">
      <div className="space-y-8">
        <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[0.72rem] font-black tracking-[0.18em] text-blue-100 uppercase">
          {badge}
        </span>

        <div className="space-y-4">
          <h2 className="display-font text-5xl leading-[0.96] text-white xl:text-6xl">{title}</h2>
          <p className="max-w-xl text-base leading-8 text-blue-50/82">{description}</p>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <div
              className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4"
              key={item.label}
            >
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-7 text-blue-50/84">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
}
