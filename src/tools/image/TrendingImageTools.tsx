import React, { useState, useRef, useEffect } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';
import { FileUploader } from '../../components/common/FileUploader';
import { Copy, Check, Download, Palette, Sparkles, Type } from 'lucide-react';

/* 1. Color Palette Extractor from Image */
export const ColorPaletteExtractorTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [colors, setColors] = useState<{ hex: string; rgb: string; count: number }[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const extractColors = (f: File) => {
    const img = new Image();
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = Math.min(img.width, 200);
      const h = Math.min(img.height, 200);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const colorCounts: Record<string, { r: number; g: number; b: number; count: number }> = {};

      for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel
        const r = Math.round(data[i] / 16) * 16;
        const g = Math.round(data[i + 1] / 16) * 16;
        const b = Math.round(data[i + 2] / 16) * 16;
        const a = data[i + 3];
        if (a < 128) continue; // skip transparent

        const key = `${r},${g},${b}`;
        if (!colorCounts[key]) {
          colorCounts[key] = { r, g, b, count: 0 };
        }
        colorCounts[key].count++;
      }

      const sorted = Object.values(colorCounts).sort((a, b) => b.count - a.count).slice(0, 6);
      const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
          const hex = Math.min(255, Math.max(0, x)).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        }).join('');
      };

      const formatted = sorted.map(c => ({
        hex: rgbToHex(c.r, c.g, c.b),
        rgb: `rgb(${c.r}, ${c.g}, ${c.b})`,
        count: c.count,
      }));

      setColors(formatted);
      generatePaletteImage(formatted);
    };
  };

  const [paletteDownloadUrl, setPaletteDownloadUrl] = useState<string | null>(null);

  const generatePaletteImage = (palette: { hex: string; rgb: string }[]) => {
    if (palette.length === 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const swatchW = canvas.width / palette.length;
    palette.forEach((item, index) => {
      // Swatch color block
      ctx.fillStyle = item.hex;
      ctx.fillRect(index * swatchW, 0, swatchW, 280);

      // Label background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(index * swatchW, 280, swatchW, 120);

      // Border line
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(index * swatchW, 0, swatchW, canvas.height);

      // Hex Text
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText(item.hex.toUpperCase(), index * swatchW + swatchW / 2, 330);

      // RGB Text
      ctx.font = '16px monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText(item.rgb, index * swatchW + swatchW / 2, 365);
    });

    setPaletteDownloadUrl(canvas.toDataURL('image/png'));
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <FileUploader
          accept="image/*"
          onFileSelect={(f) => {
            setFile(f);
            extractColors(f);
          }}
          selectedFile={file}
          helperText="Upload any photo or illustration to extract its dominant color palette"
        />

        {colors.length > 0 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Extracted Dominant Palette (Click Hex to Copy)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyHex(c.hex)}
                    className="flex flex-col items-center p-3 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all text-center group cursor-pointer"
                  >
                    <div
                      className="w-full h-16 rounded-xl shadow-inner mb-2.5 transition-transform group-hover:scale-102"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="flex items-center gap-1 text-xs font-bold font-mono text-slate-800 uppercase">
                      <span>{c.hex}</span>
                      {copiedHex === c.hex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{c.rgb}</span>
                  </button>
                ))}
              </div>
            </div>

            <ToolResult
              title="Palette Extracted"
              previewUrl={paletteDownloadUrl || previewUrl}
              downloadUrl={paletteDownloadUrl}
              downloadFilename="color-palette-card.png"
              copyText={colors.map(c => `${c.hex} (${c.rgb})`).join('\n')}
              metrics={[
                { label: 'Colors Extracted', value: `${colors.length} hues`, highlight: true },
                { label: 'Primary Shade', value: colors[0]?.hex || '' },
                { label: 'Export Format', value: 'High-Res PNG Swatch' },
              ]}
            />
          </div>
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 2. Meme Generator */
export const MemeGeneratorTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [topText, setTopText] = useState('WHEN YOUR CODE RUNS');
  const [bottomText, setBottomText] = useState('ON THE FIRST TRY');
  const [fontSize, setFontSize] = useState(36);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateMeme = () => {
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.min(img.width, 1000);
      canvas.height = (img.height * canvas.width) / img.width;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Meme typography style
      ctx.font = `bold ${fontSize}px Impact, "Arial Black", sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(3, fontSize / 10);
      ctx.textAlign = 'center';

      // Top text
      if (topText) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, fontSize + 15);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, fontSize + 15);
      }

      // Bottom text
      if (bottomText) {
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }

      setOutputUrl(canvas.toDataURL('image/jpeg', 0.95));
      URL.revokeObjectURL(url);
    };
  };

  useEffect(() => {
    if (file) generateMeme();
  }, [file, topText, bottomText, fontSize]);

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <FileUploader
          accept="image/*"
          onFileSelect={setFile}
          selectedFile={file}
          helperText="Upload any picture or template to add meme captions"
        />

        {file && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Top Caption</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="TOP TEXT"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold uppercase text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bottom Caption</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="BOTTOM TEXT"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold uppercase text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Font Size: {fontSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {outputUrl && (
          <ToolResult
            title="Generated Meme"
            previewUrl={outputUrl}
            downloadUrl={outputUrl}
            downloadFilename="meme-created.jpg"
            metrics={[{ label: 'Style', value: 'Classic Impact Font', highlight: true }]}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};
