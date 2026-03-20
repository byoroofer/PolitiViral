import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/utils";

type SurfaceCardVariant = "default" | "tint" | "outline" | "dark";
type SurfaceCardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: SurfaceCardVariant;
};

const variantStyles: Record<SurfaceCardVariant, string> = {
  default:
    "border border-[#e7e9f0] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.04)]",
  tint:
    "border border-[#e7e9f0] bg-[#f7f8fc] shadow-[0_12px_32px_rgba(15,23,42,0.04)]",
  outline:
    "border border-[#e7e9f0] bg-white/72 shadow-[0_1px_2px_rgba(15,23,42,0.02)]",
  dark:
    "border border-slate-900 bg-slate-950 text-white shadow-[0_24px_60px_rgba(2,6,23,0.18)]",
};

export function SurfaceCard({
  className,
  variant = "default",
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cx("relative isolate rounded-[32px]", variantStyles[variant], className)}
      {...props}
    />
  );
}
