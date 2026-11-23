import rateLimit from 'express-rate-limit';

// Strict Rate Limiter for Login Endpoint (/api/auth/login)
// Blocks brute-force and credential-stuffing attacks by limiting failed login attempts per IP
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Maximum 5 attempts per IP in 15 minutes window
  standardHeaders: 'draft-7', // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* legacy headers
  skipSuccessfulRequests: true, // Only count failed attempts (correct password won't lock admin out)
  message: {
    success: false,
    message: 'Too many failed login attempts from this IP address. For security reasons, access is temporarily locked for 15 minutes. Please try again later.',
    retryAfterMinutes: 15,
  },
  handler: (req, res, next, options) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    console.warn(`🚨 [SECURITY] Rate limit exceeded for IP: ${clientIp} on route: ${req.originalUrl}`);
    res.status(429).json(options.message);
  },
});

// General API rate limiter to protect all public API endpoints against denial-of-service / scraping
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Maximum 300 requests per IP per 15 minutes
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please slow down and try again later.',
  },
});
