import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { updatePageSeo, Link } from '../router';
import { ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'About ToolX – Free, Private Browser Utilities',
      'Learn about ToolX, our mission to deliver fast, free, client-side productivity utilities with zero data collection.',
      '/about'
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
        About ToolX
      </h1>

      <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
        <p>
          <strong>ToolX</strong> was founded on a simple principle: digital tools should be fast, accessible, and respectful of your privacy.
        </p>

        <p>
          Too many utility websites on the modern internet force users through aggressive advertising hurdles, sign-up forms, subscription walls, or require uploading sensitive documents to unknown third-party cloud servers.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Our Core Philosophy</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">Privacy by Default</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We prioritize client-side processing using WebAssembly and HTML5 Canvas so your files never leave your device.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <Zap className="w-6 h-6 text-sky-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">Instant Execution</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              No waiting for upload queues or server rendering. Everything computes in local memory.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <CheckCircle2 className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">100% Free Access</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every tool is freely accessible with zero account creation, subscription plans, or artificial restrictions.
            </p>
          </div>
        </div>

        <p>
          Whether you need to compress a PDF for a job portal, calculate your loan schedule, crop an image, or format complex JSON, ToolX brings everything together in one unified, mobile-optimized platform.
        </p>

        {/* Meet the Developer Feature Card */}
        <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-400 shadow-md bg-slate-200">
            <img
              src="file_00000000d11c72088bfd29eb1e847977.png"
              alt="Jitender - Creator of ToolX"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Creator & Lead Engineer
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Meet Jitender – Student & Web Developer from Rajasthan, India
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jitender is a passionate web developer from Churu, Rajasthan, dedicated to creating simple, fast, user-friendly digital tools that solve everyday problems for people worldwide.
            </p>
            <div className="pt-1">
              <Link
                to="/developer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300"
              >
                <span>Read Full Developer Story & Profile →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
