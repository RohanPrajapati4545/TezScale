// High-Performance API client with Instant In-Memory Cache & Zero-Delay Routing
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Production backend endpoint
const productionFallback = isBrowser && window.location.origin.includes('tezscale.onrender.com')
  ? `${window.location.origin}/api`
  : 'https://tezscale.onrender.com/api';

// Instant sync URL resolution - no asynchronous blocking health check
let activeApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  (isLocalhost ? 'http://localhost:5000/api' : productionFallback);

// In-Memory Fast Cache for GET requests (SWR Pattern)
const requestCache = new Map();
const pendingRequests = new Map();
const CACHE_TTL = 30 * 1000; // 30 seconds fresh cache for instant UI rendering

export const getApiUrl = () => {
  return activeApiUrl;
};

// Cloudinary Centralized Configuration
export const CLOUDINARY_CLOUD_NAME = 'qwpdsvyf';
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

// Known pre-migrated Cloudinary assets catalog
const CLOUDINARY_CATALOG = {
  'tezscale-logo.png': `${CLOUDINARY_BASE_URL}/image/upload/v1795431529/tezscale_assets/tezscale-logo.png`,
  'tezscale-hero-video.mp4': `${CLOUDINARY_BASE_URL}/video/upload/v1795431532/tezscale_assets/tezscale-hero-video.mp4`,
  'home-hero-video.mp4': `${CLOUDINARY_BASE_URL}/video/upload/v1795431536/tezscale_assets/home-hero-video.mp4`,
  'page-hero-video.mp4': `${CLOUDINARY_BASE_URL}/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4`,
  'services-hero-video.mp4': `${CLOUDINARY_BASE_URL}/video/upload/v1795431561/tezscale_assets/services-hero-video.mp4`,
  'tezscale-founder.jpg': `${CLOUDINARY_BASE_URL}/image/upload/v1795431565/tezscale_assets/tezscale-founder.jpg`,
  'founder-nobg.png': `${CLOUDINARY_BASE_URL}/image/upload/v1795431570/tezscale_assets/founder-nobg.png`,
  'rohan-prajapati.jpg': `${CLOUDINARY_BASE_URL}/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg`,
  'rustam-rathore.jpg': `${CLOUDINARY_BASE_URL}/image/upload/v1795431575/tezscale_assets/rustam-rathore.jpg`,
  'aarav-singhania.jpg': `${CLOUDINARY_BASE_URL}/image/upload/v1795431565/tezscale_assets/tezscale-founder.jpg`,
  'hero-3d-visual.png': `${CLOUDINARY_BASE_URL}/image/upload/v1795431578/tezscale_assets/hero-3d-visual.png`,
  'hero-founder-visual.png': `${CLOUDINARY_BASE_URL}/image/upload/v1795431580/tezscale_assets/hero-founder-visual.png`,
  'hero-founder-nobg.png': `${CLOUDINARY_BASE_URL}/image/upload/v1795431581/tezscale_assets/hero-founder-nobg.png`,
};

/**
 * Universal Media URL Resolver:
 * Takes any image or video filename/path/URL from DB or user upload
 * and resolves it to a fast, reliable Cloudinary CDN URL in a single place.
 */
export const getMediaUrl = (url, defaultType = 'image') => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return defaultType === 'video'
      ? CLOUDINARY_CATALOG['tezscale-hero-video.mp4']
      : CLOUDINARY_CATALOG['tezscale-logo.png'];
  }

  const trimmed = url.trim();

  // Already a full absolute URL or client preview (base64/blob)
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Strip leading slash or dot slash
  const cleanName = trimmed.replace(/^(\.\/|\/)+/, '');

  // Check predefined Cloudinary catalog
  if (CLOUDINARY_CATALOG[cleanName]) {
    return CLOUDINARY_CATALOG[cleanName];
  }

  // Check if it specifies a Cloudinary folder
  if (cleanName.startsWith('tezscale_media/') || cleanName.startsWith('tezscale_assets/')) {
    const isVideo = defaultType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(cleanName);
    return `${CLOUDINARY_BASE_URL}/${isVideo ? 'video' : 'image'}/upload/${cleanName}`;
  }

  // Local uploads fallback
  if (cleanName.startsWith('uploads/')) {
    const cleanBase = activeApiUrl.replace(/\/api\/?$/, '');
    return `${cleanBase}/${cleanName}`;
  }

  // Default: resolve relative asset name to Cloudinary CDN
  const isVideo = defaultType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(cleanName);
  return `${CLOUDINARY_BASE_URL}/${isVideo ? 'video' : 'image'}/upload/tezscale_media/${cleanName}`;
};

