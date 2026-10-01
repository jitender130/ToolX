import { removeBackground, Config } from '@imgly/background-removal';
import { apiService } from './apiService';

export interface BgRemovalProgress {
  stage: string;
  percentage: number;
}

export interface BgRemovalResult {
  url: string;
  engine: 'remove.bg' | 'local_ai' | 'chroma';
  creditsCharged?: string;
  notice?: string;
}

/**
 * Primary intelligent background removal pipeline.
 * Tries the official Remove.bg cloud API first. If unconfigured or rate-limited,
 * smoothly cascades to client-side neural AI (@imgly/background-removal), and then smart chroma.
 */
export async function removeBackgroundAuto(
  file: File,
  preferredEngine: 'removebg' | 'local_ai' | 'chroma' = 'removebg',
  onProgress?: (progress: BgRemovalProgress) => void
): Promise<BgRemovalResult> {
  // 1. Try Official Remove.bg API if requested
  if (preferredEngine === 'removebg') {
    onProgress?.({ stage: 'Connecting to official Remove.bg Cloud API...', percentage: 20 });
    try {
      const res = await apiService.removeBackgroundOfficial(file);
      if (res.success && res.imageBase64) {
        onProgress?.({ stage: 'Background removed with official Remove.bg API!', percentage: 100 });
        return {
          url: res.imageBase64,
          engine: 'remove.bg',
          creditsCharged: res.creditsCharged,
        };
      } else {
        // Fallback message
        onProgress?.({
          stage: 'Remove.bg API limit or key not configured. Engaging built-in AI neural model...',
          percentage: 35,
        });
      }
    } catch (e) {
      onProgress?.({
        stage: 'Switching to built-in AI neural network...',
        percentage: 35,
      });
    }
  }

  // 2. High-accuracy in-browser AI Neural Network
  try {
    const blob = await removeImageBackgroundAi(file, onProgress);
    const url = URL.createObjectURL(blob);
    return {
      url,
      engine: 'local_ai',
      notice: preferredEngine === 'removebg'
        ? 'Processed via built-in AI neural engine (Remove.bg API unconfigured or exhausted).'
        : undefined,
    };
  } catch (err) {
    console.warn('AI neural model failed, using chroma fallback:', err);
  }

  // 3. Last fallback: Image element chroma floodfill
  return new Promise((resolve) => {
    const img = new Image();
    const tempUrl = URL.createObjectURL(file);
    img.src = tempUrl;
    img.onload = () => {
      const dataUrl = removeBackgroundChroma(img, { tolerance: 35, feather: 2, perimeterOnly: true });
      URL.revokeObjectURL(tempUrl);
      resolve({
        url: dataUrl,
        engine: 'chroma',
        notice: 'Processed via edge-aware chroma engine.',
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      resolve({
        url: tempUrl,
        engine: 'chroma',
        notice: 'Could not process image.',
      });
    };
  });
}

export async function removeImageBackgroundAi(
  imageSource: File | Blob | string,
  onProgress?: (progress: BgRemovalProgress) => void
): Promise<Blob> {
  const config: Config = {
    model: 'isnet_quint8', // fast quantized model
    debug: false,
    progress: (key: string, current: number, total: number) => {
      if (!onProgress) return;
      const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
      let stage = 'Analyzing image...';
      if (key.includes('fetch')) {
        stage = `Downloading AI segmentation model (${pct}%)...`;
      } else if (key.includes('compute') || key.includes('onnx')) {
        stage = `Running AI subject extraction (${pct}%)...`;
      } else {
        stage = `Refining edges & transparency (${pct}%)...`;
      }
      onProgress({ stage, percentage: pct });
    },
    output: {
      format: 'image/png',
      quality: 0.95,
    },
  };

  return await removeBackground(imageSource, config);
}

/**
 * High-performance edge & perimeter-aware chroma floodfill background remover.
 * Used as an ultra-fast in-browser alternative and robust fallback.
 */
export function removeBackgroundChroma(
  image: HTMLImageElement,
  options: {
    keyColor?: string; // hex like '#ffffff'
    tolerance?: number; // 5 - 100
    feather?: number; // 0 - 5 px
    perimeterOnly?: boolean; // floodfill from edges so inner similar colors remain
  }
): string {
  const { keyColor = '#ffffff', tolerance = 35, feather = 2, perimeterOnly = true } = options;
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return '';

  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const width = canvas.width;
  const height = canvas.height;

  // Parse key color
  const hex = keyColor.replace('#', '');
  const tr = parseInt(hex.substring(0, 2), 16) || 255;
  const tg = parseInt(hex.substring(2, 4), 16) || 255;
  const tb = parseInt(hex.substring(4, 6), 16) || 255;
  const tolDist = (tolerance / 100) * 441.67; // 441.67 is max Euclidean dist between (0,0,0) and (255,255,255)

  const isBgColor = (idx: number) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const dist = Math.sqrt((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2);
    return dist <= tolDist;
  };

  if (perimeterOnly) {
    // Floodfill from perimeter edges so that subject's clothes/eyes with similar color aren't erased
    const visited = new Uint8Array(width * height);
    const queue: number[] = [];

    // Push all 4 border pixels that match background
    for (let x = 0; x < width; x++) {
      const topIdx = (0 * width + x) * 4;
      if (isBgColor(topIdx)) {
        queue.push(0 * width + x);
        visited[0 * width + x] = 1;
      }
      const bottomIdx = ((height - 1) * width + x) * 4;
      if (isBgColor(bottomIdx)) {
        queue.push((height - 1) * width + x);
        visited[(height - 1) * width + x] = 1;
      }
    }

    for (let y = 0; y < height; y++) {
      const leftIdx = (y * width + 0) * 4;
      if (isBgColor(leftIdx) && !visited[y * width + 0]) {
        queue.push(y * width + 0);
        visited[y * width + 0] = 1;
      }
      const rightIdx = (y * width + (width - 1)) * 4;
      if (isBgColor(rightIdx) && !visited[y * width + (width - 1)]) {
        queue.push(y * width + (width - 1));
        visited[y * width + (width - 1)] = 1;
      }
    }

    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      const px = pos % width;
      const py = Math.floor(pos / width);

      data[pos * 4 + 3] = 0; // Set Alpha to 0

      // 4-way neighbors
      const neighbors = [
        [px + 1, py],
        [px - 1, py],
        [px, py + 1],
        [px, py - 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const npos = ny * width + nx;
          if (!visited[npos]) {
            visited[npos] = 1;
            if (isBgColor(npos * 4)) {
              queue.push(npos);
            }
          }
        }
      }
    }
  } else {
    // Global color keying
    for (let i = 0; i < data.length; i += 4) {
      if (isBgColor(i)) {
        data[i + 3] = 0;
      }
    }
  }

  // Edge feathering / smoothing if enabled
  if (feather > 0) {
    // Light feathering pass on alpha boundaries
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        if (data[idx + 3] > 0) {
          // Check if adjacent to transparent pixel
          const hasTransparentNeighbor =
            data[((y - 1) * width + x) * 4 + 3] === 0 ||
            data[((y + 1) * width + x) * 4 + 3] === 0 ||
            data[(y * width + (x - 1)) * 4 + 3] === 0 ||
            data[(y * width + (x + 1)) * 4 + 3] === 0;

          if (hasTransparentNeighbor) {
            data[idx + 3] = Math.round(data[idx + 3] * 0.5); // Soft edge
          }
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}
