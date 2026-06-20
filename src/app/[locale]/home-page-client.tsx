'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale, Category, Game, TranslationDict } from '@/lib/types';
import { CategoryNav } from '@/components/category-nav';
import { GameGrid } from '@/components/game-grid';
import { Search, Sparkles } from 'lucide-react';

interface HomePageClientProps {
  locale: Locale;
  dict: TranslationDict;
  games: Game[];
  allGames: Game[];
  activeCategory: Category | 'all';
  searchQuery: string;
}

export function HomePageClient({ locale, dict, games, activeCategory, searchQuery }: HomePageClientProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (localSearch.trim()) params.set('search', localSearch.trim());
    if (activeCategory !== 'all') params.set('category', activeCategory);
    const query = params.toString();
    router.push(`/${locale}${query ? `?${query}` : ''}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <section className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
          <Sparkles className="mr-2 inline-block h-7 w-7 text-accent" />
          {dict.siteTitle}
        </h1>
        <p className="mb-6 text-muted-foreground">{dict.siteTagline}</p>
        <form onSubmit={handleSearch} className="mx-auto max-w-lg md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder={dict.searchPlaceholder}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </form>
      </section>
      <section className="mb-6">
        <CategoryNav locale={locale} dict={dict} activeCategory={activeCategory} />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          {activeCategory === 'all' ? dict.allGames : dict.categories[activeCategory as Category]}
          <span className="ml-2 text-sm font-normal text-muted-foreground">({games.length})</span>
        </h2>
        <GameGrid games={games} locale={locale} emptyMessage={dict.noResults} />
      </section>
    </div>
  );
}
