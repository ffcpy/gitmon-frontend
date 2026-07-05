const MAX_TEMPLATE_ID: Record<string, number> = {
  common: 6,
  rare: 5,
  epic: 4,
  legendary: 4,
  mythic: 3,
};
export function getCardBackground(rarity: string, templateId: number): string {
  const safeRarity = rarity.toLowerCase();
  const max = MAX_TEMPLATE_ID[safeRarity] ?? 0;
  const safeId = templateId >= 0 && templateId <= max ? templateId : 0;
  return `/card-backgrounds/${safeRarity}-${safeId}.png`;
}