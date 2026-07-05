const RARITY_STARS: Record<string, number> = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
  Mythic: 5,
};

export default function CardFooter({
  username,
  rarity,
  codeRank,
  wins,
  losses,
  winStreak,
  textClass,
}: {
  username: string;
  rarity: string;
  codeRank: number;
  wins: number;
  losses: number;
  winStreak: number;
  textClass: string;
}) {
  const stars = RARITY_STARS[rarity] ?? 1;
  const serial = `#${String(codeRank).padStart(4, "0")}-${rarity.toUpperCase()}-${username.toUpperCase()}`;

  return (
    <div className={`border-t border-white/15 pt-2 space-y-1 ${textClass}`}>
      <div className="flex justify-between items-center text-xs font-gamified">
        <span>CR {codeRank}</span>
        <span>{wins}V - {losses}D</span>
        <span className="flex items-center gap-0.5">
          <span className={winStreak >= 3 ? "streak-hot" : ""}>🔥</span> {winStreak}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[9px] tracking-wider opacity-70 font-mono">{serial}</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 12 12"
              className={`w-2.5 h-2.5 ${i < stars ? "opacity-100" : "opacity-25"}`}
              fill="currentColor"
            >
              <path d="M6 0 L7.5 4 L12 4.5 L8.8 7.3 L9.8 12 L6 9.5 L2.2 12 L3.2 7.3 L0 4.5 L4.5 4 Z" />
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
}