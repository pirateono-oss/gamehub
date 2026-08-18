import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'PlayFree Games',
  description: 'Free online HTML5 games - Play now!',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
    apple: [{ url: '/icon-192.png', sizes: '192x192' }],
  },
  openGraph: {
    title: 'PlayFree Games - Free Online Games',
    description: 'Play free HTML5 games online. No downloads, no registration.',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9162356987197971"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta name="google-site-verification" content="N3g3DnG2PKK-vVpA_1Bxd8PkcJILzL2kaqvQq7_yiMU" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
