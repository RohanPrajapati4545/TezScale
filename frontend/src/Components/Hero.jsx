import React from 'react';
import { ArrowRight, Play, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const hero = content?.hero || {};

  return (
    <section id="home" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white">
      {/* Background glow and subtle elements */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{hero.badge || 'Grow Faster. Rank Higher.'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              {hero.titleLine1 || 'Your Partner for'} <br />
              <span className="text-blue-600">{hero.titleLine2 || 'Digital Growth'}</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {hero.description ||
                'We are a full-service digital marketing agency helping businesses grow online with data-driven strategies, creative campaigns and measurable results.'}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#lead-form"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{hero.primaryCta || 'Get a Free Strategy Call'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3.5 rounded-full text-base font-semibold shadow-sm transition-all hover:border-slate-400"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>{hero.secondaryCta || 'Explore Our Services'}</span>
              </a>
            </div>

            {/* Trust bullet features */}
            <div className="pt-4 flex items-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No long-term lock-in
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom tailored strategy
              </span>
            </div>
          </div>

          {/* Right Column: Visual illustration matching the image */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Big growth arrow backdrop */}
            <div className="absolute -top-10 -right-6 w-48 sm:w-64 h-48 sm:h-64 opacity-25 pointer-events-none select-none">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 180 C 70 170, 120 120, 170 30" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" />
                <path d="M110 30 H 170 V 90" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Laptop Mockup Wrapper */}
            <div className="relative w-full max-w-lg">
              
              {/* Laptop screen body */}
              <div className="bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-2xl border-4 border-slate-800">
                <div className="bg-white rounded-lg p-4 sm:p-5 overflow-hidden">
                  
                  {/* Inside Laptop: Mini header & stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left">
                      <div className="text-xs text-slate-400 font-medium">Website Traffic</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                        {hero.trafficStat || '125K'}
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                          ↑ {hero.trafficGrowth || '+78%'}
                        </span>
                      </div>
                    </div>
                    <div className="h-6 px-2.5 bg-blue-50 text-blue-600 rounded text-xs font-semibold flex items-center">
                      Live Analytics
                    </div>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="w-full h-28 sm:h-36 pt-2">
                    <svg viewBox="0 0 400 140" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 110 C 60 100, 100 80, 160 85 C 220 90, 260 40, 320 45 C 360 48, 380 20, 400 15 L 400 140 L 0 140 Z"
                        fill="url(#chartGradient)"
                      />
                      <path
                        d="M0 110 C 60 100, 100 80, 160 85 C 220 90, 260 40, 320 45 C 360 48, 380 20, 400 15"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="400" cy="15" r="5" fill="#2563eb" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Laptop Base Stand */}
              <div className="mx-auto w-3/4 h-3 bg-slate-700 rounded-b-xl shadow-md -mt-1" />
              <div className="mx-auto w-1/4 h-1.5 bg-slate-600 rounded-b-lg" />

              {/* Floating Card Top Right: More Leads More Sales */}
              <div className="absolute -top-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">More Leads</div>
                  <div className="text-xs text-slate-400">More Sales</div>
                </div>
              </div>

              {/* Floating Card Bottom Right: ROI */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-float-delayed">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#f1f5f9" strokeWidth="5" fill="none" />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#06b6d4"
                      strokeWidth="5"
                      strokeDasharray="125"
                      strokeDashoffset="25"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-slate-700">75%</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400 font-semibold uppercase">ROI</div>
                  <div className="text-xl font-extrabold text-slate-900">{hero.roiStat || '320%'}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
