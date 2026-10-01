import React from 'react';
import { Link } from '../../router';
import { ToolDefinition } from '../../types';
import { getCategoryTheme } from '../../utils/categoryTheme';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: ToolDefinition;
  showCategoryBadge?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  showCategoryBadge = true,
}) => {
  const theme = getCategoryTheme(tool.category);
  const Icon = theme.icon;

  return (
    <article className="h-full">
      <Link
        to={tool.path}
        className={`group relative flex flex-col justify-between h-full p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 overflow-hidden ${theme.cardBorderHover} hover:-translate-y-1`}
      >
        {/* Top Accent Gradient Line */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${theme.topStrip} opacity-80 group-hover:opacity-100 transition-opacity`} />

        {/* Ambient Top Glow on Hover */}
        <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${theme.cardGlow} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-300`} />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            {/* Category Icon with bespoke gradient */}
            <div className={`w-9 h-9 rounded-xl ${theme.iconBg} text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200`}>
              <Icon className="w-4 h-4" />
            </div>

            {/* Quiet Category Tag */}
            {showCategoryBadge && (
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                {theme.badgeName}
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug">
            {tool.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {tool.shortDescription}
          </p>
        </div>

        {/* Action Link Footer */}
        <div className="relative z-10 mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs font-semibold">
          <span className={`flex items-center gap-1 ${theme.accentText} group-hover:underline underline-offset-2`}>
            Launch Tool
          </span>
          <div className={`w-6 h-6 rounded-lg ${theme.badgeBg} flex items-center justify-center ${theme.accentText} group-hover:translate-x-1 transition-transform duration-200`}>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </article>
  );
};
