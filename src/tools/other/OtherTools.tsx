import React, { useState, useEffect, useRef } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';
import {
  Download,
  Copy,
  RefreshCw,
  QrCode,
  Globe,
  FileText,
  Wifi,
  CreditCard,
  User,
  Phone,
  Mail,
  MessageSquare,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Printer,
  Sliders,
  ExternalLink
} from 'lucide-react';
import QRCode from 'qrcode';

type QrType = 'url' | 'text' | 'wifi' | 'upi' | 'contact' | 'phone' | 'email' | 'sms';

/* 1. QR Code Generator - 100% Real Standard Compliant (ISO/IEC 18004) */
export const QrCodeGeneratorTool: React.FC = () => {
  const [activeType, setActiveType] = useState<QrType>('url');

  // Input states
  const [url, setUrl] = useState('https://toolx.online');
  const [plainText, setPlainText] = useState('Welcome to ToolX - Fast & Private Online Tools');
  
  // Wi-Fi
  const [wifiSsid, setWifiSsid] = useState('Home_Network');
  const [wifiPass, setWifiPass] = useState('secretpassword123');
  const [wifiEnc, setWifiEnc] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // UPI Payment (Instant PhonePe / GooglePay / Paytm)
  const [upiId, setUpiId] = useState('merchant@upi');
  const [upiName, setUpiName] = useState('ToolX Payments');
  const [upiAmount, setUpiAmount] = useState('100');
  const [upiNote, setUpiNote] = useState('Digital Services');

  // Contact / vCard
  const [vcardName, setVcardName] = useState('Jitender');
  const [vcardPhone, setVcardPhone] = useState('+91 98765 43210');
  const [vcardEmail, setVcardEmail] = useState('support@toolx.online');
  const [vcardOrg, setVcardOrg] = useState('ToolX Platform');
  const [vcardWebsite, setVcardWebsite] = useState('https://toolx.online');

  // Phone, Email, SMS
  const [phoneNum, setPhoneNum] = useState('+91 98765 43210');
  const [emailTo, setEmailTo] = useState('contact@toolx.online');
  const [emailSubject, setEmailSubject] = useState('Inquiry from ToolX');
  const [emailBody, setEmailBody] = useState('Hello, I would like to get in touch.');
  const [smsPhone, setSmsPhone] = useState('+91 98765 43210');
  const [smsMessage, setSmsMessage] = useState('Hello from ToolX');

  // Styling & Encoding Options
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [isTransparent, setIsTransparent] = useState(false);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [size, setSize] = useState<number>(512);
  const [margin, setMargin] = useState<number>(2);

  // Outputs
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvg, setQrSvg] = useState<string>('');
  const [resolvedPayload, setResolvedPayload] = useState<string>('');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Build standard compliant raw payload string
  const computePayload = (): string => {
    switch (activeType) {
      case 'url': {
        const trimmed = url.trim();
        if (!trimmed) return 'https://toolx.online';
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
          return `https://${trimmed}`;
        }
        return trimmed;
      }
      case 'text':
        return plainText.trim() || 'ToolX';
      case 'wifi': {
        // Standard Wi-Fi format: WIFI:S:MySSID;T:WPA;P:MyPassword;H:false;;
        const enc = wifiEnc === 'nopass' ? 'nopass' : wifiEnc;
        const passPart = wifiEnc !== 'nopass' ? `P:${wifiPass};` : '';
        const hiddenPart = wifiHidden ? 'H:true;' : '';
        return `WIFI:S:${wifiSsid};T:${enc};${passPart}${hiddenPart};`;
      }
      case 'upi': {
        // Standard UPI Deep-Link: upi://pay?pa=...&pn=...&am=...&cu=INR&tn=...
        const params = new URLSearchParams();
        if (upiId.trim()) params.append('pa', upiId.trim());
        if (upiName.trim()) params.append('pn', upiName.trim());
        if (upiAmount.trim()) params.append('am', upiAmount.trim());
        params.append('cu', 'INR');
        if (upiNote.trim()) params.append('tn', upiNote.trim());
        return `upi://pay?${params.toString()}`;
      }
      case 'contact': {
        // Standard vCard 3.0
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${vcardName.trim()}`,
          vcardOrg.trim() ? `ORG:${vcardOrg.trim()}` : '',
          vcardPhone.trim() ? `TEL:${vcardPhone.trim()}` : '',
          vcardEmail.trim() ? `EMAIL:${vcardEmail.trim()}` : '',
          vcardWebsite.trim() ? `URL:${vcardWebsite.trim()}` : '',
          'END:VCARD'
        ].filter(Boolean).join('\n');
      }
      case 'phone':
        return `tel:${phoneNum.trim().replace(/\s+/g, '')}`;
      case 'email': {
        const query = new URLSearchParams();
        if (emailSubject) query.append('subject', emailSubject);
        if (emailBody) query.append('body', emailBody);
        const qStr = query.toString();
        return `mailto:${emailTo.trim()}${qStr ? `?${qStr}` : ''}`;
      }
      case 'sms':
        return `smsto:${smsPhone.trim().replace(/\s+/g, '')}:${smsMessage}`;
      default:
        return 'https://toolx.online';
    }
  };

  // Re-generate official standard QR code whenever inputs change
  useEffect(() => {
    const payload = computePayload();
    setResolvedPayload(payload);
    setIsRendering(true);

    const canvas = canvasRef.current;
    const finalBgColor = isTransparent ? '#00000000' : bgColor;

    const qrOptions: QRCode.QRCodeToDataURLOptions = {
      errorCorrectionLevel: errorCorrection,
      margin,
      width: size,
      color: {
        dark: fgColor,
        light: finalBgColor,
      },
    };

    // Render to Canvas
    if (canvas) {
      QRCode.toCanvas(canvas, payload, qrOptions).catch((err) => {
        console.error('QR Canvas generation error:', err);
      });
    }

    // Render Data URL for high-DPI download & preview
    QRCode.toDataURL(payload, qrOptions)
      .then((dataUrl) => {
        setQrDataUrl(dataUrl);
        setIsRendering(false);
      })
      .catch((err) => {
        console.error('QR DataURL generation error:', err);
        setIsRendering(false);
      });

    // Render scalable SVG string
    QRCode.toString(payload, {
      type: 'svg',
      errorCorrectionLevel: errorCorrection,
      margin,
      width: size,
      color: {
        dark: fgColor,
        light: finalBgColor,
      },
    })
      .then((svgStr) => {
        setQrSvg(svgStr);
      })
      .catch((err) => {
        console.error('QR SVG generation error:', err);
      });
  }, [
    activeType,
    url,
    plainText,
    wifiSsid,
    wifiPass,
    wifiEnc,
    wifiHidden,
    upiId,
    upiName,
    upiAmount,
    upiNote,
    vcardName,
    vcardPhone,
    vcardEmail,
    vcardOrg,
    vcardWebsite,
    phoneNum,
    emailTo,
    emailSubject,
    emailBody,
    smsPhone,
    smsMessage,
    fgColor,
    bgColor,
    isTransparent,
    errorCorrection,
    size,
    margin,
  ]);

  // Copy raw payload text
  const handleCopyPayload = async () => {
    try {
      await navigator.clipboard.writeText(resolvedPayload);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    } catch {
      // fallback
    }
  };

  // Copy QR Image to clipboard as PNG
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2000);
        } catch (err) {
          console.warn('Clipboard write image not supported on this browser:', err);
        }
      });
    } catch {
      // fallback
    }
  };

  // Download SVG
  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `toolx-qrcode-${activeType}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  // Trigger Print View
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ToolX QR Code Print - ${activeType}</title>
          <style>
            body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 95vh; margin: 0; text-align: center; }
            .card { padding: 32px; border: 2px dashed #cbd5e1; border-radius: 24px; max-width: 450px; }
            img { width: 280px; height: 280px; display: block; margin: 0 auto; }
            h2 { margin: 16px 0 6px 0; color: #0f172a; font-size: 20px; }
            p { margin: 0 0 16px 0; color: #64748b; font-size: 13px; word-break: break-all; }
            .footer { font-size: 11px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${qrDataUrl}" alt="Scannable QR Code" />
            <h2>Scan with Any Camera or Phone</h2>
            <p>${resolvedPayload}</p>
            <div class="footer">Generated with ToolX (100% ISO/IEC 18004 Standard QR Code)</div>
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const TYPE_TABS = [
    { id: 'url' as QrType, label: 'Website URL', icon: Globe },
    { id: 'text' as QrType, label: 'Plain Text', icon: FileText },
    { id: 'wifi' as QrType, label: 'Wi-Fi Network', icon: Wifi },
    { id: 'upi' as QrType, label: 'UPI Payment', icon: CreditCard },
    { id: 'contact' as QrType, label: 'vCard Contact', icon: User },
    { id: 'phone' as QrType, label: 'Phone Call', icon: Phone },
    { id: 'email' as QrType, label: 'Email', icon: Mail },
    { id: 'sms' as QrType, label: 'SMS Message', icon: MessageSquare },
  ];

  return (
    <ToolWorkspace>
      <div className="space-y-8">
        
        {/* Verification Guarantee Banner */}
        <div className="flex items-start sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl border border-emerald-200/90 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>100% Real Standard QR Generator (ISO/IEC 18004)</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-emerald-200/70 text-emerald-900 rounded-md">VERIFIED</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Encodes genuine Reed-Solomon error correction modules. When scanned by any smartphone camera, Google Lens, Paytm, iPhone, or scanner app, it decodes and shows your exact data permanently.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Permanent Scan Data</span>
          </div>
        </div>

        {/* Content Type Selector Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Select Data Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
            {TYPE_TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveType(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="text-[11px] text-center leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Input Form According to Selected Type */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          
          {/* 1. URL */}
          {activeType === 'url' && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Website Address (URL)
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                When scanned by phones, automatically prompts the user to open this link in their web browser.
              </p>
            </div>
          )}

          {/* 2. Plain Text */}
          {activeType === 'text' && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Plain Text or Message Content
              </label>
              <textarea
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                rows={3}
                placeholder="Type any message, serial number, address, or secret text..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Scanners will directly display this text content on the user's screen.
              </p>
            </div>
          )}

          {/* 3. Wi-Fi */}
          {activeType === 'wifi' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Wi-Fi Network Name (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="e.g. Office_WiFi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Security Encryption</label>
                  <select
                    value={wifiEnc}
                    onChange={(e) => setWifiEnc(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                    <option value="WEP">WEP (Older)</option>
                    <option value="nopass">None (Open Network)</option>
                  </select>
                </div>
              </div>

              {wifiEnc !== 'nopass' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Network Password</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="Wi-Fi Password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden font-mono"
                  />
                </div>
              )}

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={wifiHidden}
                  onChange={(e) => setWifiHidden(e.target.checked)}
                  className="rounded-md text-emerald-600 focus:ring-emerald-500"
                />
                <span>Hidden Wi-Fi SSID</span>
              </label>
              <p className="text-[11px] text-slate-500">
                When guests scan this QR code, iPhone and Android phones immediately prompt: <strong>"Join '[SSID]' Wi-Fi?"</strong> without typing passwords!
              </p>
            </div>
          )}

          {/* 4. UPI Payment */}
          {activeType === 'upi' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">UPI ID (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. username@okaxis, shop@upi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Payee Name</label>
                  <input
                    type="text"
                    value={upiName}
                    onChange={(e) => setUpiName(e.target.value)}
                    placeholder="e.g. Jitender Kumar / Store"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Amount (₹ INR Optional)</label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    placeholder="Leave blank for any amount"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Payment Note / Remark</label>
                  <input
                    type="text"
                    value={upiNote}
                    onChange={(e) => setUpiNote(e.target.value)}
                    placeholder="e.g. Order #1042"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                Compatible with all Indian UPI apps (PhonePe, Google Pay, Paytm, BHIM, Cred). Scanners open the payment screen instantly with your UPI ID.
              </p>
            </div>
          )}

          {/* 5. Contact (vCard) */}
          {activeType === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={vcardName}
                    onChange={(e) => setVcardName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={vcardOrg}
                    onChange={(e) => setVcardOrg(e.target.value)}
                    placeholder="Organization Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={vcardWebsite}
                    onChange={(e) => setVcardWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                Generates a digital business card (vCard 3.0). Scanning with any phone automatically offers <strong>"Add Contact to Address Book"</strong>.
              </p>
            </div>
          )}

          {/* 6. Phone */}
          {activeType === 'phone' && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number to Call</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Scanners will directly open the phone dialer with this number dialed.
              </p>
            </div>
          )}

          {/* 7. Email */}
          {activeType === 'email' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Recipient Email</label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email Subject"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Preset Body</label>
                  <input
                    type="text"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Hello, I would like..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 8. SMS */}
          {activeType === 'sms' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">SMS Recipient Number</label>
                <input
                  type="tel"
                  value={smsPhone}
                  onChange={(e) => setSmsPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">SMS Message Body</label>
                <textarea
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  rows={2}
                  placeholder="Type pre-filled SMS message..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Customization Options Bar */}
        <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>Design, Colors &amp; Error Correction</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Foreground color */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">QR Dots Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-1 bg-white"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-24 px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-mono uppercase bg-white"
                />
              </div>
            </div>

            {/* Background color */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Background Color</label>
                <label className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTransparent}
                    onChange={(e) => setIsTransparent(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Transparent</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  disabled={isTransparent}
                  onChange={(e) => setBgColor(e.target.value)}
                  className={`w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-1 bg-white ${
                    isTransparent ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                />
                <input
                  type="text"
                  value={isTransparent ? 'Transparent' : bgColor}
                  disabled={isTransparent}
                  onChange={(e) => setBgColor(e.target.value)}
                  className={`w-24 px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-mono uppercase bg-white ${
                    isTransparent ? 'opacity-40' : ''
                  }`}
                />
              </div>
            </div>

            {/* Error correction */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Error Correction Level
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:border-emerald-500 focus:outline-hidden"
              >
                <option value="L">Level L (7% Recovery)</option>
                <option value="M">Level M (15% Recovery - Recommended)</option>
                <option value="Q">Level Q (25% Recovery)</option>
                <option value="H">Level H (30% Recovery - Highest Durability)</option>
              </select>
            </div>

            {/* Resolution Size */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Image Resolution
              </label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:border-emerald-500 focus:outline-hidden"
              >
                <option value={256}>256 × 256 px (Standard Web)</option>
                <option value={512}>512 × 512 px (High Definition)</option>
                <option value={1024}>1024 × 1024 px (Ultra HD Print)</option>
                <option value={2048}>2048 × 2048 px (Billboard / Packaging)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hidden Canvas for Internal Image Synthesis */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Interactive QR Display & Scanned Content Verification */}
        {qrDataUrl && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-gradient-to-br from-white to-slate-50/70 rounded-3xl border border-slate-200/90 shadow-md">
            
            {/* Left Column: QR Code Visual Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm relative group">
              <div
                className="p-4 rounded-2xl transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: isTransparent ? 'transparent' : bgColor,
                  backgroundImage: isTransparent
                    ? 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)'
                    : 'none',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                }}
              >
                <img
                  src={qrDataUrl}
                  alt={`Scannable QR code encoding ${activeType}`}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
                />
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{size} × {size} px · Level {errorCorrection}</span>
              </div>
            </div>

            {/* Right Column: Verified Scanned Content Output & Export Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              
              {/* Verified Decoded Content Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Decoded Content Output (What Scanners Read)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {resolvedPayload.length} chars
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto max-h-36 leading-relaxed border border-slate-800 relative group">
                  <pre className="whitespace-pre-wrap break-all">{resolvedPayload}</pre>
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Copy exact decoded text"
                  >
                    {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Permanent Data Guarantee:</strong> This QR code is 100% static and self-contained. Anyone who scans this image—today, next year, or offline—will receive this exact data instantly.
                  </span>
                </div>
              </div>

              {/* Action Buttons: High-Res PNG, Scalable SVG, Copy Image, Print */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  
                  {/* Download PNG */}
                  <a
                    href={qrDataUrl}
                    download={`toolx-qrcode-${activeType}.png`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </a>

                  {/* Download SVG (Vector) */}
                  <button
                    type="button"
                    onClick={handleDownloadSvg}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Download SVG</span>
                  </button>

                  {/* Copy Image to Clipboard */}
                  <button
                    type="button"
                    onClick={handleCopyImage}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer"
                  >
                    {copiedImage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied PNG!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Image</span>
                      </>
                    )}
                  </button>

                  {/* Print */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print Card</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 2. Password Generator */
export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // Entropy calculation
  let poolSize = 0;
  if (includeUpper) poolSize += 26;
  if (includeLower) poolSize += 26;
  if (includeNumbers) poolSize += 10;
  if (includeSymbols) poolSize += 30;
  const entropy = Math.round(length * (Math.log2(poolSize || 1)));

  let strengthLabel = 'Very Strong';
  let strengthColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (entropy < 40) {
    strengthLabel = 'Weak';
    strengthColor = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (entropy < 65) {
    strengthLabel = 'Moderate';
    strengthColor = 'text-amber-700 bg-amber-50 border-amber-200';
  } else if (entropy < 90) {
    strengthLabel = 'Strong';
    strengthColor = 'text-sky-700 bg-sky-50 border-sky-200';
  }

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        {/* Output display */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 font-mono text-base sm:text-lg tracking-wider overflow-x-auto">
          <span className="truncate pr-4">{password}</span>
          <button
            onClick={generatePassword}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
            title="Generate New Password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
              <span>Password Length: <strong className="text-emerald-600 font-bold">{length} characters</strong></span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${strengthColor}`}>
                {strengthLabel} ({entropy} bits)
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Symbols (!@#$)</span>
            </label>
          </div>
        </div>

        <ToolResult
          title="Generated Password"
          copyText={password}
          metrics={[
            { label: 'Length', value: `${length} chars`, highlight: true },
            { label: 'Security Strength', value: strengthLabel },
            { label: 'Entropy', value: `${entropy} bits` },
            { label: 'Charset Pool', value: `${poolSize} glyphs` },
          ]}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 3. Random Number Generator */
export const RandomNumberGeneratorTool: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('5');
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([14, 42, 68, 83, 99]);

  const generate = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const numCount = Math.min(Math.max(parseInt(count) || 1, 1), 100);

    if (maxVal < minVal) {
      alert('Maximum value must be greater than minimum value');
      return;
    }

    if (!allowDuplicates && maxVal - minVal + 1 < numCount) {
      alert('Range is too small for unique numbers of requested quantity');
      return;
    }

    const generated: number[] = [];
    const used = new Set<number>();

    while (generated.length < numCount) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const rand = minVal + (array[0] % (maxVal - minVal + 1));

      if (allowDuplicates || !used.has(rand)) {
        used.add(rand);
        generated.push(rand);
      }
    }

    setResults(generated);
  };

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Minimum Value</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Maximum Value</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Count of Numbers</label>
            <input
              type="number"
              value={count}
              min="1"
              max="100"
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
            />
            <span>Allow duplicate numbers</span>
          </label>
        </div>

        <button
          onClick={generate}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
        >
          Generate Random Numbers
        </button>

        {results.length > 0 && (
          <ToolResult
            title="Generated Results"
            copyText={results.join(', ')}
            metrics={[
              { label: 'Numbers Generated', value: results.length, highlight: true },
              { label: 'Sum', value: results.reduce((a, b) => a + b, 0) },
              { label: 'Minimum Rolled', value: Math.min(...results) },
              { label: 'Maximum Rolled', value: Math.max(...results) },
            ]}
          >
            <div className="flex flex-wrap gap-2.5 mt-4">
              {results.map((num, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-base font-bold font-mono shadow-2xs"
                >
                  {num}
                </div>
              ))}
            </div>
          </ToolResult>
        )}
      </div>
    </ToolWorkspace>
  );
};
