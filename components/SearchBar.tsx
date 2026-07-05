"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PixelInput from "@/components/ui/PixelInput";
import PixelButton from "@/components/ui/PixelButton";

export default function SearchBar() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/card/${username.trim()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <PixelInput
        className="flex-1"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite um username do GitHub"
      />
      <PixelButton type="submit">Buscar</PixelButton>
    </form>
  );
}