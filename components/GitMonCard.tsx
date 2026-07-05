"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { GitMonCard as GitMonCardType } from "@/types/card";
import { RARITY_EFFECTS } from "@/lib/rarityEffects";
import { LAYOUT_VARIANTS } from "@/lib/layoutVariants";
import { getCardBackground } from "@/lib/cardBackground";
import CardAvatar from "./CardAvatar";
import StatDisplay from "./StatDisplay";
import NameDivider from "./NameDivider";
import CardFooter from "./CardFooter";
import ClassBadge from "./ClassBadge";
import PaperNoise from "./texture/PaperNoise";
import CircuitPattern from "./texture/CircuitPattern";
import StarField from "./texture/StarField";
import CommonFrame from "./frames/CommonFrame";
import RareFrame from "./frames/RareFrame";
import EpicFrame from "./frames/EpicFrame";
import LegendaryFrame from "./frames/LegendaryFrame";
import MythicFrame from "./frames/MythicFrame";

function CardTexture({ type }: { type: string }) {
  if (type === "paper") return <PaperNoise />;
  if (type === "circuit") return <CircuitPattern />;
  if (type === "cosmic") return <StarField />;
  return null;
}

function RarityFrame({ rarity }: { rarity: string }) {
  if (rarity === "Common") return <CommonFrame />;
  if (rarity === "Rare") return <RareFrame />;
  if (rarity === "Epic") return <EpicFrame />;
  if (rarity === "Legendary") return <LegendaryFrame />;
  if (rarity === "Mythic") return <MythicFrame />;
  return null;
}

export default function GitMonCard({
  card,
  avatarUrl,
  avatarLayoutId,
}: {
  card: GitMonCardType;
  avatarUrl: string;
  avatarLayoutId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 250,
    damping: 25,
  });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovering(false);
  }

  const effect = RARITY_EFFECTS[card.rarity] ?? RARITY_EFFECTS.Common;
  const layout = LAYOUT_VARIANTS[card.template_id % LAYOUT_VARIANTS.length];
  const backgroundUrl = getCardBackground(card.rarity, card.template_id);

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`relative w-80 rounded-2xl ${effect.borderClass} ${effect.cardBackground} p-5 overflow-hidden select-none cursor-pointer`}
      >
        <CardTexture type={effect.textureType} />
        <RarityFrame rarity={card.rarity} />

        {/* Scrim de legibilidade sobre a arte de fundo */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-black/35 to-black/55" />

        {/* Glare que segue o mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: hovering ? 0.25 : 0,
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8), transparent 55%)`,
            transition: "opacity 0.2s",
          }}
        />

        <div className="relative z-20">
          {/* Cabeçalho: raridade, nome, divisor, level */}
          <div
            className={`mb-1 ${
              layout.headerAlign === "center"
                ? "text-center"
                : "flex justify-between items-start"
            }`}
          >
            <div
              className={
                layout.headerAlign === "center"
                  ? "flex flex-col items-center"
                  : ""
              }
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-widest ${effect.titleFont} ${effect.label}`}
              >
                {card.rarity} Dev
              </p>
              <h2
                className={`text-3xl font-black ${effect.frameClass} ${
                  effect.titleFont
                } name-glow-${card.rarity.toLowerCase()}`}
              >
                {card.username}
              </h2>
              <NameDivider rarity={card.rarity} />
            </div>
            {layout.headerAlign === "left" && (
              <span
                className={`text-sm font-gamified px-2 py-1 rounded-lg bg-black/25 ${effect.frameClass}`}
              >
                Lv.{card.level}
              </span>
            )}
          </div>

          {/* Badge de classe, sempre centralizado */}
          <div className="mb-3 flex justify-center">
            <ClassBadge cardClass={card.card_class} />
          </div>

          {/* Avatar */}
          <div className="mb-4">
            <CardAvatar
              shape={layout.avatarShape}
              avatarUrl={avatarUrl}
              rarity={card.rarity}
              layoutId={avatarLayoutId}
            />
            {layout.headerAlign === "center" && (
              <p
                className={`text-center text-sm mt-1 font-gamified ${effect.frameClass}`}
              >
                Lv.{card.level}
              </p>
            )}
          </div>

          {/* Painel de stats */}
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 space-y-1.5 mb-3">
            <StatDisplay label="ATK" value={card.attack} style={layout.statStyle} textClass={effect.frameClass} />
            <StatDisplay label="DEF" value={card.defense} style={layout.statStyle} textClass={effect.frameClass} />
            <StatDisplay label="MAG" value={card.magic} style={layout.statStyle} textClass={effect.frameClass} />
            <StatDisplay label="SPD" value={card.speed} style={layout.statStyle} textClass={effect.frameClass} />
            <StatDisplay label="INT" value={card.intelligence} style={layout.statStyle} textClass={effect.frameClass} />
            <StatDisplay label="HP" value={card.hp} style={layout.statStyle} textClass={effect.frameClass} />
            <StatDisplay label="LUCK" value={card.luck} style={layout.statStyle} textClass={effect.frameClass} />
          </div>

          {/* Linguagens */}
          <div className="flex flex-wrap gap-1 mb-3">
            {card.top_languages.map((lang) => (
              <span
                key={lang}
                className={`text-[10px] px-2 py-0.5 rounded-full bg-black/25 border border-white/10 ${effect.frameClass}`}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Rodapé TCG: CR, W/L, streak, serial, estrelas */}
          <CardFooter
            username={card.username}
            rarity={card.rarity}
            codeRank={card.code_rank}
            wins={card.wins}
            losses={card.losses}
            winStreak={card.win_streak}
            textClass={effect.frameClass}
          />
        </div>
      </motion.div>
    </div>
  );
}