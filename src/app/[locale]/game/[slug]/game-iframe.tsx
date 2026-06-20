'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface GameIframeProps {
  src: string;
  title: string;
  fullscreenLabel?: string;
  exitLabel?: string;
}

export function GameIframe({ src, title, fullscreenLabel = 'Fullscreen', exitLabel = 'Exit' }: GameIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => { document.removeEventListener('fullscreenchange', handleFullscreenChange); };
  }, [handleFullscreenChange]);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch { /* not supported */ }
    } else {
      try { await document.exitFullscreen(); } catch { /* ignore */ }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative aspect-video w-full bg-black">
        <iframe src={src} title={title} className="absolute inset-0 h-full w-full border-0" allow="fullscreen; autoplay; gamepad; encrypted-media" allowFullScreen />
      </div>
      <button onClick={toggleFullscreen} className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/90">
        {isFullscreen ? (<><Minimize2 className="h-4 w-4" />{exitLabel}</>) : (<><Maximize2 className="h-4 w-4" />{fullscreenLabel}</>)}
      </button>
    </div>
  );
}
