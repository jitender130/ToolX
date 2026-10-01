import React from 'react';

export type ToolCategory =
  | 'pdf-tools'
  | 'calculators'
  | 'image-tools'
  | 'text-tools'
  | 'developer-tools'
  | 'other-tools';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  step: number;
  title: string;
  text: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  category: ToolCategory;
  slug: string;
  path: string;
  iconName: string;
  shortDescription: string;
  badge?: string;
  seoTitle: string;
  seoDescription: string;
  features: string[];
  howToUse: HowToStep[];
  faqs: FAQItem[];
  relatedToolIds: string[];
  keywords: string[];
  component: React.ComponentType;
}

export interface CategoryDefinition {
  id: ToolCategory;
  name: string;
  slug: string;
  path: string;
  iconName: string;
  h1: string;
  shortDescription: string;
  detailedDescription: string;
  faqs: FAQItem[];
  relatedCategoryIds: ToolCategory[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  relatedToolId?: string;
  content: {
    heading: string;
    paragraphs: string[];
    listItems?: string[];
  }[];
}
