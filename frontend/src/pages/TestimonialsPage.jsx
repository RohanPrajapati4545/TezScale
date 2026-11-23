import React, { useState, useRef, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import AnimatedContent from '../Components/AnimatedContent';
import {
  Star,
  Quote,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Send
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const clientReviews = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    role: 'Clinic Director, Apex Healthcare',
    sector: 'Healthcare & Clinics',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1594824813589-9a25b1641ba5?auto=format&fit=crop&w=150&q=80',
    quote:
      'TezScale completely transformed our online presence and local SEO. Their automated booking workflows brought us 3x more patient consultations in just 90 days!',
    highlight: '3x Patient Consultations',
  },
  {
    id: 2,
    name: 'Rohit Verma',
    role: 'Managing Broker, UrbanSpace Realty',
    sector: 'Real Estate & Properties',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote:
      'The lead quality from TezScale Meta Ads and CRM tracking has exceeded all our expectations. Our property closing velocity has more than doubled.',
    highlight: '2x Property Closing',
  },
  {
    id: 3,
    name: 'Vikram Patel',
    role: 'VP Operations, Apex Engineering',
    sector: 'Industrial Manufacturing B2B',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote:
      'As an industrial B2B exporter, getting genuine buyer inquiries online was our biggest bottleneck. TezScale optimized our global digital footprint and we secured multi-country supply contracts.',
    highlight: 'Global B2B Contracts',
  },
];

const brandLogos = ['Google', 'Meta', 'Microsoft', 'HubSpot', 'Slack', 'Notion'];

const TestimonialsPage = () => {
  useSEO({
    title: 'Client Testimonials & Feedback | TezScale',
    description: 'Read verified reviews and feedback from founders, doctors, and business leaders who scaled with TezScale.',
    canonical: '/testimonials'
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const videoRef = useRef(null);
  const { content } = useContent();

  // Sync content visibility with background video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };
    playVideo();
    video.addEventListener('ended', playVideo);

    let animId;
    const updateVisibility = () => {
      if (video && !video.paused) {
        const time = video.currentTime;
        const dur = video.duration || 10.03;
        const shouldHide = time >= 5.8 && time <= dur;
        setContentVisible((prev) => (prev !== !shouldHide ? !shouldHide : prev));
      }
      animId = requestAnimationFrame(updateVisibility);
    };

    animId = requestAnimationFrame(updateVisibility);

    return () => {
      video.removeEventListener('ended', playVideo);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section with Live Background Video */}
        <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#070913] border-b border-slate-800 text-white">
          {/* Background Video: Shifted upwards with scale-120 for 100% full screen cover and perfect logo clearance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <video
              ref={videoRef}
              key={content?.media?.testimonialsHeroVideo || "/page-hero-video.mp4"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-contain md:object-cover portrait:object-contain landscape:object-cover object-center portrait:scale-100 landscape:scale-120 md:scale-120 portrait:-translate-y-6 sm:portrait:-translate-y-8 landscape:-translate-y-10 lg:landscape:-translate-y-16 portrait:[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] landscape:[mask-image:none] transition-opacity duration-700 ease-in-out ${
                contentVisible ? 'opacity-75 sm:opacity-80' : 'opacity-100'
              }`}
            >
              <source src={content?.media?.testimonialsHeroVideo || "/page-hero-video.mp4"} type="video/mp4" />
              <source src="/services-hero-video.mp4" type="video/mp4" />
              <source src="/tezscale-hero-video-full.mp4" type="video/mp4" />
            </video>
            {/* Soft atmospheric gradient overlays - completely fades out when content hides for full real video visibility */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                contentVisible
                  ? 'opacity-100 bg-gradient-to-b from-[#070913]/70 via-[#070913]/35 to-[#070913]/80'
                  : 'opacity-0'
              }`}
            />
            <div
              className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-blue-500/10 to-transparent pointer-events-none transition-opacity duration-700 ${
                contentVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full flex-1 flex flex-col justify-center items-center">
            {/* All Hero Content: Eyebrow, Title, Description, AND 5-Star Rating Badge smoothly hide together when TEZSCALE appears */}
            <div
              className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out transform ${
                contentVisible
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide shadow-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                <span>Social Proof & Client Stories</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4">
                Trusted by Over <span className="text-[#00A3E0]">500+ Businesses</span> Across Industries
              </h1>

              <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal mb-6 sm:mb-8">
                Don’t just take our word for it. Here is what healthcare founders, real estate developers, and business owners say about partnering with TezScale.
              </p>

              {/* 5-Star Rating Aggregate Banner: Smoothly fades out with content */}
              <div className="inline-flex items-center gap-2.5 p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-sm text-white">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-white">4.9 / 5.0 Rating</span>
                <span className="text-xs text-slate-300 font-medium">(240+ Verified Reviews)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Logos Shelf */}
        <section className="py-8 bg-slate-50 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 font-extrabold text-sm sm:text-base tracking-wider uppercase">
              {brandLogos.map((brand, idx) => (
                <span key={idx} className="hover:text-slate-600 transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedContent
              distance={80}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              stagger={0.12}
              threshold={0.12}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
            >
              {((content?.testimonials && content.testimonials.length > 0) ? content.testimonials : clientReviews).map((item, idx) => (
                <div
                  key={item._id || item.id || idx}
                  className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm card-lift flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Row: Stars + Quote Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      {item.highlight && (
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/80">
                          {item.highlight}
                        </span>
                      )}
                    </div>

                    {/* Review Quote */}
                    <blockquote className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      "{item.quote}"
                    </blockquote>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                      <img
                        src={item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{item.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{item.role}</div>
                      {item.sector && <div className="text-[10px] text-blue-600 font-semibold">{item.sector}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </section>

        {/* Conversion CTA Card */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                <Send className="w-7 h-7 text-white -rotate-12 translate-x-0.5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready to Multiply Your Inbound Leads?
                </h3>
                <p className="text-blue-100 text-sm max-w-md mx-auto">
                  Partner with the team trusted by hundreds of growing brands. Book your free strategy session now.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-slate-100 px-8 py-3.5 rounded-full font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <span>Get a Free Strategy Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TestimonialsPage;

