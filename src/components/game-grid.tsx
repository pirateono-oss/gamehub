import type { Locale, Game } from '@/lib/types';
import { GameCard } from './game-card';

interface GameGridProps { games: Game[]; locale: Locale; emptyMessage: string; }

export function GameGrid({ games, locale, emptyMessage }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl">🎮</span>
        <p className="mt-4 text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {games.map((game) => (<GameCard key={game.slug} game={game} locale={locale} />))}
    </div>
  );
}
