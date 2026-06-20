import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import { getGameBySlug, getGameTitle, getGameDescription, getGameInstructions, getCategoryLabel, getRelatedGames, categoryColors, getAllGames } from '@/lib/game-utils';
import type { Locale } from '@/lib/types';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { GameGrid } from '@/components/game-grid';
import { GameIframe } from './game-iframe';
import { Gamepad2, Info, Joystick } from 'lucide-react';

interface GamePageProps { params: Promise<{ locale: string; slug: string }>; }

export async function generateStaticParams() {
  const allGames = getAllGames();
  const locales = ['en', 'es', 'pt'];
  return locales.flatMap((locale) => allGames.map((game) => ({ locale, slug: game.slug })));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const game = getGameBySlug(slug);
  if (!game) return {};
  const dict = getDictionary(locale as Locale);
  const title = getGameTitle(game, locale as Locale);
  const description = getGameDescription(game, locale as Locale);
  const category = getCategoryLabel(game.category, locale as Locale);
  return {
    title: `${title} - ${dict.siteTitle}`,
    description: `${description} ${dict.playNow}!`,
    keywords: `${title}, ${category}, ${dict.siteTitle}, free games, online games, HTML5 games, juegos gratis, jogos grátis`,
    openGraph: { title: `${title} - ${dict.siteTitle}`, description: `${description} ${dict.playNow}!`, type: 'website', locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US' },
    alternates: { languages: { en: `/en/game/${slug}`, es: `/es/game/${slug}`, pt: `/pt/game/${slug}` } }
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const localeTyped = locale as Locale;
  const dict = getDictionary(localeTyped);
  const title = getGameTitle(game, localeTyped);
  const description = getGameDescription(game, localeTyped);
  const instructions = getGameInstructions(game, localeTyped);
  const categoryLabel = getCategoryLabel(game.category, localeTyped);
  const relatedGames = getRelatedGames(game, 5);
  const colors = categoryColors[game.category];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <AdPlaceholder size="banner" label={dict.adPlaceholder} className="mb-4" />
      <div id="game-frame" className="mb-4 overflow-hidden rounded-xl border border-border bg-black">
        <GameIframe src={game.iframeUrl} title={title} fullscreenLabel={dict.fullscreen} exitLabel={dict.exitFullscreen} />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            <span className="rounded-full px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: colors.from }}>{categoryLabel}</span>
          </div>
          <a href="#game-frame" className="mb-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent/90 hover:shadow-lg active:scale-[0.97]">
            <Gamepad2 className="h-5 w-5" />{dict.playNow}
          </a>
          <section className="mb-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground"><Info className="h-5 w-5 text-primary" />{dict.description}</h2>
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          </section>
          <section className="mb-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground"><Joystick className="h-5 w-5 text-primary" />{dict.controls}</h2>
            <p className="leading-relaxed text-muted-foreground">{instructions}</p>
          </section>
          <div className="mb-6 lg:hidden"><AdPlaceholder size="interstitial" label={dict.adPlaceholder} /></div>
        </div>
        <aside className="w-full shrink-0 space-y-4 lg:w-72">
          <AdPlaceholder size="sidebar" label={dict.adPlaceholder} />
        </aside>
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">{dict.relatedGames}</h2>
        <AdPlaceholder size="banner" label={dict.adPlaceholder} className="mb-6" />
        <GameGrid games={relatedGames} locale={localeTyped} emptyMessage={dict.noResults} />
      </section>
    </div>
  );
}
