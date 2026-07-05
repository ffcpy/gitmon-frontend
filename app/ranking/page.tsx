import { getRanking } from "@/lib/api";
import Link from "next/link";
import PixelPanel from "@/components/ui/PixelPanel";
import PixelButton from "@/components/ui/PixelButton";
import RankingBackground from "@/components/RankingBackground";

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default async function RankingPage() {
  const ranking = await getRanking();

  return (
    <main className="relative min-h-screen px-4 py-12">
      <RankingBackground />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="GitMon"
            className="w-32 sm:w-40 md:w-52 object-contain mx-auto"
          />
          <p className="font-terminal text-lg sm:text-xl text-slate-100/95 mt-1 tracking-wide">
            Ranking da temporada
          </p>
        </div>

        <PixelPanel className="w-full">
          {ranking.length === 0 && (
            <p className="text-center font-terminal text-slate-400 py-10">
              Nenhum duelista ainda nesta temporada.
            </p>
          )}

          {ranking.map((entry) => {
            const isTop3 = entry.position <= 3;
            return (
              <Link
                key={entry.username}
                href={`/card/${entry.username}`}
                className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 border-b border-slate-400/10 last:border-0 hover:bg-white/5 transition ${
                  isTop3 ? "bg-orange-400/5" : ""
                }`}
              >
                <span className="w-8 sm:w-10 text-center font-terminal text-base sm:text-lg text-amber-200 shrink-0">
                  {MEDAL[entry.position] ?? entry.position}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-100 font-terminal font-bold text-base sm:text-lg truncate">
                    {entry.username}
                  </p>
                  <p className="text-xs font-terminal text-slate-400 truncate">
                    {entry.card_class}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-terminal text-sm sm:text-base text-amber-200">
                    CR {entry.code_rank}
                  </p>
                  <p className="text-xs font-terminal text-slate-400">
                    {entry.wins} vitórias
                  </p>
                </div>
              </Link>
            );
          })}
        </PixelPanel>

        <PixelButton variant="ghost" href="/">
          Voltar ao início
        </PixelButton>
      </div>
    </main>
  );
}