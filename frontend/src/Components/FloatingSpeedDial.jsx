import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingSpeedDial = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Actions
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hello TezScale, I am interested in growing my business digitally. Can we discuss your services?'
  )}`;

  const handleSendQuery = () => {
    setIsOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      // Dispatch custom event in case parent handles it globally
      window.dispatchEvent(new CustomEvent('open-tezscale-consultation'));
      navigate('/contact');
    }
  };

  const handleCall = () => {
    setIsOpen(false);
    window.location.href = 'tel:+919876543210';
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      
      {/* 3 Stacking Options (Shown when open) */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-3 mb-3 anim-slow-slide">
          
          {/* Option 3 (Top): Send Query */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleSendQuery}>
            <div className="px-3.5 py-1.5 bg-[#0f172a] text-white text-xs font-black tracking-wide rounded-lg shadow-lg border border-slate-800 transition-all group-hover:scale-105 group-hover:bg-blue-900">
              Send Query
            </div>
            <button
              type="button"
              className="w-13 h-13 rounded-full bg-[#f5b301] hover:bg-[#eab000] active:scale-95 text-slate-900 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 cursor-pointer"
              title="Send Inquiry"
            >
              <Mail className="w-6 h-6 fill-slate-950 text-slate-950 stroke-none" />
            </button>
          </div>

          {/* Option 2 (Middle): Call Us */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleCall}>
            <div className="px-3.5 py-1.5 bg-[#0f172a] text-white text-xs font-black tracking-wide rounded-lg shadow-lg border border-slate-800 transition-all group-hover:scale-105 group-hover:bg-blue-900">
              Call Us
            </div>
            <a
              href="tel:+919876543210"
              onClick={(e) => e.stopPropagation()}
              className="w-13 h-13 rounded-full bg-[#181d24] hover:bg-[#202731] active:scale-95 border border-slate-700/80 text-[#f5b301] flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 cursor-pointer"
              title="Call Us Directly"
            >
              <Phone className="w-5 h-5 fill-current text-[#f5b301]" />
            </a>
          </div>

          {/* Option 1 (Bottom): WhatsApp Us */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="px-3.5 py-1.5 bg-[#0f172a] text-white text-xs font-black tracking-wide rounded-lg shadow-lg border border-slate-800 transition-all group-hover:scale-105 group-hover:bg-blue-900">
              WhatsApp Us
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-7 h-7 fill-white text-white" />
            </a>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 cursor-pointer ${
          isOpen
            ? 'bg-[#181d24] text-[#f5b301] rotate-90 border border-slate-700'
            : 'bg-[#181d24] hover:bg-[#222832] text-[#f5b301] hover:scale-105 active:scale-95 border border-white/10'
        }`}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact options'}
        title="Contact TezScale"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#f5b301] stroke-[2.5]" />
        ) : (
          /* Yellow Speech Bubble Icon matching user screenshot */
          <svg className="w-7 h-7 text-[#f5b301] fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>

    </div>
  );
};

export default FloatingSpeedDial;

