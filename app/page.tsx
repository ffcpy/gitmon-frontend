"use client";

import SearchBar from "@/components/SearchBar";
import { getGitHubLoginUrl } from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import HeroBackground from "@/components/HeroBackground";
import HeroContent from "@/components/HeroContent";
import PixelButton from "@/components/ui/PixelButton";

export default function HomePage() {
  const loggedIn = isLoggedIn();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full">
        <HeroContent />

        <SearchBar />

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {loggedIn ? (
            <PixelButton href="/me">Meu card</PixelButton>
          ) : (
            <PixelButton href={getGitHubLoginUrl()} external>
              Criar meu card
            </PixelButton>
          )}

          <PixelButton variant="ghost" href="/ranking">
            Ver ranking
          </PixelButton>
        </div>
      </div>
    </main>
  );
}