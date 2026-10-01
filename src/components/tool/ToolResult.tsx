import React, { useState } from 'react';
import { Download, Copy, Check, RotateCcw, Eye, FileImage, Sparkles, ExternalLink } from 'lucide-react';

interface MetricItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface ToolResultProps {
  title?: string;
  metrics?: MetricItem[];
  previewUrl?: string | null;
  previewText?: string | null;
  downloadUrl?: string | null;
  downloadFilename?: string;
  copyText?: string | null;
  onReset?: () => void;
  children?: React.ReactNode;
}

export const ToolResult: React.FC<ToolResultProps> = ({
  title = 'Processed Results',
  metrics = [],
  previewUrl,
  previewText,
  downloadUrl,
  downloadFilename = 'processed-file',
  copyText,
  onReset,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isImage = Boolean(
    previewUrl ||
    downloadFilename.match(/\.(png|jpe?g|webp|gif|svg)$/i) ||
    downloadUrl?.startsWith('data:image/') ||
    downloadUrl?.startsWith('blob:')
  );

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = copyText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadFormat = async (targetFormat: 'png' | 'jpeg' | 'webp') => {
    const sourceUrl = previewUrl || downloadUrl;
    if (!sourceUrl) return;

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = sourceUrl;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (targetFormat === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const mime = `image/${targetFormat}`;
      const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
      const baseName = downloadFilename.replace(/\.[^/.]+$/, '');
      const finalName = `${baseName}.${ext}`;

      const dataUrl = canvas.toDataURL(mime, 0.95);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = finalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      // Fallback direct download
      const link = document.createElement('a');
      link.href = sourceUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMainDownload = () => {
    if (!downloadUrl && !previewUrl) return;
    const url = downloadUrl || previewUrl || '';
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {downloadSuccess && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-md animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> Downloaded!
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Your result is ready to preview, copy, or download</p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          {copyText && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
          )}

          {(downloadUrl || previewUrl) && (
            <button
              onClick={handleMainDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer hover:shadow-lg"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{isImage ? 'Download Photo / Image' : 'Download File'}</span>
            </button>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Reset & start over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border ${
                m.highlight
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                  : 'bg-slate-50/70 border-slate-200 text-slate-900'
              }`}
            >
              <div className="text-[11px] font-medium text-slate-500">{m.label}</div>
              <div className={`text-base sm:text-lg font-bold mt-0.5 tabular-nums ${m.highlight ? 'text-emerald-700' : 'text-slate-900'}`}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visual Image Preview and Quick Format Selector */}
      {previewUrl && (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Eye className="w-3.5 h-3.5 text-emerald-600" /> Output Preview
            </span>
            <span className="text-[11px] text-slate-400">Click download below or right-click to save</span>
          </div>

          <div className="max-h-96 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white/80 border border-slate-200 p-2 shadow-inner">
            <img
              src={previewUrl}
              alt="Processed output preview"
              className="max-h-80 max-w-full object-contain rounded-lg shadow-sm"
            />
          </div>

          {/* Quick Format Action Bar */}
          <div className="w-full mt-4 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-700">Download in Format:</span>
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => handleDownloadFormat('png')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3 text-slate-500" />
                <span>PNG (Lossless)</span>
              </button>
              <button
                onClick={() => handleDownloadFormat('jpeg')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3 text-slate-500" />
                <span>JPG (Standard)</span>
              </button>
              <button
                onClick={() => handleDownloadFormat('webp')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3 text-slate-500" />
                <span>WebP (Compact)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Preview / Raw Output */}
      {previewText && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Result Output</span>
            <span className="font-mono text-[11px] tabular-nums">{previewText.length} characters</span>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-72 border border-slate-800">
            {previewText}
          </pre>
        </div>
      )}

      {children}
    </div>
  );
};
