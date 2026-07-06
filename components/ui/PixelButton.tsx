"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, MouseEvent, ReactNode, useState } from "react";

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

function useClickPulse() {
  const [clicked, setClicked] = useState(false);

  function trigger() {
    setClicked(false);
    requestAnimationFrame(() => setClicked(true));
    window.setTimeout(() => setClicked(false), 280);
  }

  return { clicked, trigger };
}

export default function PixelButton(props: ButtonProps | LinkProps) {
  const { variant = "primary", children, className = "" } = props;
  const { clicked, trigger } = useClickPulse();

  const classes = `pixel-btn ${VARIANT_CLASS[variant]} px-6 py-3 font-terminal font-bold ${
    clicked ? "pixel-btn-clicked" : ""
  } ${className}`;

  if ("href" in props && props.href) {
    const handleClick = () => trigger();
    if (props.external) {
      return (
        <a href={props.href} className={classes} onClick={handleClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  const { variant: _v, href: _h, external: _e, className: _c, onClick, ...rest } =
    props as ButtonProps & { href?: string; external?: boolean };

  function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
    trigger();
    onClick?.(e);
  }

  return (
    <button className={classes} onClick={handleButtonClick} {...rest}>
      {children}
    </button>
  );
}