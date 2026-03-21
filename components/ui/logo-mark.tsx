import { useId } from "react";

import { cx } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  kind?: "lockup" | "mark";
};

export function LogoMark({ className, kind = "mark" }: LogoMarkProps) {
  const iconGradientId = useId().replace(/:/g, "");
  const textGradientId = useId().replace(/:/g, "");
  const sweepGradientId = useId().replace(/:/g, "");

  if (kind === "lockup") {
    return (
      <svg
        aria-label="PolitiViral"
        className={cx("h-14 w-auto", className)}
        fill="none"
        viewBox="0 0 980 250"
      >
        <defs>
          <linearGradient id={iconGradientId} x1="70" x2="240" y1="28" y2="210">
            <stop offset="0" stopColor="#0a42b9" />
            <stop offset="0.44" stopColor="#1473eb" />
            <stop offset="1" stopColor="#42c3ff" />
          </linearGradient>
          <linearGradient id={textGradientId} x1="390" x2="390" y1="64" y2="184">
            <stop offset="0" stopColor="#57d0ff" />
            <stop offset="0.48" stopColor="#1992ff" />
            <stop offset="1" stopColor="#0a42b9" />
          </linearGradient>
          <linearGradient id={sweepGradientId} x1="250" x2="760" y1="178" y2="230">
            <stop offset="0" stopColor="#1aa5ff" />
            <stop offset="0.62" stopColor="#5fd1ff" />
            <stop offset="1" stopColor="#1495ff" />
          </linearGradient>
        </defs>

        <LogoSymbolShape iconGradientId={iconGradientId} x={36} y={20} />

        <text
          fill={`url(#${textGradientId})`}
          fontFamily="'Avenir Next', 'SF Pro Display', Inter, Arial, sans-serif"
          fontSize="130"
          fontWeight="900"
          letterSpacing="-7"
          x="292"
          y="152"
        >
          PolitiViral
        </text>

        <path
          d="M255 186C360 167 494 164 653 177C739 184 811 184 870 176"
          stroke={`url(#${sweepGradientId})`}
          strokeLinecap="round"
          strokeWidth="9"
        />
        <path
          d="M320 216C414 185 524 179 650 191"
          stroke={`url(#${sweepGradientId})`}
          strokeLinecap="round"
          strokeWidth="6"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-label="PolitiViral"
      className={cx("h-10 w-10 shrink-0", className)}
      fill="none"
      viewBox="0 0 250 250"
    >
      <defs>
        <linearGradient id={iconGradientId} x1="56" x2="214" y1="24" y2="214">
          <stop offset="0" stopColor="#0a42b9" />
          <stop offset="0.42" stopColor="#1473eb" />
          <stop offset="1" stopColor="#42c3ff" />
        </linearGradient>
      </defs>
      <LogoSymbolShape iconGradientId={iconGradientId} x={22} y={16} />
    </svg>
  );
}

type LogoSymbolShapeProps = {
  iconGradientId: string;
  x: number;
  y: number;
};

function LogoSymbolShape({ iconGradientId, x, y }: LogoSymbolShapeProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M36 0C50 0 64 3.4 76.3 9.9L140.2 44.4C163.3 56.9 173 84.2 163.8 108.7C159.2 120.7 151.1 131 140.5 138.4L87.3 175.8C70.6 187.5 47.7 188.5 30.1 178.4C12.6 168.2 1.8 149.5 1.8 129.2V35.8C1.8 15.8 18 0 36 0Z"
        fill={`url(#${iconGradientId})`}
      />
      <path
        d="M31.8 112.6C56.8 98 89 90.4 128.4 90.1C120.8 117.1 103.9 141.6 77.2 167.1L16.7 164.4L31.8 112.6Z"
        fill="#0a42b9"
        opacity="0.62"
      />
      <path
        d="M39 94.8L92.1 95.5C115 95.8 131.7 85.9 142.5 65.8C135.1 86.9 119.8 103.4 96.4 115.4L40.4 141L39 94.8Z"
        fill="#62d4ff"
      />
      <path
        d="M45.4 74.3L112.3 74.9L63.3 109.2L45.4 122V74.3Z"
        fill="#081223"
      />
      <path
        d="M57.8 81.1L104.1 81.4L69.9 105.6L57.8 114.1V81.1Z"
        fill="white"
      />
      <path
        d="M29.6 35.8L35.1 46.8L47.5 48.6L38.5 57.2L40.7 69.4L29.6 63.5L18.5 69.4L20.6 57.2L11.7 48.6L24.1 46.8L29.6 35.8Z"
        fill="white"
      />
      <path
        d="M65.6 43.2L70.2 52.5L80.7 54L73.1 61.4L74.9 71.7L65.6 66.8L56.3 71.7L58.1 61.4L50.5 54L61 52.5L65.6 43.2Z"
        fill="white"
      />
      <path
        d="M101.8 52L106.4 61.3L116.8 62.8L109.2 70.2L111 80.4L101.8 75.6L92.5 80.4L94.3 70.2L86.7 62.8L97.2 61.3L101.8 52Z"
        fill="#081223"
      />
    </g>
  );
}
