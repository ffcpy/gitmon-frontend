"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyProfile, challengeBattle } from "@/lib/api";
import type { GitMonCard as GitMonCardType, BattleResult } from "@/types/card";
import PixelButton from "@/components/ui/PixelButton";
import GitMonCard from "@/components/GitMonCard";

const ATTRIBUTE_LABELS: Record<string, string> = {
  attack: "ATK",
  defense: "DEF",
  magic: "MAG",
  speed: "SPD",
  intelligence: "INT",
  hp: "HP",
  luck: "LUCK",
};

type Stage = "loading" | "intro" | number | "result" | "error";

/** Escolhe uma escala de acordo com a largura da viewport. */
function useResponsiveScale() {
  const [scale, setScale] = useState(0.42);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (width < 400) setScale(0.4);
      else if (width < 640) setScale(0.48);
      else if (width < 768) setScale(0.58);
      else setScale(0.75);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

/**
 * Envolve o GitMonCard (largura fixa w-80) e o exibe reduzido,
 * medindo a altura real renderizada para reservar o espaço certo
 * no layout — sem precisar hardcodar a altura do card.
 */
function ScaledCard({
  scale,
  highlight,
  children,
}: {
  scale: number;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.getBoundingClientRect().height);
    }
  }, [children]);

  return (
    <motion.div
      className="relative shrink-0"
      style={{
        width: 320 * scale,
        height: height ? height * scale : undefined,
      }}
      animate={
        highlight
          ? { filter: "drop-shadow(0 0 22px rgba(251,191,36,0.55))" }
          : { filter: "drop-shadow(0 0 0px rgba(251,191,36,0))" }
      }
      transition={{ duration: 0.4 }}
    >
      <div
        ref={innerRef}
        style={{
          width: 320,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function BattleScreen({
  opponentUsername,
  opponentCard,
  onClose,
}: {
  opponentUsername: string;
  opponentCard: GitMonCardType;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<Stage>("loading");
  const [challenger, setChallenger] = useState<GitMonCardType | null>(null);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const scale = useResponsiveScale();

  useEffect(() => {
    async function run() {
      try {
        const me = await getMyProfile();
        setChallenger(me);
        setStage("intro");

        const battle = await challengeBattle(opponentUsername);
        setTimeout(() => {
          setResult(battle);
          setStage(0);
        }, 1400);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido");
        setStage("error");
      }
    }
    run();
  }, [opponentUsername]);

  useEffect(() => {
    if (typeof stage !== "number" || !result) return;
    const isLast = stage === result.rounds.length - 1;
    const timer = setTimeout(
      () => setStage(isLast ? "result" : stage + 1),
      1900
    );
    return () => clearTimeout(timer);
  }, [stage, result]);

  const challengerWon = result?.winner === "challenger";

  const challengerRoundWins =
    typeof stage === "number" && result
      ? result.rounds.slice(0, stage + 1).filter((r) => r.winner === "challenger").length
      : result?.rounds.filter((r) => r.winner === "challenger").length ?? 0;
  const opponentRoundWins =
    typeof stage === "number" && result
      ? result.rounds.slice(0, stage + 1).filter((r) => r.winner === "opponent").length
      : result?.rounds.filter((r) => r.winner === "opponent").length ?? 0;

  const challengerLeading = challengerRoundWins > opponentRoundWins;
  const opponentLeading = opponentRoundWins > challengerRoundWins;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden py-6 px-3 sm:px-4">
      <img
        src="/gifbattle1.gif"
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <div className="fixed inset-0 bg-black/70 -z-10" />

      <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-30">
        <PixelButton variant="ghost" onClick={onClose}>
          Fechar
        </PixelButton>
      </div>

      {stage === "loading" && (
        <p className="relative z-10 font-terminal text-lg sm:text-xl text-amber-200 animate-pulse tracking-wide text-center px-4">
          Buscando oponente...
        </p>
      )}

      {stage === "error" && (
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
          <p className="font-terminal text-base sm:text-lg text-slate-200 max-w-md">
            {errorMsg}
          </p>
          <PixelButton onClick={onClose}>Voltar</PixelButton>
        </div>
      )}

      {(stage === "intro" || typeof stage === "number" || stage === "result") &&
        challenger && (
          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-8 w-full max-w-4xl">
            {/* Cards lado a lado com placar */}
            <div className="flex items-start justify-center w-full gap-2 sm:gap-6">
              <Fighter
                card={challenger}
                scale={scale}
                score={challengerRoundWins}
                leading={challengerLeading}
              />

              <motion.span
                key={typeof stage === "number" ? stage : "vs"}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-gamified text-xl sm:text-3xl md:text-4xl text-amber-300 px-1 pt-16 sm:pt-24 shrink-0 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
              >
                VS
              </motion.span>

              <Fighter
                card={opponentCard}
                scale={scale}
                score={opponentRoundWins}
                leading={opponentLeading}
              />
            </div>

            <AnimatePresence mode="wait">
              {typeof stage === "number" && result && (
                <RoundCard
                  key={stage}
                  round={result.rounds[stage]}
                  index={stage}
                  total={result.rounds.length}
                />
              )}
            </AnimatePresence>

            {stage === "result" && result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 15 }}
                className="relative flex flex-col items-center gap-3 sm:gap-4 text-center px-4"
              >
                <motion.div
                  className="absolute -inset-10 sm:-inset-16 -z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: challengerWon
                      ? "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 65%)"
                      : "radial-gradient(circle, rgba(148,163,184,0.2) 0%, transparent 65%)",
                  }}
                />

                <motion.p
                  animate={
                    challengerWon
                      ? { scale: [1, 1.15, 1] }
                      : { x: [0, -6, 6, -4, 4, 0] }
                  }
                  transition={{ duration: 0.6 }}
                  className="font-gamified text-4xl sm:text-5xl md:text-7xl uppercase tracking-wide leading-tight"
                  style={{
                    color: challengerWon ? "#ffcc33" : "#a1a1aa",
                    WebkitTextStroke: challengerWon ? "2px #1a1206" : "2px #18181b",
                    textShadow: challengerWon
                      ? "0 3px 0 #1a1206, 0 6px 12px rgba(0,0,0,0.6), 0 0 30px rgba(251,191,36,0.5)"
                      : "0 3px 0 #18181b, 0 6px 12px rgba(0,0,0,0.6)",
                  }}
                >
                  {challengerWon ? "Vitória!" : "Derrota"}
                </motion.p>

                <p className="font-terminal text-base sm:text-lg text-slate-300">
                  CR {challenger.code_rank} →{" "}
                  <span className={challengerWon ? "text-emerald-400" : "text-red-400"}>
                    {result.challenger_cr_after}
                  </span>
                </p>

                <PixelButton onClick={onClose}>Fechar</PixelButton>
              </motion.div>
            )}
          </div>
        )}
    </div>
  );
}

