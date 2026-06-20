import type { Metadata } from 'next';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import { getAllGames, getGamesByCategory } from '@/lib/game-utils';
import type { Locale, Category } from '@/lib/types';
import { HomePageClient } from './home-page-client';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: dict.siteTitle, description: dict.siteTagline };
}

export default async function HomePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { locale } = await params;
  const { category, search } = await searchParams;

  if (!isValidLocale(locale)) return null;

  const dict = getDictionary(locale as Locale);
  const allGames = getAllGames();
  const filteredByCategory = category
    ? getGamesByCategory(category as Category)
    : allGames;

  const filteredGames = search
    ? filteredByCategory.filter((g) => {
        const title = g.translations[locale as Locale]?.title ?? g.translations.en.title;
        const desc = g.translations[locale as Locale]?.description ?? g.translations.en.description;
        const query = search.toLowerCase();
        return title.toLowerCase().includes(query) || desc.toLowerCase().includes(query) || g.slug.includes(query);
      })
    : filteredByCategory;

  return (
    <HomePageClient
      locale={locale as Locale}
      dict={dict}
      games={filteredGames}
      allGames={allGames}
      activeCategory={(category as Category) || 'all'}
      searchQuery={search}
    />
  );
}
