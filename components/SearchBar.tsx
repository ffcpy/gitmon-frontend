"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PixelInput from "@/components/ui/PixelInput";
import PixelButton from "@/components/ui/PixelButton";
import SummonOverlay from "@/components/SummonOverlay";

const SUMMON_DURATION_MS = 1800;

export default function SearchBar() {
  const [username, setUsername] = useState("");
  const [summoning, setSummoning] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed || summoning) return;

    setSummoning(true);
    window.setTimeout(() => {
      router.push(`/card/${trimmed}`);
    }, SUMMON_DURATION_MS);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
        <PixelInput
          className="flex-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite um username do GitHub"
        />
        <PixelButton type="submit">Buscar</PixelButton>
      </form>

      {summoning && <SummonOverlay username={username.trim()} />}
    </>
  );
}