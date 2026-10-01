import { CategoryDefinition, ToolCategory } from '../types';

export const CATEGORIES: Record<ToolCategory, CategoryDefinition> = {
  'pdf-tools': {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    path: '/pdf-tools',
    iconName: 'FileText',
    h1: 'Free PDF Tools Online',
    shortDescription: 'Compress, merge, split, convert, and organize PDF documents directly in your browser without software installation.',
    detailedDescription: 'ToolX PDF tools empower you to manipulate, convert, and manage your PDF documents entirely within your modern web browser. Powered by client-side document processing, your files remain completely private on your device without being uploaded to remote third-party servers.',
    faqs: [
      {
        question: 'Are my PDF documents uploaded to external servers?',
        answer: 'No. ToolX processes your PDF documents directly on your device using client-side WebAssembly and modern browser APIs. Your files stay strictly in your browser memory.'
      },
      {
        question: 'Is there a limit on the number of PDFs I can process?',
        answer: 'There are no artificial usage limits. You can merge, split, rotate, and compress as many PDF files as you need for free.'
      },
      {
        question: 'Do I need to create an account or provide payment details?',
        answer: 'No account, login, or subscription is required. ToolX is free and available immediately without registration.'
      },
      {
        question: 'Which browsers are supported?',
        answer: 'All modern browsers including Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and mobile mobile browsers on Android and iOS are fully supported.'
      }
    ],
    relatedCategoryIds: ['image-tools', 'text-tools', 'developer-tools']
  },
  'calculators': {
    id: 'calculators',
    name: 'Calculators',
    slug: 'calculators',
    path: '/calculators',
    iconName: 'Calculator',
    h1: 'Online Calculators & Conversion Tools',
    shortDescription: 'Accurate, instant calculators for health, finances, academics, time, measurements, and everyday calculations.',
    detailedDescription: 'Perform everyday calculations instantly with ToolX calculators. From BMI and exact age reckoning to loan EMI schedules, GPA scores, and metric/imperial unit conversions, each calculator provides instant results with step-by-step breakdowns.',
    faqs: [
      {
        question: 'How accurate are the ToolX calculators?',
        answer: 'All calculators use standard international mathematical formulas, World Health Organization (WHO) BMI standards, standard banking amortization equations, and NIST conversion tables.'
      },
      {
        question: 'Can I use these calculators on my mobile device?',
        answer: 'Yes! Every calculator is designed mobile-first with large interactive touch inputs, instant recalculations, and clean result displays.'
      },
      {
        question: 'Are my financial or health inputs stored?',
        answer: 'No. All calculations are executed strictly on your local browser. No personal health, age, or financial data is ever collected or transmitted.'
      }
    ],
    relatedCategoryIds: ['other-tools', 'text-tools', 'developer-tools']
  },
  'image-tools': {
    id: 'image-tools',
    name: 'Image & Photo Tools',
    slug: 'image-tools',
    path: '/image-tools',
    iconName: 'Image',
    h1: 'Online Image & Photo Editing Tools',
    shortDescription: 'Compress, resize, crop, rotate, remove backgrounds, convert formats, and optimize images directly in your browser.',
    detailedDescription: 'Enhance and convert your images with high-speed client-side canvas tools. ToolX offers everything from image compression and WebP conversion to background isolation, passport photo sizing, and metadata stripping, with zero quality degradation.',
    faqs: [
      {
        question: 'Does image compression reduce visual photo quality?',
        answer: 'ToolX offers smart compression algorithms allowing you to adjust the quality balance. Typical settings reduce file sizes by 60%–80% with virtually indistinguishable visual variance.'
      },
      {
        question: 'Which image formats are supported?',
        answer: 'ToolX supports JPG/JPEG, PNG, WebP, SVG, and common graphic formats across both desktop and mobile devices.'
      },
      {
        question: 'Is background removal done securely?',
        answer: 'Yes. Background removal processes the image pixels locally using HTML5 Canvas chroma analysis and alpha masking. Your personal photos never leave your device.'
      }
    ],
    relatedCategoryIds: ['pdf-tools', 'developer-tools', 'other-tools']
  },
  'text-tools': {
    id: 'text-tools',
    name: 'Text Tools',
    slug: 'text-tools',
    path: '/text-tools',
    iconName: 'AlignLeft',
    h1: 'Free Online Text & Content Formatting Tools',
    shortDescription: 'Count words, convert casing, clean whitespace, count characters, and format typography instantly.',
    detailedDescription: 'Streamline your writing and publishing workflow with ToolX text tools. Instantly compute word and reading times, convert title casing, eliminate stubborn extra whitespace, and clean formatting for social media, essays, and web publishing.',
    faqs: [
      {
        question: 'Is my written content saved or logged?',
        answer: 'Never. All text analysis runs entirely in local browser memory. When you refresh or close the tab, your text is completely cleared.'
      },
      {
        question: 'How is reading time calculated in the word counter?',
        answer: 'Reading time is computed using the standard average adult silent reading speed of 200 words per minute, while speaking time is based on 130 words per minute.'
      }
    ],
    relatedCategoryIds: ['developer-tools', 'calculators', 'other-tools']
  },
  'developer-tools': {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    path: '/developer-tools',
    iconName: 'Code',
    h1: 'Online Developer Tools & Formatters',
    shortDescription: 'JSON formatting, JSON validation, Base64 encoding/decoding, URL encoding, and HTML beautifying utilities.',
    detailedDescription: 'Essential everyday developer utilities built for speed and precision. Inspect and beautify nested JSON structures, encode and decode Base64 strings, sanitize query parameters, and format HTML code with one-click copying.',
    faqs: [
      {
        question: 'Can I format large JSON files?',
        answer: 'Yes. The JSON Formatter efficiently parses and renders JSON payloads up to several megabytes directly in the client browser with line numbers and syntax validation.'
      },
      {
        question: 'Are development tokens or API payloads logged?',
        answer: 'No. All encoding, decoding, and parsing operates client-side. Zero telemetry or request data is sent across the network.'
      }
    ],
    relatedCategoryIds: ['text-tools', 'other-tools', 'calculators']
  },
  'other-tools': {
    id: 'other-tools',
    name: 'Other Useful Tools',
    slug: 'other-tools',
    path: '/other-tools',
    iconName: 'Wrench',
    h1: 'Everyday Online Utilities & Generators',
    shortDescription: 'Generate custom QR codes, generate secure passwords, roll random numbers, and streamline everyday digital tasks.',
    detailedDescription: 'A versatile collection of everyday productivity tools. Create high-resolution custom QR codes for websites and Wi-Fi networks, generate cryptographically random secure passwords, and simulate random number distributions.',
    faqs: [
      {
        question: 'Are generated passwords cryptographically secure?',
        answer: 'Yes. ToolX utilizes the browser standard window.crypto.getRandomValues API rather than pseudo-random math, guaranteeing high entropy and cryptographic security.'
      },
      {
        question: 'Can I download generated QR codes in high resolution?',
        answer: 'Yes. You can export generated QR codes as crisp PNG images or scalable SVG vectors ready for print and digital publishing.'
      }
    ],
    relatedCategoryIds: ['calculators', 'developer-tools', 'text-tools']
  }
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
