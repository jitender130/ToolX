import React from 'react';

interface AdPlaceholderProps {
  slot?: 'banner' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slot = 'banner',
  className = '',
}) => {
  const heightClasses = {
    banner: 'h-24 sm:h-28 max-w-4xl',
    rectangle: 'h-64 max-w-sm',
    'in-feed': 'h-32 max-w-3xl',
  }[slot];

  return (
    <div
      className={`mx-auto w-full my-8 ${heightClasses} ${className} flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center transition-colors`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400">
        Advertisement Space
      </span>
      <p className="mt-1 text-xs text-slate-400">
        Reserved for future sponsor content
      </p>
    </div>
  );
};
