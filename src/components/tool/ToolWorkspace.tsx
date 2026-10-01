import React from 'react';
import { Loader2, ShieldCheck, Cpu, Lock, Sparkles } from 'lucide-react';

export interface ToolWorkspaceProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  isExternalApi?: boolean;
  apiProviderName?: string;
  subMessage?: string;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  children,
  className = '',
  isLoading = false,
  loadingMessage = 'Processing with external AI service...',
  isExternalApi = true,
  apiProviderName = 'Secure Cloud AI / Gemini',
  subMessage = 'Zero client-side secrets · In-memory processing · Privacy protected',
}) => {
  return (
    <div className={`relative bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-6 lg:p-8 transition-all ${className}`}>
      {/* External API Loading Overlay & Indicator */}
      {isLoading && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 via-teal-50/90 to-sky-50/90 p-5 shadow-inner animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin" />
                <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {loadingMessage}
                  </h4>
                  {isExternalApi && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600/10 text-emerald-800 rounded-md border border-emerald-300/60">
                      <Cpu className="w-3 h-3 text-emerald-600" />
                      External API
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Connected to <strong className="font-semibold text-emerald-800">{apiProviderName}</strong>. {subMessage}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-900 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-emerald-200/70 self-start sm:self-auto shrink-0 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Backend Encrypted</span>
              </div>
            </div>
          </div>

          {/* Animated progress bar indicator */}
          <div className="mt-3.5 w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full w-2/3 animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* Main workspace contents with subtle dimming when background external request is loading */}
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-85 pointer-events-none sm:pointer-events-auto' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};