function Fighter({
  card,
  scale,
  score,
  leading,
}: {
  card: GitMonCardType;
  scale: number;
  score: number;
  leading: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <ScaledCard scale={scale} highlight={leading}>
        <GitMonCard card={card} avatarUrl={card.avatar_url ?? "/default-avatar.png"} />
      </ScaledCard>

      <div className="flex gap-1 sm:gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-amber-300/50 transition-colors ${
              i < score ? "bg-amber-400" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function RoundCard({
  round,
  index,
  total,
}: {
  round: { attribute: string; challenger_value: number; opponent_value: number; winner: string };
  index: number;
  total: number;
}) {
  const challengerWins = round.winner === "challenger";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="pixel-btn-ghost pixel-btn w-full max-w-md px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-center gap-2 sm:gap-3 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />

      <p className="font-terminal text-xs text-slate-400 relative z-10">
        Round {index + 1} / {total}
      </p>
      <p className="font-terminal text-xl sm:text-2xl text-amber-200 tracking-widest relative z-10">
        {ATTRIBUTE_LABELS[round.attribute] ?? round.attribute.toUpperCase()}
      </p>

      <div className="flex items-center gap-3 sm:gap-6 w-full justify-center relative z-10">
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: challengerWins ? [1, 1.25, 1] : 1,
          }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className={`font-terminal text-2xl sm:text-3xl ${
            challengerWins ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          {round.challenger_value}
        </motion.span>

        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="font-terminal text-amber-300 text-base sm:text-lg shrink-0"
        >
          ⚔️
        </motion.span>

        <motion.span
          initial={{ x: 20, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: !challengerWins ? [1, 1.25, 1] : 1,
          }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className={`font-terminal text-2xl sm:text-3xl ${
            !challengerWins ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          {round.opponent_value}
        </motion.span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`h-1 w-20 sm:w-24 rounded-full origin-center ${
          challengerWins ? "bg-emerald-400" : "bg-red-400"
        }`}
        style={{ marginLeft: challengerWins ? "auto" : 0, marginRight: challengerWins ? "0" : "auto" }}
      />
    </motion.div>
  );
}