/**
 * High-Speed apiFetch:
 * - Instant URL resolution (0ms delay)
 * - Automatic Request Deduplication
 * - In-Memory Fast GET Cache
 * - Resilient Abort Timeout
 */
export const apiFetch = async (endpoint, options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const cleanBase = activeApiUrl.endsWith('/') ? activeApiUrl.slice(0, -1) : activeApiUrl;
  const url = `${cleanBase}${cleanEndpoint}`;

  // Check In-Memory Cache for fast GET requests (exclude /content to guarantee live CMS updates)
  const isGet = method === 'GET';
  const cacheKey = `${url}`;
  const isContentEndpoint = cleanEndpoint.startsWith('/content');

  if (isGet && !options.noCache && !isContentEndpoint) {
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      // Return cloned response from memory in 0ms!
      return cached.response.clone();
    }
  }

  // Request deduplication for simultaneous identical GET requests
  if (isGet && pendingRequests.has(cacheKey)) {
    const pendingPromise = pendingRequests.get(cacheKey);
    const res = await pendingPromise;
    return res.clone();
  }

  // AbortController with adaptive timeout (180s for uploads, 15s for API)
  const isFileUpload = options.body instanceof FormData || cleanEndpoint.includes('/upload');
  const timeoutMs = options.timeout ?? (isFileUpload ? 180000 : 15000);
  const hasCustomSignal = Boolean(options.signal);
  const controller = hasCustomSignal ? null : new AbortController();
  const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  const signal = options.signal || controller?.signal;

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url, {
        ...options,
        signal,
        headers: {
          'Accept': 'application/json',
          ...(options.headers || {}),
        },
      });

      if (timeoutId) clearTimeout(timeoutId);

      // Cache successful GET responses in memory
      if (isGet && res.ok && !options.noCache) {
        requestCache.set(cacheKey, {
          response: res.clone(),
          timestamp: Date.now(),
        });
      }

      return res;
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);

      // If local port 5000 failed in development, seamlessly fallback to port 5005
      if (isLocalhost && activeApiUrl.includes('localhost:5000')) {
        activeApiUrl = 'http://localhost:5005/api';
        const fallbackUrl = `http://localhost:5005/api${cleanEndpoint}`;
        try {
          return await fetch(fallbackUrl, { ...options, signal });
        } catch (fallbackErr) {
          throw err;
        }
      }

      throw err;
    } finally {
      if (isGet) {
        pendingRequests.delete(cacheKey);
      }
    }
  })();

  if (isGet) {
    pendingRequests.set(cacheKey, fetchPromise);
  }

  return fetchPromise;
};

// Invalidate in-memory cache when updates happen
export const clearApiCache = (endpoint) => {
  if (endpoint) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const cleanBase = activeApiUrl.endsWith('/') ? activeApiUrl.slice(0, -1) : activeApiUrl;
    requestCache.delete(`${cleanBase}${cleanEndpoint}`);
  } else {
    requestCache.clear();
  }
};

/**
 * Universal Media URL Resolver
 * Guarantees that any Cloudinary public ID, relative path, or external link resolves into a valid renderable URL
 */
export const resolveMediaUrl = (url, fallback = '') => {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Cloudinary public ID like "tezscale_assets/rohan-prajapati.jpg"
  if (trimmed.startsWith('tezscale_assets/')) {
    const isVideo = /\.(mp4|webm|mov|mkv|avi)$/i.test(trimmed);
    const type = isVideo ? 'video' : 'image';
    return `https://res.cloudinary.com/qwpdsvyf/${type}/upload/${trimmed}`;
  }

  // Local uploads
  if (trimmed.startsWith('/uploads/')) {
    const base = isLocalhost ? 'http://localhost:5000' : 'https://tezscale.onrender.com';
    return `${base}${trimmed}`;
  }

  return trimmed;
};

export default apiFetch;
