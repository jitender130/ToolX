import React, { useEffect } from 'react';
import { Link, updatePageSeo } from '../router';
import { BLOG_POSTS } from '../data/blog';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';

export const BlogIndexPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'ToolX Blog – Guides, Tutorials & Productivity Tips',
      'Read in-depth guides on PDF compression, image optimization, developer workflows, and mathematical calculators.',
      '/blog'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Knowledge &amp; Engineering Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Productivity &amp; <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Tool Guides</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Practical tutorials, performance optimization tips, and guides to make the most of online utilities with complete privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Top subtle emerald gradient strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                  {post.category}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{post.readTime}</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{post.date}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 group-hover:underline underline-offset-4"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdPlaceholder slot="banner" />
    </div>
  );
};
