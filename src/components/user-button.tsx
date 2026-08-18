'use client';
import { useState, useEffect } from 'react';
import { User, Trophy, X, Check } from 'lucide-react';
import { getUser, saveUser, clearUser, getAvatarList, type UserProfile } from '@/lib/user-system';
import Link from 'next/link';

export function UserButton() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('🦊');

  useEffect(() => {
    const u = getUser();
    setUser(u);
    if (u) { setNickname(u.nickname); setAvatar(u.avatar); }
  }, []);

  const handleSave = () => {
    const name = nickname.trim() || 'Jugador';
    const profile = { nickname: name, avatar, createdAt: Date.now() };
    saveUser(profile);
    setUser(profile);
    setOpen(false);
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
    setNickname('');
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
        {user ? <span className="flex items-center gap-1.5">{user.avatar} <span className="hidden sm:inline">{user.nickname}</span></span> : <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> <span className="hidden sm:inline">Jugador</span></span>}
      </button>
      <Link href={`/${typeof window !== 'undefined' && window.location.pathname.split('/')[1] || 'es'}/ranking`} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
        <Trophy className="h-4 w-4" /> <span className="hidden sm:inline">Ranking</span>
      </Link>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{user ? 'Tu perfil' : 'Crear perfil'}</h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Apodo</label>
            <input value={nickname} onChange={e => setNickname(e.target.value)} maxLength={16}
              className="mb-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" placeholder="Tu nombre" />
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Avatar</label>
            <div className="mb-6 grid grid-cols-6 gap-2">
              {getAvatarList().map(a => (
                <button key={a} onClick={() => setAvatar(a)}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-all ${avatar === a ? 'bg-primary/15 ring-2 ring-primary' : 'bg-secondary hover:bg-secondary/70'}`}>
                  {a}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Check className="h-4 w-4" /> Guardar
              </button>
              {user && (
                <button onClick={handleLogout} className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium hover:bg-secondary/80">Salir</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
