import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useRouter } from '../../router';
import { ALL_TOOLS } from '../../data/tools';
import { ToolDefinition } from '../../types';

interface SearchModalProps {
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const { navigate } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredTools = query.trim() === ''
    ? ALL_TOOLS.slice(0, 6)
    : ALL_TOOLS.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
        );
      }).slice(0, 8);

  const handleSelect = (tool: ToolDefinition) => {
    navigate(tool.path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools by name, action or category (e.g. compress, bmi, json)..."
            className="w-full py-4 px-3 text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[11px] font-mono text-slate-400 px-1.5 py-0.5 border border-slate-200 rounded">ESC</kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredTools.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {query.trim() === '' ? 'Popular Utilities' : `Matching Tools (${filteredTools.length})`}
              </div>
              {filteredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        in {tool.category.replace('-tools', ' Tools')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {tool.shortDescription}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-600 font-medium">No tools found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for terms like "PDF", "resize", "calculate", or "format"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{ALL_TOOLS.length} total browser tools available</span>
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <span className="flex items-center gap-1 font-mono">
              <CornerDownLeft className="w-3 h-3" /> Select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { navigate } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTools = query.trim()
    ? ALL_TOOLS.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (tool: ToolDefinition) => {
    navigate(tool.path);
    setIsFocused(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredTools.length > 0) {
      handleSelect(filteredTools[0]);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center w-full bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
        isFocused ? 'border-emerald-500 ring-4 ring-emerald-500/10 shadow-md' : 'border-slate-300 hover:border-slate-400'
      }`}>
        <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search a tool (e.g. Compress PDF, BMI, Image Resizer, JSON)..."
          className="w-full py-4 pl-3 pr-4 text-slate-900 placeholder-slate-400 text-sm sm:text-base bg-transparent focus:outline-hidden"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-2 mr-2 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Floating Suggestions */}
      {isFocused && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-30 animate-in fade-in duration-100">
          {filteredTools.length > 0 ? (
            <div className="p-1 divide-y divide-slate-100">
              {filteredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-500">
              No direct tool match. Try browsing categories below.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
