"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GitMonCard as GitMonCardType } from "@/types/card";
import { RARITY_EFFECTS } from "@/lib/rarityEffects";
import { useSound } from "@/lib/useSound";
import GitMonCard from "./GitMonCard";
import ClassEmblem from "./ClassEmblem";
import AmbientParticlesLazy from "./AmbientParticles";

type Stage = "pack" | "tearing" | "rarity" | "class" | "avatar" | "done";

const STAGE_DURATIONS: Record<Exclude<Stage, "done">, number> = {
  pack: 2200,
  tearing: 1100,
  rarity: 1800,
  class: 1500,
  avatar: 1600,
};

const RARITY_GLOW: Record<string, string> = {
  Common: "rgba(251, 191, 36, 0.35)",
  Rare: "rgba(244, 114, 182, 0.5)",
  Epic: "rgba(56, 189, 248, 0.55)",
  Legendary: "rgba(251, 191, 36, 0.65)",
  Mythic: "rgba(217, 70, 239, 0.75)",
};

const RARITY_PARTICLE: Record<string, string> = {
  Common: "#fbbf24",
  Rare: "#f472b6",
  Epic: "#38bdf8",
  Legendary: "#fbbf24",
  Mythic: "#d946ef",
};

/* ============ Subcomponentes visuais ============ */

