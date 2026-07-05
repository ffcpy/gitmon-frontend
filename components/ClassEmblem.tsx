import type * as React from "react";

function SwordIcon() {
  return (
    <path d="M13 2 L14 3 L6 11 L8 13 L16 5 L17 6 L17 3 Q17 2 16 2 Z M5 12 L4 13 L6 15 L3 18 L4 19 L7 16 L9 18 L10 17 Z" />
  );
}

function ShieldIcon() {
  return <path d="M10 2 L17 5 V10 Q17 15 10 18 Q3 15 3 10 V5 Z M10 4.2 L5 6.3 V10 Q5 13.6 10 15.8 Q15 13.6 15 10 V6.3 Z" />;
}

function WandIcon() {
  return (
    <path d="M15 2 L18 5 L7 16 L4 17 L3 16 L4 13 Z M16 8 L17 9 M12 3 L13 4 M18 12 L19 13 Q19.5 11 18 10 Q19.5 9.5 19 8 Q17.5 8.5 17 10 Q15.5 10.5 16 12 Z" />
  );
}

function GearIcon() {
  return (
    <path d="M10 2 L11 4.5 Q12 4.7 13 5.2 L15.5 4 L17 5.5 L15.8 8 Q16.3 9 16.5 10 L19 11 V13 L16.5 14 Q16.3 15 15.8 16 L17 18.5 L15.5 20 L13 18.8 Q12 19.3 11 19.5 L10 22 H8 L7 19.5 Q6 19.3 5 18.8 L2.5 20 L1 18.5 L2.2 16 Q1.7 15 1.5 14 L-1 13 V11 L1.5 10 Q1.7 9 2.2 8 L1 5.5 L2.5 4 L5 5.2 Q6 4.7 7 4.5 Z M9 9 A3 3 0 1 0 9 15 A3 3 0 1 0 9 9 Z" />
  );
}

function StarIcon() {
  return <path d="M10 1 L12.5 7 L19 7.5 L14 11.8 L15.5 18.5 L10 15 L4.5 18.5 L6 11.8 L1 7.5 L7.5 7 Z" />;
}

function OrbIcon() {
  return (
    <path d="M10 2 A8 8 0 1 0 10 18 A8 8 0 1 0 10 2 Z M10 4 A6 6 0 0 1 15.5 8 Q13 6.5 10 6.5 Q7 6.5 4.5 8 A6 6 0 0 1 10 4 Z" />
  );
}

function HammerIcon() {
  return <path d="M3 6 L8 2 L13 4 L14 6 L11 8 L9 7 L4 12 L2 10 Z M10 9 L18 17 L16 19 L8 11 Z" />;
}

const CLASS_ICONS: Record<string, () => React.JSX.Element> = {
  "Full Stack Knight": SwordIcon,
  "Backend Guardian": ShieldIcon,
  "Frontend Mage": WandIcon,
  "DevOps Titan": GearIcon,
  "Open Source Hero": StarIcon,
  "Data Wizard": OrbIcon,
  Builder: HammerIcon,
};

export default function ClassEmblem({
  cardClass,
  className = "",
}: {
  cardClass: string;
  className?: string;
}) {
  const Icon = CLASS_ICONS[cardClass] ?? HammerIcon;
  return (
    <svg viewBox="0 0 20 22" className={`w-3.5 h-3.5 inline-block ${className}`} fill="currentColor">
      <Icon />
    </svg>
  );
}