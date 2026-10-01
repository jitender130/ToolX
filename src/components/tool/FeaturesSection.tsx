import React from 'react';
import { Check } from 'lucide-react';

interface FeaturesSectionProps {
  toolName: string;
  features: string[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ toolName, features }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
        Features of {toolName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-2xs"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
