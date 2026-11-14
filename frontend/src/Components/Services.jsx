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
  'bg-blue-600 text-white',
  'bg-purple-600 text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-indigo-600 text-white',
  'bg-emerald-600 text-white',
];

const Services = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const servicesSection = content?.servicesSection || {};
  const servicesList = content?.services || [];

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
            {servicesSection.badge || 'Our Services'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Complete <span className="text-blue-600">Digital Marketing</span> Solutions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {servicesSection.description ||
              'End-to-end services to help you build, grow and scale your business online.'}
          </p>
        </div>

        {/* 6 Services Grid (3 Columns x 2 Rows) matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {servicesList.map((service, idx) => {
            const iconBg = service.badgeBg || defaultCardColors[idx % defaultCardColors.length];
            return (
              <div
                key={service._id || idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div>
                  <button
                    onClick={onOpenConsultation}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-all group-hover:gap-2 cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
