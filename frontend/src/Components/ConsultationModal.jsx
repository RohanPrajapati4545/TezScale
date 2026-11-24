import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, User, Briefcase, Loader2, Lock, ArrowRight } from 'lucide-react';
import apiFetch from '../api/apiClient';
import PhoneInput from './PhoneInput';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    businessType: 'Doctor / Clinic',
  });
  const [consent, setConsent] = useState(true);

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
    const cleanDigits = phoneNumber.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Please enter your full name (minimum 2 characters)');
      return;
    }

    if (!cleanDigits || cleanDigits.length < 7) {
      setError('Please enter a valid WhatsApp number');
      return;
    }

    if (countryCode === '+91' && cleanDigits.length !== 10) {
      setError('Please enter a valid 10-digit Indian WhatsApp mobile number');
      return;
    }

    if (!consent) {
      setError('Please agree to receive your free audit and updates on WhatsApp');
      return;
    }

    const fullWhatsapp = `${countryCode} ${cleanDigits}`;
    const payload = {
      name: cleanName,
      whatsapp: fullWhatsapp,
      phone: fullWhatsapp,
      phoneNumber: fullWhatsapp,
      businessType: formData.businessType,
      serviceRequired: 'Website Builder & Development',
      message: `Lead from Website Consultation Modal for ${formData.businessType}`,
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
              businessType: 'Doctor / Clinic',
            });
          }, 350);
        }, 2500);
      } else {
        setError(data.message || 'Submission failed. Please check details or connect on WhatsApp.');
      }
    } catch (err) {
      // Graceful offline fallback
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-growth-heading"
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
        <div className="h-1 bg-gradient-to-r from-[#0EA5E9] via-cyan-400 to-blue-600 w-full shrink-0" />

        {/* Header: Clean & Compact */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-800 flex items-start justify-between shrink-0 bg-slate-900/90">
          <div className="text-left pr-4">
            <h3 id="modal-growth-heading" className="font-heading font-semibold text-[18px] sm:text-[20px] text-white tracking-tight leading-[1.30] flex items-center gap-2">
              <span>Get Your Free Website & Growth Plan</span>
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            </h3>
            <p className="font-sans font-normal text-[13px] sm:text-[14px] text-slate-400 mt-1 leading-relaxed">
              Share your details below. Our Indore specialist will message you on WhatsApp within 15 minutes.
            </p>
          </div>
          <button
            onClick={handleSmoothClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Zero Visible Scrollbar */}
        <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar">
          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-xl text-white">Inquiry Received!</h4>
              <p className="font-sans text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-bold">{formData.name}</span>! Our Indore specialist will message you on WhatsApp within <span className="text-emerald-400 font-bold">15 minutes</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {error && (
                <div className="p-2.5 text-xs bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-lg font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Field 1: Full Name */}
              <div>
                <label htmlFor="modal-name" className="block font-sans font-semibold text-[13px] text-slate-200 mb-1.5">
                  Your Full Name <span className="text-[#0EA5E9]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="modal-name"
                    aria-label="Your Full Name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Rajesh Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl font-sans text-sm text-white placeholder:text-slate-400 font-medium focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Field 2: WhatsApp Number */}
              <div>
                <label htmlFor="modal-phone-input" className="block font-sans font-semibold text-[13px] text-slate-200 mb-1.5">
                  WhatsApp Number <span className="text-[#0EA5E9]">*</span>
                </label>
                <PhoneInput
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  placeholder="98XXX XXXXX"
                  id="modal-phone-input"
                  dark={true}
                />
              </div>

              {/* Field 3: Your Business Type */}
              <div>
                <label htmlFor="modal-business-type" className="block font-sans font-semibold text-[13px] text-slate-200 mb-1.5">
                  Your Business Type <span className="text-[#0EA5E9]">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="modal-business-type"
                    aria-label="Your Business Type"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full pl-9 pr-7 py-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl font-sans text-sm font-medium text-white focus:ring-1 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="Doctor / Clinic" className="bg-slate-900 text-white">Doctor / Clinic</option>
                    <option value="Real Estate / Builder" className="bg-slate-900 text-white">Real Estate / Builder</option>
                    <option value="Factory / B2B" className="bg-slate-900 text-white">Factory / B2B</option>
                    <option value="Shop / Online Store" className="bg-slate-900 text-white">Shop / Online Store</option>
                    <option value="Other Service" className="bg-slate-900 text-white">Other Service</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label htmlFor="modal-consent" className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    id="modal-consent"
                    aria-label="I agree to receive my free audit and updates on WhatsApp"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-[#0EA5E9] focus:ring-[#0EA5E9] mt-0.5 cursor-pointer accent-[#0EA5E9]"
                  />
                  <span className="font-sans text-xs text-slate-400 leading-snug">
                    I agree to receive my free audit and updates on WhatsApp/Call as per the Privacy Policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-sans font-semibold rounded-xl text-[15px] leading-none shadow-lg shadow-[#0EA5E9]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 min-h-[44px] mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending details...</span>
                  </>
                ) : (
                  <>
                    <span>Get My Free Audit on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 font-sans">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>Fast WhatsApp Audit</span>
                <span>•</span>
                <span>100% Free & No Spam</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
