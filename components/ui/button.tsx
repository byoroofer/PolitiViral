import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-[18px] border font-semibold tracking-[0.01em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-blue-700 bg-[linear-gradient(180deg,#2563eb_0%,#1d4ed8_100%)] text-white shadow-[0_18px_48px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(37,99,235,0.34)]",
  secondary:
    "border-blue-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,245,249,0.92))] text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_24px_54px_rgba(15,23,42,0.11)]",
  ghost:
    "border-slate-200/80 bg-white/55 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] hover:-translate-y-0.5 hover:border-blue-100 hover:bg-white/85 hover:text-slate-950",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "min-h-[46px] px-5 text-sm",
  lg: "min-h-[52px] px-6 text-sm sm:px-7",
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
