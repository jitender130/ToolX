import React from 'react';
import { Link } from '../../router';
import { CATEGORY_LIST } from '../../data/categories';
import { getCategoryTheme } from '../../utils/categoryTheme';
import { ShieldCheck, Lock, Sparkles, MapPin, ExternalLink, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-400 mt-24 border-t border-slate-800/80 overflow-hidden">
      {/* Top Radiant Multi-Stop Gradient Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 via-sky-500 via-indigo-500 to-rose-500" />

      {/* Subtle Ambient Background Lighting Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand & Developer Showcase Column (2 columns wide) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-500/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform">
                X
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Tool<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">X</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                  Professional Online Utilities
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Fast, privacy-first online tools processed directly inside your browser. No software installation, no subscription paywalls, and zero cloud uploads for sensitive documents.
            </p>

            {/* Trust Assurances */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% In-Browser</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero Server Logs</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Free Forever</span>
              </div>
            </div>

            {/* Developer Verified Profile Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-emerald-500/40 transition-all max-w-sm">
              <Link to="/developer" className="flex items-center gap-3 group">
                <img
                  src="/developer.png"
                  alt="Jitender - Creator & Web Developer of ToolX"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/40 shrink-0 group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://iili.io/naSKKIS.png';
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      Jitender
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      Creator
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Churu, Rajasthan, India</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Categories Column */}
          <nav aria-label="Tool Categories" className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tool Categories
            </h3>
            <ul className="space-y-2.5 text-xs">
              {CATEGORY_LIST.map((cat) => {
                const theme = getCategoryTheme(cat.id);
                return (
                  <li key={cat.id}>
                    <Link
                      to={cat.path}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.iconBg} group-hover:scale-125 transition-transform`} />
                      <span>{cat.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Popular Tools Column */}
          <nav aria-label="Popular Tools" className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Trending Utilities
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/image-tools/background-remover" className="text-slate-400 hover:text-white transition-colors">
                  AI Background Remover
                </Link>
              </li>
              <li>
                <Link to="/pdf-tools/compress-pdf" className="text-slate-400 hover:text-white transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/pdf-tools/merge-pdf" className="text-slate-400 hover:text-white transition-colors">
                  Merge PDF Documents
                </Link>
              </li>
              <li>
                <Link to="/image-tools/image-compressor" className="text-slate-400 hover:text-white transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/calculators/bmi-calculator" className="text-slate-400 hover:text-white transition-colors">
                  BMI Health Calculator
                </Link>
              </li>
              <li>
                <Link to="/developer-tools/json-formatter" className="text-slate-400 hover:text-white transition-colors">
                  JSON Beautifier &amp; Validator
                </Link>
              </li>
              <li>
                <Link to="/other-tools/qr-code-generator" className="text-slate-400 hover:text-white transition-colors">
                  QR Code Generator
                </Link>
              </li>
            </ul>
          </nav>

          {/* Platform & Legal Navigation Column */}
          <nav aria-label="Company and Legal Links" className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/tools" className="text-slate-400 hover:text-white transition-colors">
                  All 50+ Tools Directory
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Productivity Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About ToolX
                </Link>
              </li>
              <li>
                <Link to="/developer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Developer (Jitender)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ToolX. Built with precision for privacy and performance by Jitender.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
            <span>·</span>
            <Link to="/developer" className="hover:text-emerald-400 transition-colors">Developer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
