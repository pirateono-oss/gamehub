import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import { getGameBySlug, getGameTitle, getGameDescription, getGameInstructions, getGameGuide, getCategoryLabel, getRelatedGames, categoryColors, getAllGames } from '@/lib/game-utils';
import type { Locale } from '@/lib/types';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { GameGrid } from '@/components/game-grid';
import { GameIframe } from './game-iframe';
import { ScoreReporter } from './score-reporter';
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
  const guide = getGameGuide(game, localeTyped);
  const categoryLabel = getCategoryLabel(game.category, localeTyped);
  const relatedGames = getRelatedGames(game, 5);
  const colors = categoryColors[game.category];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <ScoreReporter gameSlug={game.slug} gameTitle={title} locale={localeTyped} />
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
          {guide && (
          <section className="mb-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">📖 Guide & Tips</h2>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 leading-relaxed text-foreground whitespace-pre-line">
              {guide.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
            </div>
          </section>
          )}
          <div className="mb-6 lg:hidden"><AdPlaceholder size="interstitial" label={dict.adPlaceholder} /></div>
        </div>
        <aside className="w-full shrink-0 space-y-4 lg:w-72">
          <AdPlaceholder size="sidebar" label={dict.adPlaceholder} />
        </aside>
      </div>
      
      {/* FAQ */}
      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">❓ FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">🎮 How to play {title}?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{instructions} The game starts immediately when the page loads. Use touch or mouse controls if you are on a mobile device.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">📱 Can I play on mobile?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Yes! All our games are HTML5 and work perfectly on smartphones and tablets. Just open the page in your browser and start playing.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">🆓 Is it free?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Absolutely. All games on {dict.siteTitle} are completely free to play. No downloads, no registration required. Just click and play!</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">🌐 Why do some games have ads?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">We display ads to keep the site running and maintain our collection of free games. Ads help us pay for hosting and add more games regularly.</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">{dict.relatedGames}</h2>
        <AdPlaceholder size="banner" label={dict.adPlaceholder} className="mb-6" />
        <GameGrid games={relatedGames} locale={localeTyped} dict={dict} emptyMessage={dict.noResults} />
      </section>
    </div>
  );
}
