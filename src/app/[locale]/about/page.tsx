import type { Metadata } from 'next';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import { Mail, Gamepad2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: `About - ${dict.siteTitle}`, description: `About ${dict.siteTitle} - free online HTML5 games.` };
}

const aboutContent: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  en: {
    title: 'About Us',
    intro: 'Your destination for free online HTML5 games!',
    sections: [
      { h: 'What We Offer', p: 'We provide a curated collection of free HTML5 games that you can play instantly in your browser. No downloads, no installations — just click and play!' },
      { h: 'Our Mission', p: 'Our goal is to bring fun, accessible gaming to everyone around the world. All our games work on desktop, tablet, and mobile devices.' },
      { h: 'Contact', p: 'Have a suggestion or feedback? We\'d love to hear from you! Reach out to us at:' }
    ]
  },
  es: {
    title: 'Acerca de Nosotros',
    intro: '¡Tu destino para juegos HTML5 gratis online!',
    sections: [
      { h: 'Lo que Ofrecemos', p: 'Ofrecemos una colección curada de juegos HTML5 gratuitos que puedes jugar al instante en tu navegador. ¡Sin descargas, sin instalaciones — solo haz clic y juega!' },
      { h: 'Nuestra Misión', p: 'Nuestro objetivo es llevar juegos divertidos y accesibles a todos en todo el mundo. Todos nuestros juegos funcionan en computadoras, tabletas y dispositivos móviles.' },
      { h: 'Contacto', p: '¿Tienes una sugerencia o comentarios? ¡Nos encantaría saber de ti! Escríbenos a:' }
    ]
  },
  pt: {
    title: 'Sobre Nós',
    intro: 'Seu destino para jogos HTML5 gratuitos online!',
    sections: [
      { h: 'O que Oferecemos', p: 'Oferecemos uma coleção selecionada de jogos HTML5 gratuitos que você pode jogar instantaneamente no seu navegador. Sem downloads, sem instalações — apenas clique e jogue!' },
      { h: 'Nossa Missão', p: 'Nosso objetivo é levar jogos divertidos e acessíveis para todos ao redor do mundo. Todos os nossos jogos funcionam em desktop, tablets e dispositivos móveis.' },
      { h: 'Contato', p: 'Tem uma sugestão ou feedback? Adoraríamos ouvir você! Entre em contato pelo e-mail:' }
    ]
  }
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const content = aboutContent[locale] || aboutContent.en;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="mb-2 text-3xl font-bold text-foreground">{content.title}</h1>
        <p className="text-lg text-muted-foreground">{content.intro}</p>
      </div>
      <div className="space-y-6">
        {content.sections.map((section, i) => (
          <section key={i}>
            <h2 className="mb-2 text-xl font-semibold text-foreground">{section.h}</h2>
            <p className="leading-relaxed text-muted-foreground">{section.p}</p>
          </section>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-card p-4">
        <Mail className="h-5 w-5 text-primary" />
        <a href="mailto:contact@playfree.games" className="text-primary hover:underline">contact@playfree.games</a>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        All games hosted on this website are open-source or used under permissive licenses. If you believe any content infringes your rights, please contact us.
      </p>
    </div>
  );
}
