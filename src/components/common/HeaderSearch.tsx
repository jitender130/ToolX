import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, FileText, Calculator, Image as ImageIcon, AlignLeft, Code, Wrench } from 'lucide-react';
import { useRouter } from '../../router';
import { ALL_TOOLS } from '../../data/tools';
import { ToolDefinition, ToolCategory } from '../../types';

const CATEGORY_COLORS: Record<ToolCategory, { text: string; bg: string; border: string }> = {
  'pdf-tools': { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' },
  'calculators': { text: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200' },
  'image-tools': { text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  'text-tools': { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  'developer-tools': { text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200' },
  'other-tools': { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

const getCategoryIcon = (category: ToolCategory) => {
  switch (category) {
    case 'pdf-tools':
      return <FileText className="w-3.5 h-3.5 text-rose-600" />;
    case 'calculators':
      return <Calculator className="w-3.5 h-3.5 text-sky-600" />;
    case 'image-tools':
      return <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />;
    case 'text-tools':
      return <AlignLeft className="w-3.5 h-3.5 text-amber-600" />;
    case 'developer-tools':
      return <Code className="w-3.5 h-3.5 text-teal-600" />;
    default:
      return <Wrench className="w-3.5 h-3.5 text-emerald-600" />;
  }
};

export const HeaderSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const { navigate } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Filter tools based on query
  const filteredTools: ToolDefinition[] = query.trim() === ''
    ? ALL_TOOLS.slice(0, 6) // Quick popular preview
    : ALL_TOOLS.filter((t) => {
        const q = query.toLowerCase().trim();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.keywords?.some((k) => k.toLowerCase().includes(q))
        );
      }).slice(0, 8);

  // Global keyboard shortcut (Cmd+K, Ctrl+K, or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is already typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isInput)) {
        e.preventDefault();
        setIsOpen(true);
        if (window.innerWidth < 768) {
          setMobileExpanded(true);
          setTimeout(() => mobileInputRef.current?.focus(), 50);
        } else {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelectTool = (tool: ToolDefinition) => {
    navigate(tool.path);
    setIsOpen(false);
    setMobileExpanded(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelectTool(filteredTools[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setMobileExpanded(false);
      inputRef.current?.blur();
      mobileInputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop & Tablet Inline Search Input */}
      <div className="hidden sm:flex items-center relative">
        <div className="relative w-48 lg:w-64 xl:w-72 transition-all">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search tools..."
            className="w-full pl-9 pr-14 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl transition-all outline-hidden shadow-2xs"
          />

          <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-0.5 text-slate-400 hover:text-slate-600 rounded-sm cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Toggle Icon */}
      <div className="sm:hidden">
        <button
          onClick={() => {
            setMobileExpanded(true);
            setIsOpen(true);
            setTimeout(() => mobileInputRef.current?.focus(), 50);
          }}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Expanded Search Bar Overlay */}
      {mobileExpanded && (
        <div className="sm:hidden fixed inset-x-0 top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 shadow-md animate-in slide-in-from-top duration-150">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search across all 50+ tools..."
                className="w-full pl-9 pr-8 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:border-emerald-500 focus:bg-white outline-hidden"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setMobileExpanded(false);
                setIsOpen(false);
              }}
              className="px-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Dropdown Results Popover */}
      {isOpen && (
        <div className={`fixed sm:absolute left-0 right-0 sm:left-auto sm:right-0 sm:w-96 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 ${
          mobileExpanded ? 'top-14 px-3' : 'top-full'
        }`}>
          {/* Header title */}
          <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>
              {query.trim() === '' ? 'Popular Utilities' : `Matching Tools (${filteredTools.length})`}
            </span>
            <span className="text-[10px] lowercase text-slate-400 font-normal">
              {ALL_TOOLS.length} tools available
            </span>
          </div>

          {/* Results list */}
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-slate-50">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, index) => {
                const isSelected = index === selectedIndex;
                const catStyle = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS['other-tools'];

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 border border-emerald-200/80 shadow-2xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-2">
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${catStyle.bg} ${catStyle.text}`}>
                        {getCategoryIcon(tool.category)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold truncate ${
                            isSelected ? 'text-emerald-950' : 'text-slate-900'
                          }`}>
                            {tool.name}
                          </span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                            {tool.category.replace('-tools', '')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <span>Open</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-60" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-6 text-center">
                <p className="text-xs font-semibold text-slate-700">No tools found matching "{query}"</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Try searching for keywords like "pdf", "image", "compress", "calculate", or "json"
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono">↑</kbd>
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono">↓</kbd>
                <span>Navigate</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono">↵</kbd>
                <span>Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
