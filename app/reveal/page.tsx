"use client";

import { useState } from "react";
import BoosterReveal from "@/components/BoosterReveal";
import type { GitMonCard as GitMonCardType } from "@/types/card";

const MOCK_AVATAR = "https://avatars.githubusercontent.com/u/1?v=4";

const mockCard: GitMonCardType = {
  username: "ffcpy",
  avatar_url: MOCK_AVATAR,
  card_class: "Full Stack Knight",
  rarity: "Mythic", // troque para testar cada raridade
  power_score: 254,
  level: 12,
  code_rank: 1016,
  wins: 8,
  losses: 3,
  win_streak: 4,
  attack: 65,
  defense: 54,
  magic: 48,
  speed: 70,
  intelligence: 40,
  hp: 60,
  luck: 55,
  top_languages: ["Python", "TypeScript", "Docker"],
  battles_enabled: true,
  template_id: 1,
  total_seasons: 3,
  seasons_won: 1,
  highest_code_rank: 1240,
  highest_win_streak: 7,
  total_battles: 42,
};

export default function RevealPage() {
  const [key, setKey] = useState(0);

  return (
    <main className="min-h-screen bg-grid">
      <BoosterReveal
        key={key}
        card={mockCard}
        avatarUrl={MOCK_AVATAR}
        onFinish={() => setKey((k) => k + 1)} // replay para dev
      />
    </main>
  );
}