import React, { useState } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';

/* 1. Word Counter */
export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState(
    'ToolX provides fast, private, browser-based online tools for PDF, images, calculations, and web development. Everything processes directly on your local device.'
  );

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingTime = (words / 200).toFixed(1);
  const speakingTime = (words / 130).toFixed(1);

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Enter or Paste Your Text</label>
            <button
              onClick={() => setText('')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          </div>
          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here to see real-time word and character counts..."
            className="w-full p-4 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden leading-relaxed"
          />
        </div>

        <ToolResult
          title="Text Statistics"
          metrics={[
            { label: 'Words', value: words.toLocaleString(), highlight: true },
            { label: 'Characters', value: chars.toLocaleString(), highlight: true },
            { label: 'Without Spaces', value: charsNoSpaces.toLocaleString() },
            { label: 'Sentences', value: sentences.toLocaleString() },
            { label: 'Paragraphs', value: paragraphs.toLocaleString() },
            { label: 'Reading Time', value: `${readingTime} min` },
            { label: 'Speaking Time', value: `${speakingTime} min` },
          ]}
          copyText={text}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 2. Character Counter */
export const CharacterCounterTool: React.FC = () => {
  const [text, setText] = useState('ToolX is your all-in-one suite of free productivity utilities.');

  const charCount = text.length;
  const twitterLeft = 280 - charCount;
  const smsSegments = Math.ceil(charCount / 160) || 1;

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
          className="w-full p-4 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden leading-relaxed"
        />

        <ToolResult
          title="Character Breakdown"
          metrics={[
            { label: 'Total Characters', value: charCount, highlight: true },
            { label: 'Twitter / X (280)', value: twitterLeft >= 0 ? `${twitterLeft} left` : `${Math.abs(twitterLeft)} over` },
            { label: 'SMS Segments (160)', value: `${smsSegments} segment(s)` },
            { label: 'Byte Size (UTF-8)', value: `${new Blob([text]).size} bytes` },
          ]}
          copyText={text}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 3. Case Converter */
export const CaseConverterTool: React.FC = () => {
  const [text, setText] = useState('All your tools in one place. Fast and reliable online tools for everyone.');

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitle = () => {
    setText(
      text.toLowerCase().replace(/(^|\s|-)\S/g, (match) => match.toUpperCase())
    );
  };
  const toSentence = () => {
    setText(
      text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };
  const toCamel = () => {
    setText(
      text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase())
    );
  };
  const toSnake = () => {
    setText(
      text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase()
    );
  };
  const toKebab = () => {
    setText(
      text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
    );
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
          placeholder="Enter text to convert casing..."
        />

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={toUpper}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            UPPERCASE
          </button>
          <button
            onClick={toLower}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            lowercase
          </button>
          <button
            onClick={toTitle}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Title Case
          </button>
          <button
            onClick={toSentence}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Sentence case
          </button>
          <button
            onClick={toCamel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            camelCase
          </button>
          <button
            onClick={toSnake}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            snake_case
          </button>
          <button
            onClick={toKebab}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            kebab-case
          </button>
        </div>

        <ToolResult
          title="Converted Text"
          previewText={text}
          copyText={text}
          onReset={() => setText('')}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 4. Remove Extra Spaces */
export const RemoveExtraSpacesTool: React.FC = () => {
  const [text, setText] = useState('  This   is    an   example    with    extra     spacing.  \n\n\n  Multiple   lines  too!   ');

  const cleanSpaces = () => {
    const cleaned = text
      .split('\n')
      .map((line) => line.trim().replace(/\s+/g, ' '))
      .filter((line) => line.length > 0)
      .join('\n');
    setText(cleaned);
  };

  const removeAllEmptyLines = () => {
    const cleaned = text.split('\n').filter((l) => l.trim().length > 0).join('\n');
    setText(cleaned);
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text with messy spaces or blank lines..."
          className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={cleanSpaces}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
          >
            Clean All Extra Spaces & Empty Lines
          </button>
          <button
            onClick={removeAllEmptyLines}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Remove Blank Lines Only
          </button>
        </div>

        <ToolResult
          title="Cleaned Output"
          previewText={text}
          copyText={text}
          onReset={() => setText('')}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 5. Text Cleaner */
export const TextCleanerTool: React.FC = () => {
  const [text, setText] = useState('<p>Welcome to <strong>ToolX</strong>! 🚀 Remove unwanted HTML tags & duplicates.</p>\nApple\nBanana\nApple\nCherry');

  const stripHtml = () => {
    setText(text.replace(/<[^>]*>?/gm, ''));
  };

  const removeEmojis = () => {
    setText(text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''));
  };

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const unique = Array.from(new Set(lines));
    setText(unique.join('\n'));
  };

  const sortLines = () => {
    const lines = text.split('\n');
    setText(lines.sort((a, b) => a.localeCompare(b)).join('\n'));
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
          placeholder="Paste text to clean..."
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={stripHtml}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Strip HTML Tags
          </button>
          <button
            onClick={removeEmojis}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Remove Emojis
          </button>
          <button
            onClick={removeDuplicates}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Deduplicate Lines
          </button>
          <button
            onClick={sortLines}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Sort Lines (A-Z)
          </button>
        </div>

        <ToolResult
          title="Sanitized Text"
          previewText={text}
          copyText={text}
          onReset={() => setText('')}
        />
      </div>
    </ToolWorkspace>
  );
};
