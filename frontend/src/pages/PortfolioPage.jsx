import React, { useState, useRef, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import AnimatedCounter from '../Components/AnimatedCounter';
import AnimatedContent from '../Components/AnimatedContent';
import {
  BarChart3,
  Users,
  Clock,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Building2,
  Stethoscope,
  ShoppingCart,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const portfolioItems = [
  {
    id: 1,
    title: 'Clinic SEO & Patient Booking Engine',
    subtitle: 'Dental & Multi-Specialty Clinics',
    category: 'healthcare',
    categoryName: 'Medical & Clinics',
    metric: '+220% Traffic',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    description: 'Local Google 3-Pack Maps optimization, healthcare schema integration, and an automated WhatsApp appointment booking bot that curtailed patient drop-offs by 65%.',
    results: [
      '#1 Google Maps rank for 14 high-intent local medical keywords',
      '220% increase in verified patient consultation bookings',
      'Zero lead leakage through direct WhatsApp routing',
    ],
  },
  {
    id: 2,
    title: 'High-Intent Real Estate Buyer Funnel',
    subtitle: 'Luxury Property Brokers & Developers',
    category: 'realestate',
    categoryName: 'Real Estate',
    metric: '+180% Leads',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Laser-focused Meta Ads targeting High Net Worth property buyers combined with ultra-fast virtual showcase landing pages with < 2 minute WhatsApp CRM notifications.',
    results: [
      '₹4.2 Cr in booked property transactions within 90 days',
      '34% reduction in cost per qualified buyer inquiry (CPA)',
      'Sub-2-minute sales team response time via automated alerts',
    ],
  },
  {
    id: 3,
    title: 'Direct-to-Consumer E-Commerce Scaling',
    subtitle: 'Fashion & Lifestyle Retail Brand',
    category: 'ecommerce',
    categoryName: 'E-Commerce',
    metric: '+300% Sales',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Complete Shopify conversion overhaul with 1-click checkout, automated WhatsApp abandoned cart recovery, and high-CTR Meta dynamic catalog ads.',
    results: [
      '3.9x average Return On Ad Spend (ROAS)',
      '42% recovery rate on abandoned shopping carts',
      '300% increase in total online monthly sales volume',
    ],
  },
  {
    id: 4,
    title: 'Industrial Manufacturing B2B Portal',
    subtitle: 'Precision Engineering & Export Firm',
    category: 'engineering',
    categoryName: 'Engineering B2B',
    metric: '+150% RFQs',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Global industrial branding, structured technical product specification sheets, and international B2B buyer lead funnels generating direct Request For Quotes.',
    results: [
      '150% surge in qualified international distributor RFQs',
      'Modern bilingual technical specification catalog',
      'Secured major export supply agreements in UAE and Europe',
    ],
  },
  {
    id: 5,
    title: 'B2B SaaS Inbound Pipeline Engine',
    subtitle: 'Enterprise Workflow Automation Software',
    category: 'saas',
    categoryName: 'SaaS & Tech',
    metric: '+350% Demos',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'High-converting interactive software demo landing page coupled with targeted Google Search & LinkedIn ads targeting enterprise CTOs and operations heads.',
    results: [
      '350% increase in scheduled live product demonstrations',
      '48% decrease in customer acquisition cost (CAC)',
      'Closed 18 new mid-market enterprise annual contracts',
    ],
  },
  {
    id: 6,
    title: 'Restaurant & Hospitality Brand Rejuvenation',
    subtitle: 'Premium Dining & Cloud Kitchen Chain',
    category: 'ecommerce',
    categoryName: 'Hospitality',
    metric: '+400% Bookings',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Hyper-local food influencer activations, mouth-watering social Reels, and direct WhatsApp table reservation integrations.',
    results: [
      'Over 2.5 Million organic local impressions on Instagram',
      '400% surge in weekend table reservations',
      'Built a loyal VIP customer WhatsApp broadcast database',
    ],
  },
  {
    id: 7,
    title: 'Modern Corporate Identity & Brand Kit',
    subtitle: 'B2B Tech & Enterprise Consulting',
    category: 'design',
    categoryName: 'Graphic Design & Brand Kit',
    metric: 'Full Brand Suite',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    description: 'End-to-end visual identity architecture featuring vector logo typography, iconography suite, high-resolution stationery, and comprehensive design tokens.',
    results: [
      'Complete brand guideline documentation & asset kit',
      'Vector logo system with light/dark adaptive variations',
      '100% brand consistency across web, social, and print',
    ],
  },
  {
    id: 8,
    title: 'High-Converting Ad Creatives & Social Suite',
    subtitle: 'Retail & Multi-Channel E-Commerce',
    category: 'design',
    categoryName: 'Ad Creatives & Social Assets',
    metric: '+3.2x Click-Through',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'High-CTR social media ad graphics, carousel layouts, story promotional assets, and dynamic product catalog banners engineered for Meta & Google campaigns.',
    results: [
      '3.2x boost in advertising click-through rate (CTR)',
      'Over 40+ customized banner variations for split testing',
      'Pixel-perfect assets optimized for mobile feed algorithms',
    ],
  },
  {
    id: 9,
    title: 'Technical Product Brochures & Catalogs',
    subtitle: 'Precision Engineering & OEM Exporters',
    category: 'design',
    categoryName: 'Brochures & Catalogs',
    metric: 'Global B2B Catalog',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    description: 'High-authority technical product brochures, structured engineering specification catalogs, and corporate pitch decks crafted for global RFP submissions.',
    results: [
      '24-page full color print-ready and digital interactive PDF',
      'Structured technical specification comparison tables',
      'Accelerated international deal closures with UAE and EU buyers',
    ],
  },
  {
    id: 101,
    title: 'Ayurflex — Clinical Practice & Healthcare SaaS',
    subtitle: 'Healthcare SaaS & Clinic Automation',
    category: 'saas',
    categoryName: 'Healthcare SaaS',
    metric: 'Production SaaS',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    description: 'Microservices-based healthcare SaaS platform built for Ayurveda doctors with patient appointments, digital medical records, prescription generation, and automated clinic billing.',
    liveUrl: 'https://ayurflex.digiflex.ai',
    results: [
      'Microservices architecture built on React.js, Node.js, and MongoDB',
      'Docker containerized deployment with high availability',
      'Automated patient appointment booking and WhatsApp reminders',
    ],
  },
  {
    id: 102,
    title: 'Oliveflex — Enterprise Workflow Automation Suite',
    subtitle: 'Enterprise Microservices Platform',
    category: 'saas',
    categoryName: 'Enterprise SaaS',
    metric: 'Enterprise Suite',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Modular enterprise workflow automation, client CRM, and high-concurrency microservices platform managing service communication and scalable operations.',
    liveUrl: 'https://oliveflex.digiflex.ai',
    results: [
      'Modular microservices architecture with asynchronous queues',
      'Integrated client and vendor management dashboards',
      'Role-based permissions and high-throughput REST APIs',
    ],
  },
  {
    id: 103,
    title: 'Assetzo — Cloud Asset Management SaaS',
    subtitle: 'Enterprise Asset & Equipment Tracking',
    category: 'saas',
    categoryName: 'Cloud SaaS',
    metric: 'Live SaaS',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    description: 'Cloud asset management and lifecycle tracking SaaS platform providing complete asset tracking, depreciation audits, maintenance schedules, and equipment logs.',
    liveUrl: 'https://assetzo.questdigiflex.ai',
    results: [
      'End-to-end asset lifecycle and depreciation audit trail',
      'Interactive QR/barcode tracking and maintenance logging',
      'Role-based multi-department equipment management',
    ],
  },
  {
    id: 104,
    title: 'Ekon — Multi-Service Business Intelligence',
    subtitle: 'Digital Business Acceleration Platform',
    category: 'saas',
    categoryName: 'Business SaaS',
    metric: 'Live SaaS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Scalable business acceleration platform built for unified service management, real-time client performance tracking, and actionable revenue intelligence.',
    liveUrl: 'https://ekonn.questdigiflex.ai',
    results: [
      'Unified multi-service dashboard for business performance',
      'Real-time metrics tracking and custom client reporting',
      'High-performance React and Node.js REST API architecture',
    ],
  },
  {
    id: 105,
    title: 'Talkify — Real-Time Chat & WebRTC Video',
    subtitle: 'Real-Time Communication Platform',
    category: 'saas',
    categoryName: 'Real-Time App',
    metric: 'WebSockets & WebRTC',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80',
    description: 'Full-duplex real-time communication platform featuring peer-to-peer WebRTC audio/video calls, private & group messaging, invite codes, online status, and media uploads.',
    liveUrl: 'https://talkify-git-main-rohanprajjapati-5449s-projects.vercel.app/login',
    results: [
      'Peer-to-peer WebRTC high-definition voice and video calls',
      'Sub-50ms Socket.IO WebSocket private and group messaging',
      'Encrypted JWT authentication and Cloudinary media processing',
    ],
  },
  {
    id: 106,
    title: 'Gym SaaS — Multi-Tenant Fitness Management',
    subtitle: 'Multi-Tenant SaaS Platform',
    category: 'saas',
    categoryName: 'Multi-Tenant SaaS',
    metric: 'Multi-Tenant',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-tenant fitness management platform with role-based access for Super Admin, Owner, Manager, and Trainer with automated billing and member tracking.',
    liveUrl: 'https://gym-saas-git-main-rohanprajjapati-5449s-projects.vercel.app/',
    results: [
      'Multi-tenant database isolation using tenantId and branchId',
      'Automated membership plans, payment tracking, and invoicing',
      'Docker containerized backend services for high scalability',
    ],
  },
  {
    id: 107,
    title: 'Quick Seva — On-Demand Home Services Platform',
    subtitle: 'Hyperlocal Services Marketplace',
    category: 'saas',
    categoryName: 'Marketplace App',
    metric: 'Payments Ready',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Hyperlocal home services marketplace connecting customers with verified trade technicians, with Razorpay payments and live service booking.',
    liveUrl: 'https://quick-seva-git-main-rohanprajjapati-5449s-projects.vercel.app/',
    results: [
      'Customer, vendor, and admin modules with service workflows',
      'Seamless Razorpay payment gateway integration',
      'Automated Nodemailer email notifications and real-time updates',
    ],
  },
];

const PortfolioPage = () => {
  useSEO({
    title: 'Client Results & Live Case Studies | TezScale',
    description: 'Explore verified growth case studies, production SaaS platforms, and revenue scaling results delivered by TezScale.',
    canonical: '/portfolio'
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [contentVisible, setContentVisible] = useState(true);
  const videoRef = useRef(null);
  const { content } = useContent();
  const metrics = content?.metrics || {};

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

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === filter);

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
              key={content?.media?.portfolioHeroVideo || "/page-hero-video.mp4"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-contain md:object-cover portrait:object-contain landscape:object-cover object-center portrait:scale-100 landscape:scale-120 md:scale-120 portrait:-translate-y-6 sm:portrait:-translate-y-8 landscape:-translate-y-10 lg:landscape:-translate-y-16 portrait:[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] landscape:[mask-image:none] transition-opacity duration-700 ease-in-out ${
                contentVisible ? 'opacity-75 sm:opacity-80' : 'opacity-100'
              }`}
            >
              <source src={content?.media?.portfolioHeroVideo || "/page-hero-video.mp4"} type="video/mp4" />
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
            {/* All Hero Content: Eyebrow, Title, Description, AND 3 Metric Counters smoothly hide together when TEZSCALE appears */}
            <div
              className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out transform ${
                contentVisible
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide shadow-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                <span>Proven Client Impact & Case Studies</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4">
                Real Results for <span className="text-[#00A3E0]">Real Businesses</span>
              </h1>

              <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal mb-8 sm:mb-10">
                Explore how we helped healthcare clinics, property developers, manufacturers, and direct-to-consumer brands unlock predictable growth.
              </p>

              {/* 3 Metric Counters: Smoothly fades out with content */}
              <div className="w-full max-w-3xl mx-auto">
                <AnimatedContent
                  distance={50}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  stagger={0.1}
                  threshold={0.15}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex items-center gap-4.5 shadow-2xs hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 text-[#38bdf8] flex items-center justify-center font-bold shrink-0">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-[34px] font-black text-white leading-tight">
                        <AnimatedCounter value={metrics.stat1Value || '250%'} duration={1400} />
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                        {metrics.stat1Label || 'AVERAGE GROWTH'}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex items-center gap-4.5 shadow-2xs hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-[34px] font-black text-white leading-tight">
                        <AnimatedCounter value={metrics.stat2Value || '500+'} duration={1500} />
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                        {metrics.stat2Label || 'HAPPY CLIENTS'}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left flex items-center gap-4.5 shadow-2xs hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-[34px] font-black text-white leading-tight">
                        <AnimatedCounter value={metrics.stat3Value || '5+'} duration={1200} />
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                        {metrics.stat3Label || 'YEARS EXPERIENCE'}
                      </div>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar & Case Studies */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
              {[
                { id: 'all', label: 'All Case Studies' },
                { id: 'design', label: 'Graphic Design & Brand Kits' },
                { id: 'healthcare', label: 'Medical & Clinics' },
                { id: 'realestate', label: 'Real Estate' },
                { id: 'ecommerce', label: 'E-Commerce' },
                { id: 'engineering', label: 'Engineering B2B' },
                { id: 'saas', label: 'SaaS & Web Platforms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <AnimatedContent
              distance={80}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              stagger={0.12}
              threshold={0.12}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((study) => (
                <div
                  key={study.id}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm card-lift flex flex-col text-left group"
                >
                  {/* Image with overlay badge */}
                  <div className="h-56 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm">
                      {study.categoryName}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-md">
                      {study.metric}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {study.subtitle}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {study.description}
                      </p>
                    </div>

                    {/* Results bullet list */}
                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-900">Key Highlights:</div>
                      {study.results.map((res, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA link */}
                    <div className="pt-3 flex items-center gap-2">
                      {study.liveUrl ? (
                        <>
                          <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.02]"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => setModalOpen(true)}
                            className="py-2.5 px-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            title="Replicate These Results"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setModalOpen(true)}
                          className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Replicate These Results</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </AnimatedContent>

          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Get an audited growth roadmap tailored specifically for your target customer demographic.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PortfolioPage;

