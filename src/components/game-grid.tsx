'use client';

import { useState } from 'react';
import type { Locale, Game, TranslationDict } from '@/lib/types';
import { GameCard } from './game-card';
import { Search } from 'lucide-react';

interface GameGridProps {
  games: Game[];
  locale: Locale;
  dict: TranslationDict;
  emptyMessage: string;
}

export function GameGrid({ games, locale, dict, emptyMessage }: GameGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = searchQuery
    ? games.filter((g) => {
        const query = searchQuery.toLowerCase();
        // Search across all 3 languages
        const enTitle = g.translations.en?.title?.toLowerCase() ?? '';
        const esTitle = g.translations.es?.title?.toLowerCase() ?? '';
        const ptTitle = g.translations.pt?.title?.toLowerCase() ?? '';
        return (
          enTitle.includes(query) ||
          esTitle.includes(query) ||
          ptTitle.includes(query)
        );
      })
    : games;

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.searchPlaceholder || 'Search games...'}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      {filteredGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl">🎮</span>
          <p className="mt-4 text-lg text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {filteredGames.map((game) => (
            <GameCard key={game.slug} game={game} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
