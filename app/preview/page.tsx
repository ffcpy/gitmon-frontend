import GitMonCard from "@/components/GitMonCard";
import type { GitMonCard as GitMonCardType } from "@/types/card";

const RARITIES = ["Common", "Rare", "Epic", "Legendary", "Mythic"];

const TEMPLATES_PER_RARITY: Record<string, number> = {
  Common: 7,
  Rare: 6,
  Epic: 5,
  Legendary: 5,
  Mythic: 4,
};

const MOCK_AVATAR = "https://avatars.githubusercontent.com/u/1?v=4";

function buildMockCard(rarity: string, templateId: number): GitMonCardType {
  return {
    username: "ffcpy",
    avatar_url: MOCK_AVATAR,
    card_class: "Full Stack Knight",
    rarity,
    power_score: 254,
    level: 12,
    code_rank: 1016,
    wins: 8,
    losses: 3,
    win_streak: 2,
    attack: 65,
    defense: 54,
    magic: 48,
    speed: 70,
    intelligence: 40,
    hp: 60,
    luck: 55,
    top_languages: ["Python", "TypeScript", "Docker"],
    battles_enabled: true,
    template_id: templateId,
    total_seasons: 3,
    seasons_won: 1,
    highest_code_rank: 1240,
    highest_win_streak: 7,
    total_battles: 42,
  };
}

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-grid py-12 px-6">
      <h1 className="text-3xl font-black font-gamified text-white text-center mb-10">
        Preview de Templates (dev only)
      </h1>

      {RARITIES.map((rarity) => (
        <div key={rarity} className="mb-14">
          <h2 className="text-xl font-gamified text-zinc-300 mb-4">{rarity}</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {Array.from({ length: TEMPLATES_PER_RARITY[rarity] }).map(
              (_, templateId) => (
                <GitMonCard
                  key={templateId}
                  card={buildMockCard(rarity, templateId)}
                  avatarUrl={MOCK_AVATAR}
                />
              )
            )}
          </div>
        </div>
      ))}
    </main>
  );
}