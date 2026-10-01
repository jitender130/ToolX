import React, { useEffect } from 'react';
import { Link } from '../router';
import { HeroSearchBar } from '../components/common/SearchBar';
import { CATEGORY_LIST } from '../data/categories';
import { POPULAR_TOOLS, ALL_TOOLS } from '../data/tools';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { FAQSection } from '../components/tool/FAQSection';
import { ToolCard } from '../components/tool/ToolCard';
import { updatePageSeo } from '../router';
import { getCategoryTheme } from '../utils/categoryTheme';
import {
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Sliders,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'ToolX – Free Online Developer & Utility Tools | Fast & Private',
      'ToolX provides 50+ free online tools for developers, students, creators, and everyday users. PDF editing, image background removal, calculators, and formatters with 100% privacy.',
      '/'
    );
  }, []);

  const DevIcon = getCategoryTheme('developer-tools').icon;
  const PdfIcon = getCategoryTheme('pdf-tools').icon;
  const ImgIcon = getCategoryTheme('image-tools').icon;
  const CalcIcon = getCategoryTheme('calculators').icon;
  const TextIcon = getCategoryTheme('text-tools').icon;
  const UtilIcon = getCategoryTheme('other-tools').icon;

  const homepageFaqs = [
    {
      question: 'What is ToolX?',
      answer:
        'ToolX is an all-in-one free online platform featuring 50+ browser-based utilities for PDF editing, image processing, developer formatters, financial calculators, and daily digital tasks.',
    },
    {
      question: 'Are ToolX tools free?',
      answer:
        'Yes, every single tool on ToolX is 100% free with no subscriptions, credit cards, usage limits, or hidden fees required.',
    },
    {
      question: 'What tools are available on ToolX?',
      answer:
        'ToolX includes PDF compressors, mergers, and splitters; image background removers, resizers, and compressors; JSON, SQL, and code formatters; BMI, age, and loan EMI calculators; and word counters and digital signature utilities.',
    },
    {
      question: 'Can I use ToolX on mobile?',
      answer:
        'Yes, ToolX is fully responsive and optimized for mobile devices, including Android smartphones, iPhones, and tablets, with no app download required.',
    },
    {
      question: 'Do I need to install software to use ToolX?',
      answer:
        'No, all ToolX utilities run directly inside your web browser using HTML5 and client-side processing, so you never need to install software, plugins, or extensions.',
    },
    {
      question: 'Is my data private and secure on ToolX?',
      answer:
        'Yes, ToolX processes your files, images, and calculations locally inside your browser memory. Your documents and data are never saved, tracked, or uploaded to external servers.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-14 relative overflow-hidden">
      {/* Ambient Glowing Orbs in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 via-sky-300/15 to-violet-400/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-96 -left-32 w-80 h-80 bg-rose-400/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-96 -right-32 w-80 h-80 bg-indigo-400/10 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Section with exactly ONE semantic H1 and substantive opening text */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Glowing Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-slate-800 bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-full shadow-xs hover:border-emerald-300 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-700 bg-clip-text text-transparent">
            50+ Free Browser Utilities · 100% Client-Side Privacy
          </span>
        </div>

        {/* Semantic H1 with Vibrant Colored Gradient Emphasis */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          ToolX – <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">Free Online Developer</span> &amp; Utility Tools
        </h1>

        {/* Substantive Paragraph for Crawlers & Users */}
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          ToolX provides free online tools for developers, students, creators, and everyday users. From PDF merging and image background removal to financial calculators, data formatters, and unit converters, every utility runs directly in your browser with complete privacy and zero installation.
        </p>

        {/* Prominent Search Bar with Glowing Aura */}
        <div className="pt-2">
          <HeroSearchBar />

          {/* Quick Access Pills with Category Color Dots */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Access:
            </span>
            <Link
              to="/image-tools/background-remover"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-violet-50 text-violet-700 border border-violet-200/70 rounded-full transition-all shadow-2xs hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              <span>Background Remover</span>
            </Link>
            <Link
              to="/pdf-tools/compress-pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200/70 rounded-full transition-all shadow-2xs hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Compress PDF</span>
            </Link>
            <Link
              to="/calculators/bmi-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200/70 rounded-full transition-all shadow-2xs hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>BMI Calculator</span>
            </Link>
            <Link
              to="/developer-tools/json-formatter"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200/70 rounded-full transition-all shadow-2xs hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>JSON Formatter</span>
            </Link>
            <Link
              to="/other-tools/qr-code-generator"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/70 rounded-full transition-all shadow-2xs hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
              <span>QR Code Generator</span>
            </Link>
          </div>
        </div>

        {/* High-Impact Stat / Trust Badges Bar */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3 sm:p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-base font-extrabold text-slate-900 leading-tight">50+ Tools</div>
              <div className="text-[11px] text-slate-500 font-medium">100% Free Forever</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-cyan-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-base font-extrabold text-slate-900 leading-tight">Zero Cloud</div>
              <div className="text-[11px] text-slate-500 font-medium">Client-Side Privacy</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-violet-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-base font-extrabold text-slate-900 leading-tight">Neural AI</div>
              <div className="text-[11px] text-slate-500 font-medium">Remove.bg &amp; WASM</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-base font-extrabold text-slate-900 leading-tight">No Installs</div>
              <div className="text-[11px] text-slate-500 font-medium">Instant Mobile Web</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section with Colorful Cards */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/70 mb-2">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Trending Utilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Popular Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              The most frequented tools used by over thousands of creators and developers daily.
            </p>
          </div>

          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 hover:text-emerald-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs group self-start sm:self-auto"
          >
            <span>Explore All 50+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Popular Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {POPULAR_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Ad Placeholder 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="banner" />
      </section>

      {/* What can you do with ToolX? (Core Capability Breakdown for Crawlers & Users) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Comprehensive Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            What can you do with ToolX?
          </h2>
          <p className="text-xs sm:text-base text-slate-500 mt-2">
            ToolX organizes dozens of free, high-performance web tools across six core productivity categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category 1: Developer Tools */}
          <article className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <DevIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-sky-700 transition-colors">
                Developer Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Format, validate, and minify JSON, SQL, HTML, CSS, JavaScript, and generate UUIDs or base64 hashes instantly.
              </p>

              {/* Quick links */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <Link to="/developer-tools/json-formatter" className="text-[11px] font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg transition-colors">
                  JSON Formatter
                </Link>
                <Link to="/developer-tools/base64-encode-decode" className="text-[11px] font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg transition-colors">
                  Base64
                </Link>
                <Link to="/developer-tools/url-encoder-decoder" className="text-[11px] font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg transition-colors">
                  URL Tool
                </Link>
              </div>
            </div>

            <Link
              to="/developer-tools"
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-sky-700 hover:text-sky-800 group-hover:underline underline-offset-4"
            >
              <span>Explore Developer Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>

          {/* Category 2: PDF Tools */}
          <article className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-rose-300 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center mb-4 shadow-md shadow-rose-500/20 group-hover:scale-110 transition-transform">
                <PdfIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-rose-700 transition-colors">
                PDF Management Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Compress, merge, split, rotate, organize, and convert PDF documents in client-side memory without server uploads.
              </p>

              {/* Quick links */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <Link to="/pdf-tools/compress-pdf" className="text-[11px] font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors">
                  Compress PDF
                </Link>
                <Link to="/pdf-tools/merge-pdf" className="text-[11px] font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors">
                  Merge PDF
                </Link>
                <Link to="/pdf-tools/split-pdf" className="text-[11px] font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors">
                  Split PDF
                </Link>
              </div>
            </div>

            <Link
              to="/pdf-tools"
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-rose-700 hover:text-rose-800 group-hover:underline underline-offset-4"
            >
              <span>Explore PDF Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>

          {/* Category 3: Image Tools */}
          <article className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-violet-300 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-violet-500/20 group-hover:scale-110 transition-transform">
                <ImgIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-700 transition-colors">
                Image Tools &amp; Background Removal
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Remove backgrounds with AI, compress photos, crop, resize, convert formats, and create passport compliant photos.
              </p>

              {/* Quick links */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <Link to="/image-tools/background-remover" className="text-[11px] font-semibold px-2.5 py-1 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg transition-colors">
                  AI Background Remover
                </Link>
                <Link to="/image-tools/image-resizer" className="text-[11px] font-semibold px-2.5 py-1 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg transition-colors">
                  Resizer
                </Link>
                <Link to="/image-tools/image-compressor" className="text-[11px] font-semibold px-2.5 py-1 bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg transition-colors">
                  Compressor
                </Link>
              </div>
            </div>

            <Link
              to="/image-tools"
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-violet-700 hover:text-violet-800 group-hover:underline underline-offset-4"
            >
              <span>Explore Image Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>

          {/* Category 4: Calculators */}
          <article className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <CalcIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                Financial &amp; Math Calculators
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Calculate BMI, age, loan EMI, percentages, CGPA, discounts, and convert 50+ metric and imperial measurement units.
              </p>

              {/* Quick links */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <Link to="/calculators/bmi-calculator" className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors">
                  BMI Calculator
                </Link>
                <Link to="/calculators/age-calculator" className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors">
                  Age Finder
                </Link>
                <Link to="/calculators/emi-calculator" className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors">
                  Loan EMI
                </Link>
              </div>
            </div>

            <Link
              to="/calculators"
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:underline underline-offset-4"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>

          {/* Category 5: Text Tools */}
          <article className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <TextIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                Text &amp; Content Utilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Count words and characters, convert case formatting, clean whitespace, and encode or decode URL strings.
              </p>

              {/* Quick links */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <Link to="/text-tools/word-counter" className="text-[11px] font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg transition-colors">
                  Word Counter
                </Link>
                <Link to="/text-tools/case-converter" className="text-[11px] font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg transition-colors">
                  Case Converter
                </Link>
                <Link to="/text-tools/character-counter" className="text-[11px] font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg transition-colors">
                  Char Counter
                </Link>
              </div>
            </div>

            <Link
              to="/text-tools"
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-amber-700 hover:text-amber-800 group-hover:underline underline-offset-4"
            >
              <span>Explore Text Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>

          {/* Category 6: Utility Tools */}
          <article className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-pink-300 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white flex items-center justify-center mb-4 shadow-md shadow-fuchsia-500/20 group-hover:scale-110 transition-transform">
                <UtilIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-pink-700 transition-colors">
                Utility Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Generate QR codes, sign digital documents, test internet network speed, and manage everyday clipboard workflows.
              </p>

              {/* Quick links */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <Link to="/other-tools/qr-code-generator" className="text-[11px] font-semibold px-2.5 py-1 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-lg transition-colors">
                  QR Code Maker
                </Link>
                <Link to="/other-tools/password-generator" className="text-[11px] font-semibold px-2.5 py-1 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-lg transition-colors">
                  Password Maker
                </Link>
                <Link to="/other-tools/digital-signature-pad" className="text-[11px] font-semibold px-2.5 py-1 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-lg transition-colors">
                  Digital Sign
                </Link>
              </div>
            </div>

            <Link
              to="/other-tools"
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-pink-700 hover:text-pink-800 group-hover:underline underline-offset-4"
            >
              <span>Explore Utility Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>
        </div>
      </section>

      {/* Modern Bento Feature Grid: Why Choose ToolX? */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl relative overflow-hidden">
          {/* Ambient Lighting Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Engineered For Speed &amp; Privacy</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Why Professionals &amp; Creators Choose ToolX
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Every tool runs locally in your browser with zero installation, zero data storage, and zero friction.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Bento 1: Privacy */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-xs transition-all hover:bg-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-bold mb-4 shadow-lg shadow-emerald-500/20">
                <Lock className="w-5 h-5 text-slate-950" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">100% Client-Side</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Files and calculations never get uploaded to external servers. Complete protection for sensitive legal, financial, or personal documents.
              </p>
            </div>

            {/* Bento 2: AI & WASM */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 backdrop-blur-xs transition-all hover:bg-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 text-slate-950 flex items-center justify-center font-bold mb-4 shadow-lg shadow-violet-500/20">
                <Cpu className="w-5 h-5 text-slate-950" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Neural AI Powered</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated with official Remove.bg API and client-side WASM deep learning models for precise, automatic background removal.
              </p>
            </div>

            {/* Bento 3: Blazing Speed */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/40 backdrop-blur-xs transition-all hover:bg-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center font-bold mb-4 shadow-lg shadow-cyan-500/20">
                <Zap className="w-5 h-5 text-slate-950" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Instant Execution</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero network latency or server queue delays. Processing is immediate using HTML5 Canvas, WebAssembly, and native JS compilers.
              </p>
            </div>

            {/* Bento 4: Cross Platform */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 backdrop-blur-xs transition-all hover:bg-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-bold mb-4 shadow-lg shadow-amber-500/20">
                <Globe className="w-5 h-5 text-slate-950" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Works On Any Device</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optimized for mobile touchscreens, tablets, laptops, and ultra-wide desktop monitors without downloading apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placeholder 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="in-feed" />
      </section>

      {/* Frequently Asked Questions (AEO & Answer Engine optimization) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQSection title="Frequently Asked Questions About ToolX" faqs={homepageFaqs} />
      </section>
    </div>
  );
};
