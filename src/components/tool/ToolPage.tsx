import React, { useEffect } from 'react';
import { ToolDefinition } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ToolHeader } from './ToolHeader';
import { HowToUse } from './HowToUse';
import { FeaturesSection } from './FeaturesSection';
import { FAQSection } from './FAQSection';
import { RelatedTools } from './RelatedTools';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { updatePageSeo } from '../../router';
import { CATEGORIES } from '../../data/categories';
import { ALL_TOOLS } from '../../data/tools';

interface ToolPageProps {
  tool: ToolDefinition;
}

export const ToolPage: React.FC<ToolPageProps> = ({ tool }) => {
  const category = CATEGORIES[tool.category];
  const ToolComponent = tool.component;

  // Sync SEO metadata for individual tool
  useEffect(() => {
    updatePageSeo(
      `${tool.seoTitle} – ToolX`,
      tool.seoDescription,
      tool.path
    );
  }, [tool]);

  // Find related tool definitions
  const relatedTools = ALL_TOOLS.filter((t) =>
    tool.relatedToolIds.includes(t.id) && t.id !== tool.id
  ).slice(0, 3);

  // Fallback if less than 3
  const finalRelatedTools =
    relatedTools.length >= 3
      ? relatedTools
      : [
          ...relatedTools,
          ...ALL_TOOLS.filter(
            (t) => t.category === tool.category && t.id !== tool.id && !relatedTools.some(r => r.id === t.id)
          ).slice(0, 3 - relatedTools.length),
        ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: category.name, path: category.path },
          { label: tool.name },
        ]}
      />

      {/* Tool Header */}
      <ToolHeader
        title={tool.name}
        description={tool.shortDescription}
        categoryName={category.name}
      />

      {/* Primary Tool Component (renders ToolWorkspace, inputs, controls, states, result inside) */}
      <div className="my-6">
        <ToolComponent />
      </div>

      {/* Ad Placeholder 1: Below tool */}
      <AdPlaceholder slot="banner" />

      {/* How to Use Section */}
      <HowToUse toolName={tool.name} steps={tool.howToUse} />

      {/* Features Section */}
      <FeaturesSection toolName={tool.name} features={tool.features} />

      {/* Ad Placeholder 2: Between content sections */}
      <AdPlaceholder slot="in-feed" />

      {/* FAQ Section */}
      <FAQSection faqs={tool.faqs} />

      {/* Related Tools */}
      <RelatedTools tools={finalRelatedTools} />
    </div>
  );
};
