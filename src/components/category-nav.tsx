'use client';

import { useRouter } from 'next/navigation';
import type { Locale, Category, TranslationDict } from '@/lib/types';
import { categories, categoryEmojis, categoryColors } from '@/lib/game-utils';

interface CategoryNavProps { locale: Locale; dict: TranslationDict; activeCategory: Category | 'all'; }

export function CategoryNav({ locale, dict, activeCategory }: CategoryNavProps) {
  const router = useRouter();

  const handleCategoryClick = (category: Category | 'all') => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    const query = params.toString();
    router.push(`/${locale}${query ? `?${query}` : ''}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button onClick={() => handleCategoryClick('all')}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
        {dict.all}
      </button>
      {categories.map((cat) => (
        <button key={cat} onClick={() => handleCategoryClick(cat)}
          className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === cat ? 'text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          style={activeCategory === cat ? { backgroundColor: categoryColors[cat].from } : {}}>
          <span>{categoryEmojis[cat]}</span>
          {dict.categories[cat]}
        </button>
      ))}
    </div>
  );
}
