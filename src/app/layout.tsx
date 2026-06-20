import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PlayFree Games',
  description: 'Free online HTML5 games - Play now!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
