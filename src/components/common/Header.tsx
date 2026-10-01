import React, { useState } from 'react';
import { Link, useRouter } from '../../router';
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { HeaderSearch } from './HeaderSearch';
import { CATEGORY_LIST } from '../../data/categories';
import { getCategoryTheme } from '../../utils/categoryTheme';

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        {/* Top Radiant Multi-Stop Gradient Strip */}
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 via-sky-500 via-indigo-500 to-rose-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Zone 1: Brand Wordmark with Vibrant Dynamic Icon */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-emerald-500/25 ring-2 ring-emerald-500/20 group-hover:scale-105 group-hover:rotate-1 transition-all duration-200">
                  <span className="text-xl tracking-tighter">X</span>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Tool<span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">X</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100/80 text-emerald-800 rounded-md">PRO</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 -mt-1 hidden sm:block">
                    Free Browser Utilities
                  </span>
                </div>
              </Link>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600">
              <Link 
                to="/" 
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-emerald-600 ${
                  pathname === '/' ? 'text-emerald-600 font-bold' : ''
                }`}
              >
                <span>Home</span>
                {pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                )}
              </Link>

              <Link 
                to="/tools" 
                aria-current={pathname === '/tools' ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-emerald-600 ${
                  pathname === '/tools' ? 'text-emerald-600 font-bold' : ''
                }`}
              >
                <span>All Tools</span>
                {pathname === '/tools' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                )}
              </Link>
              
              {/* Category Dropdown with colorful badges */}
              <div className="relative" onMouseLeave={() => setCategoryMenuOpen(false)}>
                <button
                  type="button"
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  onMouseEnter={() => setCategoryMenuOpen(true)}
                  className={`flex items-center gap-1.5 transition-colors hover:text-emerald-600 py-2 cursor-pointer ${
                    pathname.includes('-tools') || pathname === '/calculators' ? 'text-emerald-600 font-bold' : ''
                  }`}
                  aria-expanded={categoryMenuOpen}
                  aria-haspopup="true"
                  aria-label="Toggle tool categories menu"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryMenuOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>

                {categoryMenuOpen && (
                  <div 
                    className="absolute top-full -left-4 w-72 pt-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => setCategoryMenuOpen(true)}
                  >
                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-2 space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Tool Suites
                      </div>
                      {CATEGORY_LIST.map((cat) => {
                        const theme = getCategoryTheme(cat.id);
                        const Icon = theme.icon;
                        const isCurrent = pathname === cat.path;

                        return (
                          <Link
                            key={cat.id}
                            to={cat.path}
                            onClick={() => setCategoryMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-150 ${
                              isCurrent
                                ? `${theme.badgeBg} ${theme.badgeText} shadow-2xs`
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg ${theme.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold truncate">{cat.name}</div>
                              <div className="text-[10px] text-slate-400 truncate">{theme.badgeName}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/blog" 
                aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-emerald-600 ${
                  pathname.startsWith('/blog') ? 'text-emerald-600 font-bold' : ''
                }`}
              >
                <span>Blog</span>
                {pathname.startsWith('/blog') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                )}
              </Link>

              <Link 
                to="/developer" 
                aria-current={pathname === '/developer' ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-emerald-600 flex items-center gap-1.5 ${
                  pathname === '/developer' ? 'text-emerald-600 font-bold' : ''
                }`}
              >
                <span>Developer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </Link>

              <Link 
                to="/about" 
                aria-current={pathname === '/about' ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-emerald-600 ${
                  pathname === '/about' ? 'text-emerald-600 font-bold' : ''
                }`}
              >
                <span>About</span>
              </Link>
            </nav>

            {/* Zone 3: Global Search, Colorful CTA Button & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <HeaderSearch />

              <Link
                to="/tools"
                className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-sm shadow-emerald-500/25 hover:shadow-md hover:shadow-emerald-500/30 transition-all cursor-pointer group"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Explore 50+ Tools</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <nav aria-label="Mobile Navigation" className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:text-emerald-600 hover:bg-slate-50 rounded-xl"
              >
                <span>Home</span>
              </Link>
              <Link
                to="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-800 hover:text-emerald-600 hover:bg-slate-50 rounded-xl"
              >
                <span>All Tools Directory (50+)</span>
              </Link>
              
              <div className="pt-2 pb-1">
                <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Categories</span>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  {CATEGORY_LIST.map((cat) => {
                    const theme = getCategoryTheme(cat.id);
                    const Icon = theme.icon;
                    return (
                      <Link
                        key={cat.id}
                        to={cat.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder}`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 space-y-1">
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
                >
                  Blog
                </Link>
                <Link
                  to="/developer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-medium text-emerald-700 font-semibold hover:bg-slate-50 rounded-lg"
                >
                  About Developer (Jitender)
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
                >
                  About ToolX
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
                >
                  Contact Support
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
