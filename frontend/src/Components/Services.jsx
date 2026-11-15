import React from 'react';
import {
  Code,
  Palette,
  Megaphone,
  ShoppingCart,
  Share2,
  Infinity as InfinityIcon,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Code':
    case 'BarChart2':
      return <Code className="w-5 h-5" />;
    case 'Palette':
      return <Palette className="w-5 h-5" />;
    case 'Megaphone':
      return <Megaphone className="w-5 h-5" />;
    case 'ShoppingCart':
      return <ShoppingCart className="w-5 h-5" />;
    case 'Share2':
      return <Share2 className="w-5 h-5" />;
    case 'Infinity':
      return <InfinityIcon className="w-5 h-5" />;
    default:
      return <Layers className="w-5 h-5" />;
  }
};

const defaultCardColors = [
  'bg-[#00A3E0] text-white shadow-[#00A3E0]/25',
  'bg-purple-600 text-white shadow-purple-500/25',
  'bg-emerald-500 text-white shadow-emerald-500/25',
  'bg-amber-500 text-white shadow-amber-500/25',
  'bg-indigo-600 text-white shadow-indigo-500/25',
  'bg-cyan-600 text-white shadow-cyan-500/25',
];

const Services = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const servicesSection = content?.servicesSection || {};
  const servicesList = content?.services || [];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Eyebrow Tag */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide">
            <span>{servicesSection.badge || 'Our Core Offerings'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
            Complete <span className="text-[#00A3E0]">Digital Marketing</span> Solutions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {servicesSection.description ||
              'End-to-end services to help you build, grow and scale your business online with measurable ROI.'}
          </p>
        </div>

        {/* 6 Services Grid (3 Columns x 2 Rows) in Drone Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {servicesList.map((service, idx) => {
            const iconBg = service.badgeBg || defaultCardColors[idx % defaultCardColors.length];
            return (
              <div
                key={service._id || idx}
                className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#00A3E0]/50 card-lift flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#00A3E0] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={onOpenConsultation}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A3E0] group-hover:text-[#008bc0] uppercase tracking-wider transition-all group-hover:gap-2.5 cursor-pointer"
                  >
                    <span>Request Strategy Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Page Link */}
        <div className="mt-12 text-center">
          <a
            href="/services"
            className="btn-drone-secondary border border-slate-200 hover:border-[#00A3E0]"
          >
            <span>Explore All Services & Tech Deliverables</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
