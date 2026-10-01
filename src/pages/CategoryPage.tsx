import React, { useState, useEffect } from 'react';
import { Link, updatePageSeo } from '../router';
import { CategoryDefinition, ToolCategory } from '../types';
import { ALL_TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { FAQSection } from '../components/tool/FAQSection';
import { ToolCard } from '../components/tool/ToolCard';
import { getCategoryTheme } from '../utils/categoryTheme';
import { Search, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface CategoryPageProps {
  category: CategoryDefinition;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [search, setSearch] = useState('');
  const theme = getCategoryTheme(category.id);
  const Icon = theme.icon;

  const tools = ALL_TOOLS.filter((t) => t.category === category.id);
  const filteredTools = tools.filter((t) => {
    const q = search.toLowerCase().trim();
    return (
      q === '' ||
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    updatePageSeo(
      `${category.h1} – ToolX`,
      category.shortDescription,
      category.path
    );
  }, [category]);

  const relatedCategories = category.relatedCategoryIds.map((id) => CATEGORIES[id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: category.name }]} />

      {/* Category Hero Banner with Vibrant Signature Accent */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Top Accent Gradient Line */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${theme.topStrip}`} />
        
        {/* Subtle Ambient Orb */}
        <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${theme.cardGlow} rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-bold rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder}`}>
                <Icon className="w-3.5 h-3.5" />
                <span>{category.name}</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% In-Browser
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-sky-600" /> Free &amp; Unlimited
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 balance">
              {category.h1}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {category.detailedDescription}
            </p>
          </div>

          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className={`w-24 h-24 rounded-3xl ${theme.iconBg} text-white flex items-center justify-center shadow-xl shadow-slate-200`}>
              <Icon className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search within ${category.name}...`}
            className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-emerald-500 text-sm focus:outline-hidden shadow-2xs transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <span className="text-xs text-slate-500 font-semibold px-3 py-1.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs self-end sm:self-auto">
          Showing <strong className="text-slate-900 tabular-nums">{filteredTools.length}</strong> {category.name}
        </span>
      </div>

      {/* Tool Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategoryBadge={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-sm font-bold text-slate-800">No {category.name} match "{search}"</p>
          <button
            onClick={() => setSearch('')}
            className="mt-3 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Ad Placeholder */}
      <AdPlaceholder slot="banner" />

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200/70">
          <h2 className="text-lg font-bold text-slate-900">Explore Related Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCategories.map((relCat) => {
              const relTheme = getCategoryTheme(relCat.id);
              const RelIcon = relTheme.icon;

              return (
                <Link
                  key={relCat.id}
                  to={relCat.path}
                  className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${relTheme.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                      <RelIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                        {relCat.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {ALL_TOOLS.filter((t) => t.category === relCat.id).length} Utilities
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Category FAQs */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="pt-4">
          <FAQSection
            title={`Frequently Asked Questions About ${category.name}`}
            faqs={category.faqs}
          />
        </section>
      )}
    </div>
  );
};
