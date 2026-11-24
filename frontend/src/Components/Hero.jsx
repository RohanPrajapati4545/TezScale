import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  X,
  MessageSquare
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import AnimatedCounter from './AnimatedCounter';

const Hero = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const heroData = content?.hero || {};
  const mediaData = content?.media || {};
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const videoRef = useRef(null);

  // Sync content visibility with background video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => { });
      }
    };
    playVideo();
    video.addEventListener('ended', playVideo);

    // Frame-accurate loop to smoothly hide HTML content when 3D "TEZSCALE" logo appears,
    // and smoothly restore content when video loops back to start (ONLY on large desktop screens; NEVER on mobile)
    let animId;
    const updateVisibility = () => {
      if (video && !video.paused) {
        // On mobile screens (< 768px), keep content 100% permanently visible at all times
        if (window.innerWidth < 768) {
          setContentVisible(true);
          animId = requestAnimationFrame(updateVisibility);
          return;
        }

        const time = video.currentTime;
        const dur = video.duration || 10.03;

        // The 3D "TEZSCALE" logo text appears in the final segment before video ends (~last 4.2 seconds).
        // Fade out content above buttons when reaching logo reveal (~5.8s - 10.0s) on desktop only.
        // Fade back in smoothly when video loops to beginning (0s - 5.8s).
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

  // Scroll smoothly into Services section on the page, with fallback to /services
  const handleExploreServices = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      const navHeight = 75;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      window.history.pushState(null, '', '/#services');
    } else {
      window.location.href = '/services';
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-24 pb-8 sm:pb-12 overflow-hidden bg-[#070913] text-white"
    >
      {/* Dynamic Background: Full-bleed responsive video covering 100% of mobile and desktop viewports */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Background image if set in backoffice */}
        {(heroData.backgroundImage || mediaData.homeHeroBgImage) && (
          <img
            src={heroData.backgroundImage || mediaData.homeHeroBgImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Background video: 100% full-screen cover centered and pushed slightly up for optimal visual balance */}
        <video
          ref={videoRef}
          key={heroData.backgroundVideo || mediaData.homeHeroVideo || "/tezscale-hero-video.mp4"}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/hero-founder-visual.webp"
          aria-hidden="true"
          className={`w-full h-full object-cover object-center transform -translate-y-6 sm:-translate-y-8 md:-translate-y-10 lg:-translate-y-12 scale-105 sm:scale-108 transition-opacity duration-700 ease-in-out ${contentVisible ? 'opacity-70 sm:opacity-80' : 'opacity-100'
            }`}
        >
          <source src={heroData.backgroundVideo || mediaData.homeHeroVideo || "/tezscale-hero-video.mp4"} type="video/mp4" />
          <source src="/tezscale-hero-video-full.mp4" type="video/mp4" />
          <track kind="captions" src="data:text/vtt;charset=utf-8,WEBVTT" label="English" default />
        </video>

        {/* Soft atmospheric gradient overlays - keep dark backdrop on mobile so text is always 100% readable */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${contentVisible
            ? 'opacity-100 bg-gradient-to-b from-[#070913]/70 via-[#070913]/35 to-[#070913]/80'
            : 'opacity-100 bg-gradient-to-b from-[#070913]/80 via-[#070913]/55 to-[#070913]/85 md:opacity-0'
            }`}
        />
        <div
          className={`absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#070913]/20 to-[#070913]/55 pointer-events-none transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-100 md:opacity-0'
            }`}
        />

        {/* Top-Right Angled Spotlight Beam */}
        <div className={`absolute -top-32 right-0 w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-gradient-to-bl from-sky-400/25 via-blue-500/10 to-transparent rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-40'
          }`} />

        {/* Top-Left Ambient Beam */}
        <div className={`absolute -top-32 left-0 w-[500px] lg:w-[650px] h-[500px] lg:h-[650px] bg-gradient-to-br from-indigo-600/15 via-blue-600/5 to-transparent rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-40'
          }`} />

        {/* Center Ambient Glow Halo behind Headline */}
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[100px] pointer-events-none transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'
          }`} />

        {/* Bottom smooth fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#070913] to-transparent pointer-events-none" />
      </div>

      {/* Main Centered Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex-1 flex flex-col justify-center items-center w-full py-4 sm:py-6">

        {/* Content ABOVE the buttons: 100% permanently visible on mobile screen (never disappears) */}
        <div
          className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out transform max-md:!opacity-100 max-md:!scale-100 max-md:!translate-y-0 max-md:!pointer-events-auto ${contentVisible
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-100 scale-100 translate-y-0 pointer-events-auto md:opacity-0 md:scale-95 md:-translate-y-4 md:pointer-events-none'
            }`}
        >
          {/* Eyebrow Pill Badge (Inter 13px/12px SemiBold, Title Case) */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 text-slate-200 text-xs sm:text-[13px] font-semibold leading-[1.20] font-sans transition-all shadow-sm mb-4 sm:mb-5 select-none">
            <span>Indore’s Digital Growth Partner for Local & B2B Businesses</span>
          </div>

          {/* Main Headline (H1 — Plus Jakarta Sans 46px Desktop / 30px Mobile, Bold 700, 1.15 line height) */}
          <h1 className="font-heading font-bold text-[30px] sm:text-[38px] md:text-[46px] text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4 sm:mb-5">
            Get More Daily Customer Inquiries with a{' '}
            <span className="text-[#0EA5E9] font-bold">
              Fast Website, Google Maps SEO & Meta Ads
            </span>
          </h1>

          {/* Subtitle Description (Inter 16px Desktop / 15px Mobile, Regular 400, 1.60 line height, #CBD5E1) */}
          <p className="font-sans font-normal text-[15px] sm:text-[16px] text-[#CBD5E1] max-w-2xl mx-auto leading-[1.60] mb-4 sm:mb-5">
            We help Indian clinics, real estate builders, factories, and retail brands attract genuine buyers online. See a working demo of your website in 2 days and go live within 5–6 business days—with transparent pricing and zero agency jargon.
          </p>
        </div>

        {/* Dual Center CTA Buttons: PERMANENTLY VISIBLE, NEVER HIDDEN - aligned naturally below the central logo */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-20 mt-4 sm:mt-6 md:mt-8">

          {/* Primary CTA Button: Book Free 15-Min Strategy Call → */}
          <button
            onClick={onOpenConsultation}
            className="px-6 sm:px-7 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 hover:from-sky-300 hover:via-cyan-200 hover:to-sky-400 text-slate-950 font-sans font-semibold text-[15px] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02]"
          >
            <span>Book Free 15-Min Strategy Call</span>
            <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </button>

          {/* Secondary CTA Button: Chat on WhatsApp */}
          <a
            href="https://wa.me/919876543210?text=Hi%20TezScale%20team,%20I%20want%20to%20get%20more%20customer%20inquiries%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-7 py-3.5 min-h-[48px] rounded-full bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md border border-white/25 hover:border-white/40 text-white font-sans font-semibold text-[15px] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* 3 Trust Badges Below Buttons (Inter 15px/14px Medium 500, Cyan Checkmarks) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-5 text-slate-300 font-sans font-medium text-[13px] sm:text-[14px] leading-[1.50] relative z-20">
          <div className="flex items-center gap-1.5">
            <span className="text-[#0EA5E9] font-bold">✓</span>
            <span>Live Website Demo in 2 Days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#0EA5E9] font-bold">✓</span>
            <span>Direct WhatsApp Lead Alerts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#0EA5E9] font-bold">✓</span>
            <span>Transparent Pricing from ₹14,999 & GST Invoice</span>
          </div>
        </div>

      </div>

      {/* Verified Performance Stats Indicators (Enlarged & Animated Count-Up) */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center pt-4 sm:pt-6 pb-3">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 sm:px-9 py-3 sm:py-4 rounded-full bg-white/[0.07] hover:bg-white/[0.1] backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300">

          {/* Stat 1 */}
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="font-black text-white text-base sm:text-lg md:text-xl tracking-tight">
              <AnimatedCounter value={heroData.stat1Value || "5K+"} duration={1600} />
            </span>
            <span className="text-slate-300 font-medium">{heroData.stat1Label || "Clients Scaled"}</span>
          </div>

          <span className="text-slate-500 hidden sm:inline select-none text-base">•</span>

          {/* Stat 2 */}
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="font-black text-white text-base sm:text-lg md:text-xl tracking-tight">
              <AnimatedCounter value={heroData.stat2Value || "300%+"} duration={1700} />
            </span>
            <span className="text-slate-300 font-medium">{heroData.stat2Label || "Avg ROAS Growth"}</span>
          </div>

          <span className="text-slate-500 hidden sm:inline select-none text-base">•</span>

          {/* Stat 3 */}
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            <span className="font-black text-white text-base sm:text-lg md:text-xl tracking-tight">
              <AnimatedCounter value={heroData.stat3Value || "4.9/5"} duration={1500} />
            </span>
            <span className="text-slate-300 font-medium">{heroData.stat3Label || "Client Rating"}</span>
          </div>

        </div>
      </div>

      {/* Interactive HD Video Modal */}
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
                <source src={heroData.modalVideo || heroData.backgroundVideo || mediaData.homeHeroVideo || "/tezscale-hero-video.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer Info */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-left">
              <div>
                <div className="text-white font-bold text-sm">TEZSCALE — Accelerating Digital Growth.</div>
                <div className="text-slate-400 text-xs mt-0.5">We don't just provide digital services. We help businesses grow faster and scale smarter.</div>
              </div>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  onOpenConsultation();
                }}
                className="px-5 py-2 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white text-xs font-bold transition-all shadow-md shadow-[#00A3E0]/30 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
