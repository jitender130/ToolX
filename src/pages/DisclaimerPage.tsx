import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { updatePageSeo } from '../router';

export const DisclaimerPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'Disclaimer – ToolX',
      'Legal and accuracy disclaimer for tools, calculators, and converters on ToolX.',
      '/disclaimer'
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
        Disclaimer
      </h1>

      <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Informational & Estimation Purposes Only</h2>
        <p>
          All calculators, converters, and informational tools on ToolX (including but not limited to the BMI Calculator, Height Calculator, EMI Calculator, and CGPA Calculator) are provided strictly for educational and estimation purposes.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Not Medical, Financial, or Legal Advice</h2>
        <p>
          The output from our health and financial calculators does not constitute certified medical, financial, investment, or legal advice. Always consult licensed healthcare providers or professional financial advisors before making important lifestyle or banking decisions.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. File Backup Recommendation</h2>
        <p>
          While our client-side PDF and image manipulation algorithms are rigorously tested, we always recommend keeping local backup copies of important documents and original photography prior to compression, editing, or reordering.
        </p>
      </div>
    </div>
  );
};
