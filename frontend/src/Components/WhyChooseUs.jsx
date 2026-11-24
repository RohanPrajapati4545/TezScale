import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Compass, 
  Lightbulb, 
  Zap, 
  BarChart 
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import AnimatedContent from './AnimatedContent';

const steps = [
  {
    step: '01',
    title: 'Free Audit & Growth Plan',
    desc: 'We review your current website, Google Maps profile, and top local competitors to find where you are losing leads.',
    milestone: 'Day 1 • Free Audit',
    icon: <Compass className="w-5 h-5 text-blue-600" />,
  },
  {
    step: '02',
    title: 'Website & Ad Setup',
    desc: 'We build your mobile-ready website, ad posters, and WhatsApp lead form in 48 hours.',
    milestone: 'Day 2 • Live Demo Ready',
    icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
  },
  {
    step: '03',
    title: 'Review & Go Live',
    desc: 'Check your working draft on your phone. Once you approve, we connect your domain and launch everything live.',
    milestone: 'Days 3–5 • Go Live',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
  },
  {
    step: '04',
    title: 'Daily Leads & Scaling',
    desc: 'New customer inquiries arrive on your WhatsApp in under 2 minutes while we optimize your ads and SEO every week.',
    milestone: 'Ongoing • Weekly Growth',
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

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section id="why-choose-us" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Visuals & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Visual: Marketer photo with floating badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              threshold={0.15}
              className="w-full max-w-sm"
            >
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src={why.founderImage || "/tezscale-founder.jpg"}
                  alt="TezScale Digital Growth Specialist"
                  className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-top hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />

                {/* Stationary Badge 1 */}
                <div className="absolute top-6 -right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#e0f4ff] text-[#00A3E0] flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">{why.badge1Title || 'Your Growth'}</div>
                    <div className="text-[10px] text-slate-600 font-medium">{why.badge1Subtitle || 'Our Priority'}</div>
                  </div>
                </div>

                {/* Stationary Badge 2 */}
                <div className="absolute bottom-6 -right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold text-slate-900 leading-tight">{why.badge2Title || '+300%'}</div>
                    <div className="text-[10px] text-slate-600 font-medium">{why.badge2Subtitle || 'Traffic Growth'}</div>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Right Column: Mission & Points */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              delay={0.15}
              ease="power3.out"
              threshold={0.15}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide">
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
                    <CheckCircle2 className="w-5 h-5 text-[#00A3E0] flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Read Full Story Button (About TezScale button removed per user request) */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="btn-drone-primary"
                >
                  <span>READ FULL STORY</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Genuine Video Showcase (TezScale Agency HQ) */}
              <div className="pt-4">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-950 group">
                  <video
                    ref={videoRef}
                    key={why.hqVideoUrl || content?.media?.agencyHqVideo || "/page-hero-video.mp4"}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    aria-label="TezScale Agency HQ Video"
                    className="w-full h-52 sm:h-64 md:h-72 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
                    onClick={togglePlay}
                  >
                    <source src={why.hqVideoUrl || content?.media?.agencyHqVideo || "/page-hero-video.mp4"} type="video/mp4" />
                    <source src="/services-hero-video.mp4" type="video/mp4" />
                    <source src="/tezscale-hero-video.mp4" type="video/mp4" />
                    <track kind="captions" src="data:text/vtt;charset=utf-8,WEBVTT" label="English" default />
                  </video>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                  {/* Top HQ Badge */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md uppercase tracking-wider flex items-center gap-2 border border-white/20 select-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Tez<span className="text-[#00A3E0]">Scale</span> Agency HQ</span>
                  </div>

                  {/* Center Play Overlay when Paused */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#00A3E0]/90 hover:bg-[#00A3E0] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border-2 border-white/40"
                      aria-label="Play video"
                    >
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </button>
                  )}

                  {/* Bottom Interactive Controls Bar */}
                  <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between text-white z-10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 flex items-center justify-center transition-all cursor-pointer text-white hover:scale-105"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 flex items-center justify-center transition-all cursor-pointer text-white hover:scale-105"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </div>

                    <button
                      onClick={() => setVideoModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 flex items-center gap-1.5 text-xs font-semibold text-white transition-all cursor-pointer hover:scale-105"
                      title="Watch in HD Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                      <span className="hidden sm:inline">Watch HD</span>
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedContent>

          </div>

        </div>

        {/* 4-Step Progressive Journey Timeline (How We Work) */}
        <div id="how-we-work" className="pt-16 border-t border-slate-100 scroll-mt-24">
          <AnimatedContent
            distance={40}
            direction="vertical"
            duration={0.7}
            threshold={0.15}
            className="text-center max-w-2xl mx-auto space-y-3 mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] font-sans font-semibold text-xs sm:text-[13px] leading-[1.20] shadow-2xs">
              <span>Simple 4-Step Process</span>
            </div>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] md:text-[34px] text-slate-900 tracking-tight leading-[1.20] text-center">
              From Idea to Live Customers in <span className="text-[#0EA5E9]">5–6 Days</span>
            </h2>
            <p className="font-sans font-normal text-[15px] sm:text-[16px] text-[#475569] leading-[1.60] max-w-xl mx-auto">
              No confusing delays or endless meetings. Review your live website draft in 48 hours and start receiving inquiries within a week.
            </p>
          </AnimatedContent>

          <AnimatedContent
            distance={70}
            direction="vertical"
            duration={0.8}
            ease="power3.out"
            stagger={0.12}
            threshold={0.12}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 card-lift flex flex-col justify-between relative group hover:bg-white hover:border-[#00A3E0]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span aria-hidden="true" className="text-3xl font-black text-slate-300 group-hover:text-[#00A3E0] transition-colors font-heading select-none">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                      {st.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-[18px] sm:text-[20px] leading-[1.30] text-slate-900 mb-2 group-hover:text-[#00A3E0] transition-colors">
                    {st.title}
                  </h3>
                  <p className="font-sans font-normal text-[15px] text-[#475569] leading-[1.60] mb-5">
                    {st.desc}
                  </p>
                </div>

                {/* Clear Timeline Milestone Badge (Replaces "Phase Complete ✓") */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#006287] bg-[#e0f4ff]/60 px-2.5 py-1.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                  <span>{st.milestone}</span>
                </div>
              </div>
            ))}
          </AnimatedContent>
        </div>

      </div>

      {/* Interactive HD Video Modal for Agency HQ */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 anim-fade-in"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="/page-hero-video.mp4" type="video/mp4" />
                <source src="/services-hero-video.mp4" type="video/mp4" />
                <source src="/tezscale-hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer Info */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-left">
              <div>
                <div className="text-white font-bold text-sm">TEZSCALE — Accelerating Digital Growth</div>
                <div className="text-slate-400 text-xs mt-0.5">Behind the scenes at TezScale Agency HQ — engineered for high-converting B2B results.</div>
              </div>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  onOpenConsultation();
                }}
                className="px-5 py-2 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white text-xs font-bold transition-all shadow-md shadow-[#00A3E0]/30 cursor-pointer"
              >
                Schedule Strategy Call
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
