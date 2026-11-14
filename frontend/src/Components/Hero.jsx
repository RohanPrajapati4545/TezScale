import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, TrendingUp, Heart, Star, Sparkles, Building2, Stethoscope, Wrench, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const rotatingPhrases = [
  'digitally grow',
  'scale B2B revenue',
  'capture high-intent leads',
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
    <section id="home" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Tag with Leaf Badge */}
            <div className="anim-hero-1 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-slate-800 text-xs font-bold tracking-wide shadow-xs">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                ✓
              </span>
              <span>{hero.badge || 'Grow Faster. Grow Smarter.'}</span>
            </div>

            {/* Main Headline with Animated Word Rotator */}
            <h1 className="anim-hero-2 text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              {hero.titleLine1 || 'We are actively providing services to'} <br />
              <span className="text-blue-600 inline-block transition-all duration-300">
                {rotatingPhrases[phraseIndex]}
              </span>{' '}
              your business with us.
            </h1>

            {/* Subtitle */}
            <p className="anim-hero-3 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {hero.description ||
                'Transform your online presence with result-driven digital marketing strategies that bring real business growth. Engineered for high-converting B2B lead generation.'}
            </p>

            {/* Dual CTA Buttons */}
            <div className="anim-hero-4 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3.5 rounded-full text-base font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-102 hover:shadow-xl active:scale-98 cursor-pointer"
              >
                <span>{hero.primaryCta || 'Get a Free Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3.5 rounded-full text-base font-bold shadow-xs transition-all hover:border-slate-400 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>{hero.secondaryCta || 'Watch Our Video'}</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> WhatsApp Integration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Transparent ROI Reporting
              </span>
            </div>
          </div>

          {/* Right Column: 3D Laptop Display with floating gentle badges */}
          <div className="lg:col-span-6 relative flex justify-center items-center anim-hero-visual">
            
            {/* Big curved growth arrow backdrop */}
            <div className="absolute -top-10 -right-6 w-52 sm:w-72 h-52 sm:h-72 opacity-25 pointer-events-none select-none">
              <svg viewBox="0 0 200 200" fill="none">
                <path d="M20 180 C 70 170, 120 120, 175 25" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" />
                <path d="M115 25 H 175 V 85" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Laptop Mockup Box */}
            <div className="relative w-full max-w-lg">
              
              {/* Laptop Screen Body */}
              <div className="bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-2xl border-4 border-slate-800">
                <div className="bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-4 sm:p-6 overflow-hidden">
                  
                  {/* Inside Screen Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-xs font-bold text-slate-800">TezScale Growth Hub</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 live-pulse-dot" />
                      Live Metrics
                    </span>
                  </div>

                  {/* 3D Rising Bar Graph inside Laptop */}
                  <div className="h-40 sm:h-48 flex items-end justify-around gap-2 px-2 pt-4 border-b border-slate-200">
                    <div className="w-6 sm:w-8 bg-blue-200/80 rounded-t-lg h-12 transition-all duration-500 hover:h-16" />
                    <div className="w-6 sm:w-8 bg-blue-300 rounded-t-lg h-16 transition-all duration-500 hover:h-20" />
                    <div className="w-6 sm:w-8 bg-blue-400 rounded-t-lg h-24 transition-all duration-500 hover:h-28" />
                    <div className="w-6 sm:w-8 bg-blue-500 rounded-t-lg h-32 transition-all duration-500 hover:h-36" />
                    <div className="w-6 sm:w-8 bg-blue-600 rounded-t-lg h-40 relative shadow-md transition-all duration-500">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded shadow-xs">
                        ▲
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Stand */}
              <div className="mx-auto w-4/5 h-3.5 bg-slate-700 rounded-b-2xl shadow-lg -mt-1" />
              <div className="mx-auto w-1/3 h-1.5 bg-slate-600 rounded-b-xl" />

              {/* Floating Badge 1 (Top Left): +250% Business Growth */}
              <div className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-gentle">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-base font-black text-slate-900 leading-tight">
                    {hero.trafficStat || '+250%'}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">
                    {hero.trafficGrowth || 'Business Growth'}
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right): 98% Client Satisfaction */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <div className="text-base font-black text-slate-900 leading-tight">
                    {hero.roiStat || '98%'}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">
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
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <Stethoscope className="w-3.5 h-3.5 text-blue-600" /> Healthcare & Clinics
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Real Estate Brokers
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              <Wrench className="w-3.5 h-3.5 text-amber-600" /> Engineering & Manufacturing
            </span>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="text-xs sm:text-sm font-bold text-slate-700">
              Trusted by <span className="text-blue-600">500+ Happy Clients</span>
            </div>
            
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="client"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                alt="client"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80"
                alt="client"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
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
