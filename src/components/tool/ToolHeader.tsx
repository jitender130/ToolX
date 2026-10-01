import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

interface ToolHeaderProps {
  title: string;
  description: string;
  categoryName: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  title,
  description,
  categoryName,
}) => {
  return (
    <div className="mb-6 sm:mb-8 text-center sm:text-left">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 mb-2">
        <span className="font-medium text-emerald-700">{categoryName}</span>
        <span aria-hidden="true">·</span>
        <span className="flex items-center gap-1 text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Client-Side Processing
        </span>
        <span aria-hidden="true">·</span>
        <span className="flex items-center gap-1 text-slate-500">
          <Zap className="w-3.5 h-3.5 text-sky-600" />
          Instant & Free
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 balance">
        {title}
      </h1>
      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  );
};
