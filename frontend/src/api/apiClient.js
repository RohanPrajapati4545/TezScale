// Intelligent API helper with auto environment & port detection
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// When deployed on Render or production, default to https://tezscale.onrender.com/api (or relative /api)
const productionFallback = isBrowser && window.location.origin.includes('tezscale.onrender.com') 
  ? `${window.location.origin}/api` 
  : 'https://tezscale.onrender.com/api';

let activeApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  (isLocalhost ? 'http://localhost:5000/api' : productionFallback);

export const getApiUrl = async () => {
  if (!isLocalhost) {
    return activeApiUrl;
  }

  try {
    const res = await fetch(`${activeApiUrl}/health`, { signal: AbortSignal.timeout(1200) });
    if (res.ok) return activeApiUrl;
  } catch (e) {
    // try fallback 5005 locally
    try {
      const fallback = 'http://localhost:5005/api';
      const res = await fetch(`${fallback}/health`, { signal: AbortSignal.timeout(1200) });
      if (res.ok) {
        activeApiUrl = fallback;
        return activeApiUrl;
      }
    } catch (err) {
      // return default
    }
  }
  return activeApiUrl;
};

export const apiFetch = async (endpoint, options = {}) => {
  const base = await getApiUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const url = `${cleanBase}${cleanEndpoint}`;

  // Default timeout of 6 seconds if no custom signal is provided
  const hasCustomSignal = Boolean(options.signal);
  const controller = hasCustomSignal ? null : new AbortController();
  const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;
  const signal = options.signal || controller?.signal;

  try {
    const res = await fetch(url, { ...options, signal });
    if (timeoutId) clearTimeout(timeoutId);
    return res;
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId);
    throw err;
  }
};

export default apiFetch;
