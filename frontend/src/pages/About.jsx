import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import AnimatedCounter from '../Components/AnimatedCounter';
import AnimatedContent from '../Components/AnimatedContent';
import {
  ShieldCheck,
  Target,
  Zap,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles,
  Search,
  Layers,
  Rocket,
  ExternalLink,
  Globe,
  Github,
  Linkedin,
  MessageSquare,
  Mail,
  Code2
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { resolveMediaUrl } from '../api/apiClient';

const steps = [
  {
    step: '01',
    icon: <Search className="w-5 h-5" />,
    title: 'Discovery & Deep Audit',
    desc: 'We analyze your existing website, competitor benchmarks, conversion barriers, and local search opportunities.',
  },
  {
    step: '02',
    icon: <Layers className="w-5 h-5" />,
    title: 'Custom Architecture',
    desc: 'Crafting tailored ad creative sets, responsive high-speed landing funnels, and precision keyword targeting.',
  },
  {
    step: '03',
    icon: <Rocket className="w-5 h-5" />,
    title: 'Agile Launch & Staging',
    desc: 'Per our accelerated roadmap, review a working draft in 2 days and go live with DNS setup within 5-6 business days.',
  },
  {
    step: '04',
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Scale & Multiply ROI',
    desc: 'Automated WhatsApp routing delivers leads in < 2 mins while we continuously optimize CAC and ROAS.',
  },
];

const pillars = [
  {
    title: 'Result-Driven Strategies',
    desc: 'We don’t settle for vanity clicks. Every campaign is laser-focused on qualified lead generation and tangible revenue.',
    icon: <Target className="w-6 h-6 text-blue-600" />,
  },
  {
    title: '24/7 Support & Monitoring',
    desc: 'Continuous uptime monitoring, instant WhatsApp support, and regular technical health checks for your digital assets.',
    icon: <Zap className="w-6 h-6 text-amber-500" />,
  },
  {
    title: 'Expert Multi-Disciplinary Team',
    desc: 'Full-stack developers, Google/Meta certified media buyers, and UI/UX designers collaborating under one roof.',
    icon: <Users className="w-6 h-6 text-emerald-600" />,
  },
  {
    title: 'Transparent Reporting',
    desc: 'No vague spreadsheets. Clear, real-time dashboards showing exactly how much you invested and what it produced.',
    icon: <Award className="w-6 h-6 text-indigo-600" />,
  },
];

const growthArchitects = [
  {
    slug: 'rohan-prajapati',
    name: 'Rohan Prajapati',
    role: 'Lead Full-Stack Web Developer',
    badge: 'Full-Stack Developer',
    service: 'web-development',
    serviceName: 'Website Builder & Development',
    location: 'Indore, India',
    experience: '1+ Years in Microservices SaaS & Full-Stack Development',
    image: '/rohan-prajapati.jpg',
    imageClass: 'object-cover object-center',
    bio: 'MERN Stack Developer with extensive expertise building microservices-based SaaS platforms (React.js, Node.js, Express.js, MongoDB, Docker, Socket.IO, WebRTC). Leading digital engineering at TezScale.',
    whatsapp: 'https://wa.me/916262778128?text=Hi%20Rohan,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
    email: 'rohanprajapati4545@gmail.com',
    social: {
      github: 'https://github.com/RohanPrajapati4545',
      linkedin: 'https://linkedin.com/in/rohan-prajapati-517128206/',
      whatsapp: 'https://wa.me/916262778128?text=Hi%20Rohan,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
      email: 'rohanprajapati4545@gmail.com',
    },
  },
  {
    slug: 'shubham-karma',
    name: 'Shubham Karma',
    role: 'International Logistics & B2B Trade Specialist',
    badge: 'International Logistics',
    service: 'digital-marketing',
    serviceName: 'International Logistics & B2B Trade',
    location: 'Indore, Madhya Pradesh, India',
    experience: '3+ Years in International Logistics, Export Compliance & Supply Chain',
    image: '/shubham-karma.jpg',
    imageClass: 'object-cover object-center',
    bio: 'Results-driven international business and trade logistics specialist with proven track record in end-to-end global supply chains, customs compliance, and export documentation. Specialized in US freight logistics, duty tariff optimization, Athena ASN management, and accelerating international B2B trade pipelines.',
    whatsapp: 'https://wa.me/916262778128?text=Hi%20Shubham,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
    email: 'Shubhamvkarma143@gmail.com',
    social: {
      whatsapp: 'https://wa.me/916262778128?text=Hi%20Shubham,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
      email: 'Shubhamvkarma143@gmail.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    slug: 'rustam-rathore',
    name: 'Rustam Rathore',
    role: 'AI/ML Engineer',
    badge: 'AI & Machine Learning',
    service: 'web-development',
    serviceName: 'Website Builder & Development',
    location: 'LIG Square, Indore (M.P), India',
    experience: 'Machine Learning, Deep Learning & Generative AI',
    image: '/rustam-rathore.jpg',
    imageClass: 'object-cover object-center',
    bio: 'AI/ML specialist with deep expertise in Python, PyTorch, Scikit-learn, LangChain, and RAG pipelines. Architecting automated machine learning pipelines and generative AI solutions.',
    whatsapp: 'https://wa.me/916262778128?text=Hi%20Rustam,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
    email: 'rustamrathore@gmail.com',
    social: {
      github: 'https://github.com/Rustam-Rathore',
      linkedin: 'https://linkedin.com/in/rustam-rathore-9637162a7/',
      whatsapp: 'https://wa.me/916262778128?text=Hi%20Rustam,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
      email: 'rustamrathore@gmail.com',
    },
  },
];

const About = () => {
  useSEO({
    title: 'About Our Team & Growth Architects | TezScale',
    description: 'Meet the multidisciplinary leadership team behind TezScale combining full-stack engineering discipline, creative branding, and algorithmic media buying.',
    canonical: '/about'
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [selectedService, setSelectedService] = useState('all');
  const videoRef = useRef(null);
  const teamScrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef(null);
  const { content } = useContent();
  const whyUs = content?.whyChooseUs || {};

  const servicesList = [
    { id: 'all', label: 'All Growth Architects' },
    { id: 'web-development', label: 'Website Builder & Development' },
    { id: 'digital-marketing', label: 'Digital Marketing Support (SEO)' },
    { id: 'graphic-design', label: 'Graphic Design & Brand Kits' },
    { id: 'social-media', label: 'Social Media Strategy & Reels' },
    { id: 'meta-ads', label: 'Meta Ads Management (FB & IG)' },
    { id: 'video-editing', label: 'Video Editing & Content' },
  ];

  const teamSource = (content?.team && content.team.length > 0)
    ? content.team
    : (() => {
        try {
          const raw = localStorage.getItem('tezscale_custom_team');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          }
        } catch (e) {}
        return growthArchitects;
      })();

  const matchesService = (member, svcId) => {
    if (svcId === 'all') return true;
    if (member.service === svcId) return true;
    const badge = (member.badge || '').toLowerCase();
    const role = (member.role || '').toLowerCase();
    if (svcId === 'web-development' && (
      badge.includes('developer') || badge.includes('ai') || badge.includes('qa') || badge.includes('tester') || badge.includes('engineer') ||
      role.includes('developer') || role.includes('tester') || role.includes('engineer') || role.includes('ai')
    )) return true;
    if (svcId === 'digital-marketing' && (
      badge.includes('growth') || badge.includes('marketing') || badge.includes('seo') || badge.includes('logistics') ||
      role.includes('growth') || role.includes('marketing') || role.includes('seo') || role.includes('logistics')
    )) return true;
    if (svcId === 'graphic-design' && (badge.includes('design') || badge.includes('brand') || role.includes('design'))) return true;
    if (svcId === 'social-media' && (badge.includes('social') || badge.includes('reels') || role.includes('social'))) return true;
    if (svcId === 'meta-ads' && (badge.includes('ads') || badge.includes('meta') || role.includes('ads'))) return true;
    if (svcId === 'video-editing' && (badge.includes('video') || badge.includes('editor') || role.includes('video'))) return true;
    return false;
  };

  const filteredTeam = selectedService === 'all'
    ? teamSource
    : teamSource.filter((m) => matchesService(m, selectedService));

  const displayTeam = filteredTeam.length >= 3 ? [...filteredTeam, ...filteredTeam] : filteredTeam;

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

  // Smooth continuous right-to-left glide for Team Carousel with seamless wrap
  useEffect(() => {
    const el = teamScrollRef.current;
    if (!el) return;

    let reqId;
    const speed = 0.75; // Smooth continuous glide (pixels per frame)

    const step = () => {
      if (!isPaused && el) {
        const singleSetWidth = el.scrollWidth / 2;
        el.scrollLeft += speed;
        if (singleSetWidth > 0 && el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      reqId = requestAnimationFrame(step);
    };

    reqId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(reqId);
  }, [isPaused]);

  // Manual smooth scroll via left and right arrow buttons with temporary pause
  const scrollTeam = (direction) => {
    const el = teamScrollRef.current;
    if (!el) return;

    // Immediately pause auto-glide so it never cancels programmatic smooth scroll
    setIsPaused(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    const cardStep = 354; // card width (330px) + gap (24px)
    const singleSetWidth = el.scrollWidth / 2;

    if (direction === 'left') {
      if (el.scrollLeft <= 20 && singleSetWidth > 0) {
        el.scrollLeft += singleSetWidth;
      }
      el.scrollBy({ left: -cardStep, behavior: 'smooth' });
    } else {
      if (singleSetWidth > 0 && el.scrollLeft >= singleSetWidth) {
        el.scrollLeft -= singleSetWidth;
      }
      el.scrollBy({ left: cardStep, behavior: 'smooth' });
    }

    // Resume auto-glide after 4 seconds of inactivity
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

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
        {/* Hero Section with Live Background Video */}
        <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#070913] border-b border-slate-800 text-white">
          {/* Background Video: Shifted upwards with scale-120 for 100% full screen cover and perfect logo clearance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <video
              ref={videoRef}
              key={content?.media?.aboutHeroVideo || "/page-hero-video.mp4"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-contain md:object-cover portrait:object-contain landscape:object-cover object-center portrait:scale-100 landscape:scale-120 md:scale-120 portrait:-translate-y-6 sm:portrait:-translate-y-8 landscape:-translate-y-10 lg:landscape:-translate-y-16 portrait:[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] landscape:[mask-image:none] transition-opacity duration-700 ease-in-out ${
                contentVisible ? 'opacity-75 sm:opacity-80' : 'opacity-100'
              }`}
            >
              <source src={content?.media?.aboutHeroVideo || "/page-hero-video.mp4"} type="video/mp4" />
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

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            {/* Upper Content: Fades out smoothly when 3D TEZSCALE appears */}
            <div
              className={`space-y-4 transition-all duration-700 ease-in-out ${
                contentVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/30 text-sky-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>About TezScale</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Engineering Scalable Growth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300">
                  Through Technology & Performance
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We combine full-stack web engineering, algorithmic media buying, and end-to-end CRM integrations to transform growing businesses into dominant market leaders.
              </p>
            </div>

            {/* CTA Buttons: ALWAYS visible and interactive */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-20">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Send Project Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md transition-all hover:border-slate-600"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div
              className={`pt-10 transition-all duration-700 ease-in-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  duration={0.8}
                  ease="power3.out"
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      <AnimatedCounter from={0} to={200} duration={2} />+
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Growth Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-sky-400">
                      <AnimatedCounter from={0} to={4.2} duration={2} />x
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Average ROAS Multiplier</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-300">
                      &lt; <AnimatedCounter from={0} to={2} duration={1.5} /> min
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">WhatsApp Lead Delivery</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                      <AnimatedCounter from={0} to={98} duration={2} />%
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Client Retention Rate</div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Leadership & Core Architects (Placed directly below Hero Section) */}
        <section id="team" className="py-20 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/90 border-b border-slate-200/80 relative overflow-hidden">
          {/* Subtle ambient cyan glow behind track */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-200/30 blur-[130px] pointer-events-none rounded-full" />

          <AnimatedContent
            distance={80}
            direction="horizontal"
            duration={0.8}
            ease="power3.out"
            threshold={0.15}
          >
            {/* Header with Title and Left/Right Navigation Arrow Controls */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-10 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#00A3E0] border border-sky-200/80 text-xs font-bold tracking-wide mb-3 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Leadership & Vision</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Meet the Growth Architects
                </h2>
                <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-2xl leading-relaxed">
                  A multidisciplinary leadership team combining full-stack engineering discipline, creative branding, and algorithmic media buying.
                </p>
              </div>

              {/* Navigation Controls & Status Indicator */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
                <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200/80 px-3.5 py-2 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  Glide &bull; Hover to Pause
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollTeam('left'); }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-label="Previous Team Members"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#00A3E0] hover:text-white text-slate-700 border border-slate-200 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollTeam('right'); }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-label="Next Team Members"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#00A3E0] hover:text-white text-slate-700 border border-slate-200 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Service Department Filter Pills */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-wrap items-center gap-2 relative z-10">
              {servicesList.map((svc) => {
                const isSelected = selectedService === svc.id;
                const count = svc.id === 'all'
                  ? teamSource.length
                  : teamSource.filter((m) => matchesService(m, svc.id)).length;

                if (svc.id !== 'all' && count === 0) return null;

                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setSelectedService(svc.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#00A3E0] text-white shadow-md shadow-[#00A3E0]/25 scale-102'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{svc.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Carousel Track with Smooth Auto-Glide & Interactive Arrow Navigation */}
            <div className="relative w-full overflow-hidden group/carousel">
              {/* Left & Right Soft Edge Gradient Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10" />

              {/* Floating Left & Right Circular Arrow Buttons */}
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollTeam('left'); }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Scroll Left"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:bg-[#00A3E0] hover:text-white hover:border-[#00A3E0] shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollTeam('right'); }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label="Scroll Right"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:bg-[#00A3E0] hover:text-white hover:border-[#00A3E0] shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Smooth Scrolling Container */}
              <div
                ref={teamScrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                className="flex gap-6 py-4 px-4 sm:px-6 overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none"
              >
                {displayTeam.map((member, idx) => (
                  <div
                    key={`ga-card-${idx}`}
                    className="w-[290px] sm:w-[330px] shrink-0 bg-white rounded-3xl border border-slate-200/90 hover:border-sky-400/60 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Image Container with Proper Portrait Height & Framing */}
                      <Link to={`/team/${member.slug || member.id}`} className="block h-72 sm:h-80 w-full overflow-hidden bg-slate-100 relative cursor-pointer">
                        <img
                          src={resolveMediaUrl(member.image, 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg')}
                          alt={`${member.name} - ${member.role} at TezScale`}
                          loading="lazy"
                          className={`w-full h-full ${member.imageClass || 'object-cover object-center'} group-hover:scale-104 transition-transform duration-700 ease-out`}
                          onError={(e) => {
                            e.currentTarget.src = 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3.5 right-3.5 text-[11px] font-bold text-white bg-slate-900/85 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-md">
                          {member.badge}
                        </span>
                      </Link>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6 text-left">
                        <Link to={`/team/${member.slug || member.id}`} className="block group/title">
                          <h3 className="font-black text-slate-900 text-lg group-hover/title:text-[#00A3E0] transition-colors leading-snug">
                            {member.name}
                          </h3>
                        </Link>
                        <div className="text-xs font-bold text-[#00A3E0] mt-1 tracking-wide">{member.role}</div>
                        {member.serviceName && (
                          <div className="inline-block mt-1.5 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200/80">
                            {member.serviceName}
                          </div>
                        )}
                        <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed min-h-[48px]">
                          {member.bio}
                        </p>

                        {/* Social & Contact Icons Strip */}
                        <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-slate-100 min-h-[44px]">
                          {(member.whatsapp || member.social?.whatsapp) && (
                            <a
                              href={member.whatsapp || member.social?.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Chat on WhatsApp"
                              className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 flex items-center justify-center transition-colors shadow-2xs"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}
                          {(member.email || member.social?.email) && (
                            <a
                              href={`mailto:${member.email || member.social?.email}`}
                              aria-label="Send Email"
                              className="w-8 h-8 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-600 flex items-center justify-center transition-colors shadow-2xs"
                              title={`Email: ${member.email || member.social?.email}`}
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          {(member.github || member.social?.github) && (
                            <a
                              href={member.github || member.social?.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub Profile"
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-2xs"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {(member.linkedin || member.social?.linkedin) && (
                            <a
                              href={member.linkedin || member.social?.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn Profile"
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-[#0077b5] hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-2xs"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom CTA */}
                    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[11px] text-slate-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        TezScale Core
                      </span>
                      <Link
                        to={`/team/${member.slug}`}
                        className="text-[#00A3E0] hover:text-[#008bc0] font-bold text-xs cursor-pointer flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </section>

        {/* Agency Story & Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80"
                      alt="TezScale Boardroom Meeting"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">TezScale Certified</div>
                      <div className="text-[11px] text-slate-500">Enterprise Standard SLA</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                      alt="Modern Office"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                      alt="Team Collaboration"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Mission Text */}
              <div className="lg:col-span-6 text-left space-y-6">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
                  Our Purpose
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {whyUs.title || 'Your Growth, Our Mission'}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {whyUs.description ||
                    'We combine creativity, technology and data-driven strategies to deliver measurable results. From high-converting websites to precision Meta Ads and Local SEO, we engineer high-converting digital funnels that multiply your bottom line.'}
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Bespoke digital roadmaps tailored to your industry niche',
                    'Direct encrypted WhatsApp lead routing with zero response delay',
                    'Comprehensive Google Maps & local search dominance',
                    'Transparent ROAS, CAC, and conversion rate analytics',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-slate-700 font-semibold text-sm">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full text-sm font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-102 cursor-pointer"
                  >
                    <span>Send Project Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4-Step Progressive Journey */}
        <section className="py-20 bg-slate-50/70 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
                Our Methodology
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How We Accelerate Your Growth
              </h2>
              <p className="text-slate-600 text-base">
                A disciplined, 4-step framework designed to deliver working prototypes in 2 days and live scale in 5-6 business days.
              </p>
            </div>

            <AnimatedContent
              distance={70}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              stagger={0.12}
              threshold={0.12}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {steps.map((st) => (
                <div
                  key={st.step}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs card-lift flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                        {st.step}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        {st.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold text-blue-600 flex items-center gap-1">
                    <span>Phase Complete</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </section>

        {/* Core Values Pillars */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
                Core Principles
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Built on Trust, Performance & Speed
              </h2>
            </div>

            <AnimatedContent
              distance={70}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              stagger={0.12}
              threshold={0.12}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {pillars.map((pil, idx) => (
                <div key={idx} className="bg-slate-50/60 p-6 rounded-3xl border border-slate-200/80 card-lift">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs mb-4">
                    {pil.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{pil.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pil.desc}</p>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Accelerate Your Business Growth?
            </h2>
            <p className="text-blue-100 text-base max-w-xl mx-auto">
              Schedule your free 30-minute growth strategy session with our senior digital consultants today.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-slate-100 px-8 py-3.5 rounded-full font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              <span>Get a Free Strategy Consultation</span>
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

export default About;
