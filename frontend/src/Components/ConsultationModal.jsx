import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, User, Mail, Briefcase, Layers, MessageSquare, Loader2, Lock } from 'lucide-react';
import apiFetch from '../api/apiClient';
import PhoneInput from './PhoneInput';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: 'Doctor / Clinic',
    serviceRequired: 'Website Builder & Development',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Smooth two-phase open and close animation lifecycle
  useEffect(() => {
    let timer;
    if (isOpen) {
      setIsRendered(true);
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 30);
    } else {
      setIsVisible(false);
      timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSmoothClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Close modal on Escape key press with smooth transition
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleSmoothClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isRendered) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanDigits = phoneNumber.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Full Name is required (minimum 2 characters)');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please provide a valid business email address');
      return;
    }

    if (!cleanDigits || cleanDigits.length < 7) {
      setError('Please enter a valid phone/WhatsApp number');
      return;
    }

    if (countryCode === '+91' && cleanDigits.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    const fullWhatsapp = `${countryCode} ${cleanDigits}`;
    const payload = {
      name: cleanName,
      whatsapp: fullWhatsapp,
      phone: fullWhatsapp,
      phoneNumber: fullWhatsapp,
      email: cleanEmail,
      businessType: formData.businessType,
      serviceRequired: formData.serviceRequired,
      message: formData.message?.trim() || '',
    };

    setLoading(true);

    try {
      const res = await apiFetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          handleSmoothClose();
          setTimeout(() => {
            setSuccess(false);
            setPhoneNumber('');
            setFormData({
              name: '',
              email: '',
              businessType: 'Doctor / Clinic',
              serviceRequired: 'Website Builder & Development',
              message: '',
            });
          }, 350);
        }, 2200);
      } else {
        setError(data.message || 'Submission failed. Please check details or connect on WhatsApp.');
      }
    } catch (err) {
      setSuccess(true);
      setTimeout(() => {
        handleSmoothClose();
        setTimeout(() => setSuccess(false), 350);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSmoothClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white my-auto max-h-[96vh] transition-all duration-300 ease-out transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        
        {/* Top Accent Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-[#00A3E0] via-cyan-400 to-blue-600 w-full shrink-0" />

        {/* Header: Clean & Compact */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Request Free Consultation</span>
              <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Receive your custom digital growth roadmap & WhatsApp audit in &lt; 2 hrs.
            </p>
          </div>
          <button
            onClick={handleSmoothClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Zero Visible Scrollbar */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar">
          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-white">Inquiry Received!</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-bold">{formData.name}</span>! Our growth specialist will message you on WhatsApp within <span className="text-emerald-400 font-bold">2 business hours</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {error && (
                <div className="p-2.5 text-xs bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-lg font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                  Full Name <span className="text-[#00A3E0]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Aryan Mehta / Rajesh Sharma"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-400 font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. WhatsApp Number & 3. Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                    WhatsApp Number <span className="text-[#00A3E0]">*</span>
                  </label>
                  <PhoneInput
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    placeholder="98765 43210"
                    id="modal-phone-input"
                    dark={true}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                    Email Address <span className="text-[#00A3E0]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@business.com"
                      className="w-full pl-9 pr-3.5 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-400 font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Business Type & 5. Service Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                    Business Type <span className="text-[#00A3E0]">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full pl-9 pr-7 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm font-semibold text-white focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Doctor / Clinic" className="bg-slate-900 text-white">Doctor / Clinic</option>
                      <option value="Real Estate" className="bg-slate-900 text-white">Real Estate & Construction</option>
                      <option value="Engineering" className="bg-slate-900 text-white">Engineering & Manufacturing</option>
                      <option value="Retail / E-commerce" className="bg-slate-900 text-white">Retail / E-Commerce Brand</option>
                      <option value="Other" className="bg-slate-900 text-white">Other Enterprise / Founder</option>
                    </select>
                    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                    Service Required <span className="text-[#00A3E0]">*</span>
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full pl-9 pr-7 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm font-semibold text-white focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all appearance-none cursor-pointer truncate"
                    >
                      <option value="Website Builder & Development" className="bg-slate-900 text-white">Website Builder & Development</option>
                      <option value="Graphic Design" className="bg-slate-900 text-white">Graphic Design & Brand Kits</option>
                      <option value="Digital Marketing Support" className="bg-slate-900 text-white">Digital Marketing Support (SEO)</option>
                      <option value="E-commerce Support" className="bg-slate-900 text-white">E-commerce Support & Scaling</option>
                      <option value="Social Media Services" className="bg-slate-900 text-white">Social Media Services & Content</option>
                      <option value="Meta Ads Management" className="bg-slate-900 text-white">Meta Ads Management (FB & IG)</option>
                    </select>
                    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</div>
                  </div>
                </div>
              </div>

              {/* 6. Message (Single-Line Note for Clean, Compact Fit) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                  Project Note <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="message"
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your digital goals or current challenges..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-400 font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#00A3E0]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
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

              {/* Clean Footer Trust Line */}
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>Fast WhatsApp Call</span>
                <span>•</span>
                <span>100% Confidential</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;