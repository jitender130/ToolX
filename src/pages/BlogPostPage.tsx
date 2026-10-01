import React, { useEffect } from 'react';
import { Link, updatePageSeo } from '../router';
import { BlogPost } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { ALL_TOOLS } from '../data/tools';
import { ArrowRight, Wrench, Calendar, Clock } from 'lucide-react';

interface BlogPostPageProps {
  post: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  useEffect(() => {
    updatePageSeo(
      `${post.title} – ToolX Blog`,
      post.summary,
      `/blog/${post.slug}`
    );
  }, [post]);

  const relatedTool = post.relatedToolId
    ? ALL_TOOLS.find((t) => t.id === post.relatedToolId)
    : null;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Blog', path: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-semibold text-emerald-700">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 balance leading-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          {post.summary}
        </p>
      </header>

      {/* Interactive Tool Banner if related */}
      {relatedTool && (
        <div className="my-6 p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Wrench className="w-3.5 h-3.5 text-emerald-700" />
              <span>Recommended ToolX Utility</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{relatedTool.name}</h3>
            <p className="text-xs text-slate-600 mt-0.5">{relatedTool.shortDescription}</p>
          </div>
          <Link
            to={relatedTool.path}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl whitespace-nowrap shadow-sm shadow-emerald-600/20"
          >
            Open {relatedTool.name}
          </Link>
        </div>
      )}

      {/* Article Content */}
      <div className="space-y-8 my-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        {post.content.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
            {section.listItems && (
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                {section.listItems.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <AdPlaceholder slot="banner" />

      {/* Back to Blog Navigation */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
        <Link
          to="/blog"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to All Articles
        </Link>
        <Link
          to="/tools"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
        >
          <span>Explore All Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
