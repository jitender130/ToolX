import React from 'react';
import { Link } from '../../router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ToolDefinition } from '../../types';
import { ToolCard } from './ToolCard';

interface RelatedToolsProps {
  tools: ToolDefinition[];
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Recommended Workflow</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Related Tools
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore similar utilities to speed up your workflow</p>
        </div>
        <Link
          to="/tools"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group"
        >
          <span>View All Tools</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};
