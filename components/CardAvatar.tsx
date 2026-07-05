"use client";

import { motion } from "framer-motion";

const RARITY_RING: Record<string, string> = {
  Common: "ring-4 ring-amber-900/50",
  Rare: "ring-4 ring-pink-400/70 shadow-[0_0_20px_rgba(244,114,182,0.6)]",
  Epic: "ring-4 ring-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.6)]",
  Legendary: "ring-4 ring-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.6)]",
  Mythic: "ring-4 ring-fuchsia-400/80 shadow-[0_0_30px_rgba(217,70,239,0.7)]",
};

export default function CardAvatar({
  shape,
  avatarUrl,
  rarity,
  layoutId,
}: {
  shape: "circle" | "hexagon" | "square";
  avatarUrl: string;
  rarity: string;
  layoutId?: string;
}) {
  const ring = RARITY_RING[rarity] ?? RARITY_RING.Common;

  if (shape === "hexagon") {
    return (
      <motion.div
        layoutId={layoutId}
        className={`w-24 h-24 mx-auto bg-cover bg-center ${ring}`}
        style={{
          backgroundImage: `url(${avatarUrl})`,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
    );
  }

  if (shape === "square") {
    return (
      <motion.div
        layoutId={layoutId}
        className={`w-24 h-24 mx-auto rounded-xl bg-cover bg-center ${ring}`}
        style={{ backgroundImage: `url(${avatarUrl})` }}
      />
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={`w-24 h-24 mx-auto rounded-full bg-cover bg-center ${ring}`}
      style={{ backgroundImage: `url(${avatarUrl})` }}
    />
  );
}
