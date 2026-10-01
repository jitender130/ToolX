import React, { useState, useRef, useEffect } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';
import { Download, Copy, Check, Youtube, PenTool, Printer, Plus, Trash2, RotateCcw } from 'lucide-react';

/* 1. YouTube Thumbnail Downloader */
export const YoutubeThumbnailTool: React.FC = () => {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ');

  const extractId = (input: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = input.match(regExp);
    return match && match[2].length === 11 ? match[2] : input.trim();
  };

  const handleUrlChange = (val: string) => {
    setUrl(val);
    const id = extractId(val);
    setVideoId(id);
  };

  const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const mqUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            YouTube Video Link or Video ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="Paste YouTube link (e.g. https://www.youtube.com/watch?v=...)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {videoId && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Full Ultra-HD Thumbnail (1280×720)
              </h4>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video flex items-center justify-center max-w-xl mx-auto shadow-sm">
                <img
                  src={maxResUrl}
                  alt="YouTube HD thumbnail"
                  onError={(e) => {
                    // Fallback to HQ if maxres not available
                    (e.target as HTMLImageElement).src = hqUrl;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={maxResUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={`youtube-thumbnail-${videoId}.jpg`}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Ultra HD (1080p)</span>
                </a>
                <a
                  href={hqUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={`youtube-hq-${videoId}.jpg`}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Standard HQ (480p)</span>
                </a>
              </div>
            </div>

            <ToolResult
              title="Thumbnail Extracted"
              downloadUrl={maxResUrl}
              downloadFilename={`youtube-thumbnail-${videoId}.jpg`}
              metrics={[
                { label: 'Video ID', value: videoId, highlight: true },
                { label: 'Resolution', value: '1280 × 720' },
                { label: 'Aspect Ratio', value: '16:9 Standard' },
              ]}
            />
          </div>
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 2. Digital Signature Maker */
export const DigitalSignatureTool: React.FC = () => {
  const [penColor, setPenColor] = useState('#0f172a');
  const [penWidth, setPenWidth] = useState(3);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 600;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.beginPath();

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (canvasRef.current) {
      setSignatureUrl(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureUrl(null);
  };

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Ink Color:</span>
            {['#0f172a', '#1e40af', '#dc2626'].map((color) => (
              <button
                key={color}
                onClick={() => setPenColor(color)}
                className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                  penColor === color ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-80'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Pen Thickness: {penWidth}px</span>
            <input
              type="range"
              min="1"
              max="8"
              value={penWidth}
              onChange={(e) => setPenWidth(parseInt(e.target.value))}
              className="accent-emerald-600 w-24"
            />
          </div>

          <button
            onClick={clearCanvas}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Pad</span>
          </button>
        </div>

        {/* Signature Pad */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-2 bg-white flex flex-col items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            className="cursor-crosshair max-w-full rounded-xl touch-none"
            style={{ width: '600px', height: '240px' }}
          />
          <span className="text-[11px] text-slate-400 mt-2">Sign above using mouse, trackpad, or finger</span>
        </div>

        {signatureUrl && (
          <ToolResult
            title="Digital Signature (Transparent PNG)"
            previewUrl={signatureUrl}
            downloadUrl={signatureUrl}
            downloadFilename="digital-signature.png"
            metrics={[
              { label: 'Format', value: 'Transparent PNG', highlight: true },
              { label: 'Background', value: '100% Alpha Transparent' },
            ]}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 3. Invoice & Receipt Generator */
export const InvoiceGeneratorTool: React.FC = () => {
  const [fromName, setFromName] = useState('Acme Studios Ltd.');
  const [toName, setToName] = useState('Client Corp.');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [items, setItems] = useState([
    { desc: 'Web Design & Frontend Development', qty: 1, rate: 1200 },
    { desc: 'SEO Architecture & Performance Optimization', qty: 1, rate: 450 },
  ]);
  const [taxRate, setTaxRate] = useState(10);

  const addItem = () => {
    setItems([...items, { desc: 'Consulting & Setup', qty: 1, rate: 250 }]);
  };

  const removeItem = (idx: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  const updateItem = (idx: number, field: 'desc' | 'qty' | 'rate', val: any) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: val };
    setItems(updated);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.qty || 0) * (item.rate || 0), 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Business / Name</label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Billed To (Client)</label>
            <input
              type="text"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono"
            />
          </div>
        </div>

        {/* Itemized list */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Line Items</h4>
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={item.desc}
                onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                placeholder="Item description"
                className="flex-3 px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
              <input
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(idx, 'qty', parseFloat(e.target.value) || 0)}
                placeholder="Qty"
                className="w-20 px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
              <input
                type="number"
                value={item.rate}
                onChange={(e) => updateItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                placeholder="Rate ($)"
                className="w-28 px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
              <span className="w-24 text-xs font-bold font-mono text-slate-800 text-right px-2">
                ${(item.qty * item.rate).toFixed(2)}
              </span>
              {items.length > 1 && (
                <button
                  onClick={() => removeItem(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addItem}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Summary Card */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700">Tax Rate (%):</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-xs rounded-lg border border-slate-300 text-center"
            />
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs text-slate-500">Subtotal: ${subtotal.toFixed(2)}</div>
            <div className="text-xs text-slate-500">Tax ({taxRate}%): ${tax.toFixed(2)}</div>
            <div className="text-base font-bold text-emerald-700">Total: ${total.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        <ToolResult
          title="Invoice Prepared"
          metrics={[
            { label: 'Total Payable', value: `$${total.toFixed(2)}`, highlight: true },
            { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
            { label: 'Tax', value: `$${tax.toFixed(2)}` },
            { label: 'Invoice #', value: invoiceNumber },
          ]}
          copyText={`Invoice ${invoiceNumber}\nFrom: ${fromName}\nTo: ${toName}\nTotal: $${total.toFixed(2)}`}
        />
      </div>
    </ToolWorkspace>
  );
};
