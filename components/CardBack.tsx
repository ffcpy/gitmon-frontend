import type { GitMonCard as GitMonCardType } from "@/types/card";
import { RARITY_EFFECTS } from "@/lib/rarityEffects";

function CareerStat({ label, value, textClass }: { label: string; value: string | number; textClass: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className={`opacity-70 uppercase tracking-wide font-gamified text-[10px] ${textClass}`}>{label}</span>
      <span className={`font-bold font-gamified ${textClass}`}>{value}</span>
    </div>
  );
}

export default function CardBack({ card }: { card: GitMonCardType }) {
  const effect = RARITY_EFFECTS[card.rarity] ?? RARITY_EFFECTS.Common;

  return (
    <div
      className={`absolute inset-0 rounded-2xl ${effect.borderClass} ${effect.cardBackground} p-5 overflow-hidden flex flex-col`}
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Padrão geométrico de fundo */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <pattern id="back-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M15 0 L30 15 L15 30 L0 15 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className={effect.frameClass} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#back-pattern)" />
      </svg>

      {/* Logo central */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className={`text-5xl font-black font-gamified ${effect.frameClass} name-glow-${card.rarity.toLowerCase()}`}>
          GitMon
        </div>
        <p className={`text-[10px] uppercase tracking-[0.3em] mt-1 opacity-60 ${effect.frameClass}`}>
          Trading Card
        </p>
      </div>

      {/* Carreira */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 space-y-1.5">
        <p className={`text-[10px] uppercase tracking-widest font-gamified opacity-70 mb-1 ${effect.frameClass}`}>
          Career
        </p>
        <CareerStat label="Seasons" value={card.total_seasons} textClass={effect.frameClass} />
        <CareerStat label="Seasons Won" value={card.seasons_won} textClass={effect.frameClass} />
        <CareerStat label="Highest CR" value={card.highest_code_rank} textClass={effect.frameClass} />
        <CareerStat label="Best Streak" value={card.highest_win_streak} textClass={effect.frameClass} />
        <CareerStat label="Total Battles" value={card.total_battles} textClass={effect.frameClass} />
      </div>
    </div>
  );
}