'use client';
import { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  size: 'banner' | 'sidebar' | 'interstitial';
  label: string;
  className?: string;
}

export function AdPlaceholder({ size, label, className = '' }: AdPlaceholderProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const isProd = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');

  useEffect(() => {
    if (!adRef.current || !isProd) return;
    try {
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', 'ca-pub-9162356987197971');

      if (size === 'banner') {
        ins.setAttribute('data-ad-slot', '1234567890');
        ins.setAttribute('data-ad-format', 'horizontal');
        ins.style.width = '728px';
        ins.style.height = '90px';
      } else if (size === 'sidebar') {
        ins.setAttribute('data-ad-slot', '1234567891');
        ins.setAttribute('data-ad-format', 'vertical');
        ins.style.width = '300px';
        ins.style.height = '250px';
      } else {
        ins.setAttribute('data-ad-slot', '1234567892');
        ins.setAttribute('data-ad-format', 'rectangle');
        ins.style.width = '300px';
        ins.style.height = '250px';
      }

      adRef.current.innerHTML = '';
      adRef.current.appendChild(ins);
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [size, isProd]);

  if (!isProd) {
    const sizeClasses = {
      banner: 'h-[90px] w-full max-w-[728px]',
      sidebar: 'h-[250px] w-full max-w-[300px]',
      interstitial: 'h-[250px] w-full max-w-[300px]',
    };
    return (
      <div className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 ${sizeClasses[size]} ${className}`}>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    );
  }

  return <div ref={adRef} className={className} />;
}
