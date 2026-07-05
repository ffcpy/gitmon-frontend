import { SearchResult, RankingEntry } from "@/types/card";
import { getToken } from "@/lib/auth";
import type { GitMonCard } from "@/types/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchCard(username: string): Promise<SearchResult> {
  const response = await fetch(`${API_URL}/api/search/${username}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch card");
  }

  return response.json();
}

export async function getRanking(): Promise<RankingEntry[]> {
  const response = await fetch(`${API_URL}/api/ranking`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ranking");
  }

  return response.json();
}

export function getGitHubLoginUrl(): string {
  return `${API_URL}/api/auth/login`;
}

export async function getMyProfile(): Promise<GitMonCard> {
  const response = await fetch(`${API_URL}/api/profile/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}
export async function toggleBattles(enabled: boolean): Promise<{ battles_enabled: boolean }> {
  const response = await fetch(`${API_URL}/api/profile/me/battles?enabled=${enabled}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error("Failed to toggle battles");
  return response.json();
}

export async function challengeBattle(opponentUsername: string) {
  const response = await fetch(`${API_URL}/api/battle/challenge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ opponent_username: opponentUsername }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Não foi possível iniciar a batalha");
  }
  return data as import("@/types/card").BattleResult;
}
