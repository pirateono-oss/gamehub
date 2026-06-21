import type { Metadata } from 'next';
import { isValidLocale, getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return { title: `Privacy Policy - ${dict.siteTitle}`, description: `Privacy policy for ${dict.siteTitle}. How we handle your data.` };
}

const privacyContent: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        h: 'Information We Collect',
        p: 'We do not collect any personal information from our users. Our website uses Google AdSense, which may use cookies to serve personalized ads. No registration or personal data is required to use our games.'
      },
      {
        h: 'Cookies',
        p: 'We use cookies solely for Google AdSense and basic site functionality. Google AdSense uses cookies to serve relevant ads based on your browsing history. You can opt out of personalized advertising by visiting Google Ads Settings.'
      },
      {
        h: 'Third-Party Services',
        p: 'Our website displays ads through Google AdSense, a third-party advertising service. Google may use cookies and web beacons to collect information about your visits to our and other websites to provide relevant advertisements.'
      },
      {
        h: 'Data Security',
        p: 'We do not store, process, or share any personal data. All games run directly in your browser and no data is transmitted to our servers.'
      },
      {
        h: 'Changes to This Policy',
        p: 'We may update this privacy policy from time to time. Any changes will be posted on this page.'
      },
      {
        h: 'Contact',
        p: 'If you have any questions about this privacy policy, please contact us through the About page.'
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    sections: [
      {
        h: 'Información que Recopilamos',
        p: 'No recopilamos información personal de nuestros usuarios. Nuestro sitio web utiliza Google AdSense, que puede usar cookies para mostrar anuncios personalizados. No se requiere registro ni datos personales para usar nuestros juegos.'
      },
      {
        h: 'Cookies',
        p: 'Usamos cookies únicamente para Google AdSense y funcionalidad básica del sitio. Google AdSense utiliza cookies para mostrar anuncios relevantes basados en tu historial de navegación. Puedes optar por no recibir publicidad personalizada en Configuración de Anuncios de Google.'
      },
      {
        h: 'Servicios de Terceros',
        p: 'Nuestro sitio web muestra anuncios a través de Google AdSense. Google puede usar cookies y web beacons para recopilar información sobre tus visitas a nuestro sitio y otros sitios web para proporcionar anuncios relevantes.'
      },
      {
        h: 'Seguridad de Datos',
        p: 'No almacenamos, procesamos ni compartimos datos personales. Todos los juegos se ejecutan directamente en tu navegador y no se transmiten datos a nuestros servidores.'
      },
      {
        h: 'Cambios a Esta Política',
        p: 'Podemos actualizar esta política de privacidad ocasionalmente. Cualquier cambio se publicará en esta página.'
      },
      {
        h: 'Contacto',
        p: 'Si tienes preguntas sobre esta política de privacidad, contáctanos a través de la página Acerca de.'
      }
    ]
  },
  pt: {
    title: 'Política de Privacidade',
    sections: [
      {
        h: 'Informações que Coletamos',
        p: 'Não coletamos informações pessoais de nossos usuários. Nosso site usa o Google AdSense, que pode usar cookies para exibir anúncios personalizados. Nenhum registro ou dado pessoal é necessário para usar nossos jogos.'
      },
      {
        h: 'Cookies',
        p: 'Usamos cookies apenas para o Google AdSense e funcionalidades básicas do site. O Google AdSense usa cookies para exibir anúncios relevantes com base no seu histórico de navegação. Você pode optar por não receber publicidade personalizada nas Configurações de Anúncios do Google.'
      },
      {
        h: 'Serviços de Terceiros',
        p: 'Nosso site exibe anúncios através do Google AdSense. O Google pode usar cookies e web beacons para coletar informações sobre suas visitas ao nosso site e outros sites para fornecer anúncios relevantes.'
      },
      {
        h: 'Segurança de Dados',
        p: 'Não armazenamos, processamos ou compartilhamos dados pessoais. Todos os jogos são executados diretamente no seu navegador e nenhum dado é transmitido aos nossos servidores.'
      },
      {
        h: 'Alterações a Esta Política',
        p: 'Podemos atualizar esta política de privacidade ocasionalmente. Quaisquer alterações serão publicadas nesta página.'
      },
      {
        h: 'Contato',
        p: 'Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco através da página Sobre.'
      }
    ]
  }
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const content = privacyContent[locale] || privacyContent.en;
  const localeTyped = locale as Locale;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">{content.title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        <strong>{dict.siteTitle}</strong> — {dict.siteTagline}
      </p>
      <div className="space-y-6">
        {content.sections.map((section, i) => (
          <section key={i}>
            <h2 className="mb-2 text-xl font-semibold text-foreground">{section.h}</h2>
            <p className="leading-relaxed text-muted-foreground">{section.p}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Last updated: {new Date().toISOString().split('T')[0]}
      </p>
    </div>
  );
}
