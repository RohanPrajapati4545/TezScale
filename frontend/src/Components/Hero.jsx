import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Star,
  Users,
  Play,
  X
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import founderNobg from '../assets/founder-nobg.png';

const Hero = ({ onOpenConsultation }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const videoRef = useRef(null);

  // Ensure background video plays continuously across all browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
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
      return () => video.removeEventListener('ended', playVideo);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 lg:pt-16 pb-12 sm:pb-16 lg:pb-0 overflow-hidden bg-slate-900"
    >
      {/* Background Video: Full screen cover running continuously with high clarity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 scale-105"
        >
          <source src="/tezscale-hero-video.mp4" type="video/mp4" />
          <source src="/tezscale-hero-video-full.mp4" type="video/mp4" />
        </video>
        {/* Soft directional gradient: protects text contrast across mobile & desktop without washing out the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/75 lg:bg-gradient-to-r lg:from-white/85 lg:via-white/40 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center lg:items-end w-full">

          {/* Left Column: Headlines, Copy, Dual CTAs & Bottom Stats */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5 text-left py-4 sm:py-6 lg:py-8 max-w-2xl">

            {/* Tagline Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-sky-200/80 text-[#00A3E0] text-xs sm:text-[13px] font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
              <span>Accelerating Digital Growth.</span>
            </div>

            {/* Slogan & Main Headline (Clean, prominent typography, no underline lines) */}
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-[1.16]">
              We don't just provide digital services. <br />
              <span className="text-slate-900">We help businesses </span>
              <span className="text-[#00A3E0]">grow faster and scale smarter.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg font-normal">
              A digital solutions and growth partner helping businesses build, strengthen, and scale their digital presence through technology, creativity, and strategic execution.
            </p>

            {/* Action Buttons: Get Free Consultation & Watch How It Works */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00A3E0]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs border border-slate-200/80 transition-all flex items-center gap-2.5 cursor-pointer group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-full bg-sky-50 shadow-2xs border border-sky-200 flex items-center justify-center text-[#00A3E0] group-hover:scale-105 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-[#00A3E0]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#00A3E0] transition-colors">
                  Watch How It Works
                </span>
              </button>
            </div>

            {/* Bottom Stats Row (Clean, line-free format with mobile pill styling) */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-6 text-left">
              {/* Stat 1: 5K+ Happy Clients */}
              <div className="flex items-center gap-2 sm:gap-2.5 bg-white/70 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-xl sm:rounded-none border border-sky-100/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 backdrop-blur-xs border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0 shadow-2xs">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-black text-slate-900 leading-none">5K+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-0.5">Happy Clients</div>
                </div>
              </div>

              {/* Stat 2: 300%+ Average Growth */}
              <div className="flex items-center gap-2 sm:gap-2.5 bg-white/70 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-xl sm:rounded-none border border-sky-100/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 backdrop-blur-xs border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0 shadow-2xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-black text-slate-900 leading-none">
                    <AnimatedCounter value="300%+" duration={1400} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-0.5">Average Growth</div>
                </div>
              </div>

              {/* Stat 3: 4.9/5 Client Rating */}
              <div className="flex items-center gap-2 sm:gap-2.5 bg-white/70 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-xl sm:rounded-none border border-sky-100/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 backdrop-blur-xs border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0 shadow-2xs">
                  <Star className="w-4 h-4 text-[#00A3E0]" />
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-black text-slate-900 leading-none">4.9/5</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-0.5">Client Rating</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder Cutout (Hidden on Mobile/Tablet, Displayed Only on Desktop lg+) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative justify-end items-end select-none self-end h-full">
            <div className="relative w-full max-w-lg xl:max-w-xl flex items-end justify-end">
              <img
                src={founderNobg}
                alt="TezScale Digital Marketing Specialist"
                className="w-auto h-[500px] lg:h-[580px] xl:h-[640px] max-h-[88vh] object-contain object-bottom select-none relative z-10"
                loading="eager"
                fetchpriority="high"
              />
            </div>
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
                <source src="/tezscale-hero-video.mp4" type="video/mp4" />
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
