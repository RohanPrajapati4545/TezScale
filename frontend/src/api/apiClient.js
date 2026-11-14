// Intelligent API helper with auto environment & port detection
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// When deployed on Render/production, default to relative '/api' unless an explicit VITE_API_BASE_URL is provided
let activeApiUrl = import.meta.env.VITE_API_BASE_URL || (isLocalhost ? 'http://localhost:5000/api' : '/api');

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
  const url = base.endsWith('/') ? `${base.slice(0, -1)}${cleanEndpoint}` : `${base}${cleanEndpoint}`;
  return fetch(url, options);
};

export default apiFetch;
