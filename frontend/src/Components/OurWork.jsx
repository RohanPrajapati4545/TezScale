import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, BarChart3, Users, Clock, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const OurWork = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const portfolioSection = content?.portfolioSection || {};
  const caseStudies = content?.caseStudies || [];
  const metrics = content?.metrics || {};

  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Nav Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left space-y-2">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              {portfolioSection.badge || 'Our Work'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {portfolioSection.title || 'Some Success Stories'}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {portfolioSection.description || 'Real results. Real businesses. Real growth.'}
            </p>
          </div>

          {/* Carousel Arrows matching screenshot */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-xs cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-xs cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Metric counters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/80 text-left flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 leading-tight">
                {metrics.stat1Value || '250%'}
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {metrics.stat1Label || 'Average Growth'}
              </div>
            </div>
          </div>

          <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/80 text-left flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 leading-tight">
                {metrics.stat2Value || '500+'}
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {metrics.stat2Label || 'Happy Clients'}
              </div>
            </div>
          </div>

          <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/80 text-left flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 leading-tight">
                {metrics.stat3Value || '5+'}
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {metrics.stat3Label || 'Years Experience'}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Case Study Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div
              key={study._id || idx}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm card-lift flex flex-col text-left"
            >
              {/* Photo preview */}
              <div className="h-52 w-full overflow-hidden relative bg-slate-100">
                <img
                  src={
                    study.image ||
                    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Footer details */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h4>
                  <div className="text-xs font-bold text-slate-500 mt-0.5">
                    {study.subtitle || study.badge}
                  </div>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="w-9 h-9 rounded-full border border-slate-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-600 transition-all cursor-pointer"
                  aria-label="View project"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Case Studies Link */}
        <div className="mt-12 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-600 border border-slate-200 font-bold text-sm transition-all hover:scale-102 shadow-xs"
          >
            <span>Explore All Client Case Studies & Metrics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OurWork;
