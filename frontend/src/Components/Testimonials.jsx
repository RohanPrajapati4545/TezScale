import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Testimonials = () => {
  const { content } = useContent();
  const testimonialsSection = content?.testimonialsSection || {};
  const testimonials = content?.testimonials || [];
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
    <section id="about" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              {testimonialsSection.badge || 'Testimonials'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {testimonialsSection.title || 'What Our Clients Say'}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {testimonialsSection.description ||
                "Don't just take our word for it. Here's what our clients have to say about working with us."}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md max-w-4xl mx-auto text-left transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-md bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span>{current.name?.charAt(0) || 'U'}</span>
                )}
              </div>
            </div>

            {/* Testimonial Quote & Info */}
            <div className="space-y-4 flex-1">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl text-slate-800 font-semibold leading-relaxed italic">
                {current.quote}
              </blockquote>

              <div>
                <div className="font-bold text-slate-900 text-base">{current.name}</div>
                <div className="text-xs text-slate-500">{current.role}</div>
              </div>
            </div>

          </div>

          {/* Dots pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-slate-100">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
