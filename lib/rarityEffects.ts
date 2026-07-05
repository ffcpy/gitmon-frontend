export interface RarityEffect {
  label: string;
  cardBackground: string;
  borderClass: string;
  textureType: "paper" | "neon" | "circuit" | "metal" | "cosmic";
  frameClass: string;
  titleFont: string;
}

export const RARITY_EFFECTS: Record<string, RarityEffect> = {
  Common: {
    label: "text-amber-200",
    cardBackground: "bg-gradient-to-b from-[#e8dcc0] to-[#d4c5a0]",
    borderClass: "border-[3px] border-double border-amber-900/60",
    textureType: "paper",
    frameClass: "text-amber-50",
    titleFont: "font-serif",
    
  },
  Rare: {
    label: "text-pink-200",
    cardBackground: "bg-gradient-to-br from-[#2a0f24] via-[#4a1642] to-[#1a0a1f]",
    borderClass: "border-2 border-pink-400/70 shadow-[0_0_25px_rgba(244,114,182,0.4)]",
    textureType: "neon",
    frameClass: "text-white",
    titleFont: "font-gamified",
  },
  Epic: {
    label: "text-sky-300",
    cardBackground: "bg-gradient-to-br from-[#0a1930] via-[#0f2847] to-[#081420] epic-glass",
    borderClass: "border-2 border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.35)]",
    textureType: "circuit",
    frameClass: "text-white",
    titleFont: "font-gamified",
  },
  Legendary: {
    label: "text-amber-300",
    cardBackground: "bg-gradient-to-br from-[#1a1206] via-[#2b1d08] to-[#120c02] legendary-metal",
    borderClass: "gitmon-legendary-border shadow-[0_0_30px_rgba(251,191,36,0.4)]",
    textureType: "metal",
    frameClass: "text-amber-100",
    titleFont: "font-gamified",
  },
  Mythic: {
    label: "text-fuchsia-200",
    cardBackground: "bg-gradient-to-br from-[#050014] via-[#0d0221] to-[#000]",
    borderClass: "gitmon-holo-border shadow-[0_0_35px_rgba(217,70,239,0.5)]",
    textureType: "cosmic",
    frameClass: "text-white",
    titleFont: "font-gamified",
  },
};