import Link from 'next/link';
import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/header';
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
  return { title: dict.siteTitle, description: dict.siteTagline };
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
    <html lang={locale}>
      <body className="font-sans antialiased">
        <Header locale={locale as Locale} dict={dict} />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-2 flex items-center justify-center gap-4">
              <Link href={`/${locale}`} className="hover:text-foreground transition-colors">{dict.home}</Link>
              <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">About</Link>
              <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
            <p>&copy; 2025 {dict.siteTitle}. {dict.allRightsReserved}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
