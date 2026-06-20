export type Locale = 'en' | 'es' | 'pt';

export type Category = 'puzzle' | 'action' | 'casual' | 'sports' | 'strategy';

export type TranslationDict = {
  siteTitle: string;
  siteTagline: string;
  search: string;
  searchPlaceholder: string;
  allGames: string;
  categories: Record<Category, string>;
  playNow: string;
  relatedGames: string;
  howToPlay: string;
  description: string;
  adPlaceholder: string;
  noResults: string;
  language: string;
  home: string;
  all: string;
  gameOver: string;
  controls: string;
  fullscreen: string;
  exitFullscreen: string;
  allRightsReserved: string;
};

export type GameTranslation = {
  title: string;
  description: string;
  instructions: string;
};

export type Game = {
  slug: string;
  category: Category;
  iframeUrl: string;
  thumbnailEmoji: string;
  translations: Record<Locale, GameTranslation>;
};
