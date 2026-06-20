import Link from 'next/link';
import type { Locale, Game } from '@/lib/types';
import { getGameTitle, getCategoryLabel, categoryColors } from '@/lib/game-utils';

interface GameCardProps { game: Game; locale: Locale; }

export function GameCard({ game, locale }: GameCardProps) {
  const title = getGameTitle(game, locale);
  const categoryLabel = getCategoryLabel(game.category, locale);
  const colors = categoryColors[game.category];

  return (
    <Link href={`/${locale}/game/${game.slug}`} className="game-card-hover group block overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative flex aspect-[4/3] items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}>
        <span className="text-5xl drop-shadow-lg transition-transform duration-200 group-hover:scale-110 sm:text-6xl">{game.thumbnailEmoji}</span>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
          <span className="scale-0 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground shadow-lg transition-transform duration-200 group-hover:scale-100">▶</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
        <span className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: colors.from }}>{categoryLabel}</span>
      </div>
    </Link>
  );
}
