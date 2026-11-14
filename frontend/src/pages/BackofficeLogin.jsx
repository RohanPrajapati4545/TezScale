import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import apiFetch from '../api/apiClient';

const BackofficeLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!usernameOrEmail || !password) {
      setError('Please enter your email/username and password');
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid login credentials. Please try again.');
      }
    } catch (err) {
      console.warn('Fallback login for testing offline:', err);
      // If backend network fails, allow fallback with default admin credentials
      if (
        (usernameOrEmail === 'admin' || usernameOrEmail === 'admin@tezscale.com') &&
        password === 'admin123'
      ) {
        localStorage.setItem('adminToken', 'offline_demo_token_tezscale');
        localStorage.setItem('adminUser', JSON.stringify({ username: 'admin', role: 'admin' }));
        navigate('/admin');
      } else {
        setError('Login failed. Please check credentials or backend server.');
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
                placeholder="admin@tezscale.com"
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
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
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Info Box */}
        <div className="mt-8 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-[11px] text-slate-600 space-y-1">
          <div className="font-bold text-blue-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Default Backoffice Credentials:</span>
          </div>
          <div className="flex justify-between text-slate-700 pt-0.5">
            <span>Username: <strong className="font-mono text-blue-700">admin</strong> or <strong className="font-mono text-blue-700">admin@tezscale.com</strong></span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Password: <strong className="font-mono text-blue-700">admin123</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BackofficeLogin;
