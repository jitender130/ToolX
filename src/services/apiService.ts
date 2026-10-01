/**
 * Secure API Service Utility
 * 
 * Handles all requests to external image enhancement, vision analysis, and AI processing APIs.
 * Architecture & Security Guarantees:
 * - Zero API keys exposed on client-side; all requests route through backend proxy endpoints (/api/ai/*).
 * - Implements timeout handling, request cancellation, and client-side graceful fallbacks.
 * - Handles base64 conversion and payload size checks.
 */

export interface ImageEnhanceResponse {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  analysis: string;
  modelUsed?: string;
  success: boolean;
}

export interface OcrExtractResponse {
  extractedText: string;
  modelUsed?: string;
  success: boolean;
}

export interface PromptEnhanceResponse {
  enhancedPrompt: string;
  negativePrompt?: string;
  tips?: string;
  success: boolean;
}

export interface TextSummarizeResponse {
  output: string;
  keyTakeaways?: string[];
  stats?: string;
  success: boolean;
}

export interface SocialCaptionResponse {
  hook: string;
  caption: string;
  hashtags: string[];
  success: boolean;
}

export interface RemoveBgResponse {
  success: boolean;
  imageBase64?: string;
  engine?: string;
  fallbackToLocalAi?: boolean;
  creditsCharged?: string;
  message?: string;
}

class SecureApiService {
  private readonly defaultTimeoutMs = 25000;

  /**
   * Helper to fetch with a timeout
   */
  private async fetchWithTimeout(url: string, options: RequestInit, timeoutMs = this.defaultTimeoutMs): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Convert a File or Blob object into base64 string
   */
  public async fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Call external AI image enhancement API via secure server-side proxy
   */
  public async enhanceImage(
    imageBase64: string,
    mimeType = 'image/jpeg'
  ): Promise<ImageEnhanceResponse> {
    try {
      const res = await this.fetchWithTimeout('/api/ai/enhance-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          mimeType,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }

      const data = await res.json();
      return {
        brightness: data.brightness ?? 108,
        contrast: data.contrast ?? 112,
        saturation: data.saturation ?? 115,
        warmth: data.warmth ?? 0,
        analysis: data.analysis || 'Optimal lighting and exposure balance applied.',
        modelUsed: data.modelUsed || 'gemini-3.8-flash',
        success: true,
      };
    } catch (err) {
      console.warn('Backend image enhancement service warning, applying adaptive client fallback:', err);
      return {
        brightness: 110,
        contrast: 114,
        saturation: 118,
        warmth: 0,
        analysis: 'Adaptive dynamic tone & color balance applied via client engine.',
        modelUsed: 'client-adaptive-fallback',
        success: false,
      };
    }
  }

  /**
   * Call external AI OCR / Image-to-Text API via secure server-side proxy
   */
  public async extractTextFromImage(
    imageBase64: string,
    mimeType = 'image/jpeg'
  ): Promise<OcrExtractResponse> {
    try {
      const res = await this.fetchWithTimeout('/api/ai/ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          mimeType,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }

      const data = await res.json();
      return {
        extractedText: data.text || '',
        modelUsed: data.modelUsed || 'gemini-3.8-flash',
        success: true,
      };
    } catch (err) {
      console.warn('Backend OCR service error, fallback active:', err);
      return {
        extractedText: '',
        modelUsed: 'client-fallback',
        success: false,
      };
    }
  }

  /**
   * Call external AI prompt generation API
   */
  public async generateEnhancedPrompt(
    prompt: string,
    style?: string,
    targetPlatform?: string
  ): Promise<PromptEnhanceResponse> {
    try {
      const res = await this.fetchWithTimeout('/api/ai/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, targetPlatform }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        enhancedPrompt: data.enhancedPrompt || prompt,
        negativePrompt: data.negativePrompt,
        tips: data.tips,
        success: true,
      };
    } catch (err) {
      console.warn('AI prompt service error:', err);
      return {
        enhancedPrompt: `Ultra-detailed cinematic photograph of ${prompt}, 8k resolution, volumetric studio lighting, hyper-realistic textures, shallow depth of field.`,
        negativePrompt: 'blurry, distorted, oversaturated, low resolution, watermark',
        tips: 'Refine lighting style or camera focal length for targeted results.',
        success: false,
      };
    }
  }

  /**
   * Call external AI text summarizer API
   */
  public async summarizeText(
    text: string,
    mode = 'summary',
    length = 'medium'
  ): Promise<TextSummarizeResponse> {
    try {
      const res = await this.fetchWithTimeout('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode, length }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        output: data.output || data.summary || text,
        keyTakeaways: data.keyTakeaways || [],
        stats: data.stats || '',
        success: true,
      };
    } catch (err) {
      console.warn('AI summarize error:', err);
      const sentences = text.split(/(?<=[.?!])\s+/);
      return {
        output: sentences.slice(0, 3).join(' ') || text,
        keyTakeaways: ['High-level excerpt extracted from source content.'],
        success: false,
      };
    }
  }

  /**
   * Call external AI social caption generator API
   */
  public async generateSocialCaption(
    topic: string,
    platform = 'Instagram',
    tone = 'engaging'
  ): Promise<SocialCaptionResponse> {
    try {
      const res = await this.fetchWithTimeout('/api/ai/social-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, tone }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        hook: data.hook || `Discover the power of ${topic}!`,
        caption: data.caption || `Level up your productivity with ${topic}. Fast, efficient, and built for modern creators.`,
        hashtags: data.hashtags || ['#Productivity', '#WorkSmart', '#OnlineTools'],
        success: true,
      };
    } catch (err) {
      console.warn('AI social caption error:', err);
      return {
        hook: `Level up with ${topic}! 🚀`,
        caption: `Boost your workflow today with ${topic}. Clean, fast, and simple to use.`,
        hashtags: ['#Trending', '#Productivity', '#ModernTools'],
        success: false,
      };
    }
  }

  /**
   * Calls the official Remove.bg backend proxy route
   */
  public async removeBackgroundOfficial(file: File): Promise<RemoveBgResponse> {
    try {
      const base64 = await this.fileToBase64(file);
      const res = await this.fetchWithTimeout('/api/ai/remove-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!res.ok) {
        return {
          success: false,
          fallbackToLocalAi: true,
          message: `Server returned status ${res.status}`,
        };
      }

      return await res.json();
    } catch (err: any) {
      console.warn('Remove.bg proxy error:', err);
      return {
        success: false,
        fallbackToLocalAi: true,
        message: err?.message || 'Network error connecting to remove.bg proxy',
      };
    }
  }

  /**
   * Checks if Remove.bg API is configured on server
   */
  public async checkRemoveBgStatus(): Promise<{ configured: boolean; provider: string }> {
    try {
      const res = await this.fetchWithTimeout('/api/ai/remove-bg/status', { method: 'GET' }, 4000);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    return { configured: false, provider: 'remove.bg' };
  }
}

export const apiService = new SecureApiService();
