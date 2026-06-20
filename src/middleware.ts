import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLocales, defaultLocale, isValidLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  let detectedLocale: Locale = defaultLocale;

  if (acceptLanguage) {
    const parsedLocales = acceptLanguage
      .split(',')
      .map((entry) => {
        const lang = entry.split(';')[0].trim().toLowerCase();
        return lang.split('-')[0];
      });

    for (const parsed of parsedLocales) {
      if (isValidLocale(parsed)) {
        detectedLocale = parsed;
        break;
      }
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
