'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale, TranslationDict } from '@/lib/types';
import { locales, localeNames } from '@/lib/i18n';
import { Search, Globe, Gamepad2, Menu, X } from 'lucide-react';

interface HeaderProps { locale: Locale; dict: TranslationDict; }

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/${locale}?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold text-primary">
          <Gamepad2 className="h-7 w-7" /><span className="hidden sm:inline">{dict.siteTitle}</span>
        </Link>
        <form onSubmit={handleSearch} className="mx-4 hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={dict.searchPlaceholder}
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </form>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Globe className="h-4 w-4" /><span className="hidden sm:inline">{localeNames[locale]}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-card p-1 shadow-lg">
                {locales.map((loc) => (
                  <Link key={loc} href={`/${loc}`} onClick={() => setLangOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${loc === locale ? 'bg-primary/10 font-medium text-primary' : 'text-foreground'}`}>
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary md:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={dict.searchPlaceholder}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
