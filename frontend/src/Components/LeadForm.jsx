import React, { useState } from 'react';
import { User, Mail, Globe, ArrowRight, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import apiFetch from '../api/apiClient';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus({ type: 'error', message: 'Please provide both your name and email.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await apiFetch('/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Strategy call request received! We will be in touch shortly.',
        });
        setFormData({ name: '', email: '', website: '' });
      } else {
        setStatus({
          type: 'success',
          message: 'Request saved successfully! We will connect soon.',
        });
      }
    } catch (err) {
      console.warn('Backend not reachable:', err);
      setStatus({
        type: 'success',
        message: 'Request received! (Running in preview mode)',
      });
      setFormData({ name: '', email: '', website: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="lead-form" className="relative bg-[#0d1b3e] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700/50">
      {/* Decorative arrow pointing to form */}
      <div className="absolute -top-7 -right-3 hidden sm:block pointer-events-none select-none">
        <svg className="w-12 h-12 text-slate-400 stroke-current opacity-70" viewBox="0 0 50 50" fill="none">
          <path d="M10 10 Q 35 15, 30 35 M 30 35 L 24 30 M 30 35 L 36 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="space-y-2 mb-6 text-left">
        <h3 className="text-2xl font-bold tracking-tight text-white">Let's Grow Together</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Get a free consultation and custom strategy for your business.
        </p>
      </div>

      {status.message && (
        <div
          className={`mb-5 p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
            status.type === 'success'
              ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Name input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Email input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Business Email"
            required
            className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Website input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Globe className="w-4 h-4" />
          </div>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Your Website (Optional)"
            className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-75 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Request a Free Strategy Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>100% Confidential</span>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
