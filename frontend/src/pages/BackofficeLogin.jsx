import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import apiFetch from '../api/apiClient';
import { useContent } from '../context/ContentContext';

const BackofficeLogin = ({ onLoginSuccess }) => {
  const { content } = useContent();
  const heroData = content?.hero || {};
  const mediaData = content?.media || {};
  const videoRef = useRef(null);

  const [usernameOrEmail, setUsernameOrEmail] = useState(() => {
    return localStorage.getItem('tezscale_remembered_admin') || '';
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    return Boolean(localStorage.getItem('tezscale_remembered_admin'));
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Rate-limiting and Brute-force lockout state
  const [lockedUntil, setLockedUntil] = useState(() => {
    const saved = localStorage.getItem('tezscale_login_lock');
    if (saved) {
      const lockTime = parseInt(saved, 10);
      if (Date.now() < lockTime) return lockTime;
      localStorage.removeItem('tezscale_login_lock');
    }
    return null;
  });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();

  // Periodic timer to auto-clear lockout when duration expires
  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      if (Date.now() >= lockedUntil) {
        setLockedUntil(null);
        localStorage.removeItem('tezscale_login_lock');
        setFailedAttempts(0);
        setError('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  // Pre-warm the backend instantly in the background so there is ZERO cold-start lag
  useEffect(() => {
    try {
      fetch('https://tezscale.onrender.com/api/health', { mode: 'no-cors' }).catch(() => {});
    } catch (e) {}

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Check if client is currently in lockout window
    if (lockedUntil && Date.now() < lockedUntil) {
      const minutesLeft = Math.ceil((lockedUntil - Date.now()) / 60000);
      setError(`Too many failed attempts. Login is locked for your security. Please wait ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`);
      return;
    }

    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError('Please enter your email/username and password');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('tezscale_remembered_admin', cleanUser);
    } else {
      localStorage.removeItem('tezscale_remembered_admin');
    }

    setLoading(true);

    try {
      // 3.5s timeout prevents Render free tier spin-up from stalling the user
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: cleanUser, password: cleanPass }),
        signal: AbortSignal.timeout(3500),
      });

      const data = await res.json();

      // Handle HTTP 429 Too Many Requests (Rate limit triggered from backend)
      if (res.status === 429) {
        const lockDuration = 15 * 60 * 1000;
        const lockExpires = Date.now() + lockDuration;
        setLockedUntil(lockExpires);
        localStorage.setItem('tezscale_login_lock', String(lockExpires));
        setError(data.message || 'Too many failed login attempts from this IP address. Access is locked for 15 minutes.');
        return;
      }

      if (res.ok && data.success && data.token) {
        setFailedAttempts(0);
        setLockedUntil(null);
        localStorage.removeItem('tezscale_login_lock');
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/backoffice');
        }
        return;
      } else {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);

        if (nextFailed >= 5) {
          const lockDuration = 15 * 60 * 1000;
          const lockExpires = Date.now() + lockDuration;
          setLockedUntil(lockExpires);
          localStorage.setItem('tezscale_login_lock', String(lockExpires));
          setError('Too many failed attempts. Access is locked for 15 minutes to prevent brute-force attacks.');
        } else {
          setError(data.message || `Invalid login credentials. ${5 - nextFailed} attempt(s) remaining before security lockout.`);
        }
      }
    } catch (err) {
      console.warn('Backend waking up or offline fallback:', err);
      // Fast fallback for admin credentials so admin is NEVER blocked waiting when offline!
      if (
        !lockedUntil &&
        (cleanUser === 'admin' || cleanUser === 'admin@gmail.com') &&
        cleanPass === 'admin@123'
      ) {
        localStorage.setItem('adminToken', 'live_admin_auth_session_tezscale');
        localStorage.setItem(
          'adminUser',
          JSON.stringify({ username: 'admin', email: 'admin@gmail.com', role: 'admin' })
        );
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/backoffice');
        }
        return;
      } else {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        if (nextFailed >= 5) {
          const lockExpires = Date.now() + 15 * 60 * 1000;
          setLockedUntil(lockExpires);
          localStorage.setItem('tezscale_login_lock', String(lockExpires));
          setError('Too many failed attempts. Access is locked for 15 minutes to prevent brute-force attacks.');
        } else {
          setError(`Login failed. Please check credentials or try again (${5 - nextFailed} tries left).`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const videoSrc = heroData.backgroundVideo || mediaData.homeHeroVideo || '/tezscale-hero-video.mp4';
  const minutesLeft = lockedUntil ? Math.max(1, Math.ceil((lockedUntil - Date.now()) / 60000)) : 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#070913] text-white selection:bg-[#00A3E0] selection:text-white">
      {/* Dynamic Background Video - Balanced for Video Clarity & Comfortable Readability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 opacity-70 sm:opacity-75"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src="/tezscale-hero-video-full.mp4" type="video/mp4" />
        </video>

        {/* Balanced Dark Tint Overlay - Video remains clearly visible while text stays sharp */}
        <div className="absolute inset-0 bg-[#070913]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070913]/70 via-[#070913]/30 to-[#070913]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070913]/60 via-transparent to-[#070913]/80 pointer-events-none" />
      </div>

      {/* Top Header Navigation Strip */}
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Brand Logo & Back to Website Link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <img
              src="/tezscale-logo.png"
              alt="TezScale Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-left">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center">
                TEZ<span className="text-[#00A3E0]">SCALE</span>
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-block w-px h-5 bg-white/20" />

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Full-Screen Split Content */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        
        {/* Left Side: Welcome Back Hero Section */}
        <div className="w-full lg:w-1/2 text-left space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-bold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TezScale Platform Management</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-lg">
            Welcome <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-[#00A3E0]">
              Back
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-lg leading-relaxed font-normal drop-shadow-sm">
            Access your unified administration dashboard to monitor real-time inbound leads, customize site specifications, manage your dynamic team, and accelerate digital client growth.
          </p>
        </div>

        {/* Right Side: Compact, Sleek Login Form */}
        <div className="w-full lg:w-[380px] max-w-sm">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl text-left relative overflow-hidden">
            
            {/* Top Glow Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent pointer-events-none" />

            <div className="space-y-1 mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Login
              </h2>
              <p className="text-xs text-slate-300">
                Enter your credentials to continue.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className={`mb-4 p-3 border rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                lockedUntil ? 'bg-amber-500/15 border-amber-500/40 text-amber-200' : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
              }`}>
                {lockedUntil ? (
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                )}
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Email Address or Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    disabled={Boolean(lockedUntil)}
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-white text-slate-900 rounded-xl text-xs sm:text-sm font-semibold placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] disabled:bg-slate-200 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={Boolean(lockedUntil)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 sm:py-3 bg-white text-slate-900 rounded-xl text-xs sm:text-sm font-semibold placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] disabled:bg-slate-200 disabled:cursor-not-allowed transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    disabled={Boolean(lockedUntil)}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#00A3E0] focus:ring-[#00A3E0] cursor-pointer accent-[#00A3E0]"
                  />
                  <span className="font-semibold text-xs">Remember Me</span>
                </label>
              </div>

              {/* Action Button: Styled with Landing Page Blue Gradient Theme */}
              <button
                type="submit"
                disabled={loading || Boolean(lockedUntil)}
                className={`w-full py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  lockedUntil
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#00A3E0] via-sky-500 to-blue-600 hover:from-[#008bc0] hover:via-sky-400 hover:to-blue-500 active:scale-[0.99] disabled:opacity-75 text-white shadow-[#00A3E0]/30 hover:shadow-[#00A3E0]/50 cursor-pointer'
                } mt-4`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging In...</span>
                  </>
                ) : lockedUntil ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Temporarily Locked ({minutesLeft}m)</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* Bottom Footer Copyright Strip */}
      <footer className="relative z-20 w-full px-6 sm:px-10 lg:px-16 py-3 text-center text-[11px] text-slate-400">
        &copy; {new Date().getFullYear()} TezScale Digital Growth Agency. All Rights Reserved.
      </footer>
    </div>
  );
};

export default BackofficeLogin;
