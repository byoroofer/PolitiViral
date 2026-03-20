import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full border font-semibold tracking-[-0.01em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-slate-950 bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] hover:border-slate-800 hover:bg-slate-800",
  secondary:
    "border-slate-200 bg-white text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:bg-slate-50",
  ghost:
    "border-transparent bg-transparent text-slate-600 hover:text-slate-950",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "min-h-[44px] px-5 text-sm",
  lg: "min-h-[50px] px-6 text-sm sm:px-7",
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
