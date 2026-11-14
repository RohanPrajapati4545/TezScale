import React from 'react';
import { CheckCircle2, Play, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const WhyChooseUs = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const why = content?.whyChooseUs || {};
  const points = why.points || [
    'Result-Driven Strategies',
    '24/7 Support',
    'Expert Team',
    'Custom Solutions',
    'Transparent Reporting',
    'Long-Term Partnership',
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual: Marketer photo with floating badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-blue-100">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=700&q=80"
                alt="Entrepreneur at laptop"
                className="w-full h-80 sm:h-96 object-cover object-top hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Badge 1: Your Growth Our Priority */}
              <div className="absolute top-6 -right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight">Your Growth</div>
                  <div className="text-[10px] text-slate-400 font-medium">Our Priority</div>
                </div>
              </div>

              {/* Floating Badge 2: +300% Traffic Growth */}
              <div className="absolute bottom-6 -right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 animate-float-delayed">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-slate-900 leading-tight">+300%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Traffic Growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center-Right Column: Headline, Points & Office photo */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              {why.badge || 'Why Choose Us'}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {why.title || 'Your Growth, Our Mission'}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {why.description ||
                "We combine creativity, technology and data-driven strategies to deliver measurable results. From SEO to Meta Ads, we're here to help your business reach new heights."}
            </p>

            {/* Checkmark points grid (2 cols x 3 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-102 cursor-pointer"
              >
                <span>{why.buttonText || 'About Us'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Video / Office Preview Photo */}
            <div className="pt-4">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="GrowthMax Office Boardroom"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Branding Overlay badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-extrabold text-slate-800 shadow-sm">
                  Growth<span className="text-blue-600">Max</span> HQ
                </div>

                {/* Center Video Play Button */}
                <button
                  onClick={onOpenConsultation}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 hover:bg-white text-blue-600 shadow-xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
