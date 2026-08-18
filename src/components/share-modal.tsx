'use client';
import { useState } from 'react';
import { X, Copy, Check, MessageCircle, Facebook, Twitter, Send, Mail } from 'lucide-react';
import type { GameScore } from '@/lib/user-system';
import { buildShareText } from '@/lib/user-system';

interface ShareModalProps {
  score: GameScore;
  onClose: () => void;
}

const PLATFORMS = [
  { key: 'whatsapp', name: 'WhatsApp', color: '#25D366', icon: '💬', url: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}` },
  { key: 'facebook', name: 'Facebook', color: '#1877F2', icon: '📘', url: (text: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://gamehub-o2tf.vercel.app')}&quote=${encodeURIComponent(text)}` },
  { key: 'twitter', name: 'X / Twitter', color: '#000000', icon: '🐦', url: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}` },
  { key: 'telegram', name: 'Telegram', color: '#0088cc', icon: '✈️', url: (text: string) => `https://t.me/share/url?url=${encodeURIComponent('https://gamehub-o2tf.vercel.app')}&text=${encodeURIComponent(text)}` },
  { key: 'email', name: 'Email', color: '#EA4335', icon: '📧', url: (text: string) => `mailto:?subject=${encodeURIComponent('Mi puntuación')}&body=${encodeURIComponent(text + '\n\nhttps://gamehub-o2tf.vercel.app')}` },
];

export function ShareModal({ score, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const text = buildShareText(score);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">📤 Compartir</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>

        <div className="mb-4 rounded-xl bg-secondary/50 p-3 text-sm leading-relaxed text-foreground">
          {text}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map(p => (
            <a key={p.key} href={p.url(text)} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary/80">
              <span className="text-xl">{p.icon}</span> {p.name}
            </a>
          ))}
        </div>

        <button onClick={handleCopy} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          {copied ? <><Check className="h-4 w-4" /> ¡Copiado!</> : <><Copy className="h-4 w-4" /> Copiar texto</>}
        </button>
      </div>
    </div>
  );
}
