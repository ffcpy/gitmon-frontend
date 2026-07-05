const MAX_TEMPLATE_ID: Record<string, number> = {
  common: 6,
  rare: 5,
  epic: 4,
  legendary: 4,
  mythic: 3,
};

const CREATOR_USERNAME = "ffcpy";
const CREATOR_BACKGROUND = "/card-backgrounds/creator-special.png";

export function getCardBackground(
  rarity: string,
  templateId: number,
  username?: string
): string {
  if (username?.toLowerCase() === CREATOR_USERNAME.toLowerCase()) {
    return CREATOR_BACKGROUND;
  }

  const safeRarity = rarity.toLowerCase();
  const max = MAX_TEMPLATE_ID[safeRarity] ?? 0;
  const safeId = templateId >= 0 && templateId <= max ? templateId : 0;
  return `/card-backgrounds/${safeRarity}-${safeId}.png`;
}