import React from 'react';
import { HowToStep } from '../../types';

interface HowToUseProps {
  toolName: string;
  steps: HowToStep[];
}

export const HowToUse: React.FC<HowToUseProps> = ({ toolName, steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
        How to Use {toolName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.step}
            className="flex flex-col p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs"
          >
            <div className="text-xs font-bold text-emerald-600 mb-2">
              0{step.step}.
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
              {step.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
