import type { MetadataRoute } from 'next';
import { getAllGames } from '@/lib/game-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getAllGames();
  const locales = ['en', 'es', 'pt'];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://juegos-gratis.vercel.app';

  const pages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    pages.push({ url: `${baseUrl}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 });
    for (const game of games) {
      pages.push({ url: `${baseUrl}/${locale}/game/${game.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
    }
  }

  return pages;
}
