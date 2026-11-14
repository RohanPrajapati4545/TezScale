import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Play, ArrowRight, TrendingUp, Sparkles, Compass, Lightbulb, Zap, BarChart } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const steps = [
  {
    step: '01',
    title: 'Discovery & Audit',
    desc: 'Deep-dive analysis of your current online assets, competitor gaps, and conversion bottlenecks.',
    icon: <Compass className="w-5 h-5 text-blue-600" />,
  },
  {
    step: '02',
    title: 'Custom Architecture',
    desc: 'Engineering specialized SEO, Meta Ad funnels, and zero-leakage WhatsApp lead capture systems.',
    icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
  },
  {
    step: '03',
    title: 'Agile Launch',
    desc: 'Deploying high-speed responsive web pages, conversion creatives, and analytics pixel tracking.',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
  },
  {
    step: '04',
    title: 'Scale & Multiply ROI',
    desc: 'Continuous budget optimization, transparent weekly reporting, and scaling your client acquisition.',
    icon: <BarChart className="w-5 h-5 text-emerald-500" />,
  },
];

const WhyChooseUs = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const why = content?.whyChooseUs || {};
  const points = why.points || [
    'Result-Driven B2B Lead Generation',
    '24/7 Dedicated Support & Monitoring',
    'Industry-Specific Expert Teams',
    'Custom Tailored Solutions & Tech Stack',
    'Transparent Reporting & ROI Dashboards',
    'Long-Term Growth Partnerships',
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Visuals & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Visual: Marketer photo with floating badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-blue-100">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=700&q=80"
                alt="Entrepreneur at laptop"
                className="w-full h-80 sm:h-96 object-cover object-top hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Badge 1: Your Growth Our Priority */}
              <div className="absolute top-6 -right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 animate-float-gentle">
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

          {/* Right Column: Mission & Points */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 live-pulse-dot" />
              <span>{why.badge || 'Why Choose TezScale'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
              {why.title || 'Your Growth, Our Mission'}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {why.description ||
                "We combine creativity, technology and data-driven strategies to deliver measurable results. Tailored specifically for Medical Clinics, Real Estate Brokers, Engineering Firms, and Ambitious Entrepreneurs."}
            </p>

            {/* Checkmark points grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-102 cursor-pointer"
              >
                <span>{why.buttonText || 'Schedule Strategy Call'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3.5 rounded-full text-sm font-bold border border-slate-200 transition-all hover:scale-102"
              >
                <span>Read Full Agency Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Boardroom Preview Photo */}
            <div className="pt-4">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="TezScale Boardroom"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-xl text-xs font-black text-slate-900 shadow-sm">
                  Tez<span className="text-blue-600">Scale</span> Agency HQ
                </div>

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

        {/* Olive-style 4-Step Progressive Journey Timeline (PDF Section 2.2 Our Approach) */}
        <div className="pt-16 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Our Proven Approach</div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              From Inquiry to Predictable Growth
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              The 4-stage systematic engine behind every successful TezScale client campaign.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/80 card-lift flex flex-col justify-between relative group hover:bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                      {st.icon}
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
