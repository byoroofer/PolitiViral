import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/utils";

type SurfaceCardVariant = "default" | "tint" | "outline" | "dark";
type SurfaceCardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: SurfaceCardVariant;
};

const variantStyles: Record<SurfaceCardVariant, string> = {
  default:
    "border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,249,255,0.9))] shadow-[0_28px_80px_rgba(8,16,40,0.1)]",
  tint:
    "border border-blue-100/80 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_30%),linear-gradient(180deg,rgba(239,246,255,0.96),rgba(255,255,255,0.92))] shadow-[0_28px_80px_rgba(8,16,40,0.1)]",
  outline:
    "border border-slate-200/72 bg-white/68 shadow-[0_20px_60px_rgba(8,16,40,0.06)]",
  dark:
    "border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.2),transparent_30%),linear-gradient(180deg,#0b1736_0%,#081226_100%)] text-white shadow-[0_36px_100px_rgba(2,6,23,0.42)]",
};

export function SurfaceCard({
  className,
  variant = "default",
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cx(
        "relative isolate overflow-hidden rounded-[30px] backdrop-blur-xl",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
