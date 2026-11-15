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
      
      {/* 3 Stacking Options (Clean SaaS Drone Theme) */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-3 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Option 1: Send Query */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleSendQuery}>
            <div className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold tracking-wide rounded-md shadow-md border border-slate-800 transition-colors group-hover:bg-[#00A3E0]">
              Send Query
            </div>
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-slate-900 hover:bg-[#00A3E0] text-white flex items-center justify-center shadow-lg border border-slate-700 transition-all cursor-pointer"
              title="Send Inquiry"
            >
              <Mail className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Option 2: Call Us */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleCall}>
            <div className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold tracking-wide rounded-md shadow-md border border-slate-800 transition-colors group-hover:bg-[#00A3E0]">
              Call Us
            </div>
            <a
              href="tel:+919876543210"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
              title="Call Directly"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Option 3: WhatsApp Us */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold tracking-wide rounded-md shadow-md border border-slate-800 transition-colors group-hover:bg-emerald-600">
              WhatsApp Us
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
              title="Chat on WhatsApp"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.516 0-9.999 4.486-9.999 10.006 0 1.764.462 3.491 1.338 5.013l-1.42 5.187 5.312-1.393c1.472.804 3.13 1.229 4.819 1.229 5.518 0 10.001-4.485 10.001-10.005 0-5.52-4.483-10.037-10.051-10.037zm0 18.232c-1.524 0-3.023-.41-4.336-1.187l-.311-.184-3.22.845.859-3.14-.202-.322c-.854-1.36-1.306-2.936-1.306-4.542 0-4.551 3.704-8.256 8.256-8.256 4.552 0 8.257 3.705 8.257 8.256 0 4.55-3.705 8.53-8.197 8.53zm4.526-6.195c-.248-.124-1.467-.724-1.695-.807-.227-.082-.393-.124-.559.124-.165.248-.641.807-.786.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.236-1.471-1.381-1.719-.145-.248-.015-.382.109-.505.111-.111.248-.29.373-.435.124-.145.166-.248.248-.414.083-.166.042-.311-.021-.435-.062-.124-.559-1.347-.766-1.846-.202-.486-.407-.42-.559-.428-.145-.008-.311-.01-.476-.01s-.435.062-.662.311c-.228.248-.87 85-.87 2.074 0 1.224.891 2.407 1.015 2.573.124.166 1.753 2.678 4.248 3.755.594.257 1.057.41 1.419.525.597.19 1.14.163 1.57.099.479-.072 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.103-.227-.165-.476-.289z" />
              </svg>
            </a>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button (Drone Cyan Theme) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-slate-900 text-white rotate-90 border border-slate-700'
            : 'bg-[#00A3E0] hover:bg-[#008bc0] text-white hover:scale-105 active:scale-95 shadow-[#00A3E0]/30'
        }`}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact options'}
        title="Contact TezScale"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white stroke-[2.5]" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white fill-white/20" />
        )}
      </button>

    </div>
  );
};

export default FloatingSpeedDial;
