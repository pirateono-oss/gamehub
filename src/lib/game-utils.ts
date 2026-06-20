import type { Locale, Category, Game } from './types';
import { games } from './games-data';
import { getDictionary } from './i18n';

export function getAllGames(): Game[] { return games; }
export function getGameBySlug(slug: string): Game | undefined { return games.find((g) => g.slug === slug); }
export function getGamesByCategory(category: Category): Game[] { return games.filter((g) => g.category === category); }
export function getGameTitle(game: Game, locale: Locale): string { return game.translations[locale]?.title ?? game.translations.en.title; }
export function getGameDescription(game: Game, locale: Locale): string { return game.translations[locale]?.description ?? game.translations.en.description; }
export function getGameInstructions(game: Game, locale: Locale): string { return game.translations[locale]?.instructions ?? game.translations.en.instructions; }
export function getCategoryLabel(category: Category, locale: Locale): string { return getDictionary(locale).categories[category]; }
export function getRelatedGames(game: Game, count: number = 6): Game[] {
  const sameCategory = games.filter((g) => g.category === game.category && g.slug !== game.slug);
  const otherGames = games.filter((g) => g.category !== game.category && g.slug !== game.slug);
  return [...sameCategory, ...otherGames].slice(0, count);
}

export const categories: Category[] = ['puzzle', 'action', 'casual', 'sports', 'strategy'];

export const categoryColors: Record<Category, { from: string; to: string }> = {
  puzzle: { from: '#8B5CF6', to: '#6D28D9' },
  action: { from: '#EF4444', to: '#DC2626' },
  casual: { from: '#10B981', to: '#059669' },
  sports: { from: '#F59E0B', to: '#D97706' },
  strategy: { from: '#3B82F6', to: '#1D4ED8' }
};

export const categoryEmojis: Record<Category, string> = {
  puzzle: '🧩', action: '⚔️', casual: '🎲', sports: '⚽', strategy: '🏰'
};
