import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full border font-semibold tracking-[-0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-[#0b4bb8] bg-[#0b4bb8] text-white shadow-[0_16px_34px_rgba(11,75,184,0.18)] hover:border-[#093e98] hover:bg-[#093e98] active:translate-y-px",
  secondary:
    "border-slate-300 bg-white text-slate-950 shadow-[0_10px_26px_rgba(15,23,42,0.05)] hover:border-[#bfd4ff] hover:bg-[#f7fbff] hover:text-[#093e98] active:translate-y-px",
  ghost:
    "border-transparent bg-transparent text-slate-800 hover:border-[#d7e5ff] hover:bg-[#eef5ff] hover:text-[#0b4bb8]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "min-h-[46px] px-5 text-sm",
  lg: "min-h-[52px] px-6 text-[0.95rem] sm:px-7",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  href,
  size = "md",
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link className={cx(baseStyles, variantStyles[variant], sizeStyles[size], className)} href={href}>
      {children}
    </Link>
  );
}
