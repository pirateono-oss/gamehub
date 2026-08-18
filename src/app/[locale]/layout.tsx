import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/header';
import { SiteNetworkFooter } from '@/components/site-network-footer';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const seoDesc: Record<string, string> = {
    en: 'Play 48+ free HTML5 games online! No downloads, no registration. Puzzle, action, sports, strategy and casual games updated regularly.',
    es: '¡Juega 48+ juegos HTML5 gratis online! Sin descargas, sin registro. Juegos de puzzle, acción, deportes, estrategia y casuales actualizados regularmente.',
    pt: 'Jogue 48+ jogos HTML5 grátis online! Sem downloads, sem registro. Jogos de quebra-cabeça, ação, esportes, estratégia e casuais atualizados regularmente.',
  };
  return {
    title: dict.siteTitle,
    description: seoDesc[locale] || seoDesc.en,
    keywords: 'juegos gratis online, jogos grátis, free online games, html5 games, juegos html5, jogos html5',
    openGraph: { title: dict.siteTitle, description: seoDesc[locale] || seoDesc.en, type: 'website' },
    alternates: {
      languages: {
        'en': '/en',
        'es': '/es',
        'pt': '/pt',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <SiteNetworkFooter locale={locale as Locale} />
    </>
  );
}
