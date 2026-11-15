import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, TrendingUp, Heart, Star, Sparkles, Building2, Stethoscope, Wrench, CheckCircle2, Cpu, Zap, Activity } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const rotatingPhrases = [
  'digitally grow',
  'automate lead gen',
  'scale B2B revenue',
  'dominate local search',
];

const Hero = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const hero = content?.hero || {};

  const [phraseIndex, setPhraseIndex] = useState(0);

  // Smooth rotator effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-10 sm:pt-14 pb-20 overflow-hidden bg-gradient-to-b from-[#e0f4ff]/50 via-[#f8fbfe] to-white">
      {/* Background ambient lighting in Drone Cyan */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#00A3E0]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle curved contour lines */}
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
          
          {/* Left Column: Headlines & CTA in Drone.io Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Tag with Cyan Pulse Dot */}
            <div className="anim-hero-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00A3E0] live-pulse-dot" />
              <span>{hero.badge || 'Automate & Scale Your Business'}</span>
            </div>

            {/* Main Headline (Drone.io Impactful Style) */}
            <h1 className="anim-hero-2 text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              {hero.titleLine1 || 'We are actively providing services to'} <br />
              <span className="text-[#00A3E0] inline-block transition-all duration-300">
                {rotatingPhrases[phraseIndex]}
              </span>{' '}
              your business with us.
            </h1>

            {/* Subtitle */}
            <p className="anim-hero-3 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {hero.description ||
                'Transform your online presence with result-driven digital marketing and automated tech strategies that bring real business growth. Engineered for high-converting B2B lead generation.'}
            </p>

            {/* Dual CTA Buttons (Exact Drone.io Button Styles) */}
            <div className="anim-hero-4 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="btn-drone-primary text-xs sm:text-sm px-7 py-3.5 shadow-lg shadow-[#00A3E0]/25"
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

            {/* Micro value props with cyan check icons */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> Continuous Growth Pipelines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" /> Real-time ROI Dashboards
              </span>
            </div>
          </div>

          {/* Right Column: High-Tech Growth Engine & Robot Visual in Drone Style */}
          <div className="lg:col-span-6 relative flex justify-center items-center anim-hero-visual">
            
            {/* Tech Circular Accent Backdrop */}
            <div className="absolute -top-12 -right-8 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#00A3E0]/15 to-transparent rounded-full blur-2xl pointer-events-none select-none" />

            {/* Drone Style Tech Machine & Dashboard Showcase */}
            <div className="relative w-full max-w-lg">
              
              {/* Main Machine Pod Container */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl border border-sky-100 relative overflow-hidden">
                
                {/* Tech Pod Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                      TezScale Autonomous Hub
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#00A3E0] bg-[#e0f4ff] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] live-pulse-dot" />
                    Live Engine
                  </span>
                </div>

                {/* Automation Machine & Rising Pipeline Bars */}
                <div className="relative py-6 px-4 bg-gradient-to-b from-[#f0f9ff]/70 to-white rounded-2xl border border-sky-100/80">
                  
                  {/* Central Drone Automation Visual Illustration */}
                  <div className="flex items-center justify-center py-4">
                    <div className="relative">
                      {/* Central Drone Core Body */}
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#00A3E0] via-[#38bdf8] to-cyan-200 flex items-center justify-center text-white shadow-xl shadow-[#00A3E0]/30 animate-float-gentle">
                        <Cpu className="w-12 h-12 text-white" />
                      </div>

                      {/* Robotic Thrusters with Orange / Red Flames (Drone.io Match!) */}
                      <div className="absolute -bottom-4 left-3 w-4 h-6 bg-gradient-to-b from-amber-400 to-rose-500 rounded-b-full blur-[1px] animate-pulse" />
                      <div className="absolute -bottom-4 right-3 w-4 h-6 bg-gradient-to-b from-amber-400 to-rose-500 rounded-b-full blur-[1px] animate-pulse" />

                      {/* Orbiting Tech Signals */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md border border-sky-200 flex items-center justify-center text-[#00A3E0]">
                        <Zap className="w-4 h-4 fill-current" />
                      </div>
                      <div className="absolute -bottom-2 -left-3 w-8 h-8 rounded-full bg-white shadow-md border border-sky-200 flex items-center justify-center text-emerald-500">
                        <Activity className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Rising Pipeline Bar Graph */}
                  <div className="h-28 flex items-end justify-around gap-2 px-2 pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <div className="w-7 sm:w-10 bg-sky-100 rounded-t-md h-8 transition-all hover:h-12" />
                      <span className="text-[9px] font-bold text-slate-400 mt-1 block">SEO</span>
                    </div>
                    <div className="text-center">
                      <div className="w-7 sm:w-10 bg-sky-200 rounded-t-md h-14 transition-all hover:h-18" />
                      <span className="text-[9px] font-bold text-slate-400 mt-1 block">ADS</span>
                    </div>
                    <div className="text-center">
                      <div className="w-7 sm:w-10 bg-sky-300 rounded-t-md h-20 transition-all hover:h-24" />
                      <span className="text-[9px] font-bold text-slate-400 mt-1 block">LEADS</span>
                    </div>
                    <div className="text-center">
                      <div className="w-7 sm:w-10 bg-[#00A3E0] rounded-t-md h-26 relative shadow-md shadow-[#00A3E0]/30 transition-all">
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#00A3E0] bg-[#e0f4ff] px-1 py-0.2 rounded shadow-2xs">
                          ▲
                        </span>
                      </div>
                      <span className="text-[9px] font-black text-[#00A3E0] mt-1 block">SCALE</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Floating Badge 1 (Top Left): +250% Business Growth */}
              <div className="absolute -top-5 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-sky-100 flex items-center gap-3 animate-float-gentle">
                <div className="w-10 h-10 rounded-lg bg-[#e0f4ff] text-[#00A3E0] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-base font-black text-slate-900 leading-tight">
                    {hero.trafficStat || '+250%'}
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {hero.trafficGrowth || 'Business Growth'}
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right): 98% Client Satisfaction */}
              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-sky-100 flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <div className="text-base font-black text-slate-900 leading-tight">
                    {hero.roiStat || '98%'}
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {hero.roiLabel || 'Client Satisfaction'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Trust & Sector Row */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <Stethoscope className="w-3.5 h-3.5 text-[#00A3E0]" /> Healthcare & Clinics
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Real Estate Brokers
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:border-[#00A3E0]/40 transition-colors">
              <Wrench className="w-3.5 h-3.5 text-amber-600" /> Engineering & Manufacturing
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
