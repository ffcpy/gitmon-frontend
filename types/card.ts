export type SearchStatus = "found" | "not_on_gitmon" | "not_on_github";

export interface GitMonCard {
  username: string;
  card_class: string;
  rarity: string;
  power_score: number;
  level: number;
  code_rank: number;
  wins: number;
  losses: number;
  win_streak: number;
  attack: number;
  defense: number;
  magic: number;
  speed: number;
  intelligence: number;
  hp: number;
  luck: number;
  top_languages: string[];
  battles_enabled: boolean;
  template_id: number;
  avatar_url: string | null;
  total_seasons: number;
  seasons_won: number;
  highest_code_rank: number;
  highest_win_streak: number;
  total_battles: number;
}

export interface SearchResult {
  status: SearchStatus;
  card?: GitMonCard;
  github_username?: string;
  github_name?: string;
  github_avatar_url?: string;
}

export interface RankingEntry {
  position: number;
  username: string;
  card_class: string;
  wins: number;
  code_rank: number;
}

export interface BattleRound {
  attribute: string;
  challenger_value: number;
  opponent_value: number;
  winner: "challenger" | "opponent";
}

export interface BattleResult {
  battle_id: number;
  winner: "challenger" | "opponent";
  rounds: BattleRound[];
  challenger_cr_after: number;
  opponent_cr_after: number;
}