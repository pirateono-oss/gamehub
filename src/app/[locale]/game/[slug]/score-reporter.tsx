'use client';
import { useEffect, useState } from 'react';
import { saveScore, getUser } from '@/lib/user-system';
import { ShareModal } from '@/components/share-modal';
import type { Locale } from '@/lib/types';
import type { GameScore } from '@/lib/user-system';

interface ScoreReporterProps {
  gameSlug: string;
  gameTitle: string;
  locale: Locale;
}

export function ScoreReporter({ gameSlug, gameTitle, locale }: ScoreReporterProps) {
  const [lastScore, setLastScore] = useState<{ score: number; level?: number } | null>(null);
  const [toast, setToast] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareScoreData, setShareScoreData] = useState<GameScore | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type !== 'gamehub-score') return;
      if (data.slug && data.slug !== gameSlug) return;

      const score = Number(data.score) || 0;
      const level = data.level ? Number(data.level) : undefined;
      if (score <= 0) return;

      // Only save if user profile exists
      const user = getUser();
      if (user) {
        saveScore({ slug: gameSlug, gameTitle, score, level, date: Date.now() });
      }
      setLastScore({ score, level });
      setToast(true);
      setTimeout(() => setToast(false), 4000);
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [gameSlug, gameTitle]);

  if (!lastScore) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-2xl">
        <span className="text-2xl">🎉</span>
        <div>
          <p className="text-sm font-semibold">{lastScore.score} puntos{lastScore.level ? ` · nivel ${lastScore.level}` : ''}</p>
          <p className="text-xs text-muted-foreground">{gameTitle}</p>
        </div>
        {getUser() ? (
          <button onClick={() => { setShareScoreData({ slug: gameSlug, gameTitle, score: lastScore.score, level: lastScore.level, date: Date.now() }); setShareOpen(true); }}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            Compartir
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">Crea un perfil para guardar</span>
        )}
      </div>
      {shareOpen && shareScoreData && <ShareModal score={shareScoreData} onClose={() => setShareOpen(false)} />}
    </div>
  );
}
