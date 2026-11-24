import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Quote, Send, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { resolveMediaUrl } from '../api/apiClient';
import AnimatedContent from './AnimatedContent';

const Testimonials = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const testimonialsSection = content?.testimonialsSection || {};
  const testimonials = content?.testimonials || [];
  const cta = content?.ctaBanner || {};

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          threshold={0.15}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl text-left space-y-2">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide shadow-2xs">
                {testimonialsSection.badge || 'Testimonials'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {testimonialsSection.title || 'What Our Clients Say'}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {testimonialsSection.description || 'Trusted by businesses across industries.'}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedContent>

        {/* Side-by-Side: Testimonial Quote Card on Left + CTA Card on Right */}
        <AnimatedContent
          distance={70}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          stagger={0.15}
          threshold={0.12}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Testimonial Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-2xs card-lift text-left flex flex-col justify-between hover:border-[#00A3E0]/40">
            <div>
              <Quote className="w-10 h-10 text-[#00A3E0] fill-[#e0f4ff] mb-4" />
              <blockquote className="text-lg sm:text-xl text-slate-800 font-semibold leading-relaxed">
                {current.quote}
              </blockquote>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00A3E0] shadow-2xs bg-[#e0f4ff] flex items-center justify-center">
                  {current.avatar ? (
                    <img
                      src={resolveMediaUrl(current.avatar)}
                      alt={current.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="font-extrabold text-[#00A3E0] text-sm">
                      {current.name ? current.name[0] : 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-base">{current.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{current.role}</div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-[#00A3E0]' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: "Ready to Grow Your Business?" Card */}
          <div className="lg:col-span-5 relative bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-2xs card-lift flex flex-col items-center justify-center text-center space-y-5 hover:border-[#00A3E0]/40">
            {/* Curved arrow doodle */}
            <div className="absolute top-4 right-4 hidden sm:block pointer-events-none select-none">
              <svg className="w-10 h-10 text-[#00A3E0]/50 stroke-current" viewBox="0 0 50 50" fill="none">
                <path d="M10 10 Q 35 15, 30 35 M 30 35 L 24 30 M 30 35 L 36 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Cyan Paper plane icon */}
            <div className="w-16 h-16 rounded-full bg-[#e0f4ff] text-[#00A3E0] flex items-center justify-center shadow-2xs">
              <Send className="w-7 h-7 -rotate-12 translate-x-0.5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {cta.title || 'Ready to Grow Your Business?'}
              </h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                {cta.subtitle || "Let's create a winning digital strategy together."}
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="btn-drone-primary"
            >
              <span>{cta.buttonText || 'GET A FREE CONSULTATION'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </AnimatedContent>

        {/* View All Testimonials Link */}
        <div className="mt-12 text-center">
          <Link
            to="/testimonials"
            className="btn-drone-secondary border border-slate-200 hover:border-[#00A3E0]"
          >
            <span>Read All 240+ Verified Client Reviews</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
