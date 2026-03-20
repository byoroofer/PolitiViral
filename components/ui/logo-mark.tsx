import { useId } from "react";

import { cx } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  kind?: "lockup" | "mark";
};

export function LogoMark({ className, kind = "mark" }: LogoMarkProps) {
  const iconGradientId = useId().replace(/:/g, "");
  const sweepGradientId = useId().replace(/:/g, "");
  const underlineGradientId = useId().replace(/:/g, "");

  if (kind === "lockup") {
    return (
      <span
        aria-label="PolitiViral"
        className={cx("inline-flex items-center gap-3 text-slate-950", className)}
      >
        <LogoSymbol
          className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
          iconGradientId={iconGradientId}
          sweepGradientId={sweepGradientId}
        />
        <span className="relative flex min-w-0 flex-col">
          <span className="bg-gradient-to-r from-[#0b4bb8] via-[#1663d7] to-[#38a7ff] bg-clip-text text-[1.58rem] font-black tracking-[-0.08em] text-transparent sm:text-[1.76rem]">
            PolitiViral
          </span>
          <svg
            aria-hidden="true"
            className="-mt-1 h-4 w-[12.5rem] max-w-full"
            fill="none"
            viewBox="0 0 208 20"
          >
            <defs>
              <linearGradient id={underlineGradientId} x1="0" x2="208" y1="0" y2="0">
                <stop offset="0" stopColor="#1c7fff" />
                <stop offset="1" stopColor="#63c6ff" />
              </linearGradient>
            </defs>
            <path
              d="M7 13.5C52.2 6.3 99.6 6 149 12.6C169.8 15.3 187.2 15 201 13"
              stroke={`url(#${underlineGradientId})`}
              strokeLinecap="round"
              strokeWidth="3.2"
            />
            <path
              d="M25 18.2C50.6 9.9 81.8 7.8 118.6 11.8"
              opacity="0.88"
              stroke={`url(#${underlineGradientId})`}
              strokeLinecap="round"
              strokeWidth="2.3"
            />
          </svg>
        </span>
      </span>
    );
  }

  return (
    <LogoSymbol
      className={className}
      iconGradientId={iconGradientId}
      sweepGradientId={sweepGradientId}
    />
  );
}

type LogoSymbolProps = {
  className?: string;
  iconGradientId: string;
  sweepGradientId: string;
};

function LogoSymbol({
  className,
  iconGradientId,
  sweepGradientId,
}: LogoSymbolProps) {
  return (
    <svg
      aria-hidden="true"
      className={cx("h-10 w-10 shrink-0", className)}
      fill="none"
      viewBox="0 0 72 72"
    >
      <defs>
        <linearGradient id={iconGradientId} x1="7" x2="57" y1="8" y2="57">
          <stop offset="0" stopColor="#0b4bb8" />
          <stop offset="0.56" stopColor="#1663d7" />
          <stop offset="1" stopColor="#37a7ff" />
        </linearGradient>
        <linearGradient id={sweepGradientId} x1="12" x2="58" y1="38" y2="58">
          <stop offset="0" stopColor="#1582ff" />
          <stop offset="1" stopColor="#66c9ff" />
        </linearGradient>
      </defs>

      <path
        d="M22.3 7.5C27.3 7.5 32.1 9 36 11.9L53.3 24.3C59.8 29 59.8 38.8 53.2 43.4L32 56.8C22.9 62.6 11 56 11 45.2V21.5C11 13.8 16.2 7.5 22.3 7.5Z"
        fill={`url(#${iconGradientId})`}
      />
      <path
        d="M23.2 20.4L40.9 31.8L23.2 43.3V20.4Z"
        fill="white"
      />
      <path
        d="M10.7 39.2C20.7 33.9 33.8 32.1 49.8 34.1C44 46.9 33.8 56.9 17.6 58.7C13 55.7 10.7 51.1 10.7 45.4V39.2Z"
        fill={`url(#${sweepGradientId})`}
      />
      <path
        d="M15.2 18.4L17.1 22.2L21.4 22.8L18.3 25.8L19 30L15.2 28L11.4 30L12.1 25.8L9 22.8L13.3 22.2L15.2 18.4Z"
        fill="white"
      />
      <path
        d="M27.7 16.7L29.4 20.2L33.3 20.7L30.5 23.5L31.1 27.3L27.7 25.5L24.2 27.3L24.9 23.5L22.1 20.7L26 20.2L27.7 16.7Z"
        fill="white"
      />
      <path
        d="M40.3 18.4L42.2 22.2L46.5 22.8L43.4 25.8L44.1 30L40.3 28L36.5 30L37.2 25.8L34.1 22.8L38.4 22.2L40.3 18.4Z"
        fill="#071a4f"
      />
    </svg>
  );
}
