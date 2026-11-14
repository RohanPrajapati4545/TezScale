// Intelligent API helper with auto port detection (5000 or 5005)
let activeApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getApiUrl = async () => {
  try {
    const res = await fetch(`${activeApiUrl}/health`, { signal: AbortSignal.timeout(1200) });
    if (res.ok) return activeApiUrl;
  } catch (e) {
    // try fallback 5005
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
  const url = `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  return fetch(url, options);
};

export default apiFetch;
