import React from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const CtaBanner = () => {
  const { content } = useContent();
  const cta = content?.ctaBanner || {};

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900 text-white py-14 px-4 sm:px-6 lg:px-8">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Icon & Headline */}
        <div className="flex items-center gap-5 text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
            <Send className="w-7 h-7 -rotate-12 translate-x-0.5 text-blue-200" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {cta.title || 'Ready to Boost Your Business Online?'}
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mt-1">
              {cta.subtitle || "Let's create a winning digital strategy together."}
            </p>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="flex-shrink-0">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 px-7 py-3.5 rounded-full text-base font-bold shadow-xl shadow-blue-950/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>{cta.buttonText || 'Get a Free Strategy Call'}</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
