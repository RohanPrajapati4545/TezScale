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

  // Check In-Memory Cache for fast GET requests (e.g. /content)
  const isGet = method === 'GET';
  const cacheKey = `${url}`;

  if (isGet && !options.noCache) {
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

  // Fast AbortController: 5s timeout prevents any hung request
  const hasCustomSignal = Boolean(options.signal);
  const controller = hasCustomSignal ? null : new AbortController();
  const timeoutId = controller ? setTimeout(() => controller.abort(), 5000) : null;
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

export default apiFetch;
