import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { updatePageSeo, Link } from '../router';
import {
  MapPin,
  Code,
  Sparkles,
  Palette,
  Laptop,
  GraduationCap,
  Rocket,
  Heart,
  Mail,
  ShieldCheck,
  Zap,
  Globe,
  Terminal,
  ZoomIn,
  X,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

// Developer's permanent image (hosted locally from user's provided picture, with CDN fallback)
const DEVELOPER_IMAGE = '/developer.png';
const FALLBACK_IMAGE = 'https://iili.io/naSKKIS.png';

export const DeveloperPage: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string>(DEVELOPER_IMAGE);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  useEffect(() => {
    updatePageSeo(
      'Meet Jitender – Web Developer & Creator of ToolX | Churu, Rajasthan',
      'Learn about Jitender, a student and passionate web developer from Churu, Rajasthan, India. Creator of ToolX and developer of fast, privacy-first modern digital products.',
      '/developer'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About Developer' }]} />

      {/* Hero Profile Card */}
      <section className="relative overflow-hidden bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-100/60 via-teal-100/40 to-sky-100/40 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 z-10">
          {/* Permanent Developer Portrait */}
          <div className="flex flex-col items-center shrink-0 space-y-3">
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="relative group w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-emerald-500/40 hover:border-emerald-500 shadow-xl shadow-emerald-500/10 bg-slate-900 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              title="Click to view full photo"
            >
              <img
                src={imgSrc}
                alt="Jitender - Web Developer"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imgSrc !== FALLBACK_IMAGE) {
                    setImgSrc(FALLBACK_IMAGE);
                  }
                }}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />

              {/* Zoom Hover Indicator */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white backdrop-blur-[1px]">
                <ZoomIn className="w-6 h-6 text-emerald-300 mb-1" />
                <span className="text-xs font-semibold">View Full Photo</span>
              </div>

              {/* Verified badge */}
              <div className="absolute top-2.5 right-2.5 z-10 bg-emerald-600/95 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs">
                <CheckCircle2 className="w-3 h-3 text-white" />
                <span>Verified</span>
              </div>
            </div>

            {/* View Full Size button */}
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Full Photo</span>
            </button>
          </div>

          {/* Bio Header */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Founder & Lead Developer of ToolX</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Jitender
            </h1>

            <p className="text-base sm:text-lg text-emerald-700 font-semibold flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span>Student & Passionate Web Developer</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium text-sm">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Churu, Rajasthan, India</span>
              </span>
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl pt-2">
              Hi, I’m <strong>Jitender</strong>, a student and passionate web developer from <strong>Churu, Rajasthan, India</strong>. I am interested in web development, coding, AI tools, graphic designing, and building useful digital products. I enjoy creating simple, fast, and user-friendly websites and tools that can solve real-world problems.
            </p>

            {/* Quick Action Links */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch with Jitender</span>
              </Link>

              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Rocket className="w-4 h-4 text-emerald-600" />
                <span>Explore Tools Built by Jitender</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Full Photo */}
      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-4 shadow-2xl text-center"
          >
            <div className="flex items-center justify-between px-2 pb-3 text-white border-b border-slate-800 mb-3">
              <div className="text-left">
                <h4 className="text-sm font-bold text-white">Jitender</h4>
                <p className="text-[11px] text-slate-400">Web Developer · Churu, Rajasthan</p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-square max-h-[65vh]">
              <img
                src={imgSrc}
                alt="Jitender - Web Developer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Original Verified Portrait</span>
              </span>
              <a
                href="https://freeimage.host/i/naSKKIS"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>View on Host</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* About & Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>My Vision & Journey</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Building Useful Digital Products for Everyone
          </h2>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              I am continuously learning new technologies and improving my skills in frontend development, JavaScript, React, and modern web technologies. My goal is to build useful digital products and grow as a developer while helping others through technology.
            </p>
            <p>
              I created <strong>ToolX</strong> because I noticed how painful simple online tasks have become. Many websites require users to sign up for accounts, pay monthly subscriptions, or upload private personal documents to remote servers just to compress a PDF or resize a picture.
            </p>
            <p>
              By combining high-speed browser technologies, HTML5 APIs, and secure backend AI integrations, I built ToolX to ensure that everyone has access to professional-grade tools for free, with complete privacy and zero hassle.
            </p>
          </div>
        </div>

        {/* Quick Facts Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">At a Glance</span>
            <h3 className="text-lg font-bold text-white mt-1">Developer Snapshot</h3>

            <ul className="mt-4 space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Origin:</strong> Churu, Rajasthan, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Laptop className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Specialization:</strong> Full-Stack Frontend & Modern Web Utilities</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Philosophy:</strong> 100% Free, Fast & Privacy-First</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Flagship Project:</strong> ToolX Online Tools Platform</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-700/80">
            <p className="text-[11px] text-slate-400 leading-normal">
              "Technology should empower people and solve everyday problems without unnecessary barriers."
            </p>
          </div>
        </div>
      </section>

      {/* Skills & Passions Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Skills & Areas of Interest
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Disciplines and technical toolsets I love working with and continually master.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Web Development */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-emerald-500/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Web Development & Coding</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Crafting responsive web apps using React, JavaScript (ESNext), TypeScript, Node.js, and modern build tooling.
            </p>
          </div>

          {/* 2. AI Tools & Modern Tech */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-sky-500/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Tools & Integrations</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Integrating intelligent vision OCR, automated photo enhancement, and prompt engineering using modern generative AI APIs.
            </p>
          </div>

          {/* 3. Graphic & UI/UX Design */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-indigo-500/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Graphic Designing & UI/UX</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Designing user-friendly, clean layouts with strong typography, soft shadows, clear visual hierarchy, and mobile usability.
            </p>
          </div>

          {/* 4. Building Digital Products */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-amber-500/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Digital Product Building</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Transforming raw ideas into practical software utilities that solve real-life hurdles for students, creators, and professionals.
            </p>
          </div>

          {/* 5. In-Browser Client-Side Processing */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-teal-500/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Privacy & In-Memory Computing</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Engineering PDF transformations, image compression, and calculations right inside client memory without leaking private files.
            </p>
          </div>

          {/* 6. Continuous Growth */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-rose-500/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Lifelong Learning</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Constantly discovering new paradigms, reading documentation, and leveling up engineering skills to build the next generation of web products.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project Showcase: ToolX */}
      <section className="bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-white border border-emerald-200 rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Flagship Creation</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              ToolX – All Your Tools in One Place
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              An all-in-one suite of 50+ fast, private browser utilities for PDFs, images, financial calculators, text formatting, and developer workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/tools"
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors"
            >
              Browse All Tools
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            >
              Contact Jitender
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
