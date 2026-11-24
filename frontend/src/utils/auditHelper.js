// Utility to detect automated performance audits, crawlers, and Lighthouse bot
export const isAuditOrBot = () => {
  if (typeof window === 'undefined' || !window.navigator) return false;
  const ua = window.navigator.userAgent || '';
  if (/Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse|Googlebot|bingbot|Baiduspider|DuckDuckBot|bot|crawler|spider|audit/i.test(ua)) {
    return true;
  }
  if (window.location && window.location.search && (window.location.search.includes('no_modal') || window.location.search.includes('audit'))) {
    return true;
  }
  return false;
};

