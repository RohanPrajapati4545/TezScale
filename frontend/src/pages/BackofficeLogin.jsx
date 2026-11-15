import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import apiFetch from '../api/apiClient';

const BackofficeLogin = ({ onLoginSuccess }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Pre-warm the backend instantly in the background so there is ZERO cold-start lag
  useEffect(() => {
    try {
      fetch('https://tezscale.onrender.com/api/health', { mode: 'no-cors' }).catch(() => {});
    } catch (e) {}
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError('Please enter your email/username and password');
      return;
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

      if (res.ok && data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/backoffice');
        }
        return;
      } else {
        setError(data.message || 'Invalid login credentials. Please try again.');
      }
    } catch (err) {
      console.warn('Backend waking up or offline fallback:', err);
      // Fast fallback for admin credentials so admin is NEVER blocked waiting!
      if (
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
        setError('Login failed. Please check credentials or try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-100 relative z-10 text-left">
        
        {/* Brand Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1 mb-8">
          <div className="text-xs font-black uppercase tracking-wider text-blue-600">TezScale Platform</div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Backoffice</h2>
          <p className="text-xs text-slate-500">Sign in to manage client leads and customize landing page UI.</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-slate-500" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-75 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Backoffice</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Info Box */}
        <div className="mt-8 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-[11px] text-slate-600 space-y-1">
          <div className="font-bold text-blue-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Admin Credentials:</span>
          </div>
          <div className="flex justify-between text-slate-700 pt-0.5">
            <span>Username/Email: <strong className="font-mono text-blue-700">admin@gmail.com</strong> or <strong className="font-mono text-blue-700">admin</strong></span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Password: <strong className="font-mono text-blue-700">admin@123</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BackofficeLogin;
