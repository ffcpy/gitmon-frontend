"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMyProfile, toggleBattles } from "@/lib/api";
import { isLoggedIn, clearToken } from "@/lib/auth";
import type { GitMonCard as GitMonCardType } from "@/types/card";
import GitMonCard from "@/components/GitMonCard";
import BoosterReveal from "@/components/BoosterReveal";
import ShareButton from "@/components/ShareButton";
import PixelButton from "@/components/ui/PixelButton";
import MeBackground from "@/components/MeBackground";

function MyCardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";

  const [card, setCard] = useState<GitMonCardType | null>(null);
  const [showReveal, setShowReveal] = useState(isNew);
  const [error, setError] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/");
      return;
    }
    let attempts = 0;
    async function load() {
      try {
        const data = await getMyProfile();
        setCard(data);
      } catch {
        attempts += 1;
        if (attempts < 10) setTimeout(load, 2000);
        else setError(true);
      }
    }
    load();
  }, [router]);

  async function handleToggleBattles() {
    if (!card || toggling) return;
    setToggling(true);
    try {
      const result = await toggleBattles(!card.battles_enabled);
      setCard({ ...card, battles_enabled: result.battles_enabled });
    } finally {
      setToggling(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.replace("/");
  }

  if (error) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <MeBackground />
        <p className="relative z-10 font-terminal text-lg text-slate-300 text-center">
          Não foi possível carregar seu card. Tente fazer login novamente.
        </p>
        <PixelButton variant="ghost" href="/">
          Voltar ao início
        </PixelButton>
      </main>
    );
  }

  if (!card) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-3">
        <MeBackground />
        <img
          src="/logo.png"
          alt=""
          className="relative z-10 w-20 h-20 object-contain animate-pulse"
        />
        <p className="relative z-10 font-terminal text-lg text-amber-200 tracking-wide">
          Forjando seu card...
        </p>
      </main>
    );
  }

  if (showReveal) {
    return (
      <BoosterReveal
        card={card}
        avatarUrl={card.avatar_url ?? "/default-avatar.png"}
        onFinish={() => setShowReveal(false)}
      />
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-10">
      <MeBackground />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <GitMonCard card={card} avatarUrl={card.avatar_url ?? "/default-avatar.png"} />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ShareButton username={card.username} />

          <PixelButton
            variant={card.battles_enabled ? "success" : "muted"}
            onClick={handleToggleBattles}
            disabled={toggling}
          >
            {card.battles_enabled ? "Batalhas ativadas ⚔️" : "Batalhas desativadas 🛡️"}
          </PixelButton>

          <PixelButton variant="ghost" onClick={handleLogout}>
            Sair
          </PixelButton>

          <PixelButton variant="ghost" href="/">
            Voltar ao início
          </PixelButton>
        </div>
      </div>
    </main>
  );
}

export default function MyCardPage() {
  return (
    <Suspense>
      <MyCardContent />
    </Suspense>
  );
}