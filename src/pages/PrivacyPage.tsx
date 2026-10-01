import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { updatePageSeo } from '../router';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo(
      'Privacy Policy – ToolX',
      'Learn how ToolX protects your privacy with browser-based client-side processing.',
      '/privacy-policy'
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: September 2026</p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Client-Side Processing Guarantee</h2>
        <p>
          At ToolX, we prioritize user privacy. The majority of our utilities—including PDF mergers, PDF compressors, image converters, calculators, and developer tools—run 100% locally inside your web browser using HTML5 Canvas, WebAssembly, and local JavaScript execution.
        </p>
        <p>
          Your documents, pictures, text inputs, and numerical figures never travel across the internet to our servers. Once you close or reload your browser window, your memory buffers are completely purged.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Information We Do Not Collect</h2>
        <p>
          We do not require user accounts, email addresses, passwords, payment cards, or phone numbers to use ToolX. We do not maintain user databases of uploaded file contents.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. Cookies and Analytics</h2>
        <p>
          We may use minimal, privacy-conscious performance cookies to monitor site availability, prevent malicious abuse, and analyze aggregate page visit counts. These records contain zero personally identifiable data.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">4. Third-Party Links & Advertising</h2>
        <p>
          Our platform may contain external links to third-party resources or future advertising partners. We encourage users to review the privacy notices of any external site they visit.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">5. Updates to this Policy</h2>
        <p>
          We reserve the right to modify this privacy policy as new tools or features are introduced. Continued use of ToolX constitutes acceptance of any minor revisions.
        </p>
      </div>
    </div>
  );
};
