import { cx } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cx(
        "flex h-10 w-10 items-center justify-center rounded-[14px] bg-slate-950 text-sm font-black tracking-[-0.05em] text-white",
        className,
      )}
    >
      PV
    </span>
  );
}
