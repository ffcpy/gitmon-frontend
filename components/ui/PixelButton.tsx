"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger" | "success" | "muted";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "pixel-btn-primary",
  ghost: "pixel-btn-ghost",
  danger: "pixel-btn-danger",
  success: "pixel-btn-success",
  muted: "pixel-btn-muted",
};

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
};

export default function PixelButton(props: ButtonProps | LinkProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `pixel-btn ${VARIANT_CLASS[variant]} px-6 py-3 font-terminal font-bold ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, href: _h, external: _e, className: _c, ...rest } =
    props as ButtonProps & { href?: string; external?: boolean };

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}