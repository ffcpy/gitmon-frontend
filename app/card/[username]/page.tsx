import GitMonCard from "@/components/GitMonCard";
import { searchCard } from "@/lib/api";
import CardPageBackground from "@/components/CardPageBackground";
import PixelButton from "@/components/ui/PixelButton";
import ChallengeButton from "@/components/ChallengeButton";

export default async function CardPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const result = await searchCard(username);

  if (result.status === "not_on_github") {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <CardPageBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="font-terminal text-lg text-slate-300 text-center">
            Usuário &quot;{username}&quot; não encontrado no GitHub.
          </p>
          <PixelButton href="/">Voltar ao início</PixelButton>
        </div>
      </main>
    );
  }

  if (result.status === "not_on_gitmon") {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <CardPageBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="font-terminal text-xl text-slate-100">
            {result.github_name || username} ainda não tem um GitMon Card.
          </p>
          <p className="font-terminal text-sm text-slate-400">
            Convide para criar o dele fazendo login no GitMon!
          </p>
          <PixelButton href="/">Voltar ao início</PixelButton>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <CardPageBackground />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <GitMonCard
          card={result.card!}
          avatarUrl={result.card!.avatar_url ?? "/default-avatar.png"}
        />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ChallengeButton opponentUsername={username} opponentCard={result.card!} />
          <PixelButton variant="ghost" href="/">
            Voltar ao início
          </PixelButton>
        </div>
      </div>
    </main>
  );
}