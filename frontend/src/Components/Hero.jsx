import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Star, 
  Users, 
  BarChart2, 
  Play 
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const Hero = ({ onOpenConsultation }) => {
  return (
    <section 
      id="home" 
      className="relative pt-28 sm:pt-36 lg:pt-32 pb-16 sm:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-br from-[#ebf5ff] via-[#f7fbff] to-[#e4f3fd]"
    >
      {/* Ambient soft background lighting matching reference image */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-10 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Bottom-left layered curved organic waves matching reference image */}
      <div className="absolute -bottom-2 -left-2 w-72 sm:w-[420px] h-44 sm:h-64 pointer-events-none z-0">
        <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M-20 260 C90 180 180 190 280 260 L-20 260 Z" fill="#38bdf8" fillOpacity="0.3" />
          <path d="M-30 260 C70 140 200 160 360 260 L-30 260 Z" fill="#00A3E0" fillOpacity="0.45" />
          <path d="M-40 260 C40 100 150 120 290 260 L-40 260 Z" fill="#00A3E0" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Bottom-right royal blue wave curve matching reference image */}
      <div className="absolute -bottom-2 -right-2 w-72 sm:w-96 h-40 sm:h-56 pointer-events-none z-0">
        <svg viewBox="0 0 380 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M120 240 C 220 160 300 190 400 120 L 400 240 Z" fill="#00A3E0" fillOpacity="0.35" />
          <path d="M180 240 C 260 170 340 180 400 150 L 400 240 Z" fill="#0183FF" fillOpacity="0.85" />
        </svg>
      </div>

      {/* Atmospheric fluffy cloud bed at the bottom base matching reference image */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 sm:h-20 pointer-events-none z-0 overflow-hidden opacity-95">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d">
          <path d="M0,100 L1440,100 L1440,55 C1380,35 1320,65 1260,50 C1180,35 1120,60 1040,45 C960,30 880,55 800,40 C720,25 640,50 560,35 C480,20 400,45 320,30 C240,15 160,40 80,30 L0,50 Z" fill="#ffffff" fillOpacity="0.75" />
          <path d="M0,100 L1440,100 L1440,70 C1360,55 1300,75 1220,65 C1140,50 1080,70 1000,60 C920,45 840,65 760,55 C680,40 600,60 520,50 C440,35 360,55 280,45 C200,30 120,50 60,45 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headlines, Copy, Dual CTAs & Bottom Stats */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Tag: 📊 Grow Faster. Get More Leads. */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-sky-200/80 text-[#00A3E0] text-xs sm:text-[13px] font-bold tracking-wide shadow-2xs">
              <BarChart2 className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Grow Faster. Get More Leads.</span>
            </div>

            {/* Main Headline with Cyan Wave Doodle Underline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Scale Your Business <br />
              <span className="text-slate-900">with </span>
              <span className="relative inline-block text-[#00A3E0]">
                Digital Marketing
                {/* Curved wave doodle SVG matching reference image */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#00A3E0]"
                  viewBox="0 0 280 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10C50 3 100 12 150 7C200 2 245 10 277 5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Get high-quality leads, more customers and real business growth with data-driven strategies.
            </p>

            {/* Action Buttons: Get Free Consultation & Watch How It Works */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#00A3E0]/25 ring-4 ring-[#00A3E0]/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-3 rounded-full hover:bg-white/80 transition-all flex items-center justify-center sm:justify-start gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-md border border-sky-100 flex items-center justify-center text-[#00A3E0] group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-[#00A3E0]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#00A3E0] transition-colors">
                  Watch How It Works
                </span>
              </button>
            </div>

            {/* Bottom Stats Row (5K+ Happy Clients | 300%+ Average Growth | 4.9/5 Client Rating) */}
            <div className="pt-6 grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-3 sm:gap-8 border-t border-slate-200/80 text-left">
              {/* Stat 1: 5K+ Happy Clients */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-black text-slate-900 leading-none">5K+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1">Happy Clients</div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

              {/* Stat 2: 300%+ Average Growth (AnimatedCounter) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-black text-slate-900 leading-none">
                    <AnimatedCounter value="300%+" duration={1400} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1">Average Growth</div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

              {/* Stat 3: 4.9/5 Client Rating */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-black text-slate-900 leading-none">4.9/5</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1">Client Rating</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Visual Masterpiece Matching Reference Image AS IT IS */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center select-none">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl flex items-center justify-center anim-float-3d">
              
              {/* Soft Ambient Radial Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3E0]/20 via-sky-300/15 to-transparent rounded-full blur-2xl pointer-events-none transform scale-95 anim-soft-glow" />

              {/* 3D Visual Image Asset (Complete unclipped rocket, dashboard, ring, original 3D badges, and clouds) */}
              <img
                src="/hero-3d-visual.png"
                alt="Scale Your Business with Digital Marketing 3D Illustration"
                className="w-full h-auto max-h-[500px] sm:max-h-[560px] lg:max-h-[600px] object-contain relative z-10 filter drop-shadow-[0_20px_35px_rgba(0,163,224,0.18)]"
                loading="eager"
                fetchpriority="high"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
