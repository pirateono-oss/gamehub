import type { Metadata } from 'next';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import { Mail, MessageSquare, Github } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: `Contact - ${dict.siteTitle}` };
}

const contactContent: Record<string, { title: string; intro: string; email: string }> = {
  en: { title: 'Contact Us', intro: 'Have a question, suggestion, or feedback? We\'d love to hear from you!', email: 'contact@playfree.games' },
  es: { title: 'Contacto', intro: '¿Tienes una pregunta, sugerencia o comentario? ¡Nos encantaría saber de ti!', email: 'contact@playfree.games' },
  pt: { title: 'Contato', intro: 'Tem uma pergunta, sugestão ou feedback? Adoraríamos ouvir você!', email: 'contact@playfree.games' },
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const content = contactContent[locale] || contactContent.en;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="mb-2 text-3xl font-bold text-foreground">{content.title}</h1>
        <p className="text-muted-foreground">{content.intro}</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
          <MessageSquare className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Email</p>
            <a href={`mailto:${content.email}`} className="text-sm text-primary hover:underline">{content.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