function FoilPack({ glow }: { glow: string }) {
  return (
    <div
      className="relative w-72 h-[26rem] rounded-xl overflow-hidden"
      style={{ boxShadow: `0 0 80px ${glow}, 0 20px 50px rgba(0,0,0,0.7)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.14) 45%, rgba(251,146,60,0.18) 50%, rgba(245,158,11,0.14) 55%, transparent 70%)",
          backgroundSize: "250% 250%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute top-0 inset-x-0 h-5 bg-zinc-950"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 96% 100%, 92% 55%, 88% 100%, 84% 55%, 80% 100%, 76% 55%, 72% 100%, 68% 55%, 64% 100%, 60% 55%, 56% 100%, 52% 55%, 48% 100%, 44% 55%, 40% 100%, 36% 55%, 32% 100%, 28% 55%, 24% 100%, 20% 55%, 16% 100%, 12% 55%, 8% 100%, 4% 55%, 0 100%)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-5 bg-zinc-950 rotate-180"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 96% 100%, 92% 55%, 88% 100%, 84% 55%, 80% 100%, 76% 55%, 72% 100%, 68% 55%, 64% 100%, 60% 55%, 56% 100%, 52% 55%, 48% 100%, 44% 55%, 40% 100%, 36% 55%, 32% 100%, 28% 55%, 24% 100%, 20% 55%, 16% 100%, 12% 55%, 8% 100%, 4% 55%, 0 100%)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <motion.img
          src="/logo.png"
          alt="GitMon"
          className="w-52 h-52 object-contain drop-shadow-[0_0_35px_rgba(251,146,60,0.7)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ boxShadow: `inset 0 0 70px ${glow}` }}
      />
    </div>
  );
}

function RarityBackdrop({ glow }: { glow: string }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute w-[150vmax] h-[150vmax]"
        style={{
          background: `repeating-conic-gradient(from 0deg, transparent 0deg 12deg, ${glow} 12deg 15deg)`,
          maskImage: "radial-gradient(circle, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 60%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

/* ============ Componente principal ============ */

export default function BoosterReveal({
  card,
  avatarUrl,
  onFinish,
}: {
  card: GitMonCardType;
  avatarUrl: string;
  onFinish?: () => void;
}) {
  const [stage, setStage] = useState<Stage>("pack");
  const [soundOn, setSoundOn] = useState(true);
  const play = useSound(soundOn);

  useEffect(() => {
    if (stage === "done") return;
    const order: Stage[] = ["pack", "tearing", "rarity", "class", "avatar", "done"];
    const next = order[order.indexOf(stage) + 1];
    const timer = setTimeout(
      () => setStage(next),
      STAGE_DURATIONS[stage as Exclude<Stage, "done">]
    );
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === "pack") play("pack-hum", 0.3);
    if (stage === "tearing") play("pack-open", 0.6);
    if (stage === "rarity") play("reveal-stamp", 0.5);
    if (stage === "class") play("reveal-stamp", 0.4);
    if (stage === "avatar") play("reveal-stamp", 0.5);
    if (stage === "done") play("reveal-final", 0.6);
  }, [stage, play]);

  const effect = RARITY_EFFECTS[card.rarity] ?? RARITY_EFFECTS.Common;
  const glow = RARITY_GLOW[card.rarity] ?? RARITY_GLOW.Common;
  const particleColor = RARITY_PARTICLE[card.rarity] ?? RARITY_PARTICLE.Common;
  const isHighRarity = card.rarity === "Legendary" || card.rarity === "Mythic";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background GIF */}
      <img
        src="/gifanimation1.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/80" />

      <AmbientParticlesWrapper stage={stage} color={particleColor} />

      <button
        onClick={() => setSoundOn(!soundOn)}
        className="absolute top-6 left-6 z-30 text-zinc-500 hover:text-amber-300 text-xl transition"
        aria-label="Alternar som"
      >
        {soundOn ? "🔊" : "🔇"}
      </button>
      {stage !== "done" && (
        <button
          onClick={() => setStage("done")}
          className="absolute top-6 right-6 z-30 text-zinc-500 hover:text-amber-300 font-terminal text-lg tracking-wide transition"
        >
          Pular →
        </button>
      )}

      <AnimatePresence mode="wait">
        {stage === "pack" && (
          <motion.div
            key="pack"
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
          >
            <FoilPack glow={glow} />
          </motion.div>
        )}

        {stage === "tearing" && (
          <motion.div key="tearing" className="relative">
            <motion.div
              className="absolute -top-2 left-1/2 w-72 h-16 rounded-t-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border-b-2 border-dashed border-zinc-600"
              initial={{ x: "-50%", y: 0, rotate: 0, opacity: 1 }}
              animate={{ y: -350, rotate: -25, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.3, 0, 0.7, 0.2] }}
            />
            <motion.div
              className="w-72 h-[26rem] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 overflow-hidden"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.92 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ background: `radial-gradient(circle at 50% 15%, white 0%, ${glow} 35%, transparent 70%)` }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 2.8, 3.4] }}
              transition={{ delay: 0.35, duration: 0.75, times: [0, 0.35, 1] }}
            >
              <div
                className="w-72 h-72 rounded-full"
                style={{ background: `radial-gradient(circle, white 0%, ${glow} 40%, transparent 70%)` }}
              />
            </motion.div>
          </motion.div>
        )}

        {stage === "rarity" && (
          <motion.div key="rarity" className="absolute inset-0 flex items-center justify-center">
            <RarityBackdrop glow={glow} />
            <motion.p
              initial={{ scale: 3.2, opacity: 0, filter: "blur(8px)" }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                x: isHighRarity ? [0, -8, 8, -4, 4, 0] : 0,
              }}
              exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 220, damping: 17 }}
              className={`relative z-10 text-7xl font-black font-gamified uppercase tracking-widest ${effect.label}`}
              style={{ textShadow: `0 0 50px ${glow}, 0 0 100px ${glow}` }}
            >
              {card.rarity}
            </motion.p>
          </motion.div>
        )}

        {stage === "class" && (
          <motion.div
            key="class"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 13 }}
              className="w-24 h-24 rounded-full bg-black/60 border-2 border-white/25 flex items-center justify-center"
              style={{ boxShadow: `0 0 50px ${glow}` }}
            >
              <div className="scale-[2.4] text-white">
                <ClassEmblem cardClass={card.card_class} />
              </div>
            </motion.div>
            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 180 }}
              className="text-3xl font-black font-gamified text-white uppercase tracking-wide"
              style={{ textShadow: `0 0 30px ${glow}` }}
            >
              {card.card_class}
            </motion.p>
          </motion.div>
        )}

        {stage === "avatar" && (
          <motion.div
            key="avatar"
            layoutId="hero-avatar"
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 13 }}
            className="w-48 h-48 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${avatarUrl})`,
              boxShadow: `0 0 90px ${glow}, 0 0 0 6px rgba(255,255,255,0.15)`,
            }}
          />
        )}

        {stage === "done" && (
          <motion.div
            key="done"
            initial={{ scale: 0.82, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 17 }}
            className="flex flex-col items-center gap-6"
          >
            <GitMonCard card={card} avatarUrl={avatarUrl} avatarLayoutId="hero-avatar" />
            {onFinish && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={onFinish}
                className="pixel-btn pixel-btn-primary px-8 py-3 font-terminal font-bold"
              >
                Ver meu card
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AmbientParticlesWrapper({ stage, color }: { stage: Stage; color: string }) {
  if (stage === "pack") return null;
  return <AmbientParticlesLazy color={color} />;
}