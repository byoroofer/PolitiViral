import { cx } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cx(
        "flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-700 via-blue-600 to-sky-400 text-sm font-semibold tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)]",
        className,
      )}
    >
      PV
    </span>
  );
}
