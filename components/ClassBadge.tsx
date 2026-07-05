import ClassEmblem from "./ClassEmblem";

const CLASS_BADGE_STYLES: Record<string, { bg: string; border: string; glow: string; iconBg: string }> = {
  "Full Stack Knight": {
    bg: "bg-slate-800/90",
    border: "border-slate-300/50",
    glow: "shadow-[0_0_16px_rgba(148,163,184,0.5)]",
    iconBg: "bg-slate-500",
  },
  "Backend Guardian": {
    bg: "bg-emerald-900/90",
    border: "border-emerald-300/50",
    glow: "shadow-[0_0_16px_rgba(52,211,153,0.5)]",
    iconBg: "bg-emerald-600",
  },
  "Frontend Mage": {
    bg: "bg-purple-950/90",
    border: "border-purple-300/50",
    glow: "shadow-[0_0_16px_rgba(192,132,252,0.5)]",
    iconBg: "bg-purple-600",
  },
  "DevOps Titan": {
    bg: "bg-orange-950/90",
    border: "border-orange-300/50",
    glow: "shadow-[0_0_16px_rgba(251,146,60,0.55)]",
    iconBg: "bg-orange-600",
  },
  "Open Source Hero": {
    bg: "bg-amber-900/90",
    border: "border-amber-200/60",
    glow: "shadow-[0_0_16px_rgba(251,191,36,0.6)]",
    iconBg: "bg-amber-500",
  },
  "Data Wizard": {
    bg: "bg-sky-950/90",
    border: "border-sky-300/50",
    glow: "shadow-[0_0_16px_rgba(56,189,248,0.55)]",
    iconBg: "bg-sky-600",
  },
  Builder: {
    bg: "bg-zinc-800/90",
    border: "border-zinc-300/50",
    glow: "shadow-[0_0_16px_rgba(212,212,216,0.4)]",
    iconBg: "bg-zinc-500",
  },
};

export default function ClassBadge({ cardClass }: { cardClass: string }) {
  const style = CLASS_BADGE_STYLES[cardClass] ?? CLASS_BADGE_STYLES.Builder;

  return (
    <div className="relative inline-flex items-center">
      {/* Faixa/banner */}
      <div
        className={`relative flex items-center gap-2 pl-8 pr-4 py-1.5 border-2 backdrop-blur-sm
          font-terminal font-bold uppercase tracking-widest text-sm
          text-white ${style.bg} ${style.border} ${style.glow}`}
        style={{
          clipPath:
            "polygon(4% 0, 100% 0, 96% 50%, 100% 100%, 4% 100%, 0% 50%)",
        }}
      >
        {cardClass}
      </div>

      {/* Emblema em destaque, saindo por cima da faixa */}
      <div
        className={`absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
          flex items-center justify-center border-2 border-white/70 ${style.iconBg} ${style.glow}`}
      >
        <ClassEmblem cardClass={cardClass} className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}