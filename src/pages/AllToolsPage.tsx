import React, { useState, useEffect } from 'react';
import { updatePageSeo } from '../router';
import { ALL_TOOLS } from '../data/tools';
import { CATEGORY_LIST } from '../data/categories';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { ToolCard } from '../components/tool/ToolCard';
import { getCategoryTheme } from '../utils/categoryTheme';
import { Search, X, Sparkles } from 'lucide-react';
import { ToolCategory } from '../types';

export const AllToolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    updatePageSeo(
      'All Online Tools – Directory of 50+ Productivity Utilities | ToolX',
      'Browse all 50+ free browser tools for PDF management, image manipulation, mathematical calculations, text formatting, and developer workflows.',
      '/tools'
    );
  }, []);

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'All Tools' }]} />

      {/* Header with Colorful Accent */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Full Utilities Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          All Online <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Tools</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Browse our complete directory of 50+ free, client-side productivity utilities with zero server uploads and 100% privacy.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="p-4 sm:p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input with Clear Button */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name or keyword (e.g. compress, bmi, json)..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:border-emerald-500 text-sm focus:outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-500 self-end sm:self-center px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
            Showing <strong className="text-slate-900 tabular-nums">{filteredTools.length}</strong> of {ALL_TOOLS.length} utilities
          </div>
        </div>

        {/* Category Tabs (Segmented controls with Category Color Personalities) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
            }`}
          >
            All Tools ({ALL_TOOLS.length})
          </button>

          {CATEGORY_LIST.map((cat) => {
            const count = ALL_TOOLS.filter((t) => t.category === cat.id).length;
            const theme = getCategoryTheme(cat.id as ToolCategory);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? `${theme.iconBg} text-white shadow-sm`
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">No tools match your query "{searchQuery}"</p>
          <p className="text-xs text-slate-400 mt-1">Try another search term or switch to another category tab</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Ad Placeholder */}
      <AdPlaceholder slot="banner" />
    </div>
  );
};
