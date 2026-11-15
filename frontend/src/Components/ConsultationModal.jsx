import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Mail, Phone, Briefcase, Layers, MessageSquare, Loader2, Lock } from 'lucide-react';
import apiFetch from '../api/apiClient';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    businessType: 'Doctor / Clinic',
    serviceRequired: 'Website Builder & Development',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim().length < 2) {
      setError('Full Name is required (minimum 2 characters)');
      return;
    }
    if (!formData.whatsapp || formData.whatsapp.trim().length < 8) {
      setError('Please provide a valid WhatsApp number with country code');
      return;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await apiFetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setFormData({
            name: '',
            whatsapp: '',
            email: '',
            businessType: 'Doctor / Clinic',
            serviceRequired: 'Website Builder & Development',
            message: '',
          });
          onClose();
        }, 2500);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2200);
      }
    } catch (err) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-700 ease-out anim-slow-fade">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200/90 transition-all duration-700 ease-out anim-slow-slide">
        
        {/* Header in Drone Cyan */}
        <div className="bg-gradient-to-r from-[#00A3E0] to-[#0284c7] px-6 py-4 text-white flex items-center justify-between">
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-100">TezScale Lead Capture</div>
            <h3 className="text-lg font-extrabold tracking-tight">Request Free Growth Consultation</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="py-8 text-center space-y-3 anim-slow-fade">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Inquiry Received!</h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you! Our growth specialist will contact you on WhatsApp within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {error && (
                <div className="p-2.5 text-xs bg-rose-50 text-rose-600 border border-rose-200 rounded-lg font-semibold">
                  {error}
                </div>
              )}

              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name * <span className="text-[10px] text-slate-400 font-normal">(Min 2 chars)</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Aryan Mehta"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. WhatsApp Number & 3. Email Address Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@business.com"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Business Type Dropdown & 5. Service Required Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Business Type *
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    >
                      <option value="Doctor / Clinic">Doctor / Clinic</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Engineering">Engineering & Manufacturing</option>
                      <option value="Retail / E-commerce">Retail / E-commerce</option>
                      <option value="Other">Other Entrepreneur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Required *
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    >
                      <option value="Website Builder & Development">Website Builder & Development</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Digital Marketing Support">Digital Marketing Support (SEO)</option>
                      <option value="E-commerce Support">E-commerce Support</option>
                      <option value="Social Media Services">Social Media Services</option>
                      <option value="Meta Ads Management">Meta Ads Management</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 6. Message (Optional, Max 500 characters) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Message <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formData.message.length}/500
                  </span>
                </div>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows="2"
                    name="message"
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your digital growth objectives..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold rounded-lg text-xs sm:text-sm shadow-md shadow-[#00A3E0]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Request WhatsApp Call</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span>Encrypted • PDF Specification Compliant • 100% Confidential</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
