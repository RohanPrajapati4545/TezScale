import React from 'react';
import { ArrowRight, BarChart3, Trophy, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const OurWork = () => {
  const { content } = useContent();
  const portfolioSection = content?.portfolioSection || {};
  const caseStudies = content?.caseStudies || [];
  const metrics = content?.metrics || {};

  const metricCards = [
    {
      value: metrics.stat1Value || '150+',
      label: metrics.stat1Label || 'Happy Clients',
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50',
    },
    {
      value: metrics.stat2Value || '250%',
      label: metrics.stat2Label || 'Avg. Growth',
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      iconBg: 'bg-amber-50',
    },
    {
      value: metrics.stat3Value || '5+ Years',
      label: metrics.stat3Label || 'Industry Experience',
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      iconBg: 'bg-indigo-50',
    },
  ];

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              {portfolioSection.badge || 'Our Work'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {portfolioSection.title || 'Real Results for Real Businesses'}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {portfolioSection.description ||
                'Explore some of our successful projects where we helped brands grow and achieve their goals.'}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-500/20 transition-all hover:gap-3"
            >
              <span>View Our Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Projects + Metrics layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Dynamic Case Study Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((study, idx) => (
              <div
                key={study._id || idx}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left"
              >
                {/* Visual Preview Graphic */}
                <div className="h-40 sm:h-44 bg-gradient-to-tr from-slate-900 to-indigo-950 p-4 relative flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-mono">Project #{idx + 1}</span>
                  </div>

                  {/* Graphic center */}
                  <div className="my-auto flex justify-center items-center">
                    <div className="w-full flex items-end justify-center gap-2 h-16 pt-2">
                      <div className="w-4 bg-blue-500/40 rounded-t h-6" />
                      <div className="w-4 bg-blue-500/60 rounded-t h-10" />
                      <div className="w-4 bg-blue-400 rounded-t h-14" />
                      <div className="w-4 bg-blue-500/50 rounded-t h-8" />
                      <div className="w-4 bg-emerald-400 rounded-t h-16 animate-pulse" />
                    </div>
                  </div>

                  {/* Growth Pill Badge bottom */}
                  <div className="flex justify-end">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                      {study.badge}
                    </span>
                  </div>
                </div>

                {/* Content description */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {study.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {study.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Metrics Cards Column */}
          <div className="lg:col-span-3 flex flex-col gap-4 justify-between">
            {metricCards.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex items-center gap-4 text-left shadow-sm hover:bg-white hover:shadow-md transition-all flex-1"
              >
                <div className={`w-12 h-12 rounded-xl ${metric.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  {metric.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurWork;
