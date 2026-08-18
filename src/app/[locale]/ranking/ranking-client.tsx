'use client';
import { useState, useEffect } from 'react';
import { Trophy, Share2 } from 'lucide-react';
import { getScores, getUser } from '@/lib/user-system';
import { ShareModal } from '@/components/share-modal';
import { getAllGames } from '@/lib/game-utils';
import type { Locale } from '@/lib/types';
import type { GameScore } from '@/lib/user-system';

export default function RankingClient({ locale }: { locale: Locale }) {
  const [scores, setScores] = useState<ReturnType<typeof getScores>>([]);
  const [user, setUser] = useState(getUser());
  const [shareScoreData, setShareScoreData] = useState<GameScore | null>(null);

  useEffect(() => {
    setScores(getScores());
    setUser(getUser());
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  const getGameTitle = (slug: string) => {
    const game = getAllGames().find(g => g.slug === slug);
    return game?.translations[locale]?.title ?? game?.translations.en.title ?? slug;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
          <Trophy className="h-7 w-7 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">🏆 Ranking</h1>
        <p className="text-muted-foreground">Tus mejores puntuaciones en todos los juegos</p>
      </div>

      {!user && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
          Crea un perfil con el botón de usuario para guardar tus puntuaciones.
        </div>
      )}

      {scores.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-4xl mb-3">🎮</p>
          <p className="text-muted-foreground">Todavía no has jugado. ¡Juega a algún juego para registrar tu primera puntuación!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {scores.map((s, i) => (
            <div key={s.slug} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="w-10 text-center text-2xl">{medals[i] ?? `${i + 1}`}</div>
              <div className="flex-1">
                <p className="font-semibold">{getGameTitle(s.slug)}</p>
                <p className="text-xs text-muted-foreground">{new Date(s.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">{s.score.toLocaleString()} pts</p>
                {s.level && <p className="text-xs text-muted-foreground">Nivel {s.level}</p>}
              </div>
              <button onClick={() => setShareScoreData(s)} className="rounded-lg bg-secondary p-2.5 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-primary" title="Compartir">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {shareScoreData && <ShareModal score={shareScoreData} onClose={() => setShareScoreData(null)} />}
    </div>
  );
}
