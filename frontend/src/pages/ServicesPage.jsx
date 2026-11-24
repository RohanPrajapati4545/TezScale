import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import AnimatedContent from '../Components/AnimatedContent';
import {
  Code2,
  Palette,
  Megaphone,
  ShoppingCart,
  Share2,
  Infinity as InfinityIcon,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  Layers,
  Play,
  X,
  ExternalLink
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const detailedServices = [
  {
    id: 'web-dev',
    slug: 'web-development',
    title: 'Business Website Development',
    category: 'Fast & Mobile-Ready Websites',
    icon: <Code2 className="w-6 h-6 text-blue-600" />,
    badge: 'Indore • Transparent Pricing & 2-Day Live Demo',
    desc: 'Custom, easy-to-use websites for Indian businesses. Designed to load in under 1 second even on mobile data and convert visitors into direct inquiries.',
    deliverables: [
      'Opens in under 1 second even on mobile data',
      '1-Click WhatsApp Chat Button for Instant Customer Inquiries',
      '100% Mobile-Friendly & responsive on all smartphone screens',
      'Google SEO Ready with local business schema & instant indexing',
      'Transparent pricing from ₹14,999 with GST invoice available',
    ],
    tech: ['Fast 1-Second Loading', 'Mobile-Friendly', 'Google SEO Ready', '1-Click WhatsApp'],
    stats: 'Plans from ₹14,999 • 2-Day Demo',
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    title: 'Logo, Branding & Ad Design',
    category: 'Brand Identity & Ad Posters',
    icon: <Palette className="w-6 h-6 text-purple-600" />,
    badge: 'Scroll-Stopping Creatives',
    desc: 'Clean, modern visual branding that builds instant credibility with customers—from your company logo to daily social media and ad creatives.',
    deliverables: [
      'Complete brand kit (logo, colors, and clean fonts)',
      'High-converting Facebook & Instagram ad posters',
      'Company profile decks & printable PDF brochures',
      'Festival & offer templates for WhatsApp status',
      'Editable source files delivered for full ownership',
    ],
    tech: ['Print & Digital Ready', 'High Ad Clicks', 'Fast Turnaround'],
    stats: 'Up to 3x More Ad Clicks',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Local SEO & Google Maps Ranking',
    category: 'Local Search & Google Ranking',
    icon: <Megaphone className="w-6 h-6 text-emerald-600" />,
    badge: 'Indore Google Maps Top 3',
    desc: 'Get found by local customers actively searching for your services on Google Search and Google Maps—without paying for every single click.',
    deliverables: [
      'Google Business Profile (Google Maps) optimization',
      'Ranking for high-buying local keywords in your city',
      'Review growth strategy to build a 4.8★+ rating',
      'Website speed & on-page Google SEO fixes',
      'Simple monthly report showing calls & keyword ranks',
    ],
    tech: ['Google Maps Top 3', 'More Direct Calls', 'Monthly Reports'],
    stats: '2x–3x Organic Inquiries',
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'Online Store (E-Commerce) Setup',
    category: 'E-Commerce Store & Sales',
    icon: <ShoppingCart className="w-6 h-6 text-amber-500" />,
    badge: 'UPI & 1-Step Checkout',
    desc: 'Complete online stores with UPI/card payment gateways, shipping setup, and easy 1-step checkout to grow your product sales.',
    deliverables: [
      'Fast mobile storefront with 1-step direct checkout',
      'Instant Razorpay/UPI, Cards, and NetBanking setup',
      'Automated WhatsApp abandoned cart recovery alerts',
      'Product catalog & inventory management system',
      'Order tracking and customer SMS/WhatsApp updates',
    ],
    tech: ['1-Step Checkout', 'Instant UPI', 'WhatsApp Cart Recovery', 'Fast Setup'],
    stats: '+300% Sales Increase',
  },
  {
    id: 'social-media',
    slug: 'social-media',
    title: 'Social Media Management',
    category: 'Social Media & Reels',
    icon: <Share2 className="w-6 h-6 text-indigo-600" />,
    badge: 'Viral Reels & Brand Trust',
    desc: 'Consistent Instagram, Facebook, and LinkedIn posts and reels that build local brand trust and engage your customers.',
    deliverables: [
      'Monthly short-form viral reel shooting & video editing',
      'High-retention captions, scripts, and trending audio',
      'Daily story posts and customer review highlights',
      'Community management & active DM/comment replies',
      'B2B LinkedIn thought leadership and company updates',
    ],
    tech: ['Viral Video Scripts', '5x Engagement', 'Active Moderation', 'Zero Stress'],
    stats: '5x Audience Engagement',
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads',
    title: 'Facebook & Instagram (Meta) Ads',
    category: 'Targeted Lead Generation',
    icon: <InfinityIcon className="w-6 h-6 text-rose-500" />,
    badge: 'Click-to-WhatsApp Leads',
    desc: 'Targeted ad campaigns that send ready-to-buy customer leads straight to your WhatsApp—with clear daily ROI tracking.',
    deliverables: [
      'Direct Click-to-WhatsApp ad funnels on FB & Instagram',
      'Hyper-local radius targeting for Indore and MP buyers',
      'High-CTR ad creative testing with daily optimizations',
      'Meta Pixel & Conversions API tracking setup',
      'Transparent daily reports with Cost Per Lead (CPL)',
    ],
    tech: ['Direct WhatsApp Leads', '3.8x Avg ROAS', 'Verified Buyers', 'Low CPL'],
    stats: '3.8x Avg ROAS',
  },
];

const ServicesPage = () => {
  useSEO({
    title: 'Affordable Web Development, Reels & Digital Marketing Services in Indore | TezScale',
    description: 'Explore TezScale high-impact digital service pillars: Easy cost website development in Indore, viral reels video creation, local SEO Google Maps ranking, and high-ROAS Meta ads.',
    keywords: 'web development services Indore, affordable website builder Indore, low cost web development, reels making services Indore, viral video marketing, digital marketing agency Indore, local SEO services, Google Maps ranking Indore, Meta ads agency, TezScale services',
    canonical: '/services'
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
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

  // Auto-open modal on first-time visit
  useEffect(() => {
    try {
      const hasSeenModal = sessionStorage.getItem('tezscale_first_visit_modal');
      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setModalOpen(true);
          sessionStorage.setItem('tezscale_first_visit_modal', 'true');
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Services Page Hero with Live Background Video */}
        <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#070913] border-b border-slate-800 text-white">
          {/* Background Video: Shifted upwards with scale-120 for 100% full screen cover and perfect logo clearance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <video
              ref={videoRef}
              key={content?.media?.servicesHeroVideo || "/services-hero-video.mp4"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                contentVisible ? 'opacity-75 sm:opacity-80' : 'opacity-100'
              }`}
            >
              <source src={content?.media?.servicesHeroVideo || "/services-hero-video.mp4"} type="video/mp4" />
              <source src="/tezscale-hero-video-full.mp4" type="video/mp4" />
              <source src="/tezscale-hero-video.mp4" type="video/mp4" />
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
            {/* Content ABOVE the buttons: Smoothly hides when TEZSCALE appears, restores when video loops */}
            <div
              className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out transform ${
                contentVisible
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
              }`}
            >
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-400/30 text-sky-300 text-xs sm:text-[13px] font-bold tracking-wide shadow-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                <span>Full-Stack Growth Services & Digital Architecture</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto drop-shadow-sm mb-4">
                Complete <span className="text-[#00A3E0]">Digital Solutions</span> <br className="hidden sm:inline" />
                Built to Convert & Scale
              </h1>

              {/* Description */}
              <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal mb-2">
                From accelerated web architecture to precision Meta Ads and Local Map dominance, we build the digital infrastructure your business needs to win.
              </p>
            </div>

            {/* Action Buttons: PERMANENTLY VISIBLE, NEVER HIDDEN */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-20 mt-3 sm:mt-5">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#008bc0] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-[#00A3E0]/35 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 cursor-pointer group shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#00A3E0] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-white" />
                </div>
                <span>Watch Showreel</span>
              </button>
            </div>

            {/* Key Deliverable Highlights Pill Row: Smoothly hides with content */}
            <div
              className={`pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 font-semibold relative z-20 transition-all duration-700 ease-in-out ${
                contentVisible
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
                <span>2-Day Staging Draft</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
                <span>95+ Mobile PageSpeed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
                <span>WhatsApp CRM Routing</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Detailed Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedContent
              distance={80}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              stagger={0.12}
              threshold={0.12}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {detailedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm card-lift flex flex-col justify-between text-left relative overflow-hidden"
                >
                  {/* Subtle top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />

                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                        {service.icon}
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
                        {service.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {service.category}
                      </div>
                      <Link to={`/services/${service.slug}`} className="block group/link">
                        <h3 className="text-xl font-extrabold text-slate-900 mt-1 leading-snug group-hover/link:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Deliverables List */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-900 mb-2">What is Included:</div>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Tools & Technologies:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA (Jumps to Individual Service Details Page) */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-blue-600">{service.stats}</span>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer group"
                    >
                      <span>View Details & Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </section>

        {/* Featured Live Web Development & SaaS Platforms */}
        <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Web Architecture Proof</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Live Production SaaS & Web Architectures
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore live enterprise platforms, real-time web applications, and machine learning systems architected by TezScale's technical engineering team — Rohan Prajapati (Lead Full-Stack Web Developer) & Rustam Rathore (AI/ML Engineer). Direct production links below:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Ayurflex',
                  url: 'https://ayurflex.digiflex.ai',
                  category: 'Healthcare & Clinical Practice SaaS',
                  badge: 'Microservices SaaS',
                  tech: 'React.js • Node.js • Express • MongoDB • Docker',
                  desc: 'Comprehensive clinical SaaS management platform built for Ayurveda practices with patient booking and medical workflows.',
                },
                {
                  title: 'Oliveflex',
                  url: 'https://oliveflex.digiflex.ai',
                  category: 'Enterprise Microservices Platform',
                  badge: 'Enterprise SaaS',
                  tech: 'React.js • Node.js • Express • MongoDB • Docker',
                  desc: 'Modular workflow automation and client CRM suite architected on scalable microservices with zero-latency communication.',
                },
                {
                  title: 'Assetzo',
                  url: 'https://assetzo.questdigiflex.ai',
                  category: 'Cloud Asset Management SaaS',
                  badge: 'Cloud SaaS',
                  tech: 'React.js • Express.js • REST APIs • MongoDB',
                  desc: 'Cloud asset management and equipment lifecycle tracking SaaS for enterprise inventory auditing and depreciation logging.',
                },
                {
                  title: 'Ekon',
                  url: 'https://ekonn.questdigiflex.ai',
                  category: 'Business Growth & Multi-Service SaaS',
                  badge: 'Live SaaS',
                  tech: 'React.js • Node.js • REST APIs • MongoDB',
                  desc: 'Scalable business acceleration platform built for unified service management, real-time client performance tracking, and analytics.',
                },
                {
                  title: 'Talkify',
                  url: 'https://talkify-git-main-rohanprajjapati-5449s-projects.vercel.app/login',
                  category: 'Real-Time Chat & WebRTC Video',
                  badge: 'WebSockets & WebRTC',
                  tech: 'React.js • Socket.IO • WebRTC • Cloudinary • JWT',
                  desc: 'Ultra-low-latency real-time chat platform with peer-to-peer WebRTC audio/video calls, private/group messaging, and media sharing.',
                },
                {
                  title: 'Gym SaaS',
                  url: 'https://gym-saas-git-main-rohanprajjapati-5449s-projects.vercel.app/',
                  category: 'Multi-Tenant Fitness Center SaaS',
                  badge: 'Multi-Tenant Platform',
                  tech: 'React.js • Node.js • Redux Toolkit • MongoDB • Docker',
                  desc: 'Multi-tenant fitness management platform with role-based access for Super Admin, Owner, Manager, and Trainer with automated billing.',
                },
                {
                  title: 'Quick Seva',
                  url: 'https://quick-seva-git-main-rohanprajjapati-5449s-projects.vercel.app/',
                  category: 'On-Demand Home Services Platform',
                  badge: 'Marketplace SaaS',
                  tech: 'React.js • Node.js • Express • Razorpay • Nodemailer',
                  desc: 'Hyperlocal home services marketplace connecting customers with verified trade technicians, with Razorpay payments and live service booking.',
                  developer: 'Rohan Prajapati (Lead Full-Stack Web Developer)',
                },
                {
                  title: 'AI-Based Hiring Prediction System',
                  url: 'https://github.com/Rustam-Rathore',
                  category: 'HR Automation & Machine Learning',
                  badge: 'AI & Machine Learning',
                  tech: 'Python • Scikit-learn • TF-IDF • Random Forest • Pandas',
                  desc: 'End-to-end predictive machine learning pipeline transforming candidate resumes into feature vectors, automating recruitment screening with real-time accuracy.',
                  developer: 'Rustam Rathore (AI/ML Engineer)',
                },
                {
                  title: 'Wine Quality Prediction Pipeline',
                  url: 'https://github.com/Rustam-Rathore',
                  category: 'Supervised ML Analytics',
                  badge: 'Supervised ML',
                  tech: 'Python • Scikit-learn • Feature Engineering • Hyperparameter Tuning',
                  desc: 'Supervised classification pipeline utilizing machine learning algorithms, cross-validation, and confusion matrix precision evaluation for automated quality prediction.',
                  developer: 'Rustam Rathore (AI/ML Engineer)',
                }
              ].map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 hover:border-sky-400/60 shadow-lg transition-all duration-300 card-lift flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-sky-300 bg-sky-950/80 border border-sky-500/30 px-2.5 py-1 rounded-md">
                        {proj.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">{proj.category}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                        <span>{proj.title}</span>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8]" />
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>

                    {proj.developer && (
                      <div className="text-[11px] font-semibold text-sky-300/90 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/60 inline-flex items-center gap-1.5">
                        <span>{proj.developer}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Architecture</span>
                      <div className="text-[11px] font-semibold text-slate-200">
                        {proj.tech}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-700/70 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live in Production
                    </span>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#00A3E0] hover:bg-[#008bc0] px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {/* Web Dev Panel Easy Cost CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-800 to-slate-900 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Fast 2-Day Delivery &bull; Pocket-Friendly</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Looking for the Best Quality Website at an Easy, Affordable Cost?</h4>
                <p className="text-xs text-slate-300 mt-1">Explore our full Website Builder & Development panel with transparent plans, 0.8s load speed, and direct developer access.</p>
              </div>
              <Link
                to="/services/web-development"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white text-xs font-bold transition-all shadow-md hover:scale-105"
              >
                <span>Explore Web Development Panel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Industry Solutions Banner */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <AnimatedContent
              distance={60}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              threshold={0.15}
            >
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-2xl space-y-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Tailored Industry Blueprints
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    Need a Custom Solution for Your Specific Sector?
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    We have specialized high-converting frameworks for Medical Clinics, Real Estate Developers, Industrial Manufacturing Exporters, and E-commerce brands.
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer whitespace-nowrap self-start lg:self-auto"
                >
                  <span>Get Sector Strategy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

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
                <source src="/services-hero-video.mp4" type="video/mp4" />
                <source src="/tezscale-hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer Info */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-left">
              <div>
                <div className="text-white font-bold text-sm">TEZSCALE — Full-Stack Growth Services</div>
                <div className="text-slate-400 text-xs mt-0.5">High-speed web platforms, Meta Ads scaling & local map dominance.</div>
              </div>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  setModalOpen(true);
                }}
                className="px-5 py-2 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white text-xs font-bold transition-all shadow-md shadow-[#00A3E0]/30 cursor-pointer"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;

