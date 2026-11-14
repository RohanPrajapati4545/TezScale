import React from 'react';
import {
  BarChart2,
  Megaphone,
  Target,
  Edit3,
  Monitor,
  Mail,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';
import LeadForm from './LeadForm';
import { useContent } from '../context/ContentContext';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'BarChart2':
      return <BarChart2 className="w-5 h-5 text-blue-600" />;
    case 'Megaphone':
      return <Megaphone className="w-5 h-5 text-sky-600" />;
    case 'Target':
      return <Target className="w-5 h-5 text-amber-600" />;
    case 'Edit3':
      return <Edit3 className="w-5 h-5 text-blue-600" />;
    case 'Monitor':
      return <Monitor className="w-5 h-5 text-cyan-600" />;
    case 'Mail':
      return <Mail className="w-5 h-5 text-indigo-600" />;
    case 'TrendingUp':
      return <TrendingUp className="w-5 h-5 text-emerald-600" />;
    case 'Cpu':
      return <Cpu className="w-5 h-5 text-purple-600" />;
    default:
      return <Layers className="w-5 h-5 text-blue-600" />;
  }
};

const Services = () => {
  const { content } = useContent();
  const servicesSection = content?.servicesSection || {};
  const servicesList = content?.services || [];

  return (
    <section id="services" className="py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              {servicesSection.badge || 'Our Services'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {servicesSection.title || 'Complete Digital Marketing Solutions'}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {servicesSection.description ||
                'From strategy to execution, we provide end-to-end digital marketing services to help your business attract, engage and convert.'}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-500/20 transition-all hover:gap-3"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services Grid + Lead Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dynamic Service Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {servicesList.map((service, idx) => (
              <div
                key={service._id || idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-xl ${service.badgeBg || 'bg-blue-50'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {getServiceIcon(service.icon)}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Lead Generation Form */}
          <div className="lg:col-span-5">
            <LeadForm />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
