"use client";

import { useState } from "react";
import PixelButton from "@/components/ui/PixelButton";

export default function ShareButton({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/card/${username}` : "";

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GitMon Card de ${username}`,
          text: `Confira meu GitMon Card! 🐙`,
          url,
        });
        return;
      } catch {
        // usuário cancelou: cai no fallback silenciosamente
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PixelButton variant="ghost" onClick={handleShare}>
      {copied ? "Link copiado! ✓" : "Compartilhar card 🔗"}
    </PixelButton>
  );
}