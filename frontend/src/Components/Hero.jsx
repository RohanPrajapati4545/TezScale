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
import founderNobg from '../assets/founder-nobg.png';

const Hero = ({ onOpenConsultation }) => {
  return (
    <section 
      id="home" 
      className="relative pt-28 sm:pt-36 lg:pt-32 pb-12 sm:pb-20 lg:pb-0 overflow-hidden bg-white"
    >
      {/* Soft Ambient Sky-Blue Aura on the Right Behind the Visual */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-[400px] h-[400px] bg-[#00A3E0]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Headlines, Copy, Dual CTAs & Bottom Stats */}
          <div className="lg:col-span-6 space-y-6 text-left py-4 sm:py-8 lg:py-16">
            
            {/* Eyebrow Tag: 📊 Grow Faster. Get More Leads. */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50/90 border border-sky-200/80 text-[#00A3E0] text-xs sm:text-[13px] font-bold tracking-wide shadow-2xs">
              <BarChart2 className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Grow Faster. Get More Leads.</span>
            </div>

            {/* Main Headline with Custom Cyan Wave Doodle Underline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-[1.12]">
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
                className="px-4 py-3 rounded-full hover:bg-slate-50 transition-all flex items-center justify-center sm:justify-start gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-sky-50/80 shadow-xs border border-sky-200/80 flex items-center justify-center text-[#00A3E0] group-hover:scale-105 transition-transform">
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-black text-slate-900 leading-none">4.9/5</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1">Client Rating</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder with Transparent BG & Layered Circular Backdrop matching Reference */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-end select-none self-end min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
            
            {/* Soft Layered Circular Aura & Graphic Waves Behind the Founder matching Reference */}
            <div className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full bg-gradient-to-tr from-[#bae6fd]/50 via-[#e0f2fe]/65 to-[#f0f9ff]/80 pointer-events-none -z-0" />
            <div className="absolute right-4 lg:right-2 top-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-sky-200/50 pointer-events-none -z-0" />
            <div className="absolute -right-8 bottom-0 w-[240px] h-[160px] sm:w-[320px] sm:h-[220px] bg-gradient-to-tl from-[#bae6fd]/45 to-transparent rounded-tl-[120px] pointer-events-none -z-0" />

            {/* Transparent Founder Cutout (No-BG) */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-end justify-center lg:justify-end z-10">
              <img
                src={founderNobg}
                alt="TezScale Digital Marketing Specialist"
                className="w-auto h-[440px] sm:h-[500px] lg:h-[560px] object-contain object-bottom drop-shadow-sm select-none"
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
