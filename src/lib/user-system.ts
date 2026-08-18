'use client';

export interface UserProfile {
  nickname: string;
  avatar: string; // emoji
  createdAt: number;
}

export interface GameScore {
  slug: string;
  gameTitle: string;
  score: number;
  level?: number;
  date: number;
}

const USER_KEY = 'gamehub_user';
const SCORES_KEY = 'gamehub_scores';
const AVATARS = ['🦊', '🐼', '🐯', '🐰', '🦁', '🐸', '🐵', '🦄', '🐺', '🐨', '🐙', '🦉'];

export function getAvatarList(): string[] { return AVATARS; }

export function getUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveUser(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(profile));
}

export function clearUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
}

export function getScores(): GameScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SCORES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveScore(score: GameScore): GameScore[] {
  if (typeof window === 'undefined') return [];
  const scores = getScores();
  // Keep best score per game
  const existing = scores.findIndex(s => s.slug === score.slug);
  if (existing >= 0) {
    if (score.score > scores[existing].score) {
      scores[existing] = score;
    }
  } else {
    scores.push(score);
  }
  // Sort by score desc, keep top 50
  scores.sort((a, b) => b.score - a.score);
  const trimmed = scores.slice(0, 50);
  localStorage.setItem(SCORES_KEY, JSON.stringify(trimmed));
  return trimmed;
}

export function buildShareText(score: GameScore): string {
  const title = score.gameTitle || score.slug;
  return `🎮 ¡Jugué ${title} y conseguí ${score.score} puntos${score.level ? ` (nivel ${score.level})` : ''}! ¿Puedes superar mi puntuación? 🏆`;
}

export async function shareScore(score: GameScore): Promise<boolean> {
  const text = buildShareText(score);
  try {
    if (navigator.share) {
      await navigator.share({ text });
      return true;
    }
  } catch { /* user cancelled */ }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
