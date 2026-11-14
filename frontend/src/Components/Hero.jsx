import React from 'react';
import { ArrowRight, Play, TrendingUp, Heart, Star, Sparkles, Building2, Stethoscope, Wrench } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const hero = content?.hero || {};

  return (
    <section id="home" className="relative pt-10 pb-16 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Green glowing badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-slate-700 text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{hero.badge || 'Grow Faster. Grow Smarter.'}</span>
            </div>

            {/* Headline matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.14]">
              {hero.titleLine1 || 'We are actively providing services to'} <br />
              <span className="text-blue-600">digitally grow</span> your business with us.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {hero.description ||
                'Transform your online presence with result-driven digital marketing strategies that bring real business growth.'}
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-full text-base font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>{hero.primaryCta || 'Get a Free Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3.5 rounded-full text-base font-semibold shadow-xs transition-all hover:border-slate-400 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>{hero.secondaryCta || 'Watch Our Video'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Laptop Display with floating badges */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Big curved growth arrow behind laptop */}
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
                <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 sm:p-6 overflow-hidden">
                  
                  {/* Inside Screen Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                      Growth Analytics
                    </span>
                  </div>

                  {/* 3D Rising Bar Graph inside Laptop */}
                  <div className="h-40 sm:h-48 flex items-end justify-around gap-2 px-2 pt-4 border-b border-slate-200">
                    <div className="w-6 sm:w-8 bg-blue-200/80 rounded-t-lg h-12 transition-all" />
                    <div className="w-6 sm:w-8 bg-blue-300 rounded-t-lg h-16 transition-all" />
                    <div className="w-6 sm:w-8 bg-blue-400 rounded-t-lg h-24 transition-all" />
                    <div className="w-6 sm:w-8 bg-blue-500 rounded-t-lg h-32 transition-all" />
                    <div className="w-6 sm:w-8 bg-blue-600 rounded-t-lg h-40 relative shadow-md transition-all">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1.5 rounded">
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
              <div className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-base font-extrabold text-slate-900 leading-tight">
                    {hero.trafficStat || '+250%'}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
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
                  <div className="text-base font-extrabold text-slate-900 leading-tight">
                    {hero.roiStat || '98%'}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {hero.roiLabel || 'Client Satisfaction'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Trust & Sector Row matching screenshot */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6">
          {/* Industry Pills */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <Stethoscope className="w-4 h-4 text-blue-600" /> Healthcare
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <Building2 className="w-4 h-4 text-emerald-600" /> Real Estate
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <Wrench className="w-4 h-4 text-amber-600" /> Engineering
            </span>
          </div>

          {/* Social Proof Avatars + Stars */}
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
