import { cx } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cx(
        "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] border border-white/70 bg-[linear-gradient(180deg,#2457d5_0%,#1f4ec9_48%,#0ea5e9_100%)] text-[0.78rem] font-black tracking-[0.24em] text-white shadow-[0_20px_50px_rgba(29,78,216,0.34)]",
        className,
      )}
    >
      <span className="absolute inset-[1px] rounded-[16px] border border-white/18" />
      <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/18 blur-md" />
      <span className="relative">PV</span>
    </span>
  );
}
