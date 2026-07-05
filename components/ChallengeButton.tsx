"use client";

import { useState } from "react";
import { isLoggedIn } from "@/lib/auth";
import type { GitMonCard as GitMonCardType } from "@/types/card";
import PixelButton from "@/components/ui/PixelButton";
import BattleScreen from "@/components/BattleScreen";

export default function ChallengeButton({
  opponentUsername,
  opponentCard,
}: {
  opponentUsername: string;
  opponentCard: GitMonCardType;
}) {
  const [battling, setBattling] = useState(false);

  if (!isLoggedIn()) return null;

  return (
    <>
      <PixelButton onClick={() => setBattling(true)}>Desafiar ⚔️</PixelButton>
      {battling && (
        <BattleScreen
          opponentUsername={opponentUsername}
          opponentCard={opponentCard}
          onClose={() => setBattling(false)}
        />
      )}
    </>
  );
}