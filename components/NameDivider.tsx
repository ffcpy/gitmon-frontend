const RARITY_DIVIDER_COLOR: Record<string, string> = {
  Common: "text-amber-300/80",
  Rare: "text-pink-400/80",
  Epic: "text-sky-400/80",
  Legendary: "text-amber-400/90",
  Mythic: "text-fuchsia-400/90",
};

export default function NameDivider({ rarity }: { rarity: string }) {
  const color = RARITY_DIVIDER_COLOR[rarity] ?? RARITY_DIVIDER_COLOR.Common;
  return (
    <svg viewBox="0 0 120 8" className={`w-28 h-2 mt-0.5 ${color}`} fill="none">
      <path d="M0 4 H48 M72 4 H120" stroke="currentColor" strokeWidth="1" />
      <path d="M60 0 L64 4 L60 8 L56 4 Z" fill="currentColor" />
      <circle cx="42" cy="4" r="1.2" fill="currentColor" />
      <circle cx="78" cy="4" r="1.2" fill="currentColor" />
    </svg>
  );
}