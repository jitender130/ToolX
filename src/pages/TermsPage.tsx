import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { updatePageSeo } from '../router';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'Terms of Service – ToolX',
      'Review the terms and conditions for utilizing the ToolX productivity utilities platform.',
      '/terms'
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
        Terms of Service
      </h1>

      <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the ToolX website and its associated suite of tools, you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, please discontinue using the service.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Permitted Use</h2>
        <p>
          ToolX is provided for lawful personal and commercial utility use. You agree not to use the service to process unlawful content, violate intellectual property rights, or conduct automated denial-of-service attacks.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. Disclaimer of Warranties</h2>
        <p>
          ToolX provides all tools, calculators, and converters on an "as is" and "as available" basis without warranties of any kind, whether express or implied.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall ToolX or its operators be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use any tool on this platform.
        </p>
      </div>
    </div>
  );
};
