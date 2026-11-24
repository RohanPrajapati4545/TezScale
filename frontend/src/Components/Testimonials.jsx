import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { resolveMediaUrl } from '../api/apiClient';
import AnimatedContent from './AnimatedContent';

const defaultTestimonialsFallback = [
  {
    name: 'Dr. Priya Sharmaaa',
    role: 'Clinic Director, Apex Healthcare',
    sector: 'Healthcare & Clinics',
    rating: 5,
    avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439200/tezscale_assets/client-priya.jpg',
    quote:
      'TezScale completely transformed our online presence and local SEO. Their automated booking workflows brought us 3x more patient consultations in just 90 days!',
    highlight: '3x Patient Consultations',
  },
  {
    name: 'Rohit Verma',
    role: 'Managing Broker, UrbanSpace Realty',
    sector: 'Real Estate & Properties',
    rating: 5,
    avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439200/tezscale_assets/client-rohit.jpg',
    quote:
      'The lead quality from TezScale Meta Ads and CRM tracking has exceeded all our expectations. Our property closing velocity has more than doubled.',
    highlight: '2x Property Closing',
  },
  {
    name: 'Vikram Patel',
    role: 'VP Operations, Apex Engineering',
    sector: 'Industrial Manufacturing B2B',
    rating: 5,
    avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439201/tezscale_assets/client-vikram.jpg',
    quote:
      'As an industrial B2B exporter, getting genuine buyer inquiries online was our biggest bottleneck. TezScale optimized our global digital footprint and we secured multi-country supply contracts.',
    highlight: 'Global B2B Contracts',
  },
];

const Testimonials = () => {
  const { content } = useContent();
  const testimonialsSection = content?.testimonialsSection || {};

  const testimonialsSource = (content?.testimonials && content.testimonials.length > 0)
    ? content.testimonials
    : (() => {
        try {
          const raw = localStorage.getItem('tezscale_custom_testimonials');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          }
        } catch (e) {}
        return defaultTestimonialsFallback;
      })();

  const testimonials = testimonialsSource && testimonialsSource.length > 0
    ? testimonialsSource
    : defaultTestimonialsFallback;

  return (
    <section id="testimonials" className="py-20 bg-slate-50/60 border-t border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.7}
          ease="power3.out"
          threshold={0.15}
        >
          <div className="text-left mb-12 space-y-2.5">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide shadow-2xs">
              {testimonialsSection.badge || 'Client Endorsements'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {testimonialsSection.title || 'What Our Clients Say'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              {testimonialsSection.description || 'Trusted by doctors, brokers, and industry leaders.'}
            </p>
          </div>
        </AnimatedContent>

        {/* Testimonials Grid — Exactly matching Admin Panel "What Clients Say" card structure */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          stagger={0.12}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 text-left items-stretch"
        >
          {testimonials.map((testi, idx) => (
            <div
              key={testi._id || testi.id || idx}
              className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:border-[#00A3E0]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-3.5">
                {/* Top Row: Number Badge + Client Name + Highlight Pill */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#e0f4ff] text-[#00A3E0] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {testi.name || `Review #${idx + 1}`}
                    </span>
                    {testi.highlight && (
                      <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#e0f4ff] text-[#007ba8] border border-[#00A3E0]/30 shrink-0">
                        {testi.highlight}
                      </span>
                    )}
                  </div>
                </div>

                {/* Avatar + Role + Sector + Rating Stars */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-[#e0f4ff] p-0.5 shadow-2xs">
                    {testi.avatar ? (
                      <img
                        src={resolveMediaUrl(testi.avatar)}
                        alt={testi.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#00A3E0] to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {testi.name ? testi.name[0] : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {testi.role}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium truncate">
                      {testi.sector}
                    </div>
                    <div className="text-amber-500 text-xs mt-1 tracking-wider">
                      {'★'.repeat(testi.rating || 5)}
                    </div>
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="text-xs sm:text-[13px] text-slate-600 italic bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100 leading-relaxed font-normal">
                  "{testi.quote}"
                </blockquote>
              </div>

              {/* Bottom Row: Verified Client */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Verified Client</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  TezScale Partner
                </span>
              </div>
            </div>
          ))}
        </AnimatedContent>

        {/* View All Testimonials Link */}
        <div className="mt-12 text-center">
          <Link
            to="/testimonials"
            className="btn-drone-secondary border border-slate-200 hover:border-[#00A3E0] inline-flex items-center gap-2"
          >
            <span>Read All Verified Client Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
