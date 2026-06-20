interface AdPlaceholderProps {
  size: 'banner' | 'sidebar' | 'interstitial';
  label: string;
  className?: string;
}

export function AdPlaceholder({ size, label, className = '' }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: 'h-[90px] w-full',
    sidebar: 'h-[250px] w-full',
    interstitial: 'h-[250px] w-full',
  };

  return (
    <div className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 ${sizeClasses[size]} ${className}`}>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
