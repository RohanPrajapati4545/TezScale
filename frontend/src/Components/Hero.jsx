import React from 'react';
import { ArrowRight, TrendingUp, Heart, Star, Building2, Stethoscope, Wrench, ShoppingBag, CheckCircle2, BarChart2, ShieldCheck, Zap } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const hero = content?.hero || {};

  return (
    <section id="home" className="relative pt-10 sm:pt-14 pb-20 overflow-hidden bg-gradient-to-b from-[#e0f4ff]/50 via-[#f8fbfe] to-white">
      {/* Background ambient lighting in Drone Cyan */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle clean grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00A3E0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA (Clean & Static - No jumping words) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Tag (Clean, static, no blinking dot) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide">
              <span>{hero.badge || 'Automate & Scale Your Business'}</span>
            </div>

            {/* Main Headline (Clean, rock-solid, impactful) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              {hero.titleLine1 || 'We are actively providing services to'} <br />
              <span className="text-[#00A3E0]">digitally grow</span> your business with us.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {hero.description ||
                'Transform your online presence with result-driven digital marketing and automated tech strategies that bring real business growth. Engineered for high-converting B2B lead generation.'}
            </p>

            {/* Dual CTA Buttons (Exact Drone.io Clean SaaS Style) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="btn-drone-primary text-xs sm:text-sm px-7 py-3.5 shadow-md shadow-[#00A3E0]/20"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="btn-drone-secondary text-xs sm:text-sm px-6 py-3.5"
              >
                <span>DOCUMENTATION</span>
              </button>
            </div>

            {/* Micro value props with solid cyan check icons */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> Continuous Growth Pipelines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> Real-time ROI Dashboards
              </span>
            </div>
          </div>

          {/* Right Column: Clean, Stationary High-End SaaS Dashboard (No floating, no blinking) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden text-left">
              
              {/* Clean Window Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-slate-700 tracking-wide">
                    TezScale Growth Platform
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#00A3E0] bg-[#e0f4ff] px-2.5 py-1 rounded-md">
                  Production Ready
                </span>
              </div>

              {/* Main Dashboard Body */}
              <div className="p-6 space-y-6">
                
                {/* 3 Core Metric Stat Cards (Stationary, Clean, Crisp) */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Growth</div>
                    <div className="text-xl font-black text-slate-900 mt-0.5">{hero.trafficStat || '+250%'}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Verified ROI</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Satisfaction</div>
                    <div className="text-xl font-black text-slate-900 mt-0.5">{hero.roiStat || '98%'}</div>
                    <div className="text-[10px] text-[#00A3E0] font-semibold mt-1">500+ Clients</div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-left">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ROAS</div>
                    <div className="text-xl font-black text-[#00A3E0] mt-0.5">4.8x</div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-1">Avg. Return</div>
                  </div>
                </div>

                {/* Performance Curve Visualization */}
                <div className="p-4 bg-gradient-to-b from-[#f0f9ff]/50 to-white rounded-xl border border-sky-100">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-slate-800">Conversion & Traffic Velocity</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Past 90 Days</span>
                  </div>

                  {/* Clean SVG Area Chart */}
                  <div className="h-28 w-full">
                    <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,90 Q60,85 120,60 T240,40 T360,15 L400,10 L400,120 L0,120 Z"
                        fill="url(#cyanGradient)"
                      />
                      <path
                        d="M0,90 Q60,85 120,60 T240,40 T360,15 L400,10"
                        fill="none"
                        stroke="#00A3E0"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="360" cy="15" r="4" fill="#00A3E0" />
                      <circle cx="400" cy="10" r="4" fill="#00A3E0" />
                    </svg>
                  </div>
                </div>

                {/* Systematic Pipeline Steps */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 font-bold text-slate-700">
                    Audit & SEO
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 font-bold text-slate-700">
                    High-ROAS Ads
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-[#e0f4ff] border border-[#00A3E0]/30 font-bold text-[#007ba8]">
                    WhatsApp Leads
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Trust & Sector Row (Section 1.1 Target Industry Personas) */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <Stethoscope className="w-3.5 h-3.5 text-[#00A3E0]" /> Doctors & Clinics
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Real Estate Brokers
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <Wrench className="w-3.5 h-3.5 text-amber-600" /> Engineering B2B
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" /> Retail & Entrepreneurs
            </span>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="text-xs sm:text-sm font-bold text-slate-700">
              Trusted by <span className="text-[#00A3E0]">500+ High-Growth Clients</span>
            </div>
            
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="client"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                alt="client"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs"
              />
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80"
                alt="client"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs"
              />
            </div>

            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
