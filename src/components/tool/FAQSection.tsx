import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Frequently Asked Questions',
  faqs,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  // Inject or update Schema.org FAQPage structured data
  useEffect(() => {
    if (!faqs || faqs.length === 0 || typeof document === 'undefined') return;

    const scriptId = 'dynamic-faqpage-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer,
        },
      })),
    };

    script.textContent = JSON.stringify(schema);

    return () => {
      // Cleanup script on unmount
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [faqs]);

  if (!faqs || faqs.length === 0) return null;

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="mt-12 pt-8 border-t border-slate-200" data-testid="faq-section">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          const answerId = `faq-answer-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <article
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
            >
              <button
                id={buttonId}
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 text-sm hover:text-emerald-700 transition-colors cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <h3 className="text-sm font-semibold text-slate-900 m-0 pr-2">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                >
                  {faq.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
