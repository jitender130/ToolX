import React, { useState } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';
import { ErrorState, SuccessState } from '../../components/tool/ToolStatus';

/* 1. JSON Formatter */
export const JsonFormatterTool: React.FC = () => {
  const [input, setInput] = useState('{"name":"ToolX","features":["PDF Tools","Calculators","Image Tools"],"version":1.0,"active":true}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = (spaces: number = 2) => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-700">JSON Input</label>
            <button
              onClick={() => {
                setInput('');
                setOutput('');
                setError(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          </div>
          <textarea
            rows={7}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
            placeholder="Paste your JSON here..."
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => formatJson(2)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
          >
            Format (2 Spaces)
          </button>
          <button
            onClick={() => formatJson(4)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Format (4 Spaces)
          </button>
          <button
            onClick={minifyJson}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Minify JSON
          </button>
        </div>

        {error && <ErrorState title="JSON Parse Error" message={error} />}

        {output && (
          <ToolResult
            title="Formatted JSON"
            previewText={output}
            copyText={output}
            onReset={() => {
              setOutput('');
              setError(null);
            }}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 2. JSON Validator */
export const JsonValidatorTool: React.FC = () => {
  const [input, setInput] = useState('{\n  "status": "success",\n  "code": 200\n}');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string; stats?: any } | null>(null);

  const validate = () => {
    try {
      const parsed = JSON.parse(input);
      const isArray = Array.isArray(parsed);
      const keys = isArray ? parsed.length : Object.keys(parsed).length;
      setValidationResult({
        isValid: true,
        message: 'Valid JSON format! No syntax or structure errors detected.',
        stats: {
          type: isArray ? 'Array' : 'Object',
          itemsCount: keys,
          byteSize: new Blob([input]).size,
        },
      });
    } catch (err: any) {
      setValidationResult({
        isValid: false,
        message: err.message,
      });
    }
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
          placeholder="Paste JSON to test validity..."
        />

        <button
          onClick={validate}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
        >
          Validate JSON
        </button>

        {validationResult && (
          <div>
            {validationResult.isValid ? (
              <div>
                <SuccessState title="Valid JSON" message={validationResult.message} />
                {validationResult.stats && (
                  <ToolResult
                    title="Validation Metrics"
                    metrics={[
                      { label: 'Root Type', value: validationResult.stats.type, highlight: true },
                      { label: 'Top-Level Keys / Items', value: validationResult.stats.itemsCount },
                      { label: 'Payload Size', value: `${validationResult.stats.byteSize} bytes` },
                    ]}
                  />
                )}
              </div>
            ) : (
              <ErrorState title="Invalid JSON Syntax" message={validationResult.message} />
            )}
          </div>
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 3. Base64 Encoder */
export const Base64EncoderTool: React.FC = () => {
  const [input, setInput] = useState('ToolX – Productivity & Developer Utilities');
  const [encoded, setEncoded] = useState('');

  const encode = () => {
    try {
      // UTF-8 safe base64
      const enc = btoa(unescape(encodeURIComponent(input)));
      setEncoded(enc);
    } catch (err: any) {
      alert('Encoding error: ' + err.message);
    }
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Plain Text Input</label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <button
          onClick={encode}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
        >
          Encode to Base64
        </button>

        {encoded && (
          <ToolResult
            title="Base64 Output"
            previewText={encoded}
            copyText={encoded}
            onReset={() => setEncoded('')}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 4. Base64 Decoder */
export const Base64DecoderTool: React.FC = () => {
  const [input, setInput] = useState('VG9vbFgg4oCTIFByb2R1Y3Rpdml0eSAmIERldmVsb3BlciBVdGlsaXRpZXM=');
  const [decoded, setDecoded] = useState('');
  const [error, setError] = useState<string | null>(null);

  const decode = () => {
    setError(null);
    try {
      const dec = decodeURIComponent(escape(atob(input.trim())));
      setDecoded(dec);
    } catch (err: any) {
      setError('Invalid Base64 string. Please verify the characters and padding.');
    }
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Base64 Input</label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
            placeholder="Paste Base64 encoded string..."
          />
        </div>

        <button
          onClick={decode}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
        >
          Decode from Base64
        </button>

        {error && <ErrorState title="Decode Failed" message={error} />}

        {decoded && (
          <ToolResult
            title="Decoded Text Output"
            previewText={decoded}
            copyText={decoded}
            onReset={() => {
              setDecoded('');
              setError(null);
            }}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 5. URL Encoder */
export const UrlEncoderTool: React.FC = () => {
  const [input, setInput] = useState('https://toolx.online/search?q=pdf compression & tags=online tools');
  const [encoded, setEncoded] = useState('');

  const encode = (mode: 'component' | 'uri') => {
    if (mode === 'component') {
      setEncoded(encodeURIComponent(input));
    } else {
      setEncoded(encodeURI(input));
    }
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
          placeholder="Paste URL or string to encode..."
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => encode('component')}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
          >
            Encode (encodeURIComponent)
          </button>
          <button
            onClick={() => encode('uri')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Encode Full URI (encodeURI)
          </button>
        </div>

        {encoded && (
          <ToolResult
            title="Encoded URL Output"
            previewText={encoded}
            copyText={encoded}
            onReset={() => setEncoded('')}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 6. URL Decoder */
export const UrlDecoderTool: React.FC = () => {
  const [input, setInput] = useState('https%3A%2F%2Ftoolx.online%2Fsearch%3Fq%3Dpdf%2520compression%20%26%20tags%3Donline%20tools');
  const [decoded, setDecoded] = useState('');
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([]);

  const decode = () => {
    try {
      const dec = decodeURIComponent(input.trim());
      setDecoded(dec);

      // Parse query params if URL
      try {
        const urlObj = new URL(dec.startsWith('http') ? dec : `https://example.com/${dec}`);
        const params: { key: string; value: string }[] = [];
        urlObj.searchParams.forEach((val, key) => {
          params.push({ key, value: val });
        });
        setQueryParams(params);
      } catch {
        setQueryParams([]);
      }
    } catch {
      setDecoded(input);
    }
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
          placeholder="Paste URL encoded string..."
        />

        <button
          onClick={decode}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
        >
          Decode URL
        </button>

        {decoded && (
          <div className="space-y-4">
            <ToolResult
              title="Decoded Output"
              previewText={decoded}
              copyText={decoded}
              onReset={() => {
                setDecoded('');
                setQueryParams([]);
              }}
            />

            {queryParams.length > 0 && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detected Query Parameters</h4>
                <div className="space-y-1.5">
                  {queryParams.map((p, idx) => (
                    <div key={idx} className="flex items-center text-xs font-mono">
                      <span className="text-emerald-700 font-semibold">{p.key}</span>
                      <span className="text-slate-400 mx-1">=</span>
                      <span className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 7. HTML Formatter */
export const HtmlFormatterTool: React.FC = () => {
  const [input, setInput] = useState('<div class="container"><h1>Hello ToolX</h1><p>Fast browser utilities</p><ul><li>PDF</li><li>Images</li></ul></div>');
  const [output, setOutput] = useState('');

  const formatHtml = () => {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    let html = input.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    html.split('\r\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      formatted += '  '.repeat(pad) + node + '\r\n';
      pad += indent;
    });
    setOutput(formatted.trim());
  };

  const minifyHtml = () => {
    const min = input
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    setOutput(min);
  };

  return (
    <ToolWorkspace>
      <div className="space-y-4">
        <textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-emerald-500 focus:outline-hidden"
          placeholder="Paste HTML markup to format..."
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={formatHtml}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
          >
            Beautify HTML
          </button>
          <button
            onClick={minifyHtml}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Minify HTML
          </button>
        </div>

        {output && (
          <ToolResult
            title="Formatted HTML"
            previewText={output}
            copyText={output}
            onReset={() => setOutput('')}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};
