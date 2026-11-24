import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  BarChart3,
  MessageSquare,
  Stethoscope,
  Building2,
  Wrench,
  ShoppingBag,
  Code2,
  Palette,
  Megaphone,
  ShoppingCart,
  Share2,
  Infinity as InfinityIcon,
  Loader2,
  Lock,
  ExternalLink,
  Users,
  Github,
  Linkedin,
  Cpu
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import PhoneInput from '../Components/PhoneInput';
import AnimatedCounter from '../Components/AnimatedCounter';
import { servicesData, getServiceBySlug } from '../data/servicesData';
import apiFetch from '../api/apiClient';

const renderIcon = (name, className = "w-5 h-5") => {
  switch (name) {
    case 'Code2':
      return <Code2 className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'ShoppingCart':
      return <ShoppingCart className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'Infinity':
      return <InfinityIcon className={className} />;
    case 'Stethoscope':
      return <Stethoscope className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    default:
      return <Layers className={className} />;
  }
};

// Core Technical Team for Web Development Panel
const technicalTeam = [
  {
    name: 'Rohan Prajapati',
    role: 'Lead Full-Stack Web Developer',
    specialty: 'MERN Stack, Microservices SaaS & Real-Time WebRTC Architecture',
    badge: 'Lead Web Engineer',
    image: '/rohan-prajapati.jpg',
    imageClass: 'object-cover object-center',
    slug: 'rohan-prajapati',
    exp: '1+ Years in Microservices SaaS & Full-Stack Development',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'Socket.IO', 'WebRTC', 'REST APIs'],
    projectsCount: '7+ Live Production Platforms',
    github: 'https://github.com/RohanPrajapati4545',
    linkedin: 'https://linkedin.com/in/rohan-prajapati-517128206/',
    bio: 'Direct architect for enterprise-grade SaaS platforms and ultra-fast web architectures. Specializes in microservices backends, responsive React UIs, and real-time WebSockets with 98+ Google PageSpeed and sub-second latency.'
  },
  {
    name: 'Rustam Rathore',
    role: 'AI/ML Engineer',
    specialty: 'Python, Predictive Machine Learning Pipelines & Intelligent Web Systems',
    badge: 'AI/ML Architect',
    image: '/rustam-rathore.jpg',
    imageClass: 'object-cover object-center',
    slug: 'rustam-rathore',
    exp: 'Machine Learning, Deep Learning & Generative AI',
    skills: ['Python', 'PyTorch', 'Scikit-learn', 'LangChain', 'RAG Pipelines', 'OpenAI APIs', 'MySQL'],
    projectsCount: 'Machine Learning Pipelines',
    github: 'https://github.com/Rustam-Rathore',
    linkedin: 'https://linkedin.com/in/rustam-rathore-9637162a7/',
    bio: 'Integrates artificial intelligence, predictive machine learning models, and automated reasoning pipelines into modern web applications to provide smart features, automated customer routing, and data analytics.'
  }
];

// Easy Cost & Best Quality Website Plans
const easyCostPackages = [
  {
    name: 'Starter Launchpad',
    badge: 'Easy Cost • Pocket Friendly',
    tagline: 'Best for Doctors, Clinics, Local Businesses & Startups',
    subtitle: 'Transparent Pricing from ₹14,999 • GST Invoice Available • Zero Hidden Fees',
    delivery: '⚡ 2-Day Staging Delivery',
    popular: false,
    features: [
      'Opens in Under 1 Second Even on Mobile Data (Fast 1-Second Loading)',
      '100% Mobile-Friendly & responsive layout tested across all smartphones',
      '1-Click WhatsApp Chat Button for Instant Customer Inquiries',
      'Google SEO Ready with local business schema & instant Google indexing',
      'Contact & Patient/Client Inquiry Forms with direct WhatsApp alerts',
      'Interactive Google Maps embed & local business profile link',
      'Free SSL Certificate & 1-Year DNS Setup Assistance',
      '100% Full Code Ownership with zero vendor lock-in'
    ],
    cta: 'Get Starter Website'
  },
  {
    name: 'Business Growth Pro',
    badge: 'Most Popular • Maximum ROI',
    tagline: 'Best for B2B Firms, Real Estate & Established Brands',
    subtitle: 'Maximum Conversions per Rupee Spent with Advanced Conversion Architecture',
    delivery: '⚡ 3-4 Business Days Staging',
    popular: true,
    features: [
      'Everything in Starter Launchpad +',
      'Multi-Page Conversion Architecture with Tailored High-CTR Funnels',
      'Comprehensive On-Page Technical SEO & Rich Snippets Schema',
      'Dynamic Lead Capture Forms with Instant Email/WhatsApp Alerts',
      'Interactive Service Calculators & Custom UI Widgets',
      'Dynamic Video Hero Section with High-Resolution Visual Assets',
      'WhatsApp Business Automated Greeting & CRM Integration',
      'Dedicated Performance & Conversion Tracking Setup'
    ],
    cta: 'Launch Growth Website'
  },
  {
    name: 'Custom SaaS & Web App',
    badge: 'Enterprise Architecture',
    tagline: 'Best for Multi-Tenant Platforms, Portals & Tech Startups',
    subtitle: 'Enterprise Microservices & Cloud Scale at Startup-Friendly Development Rates',
    delivery: '⚡ Agile Milestone Roadmap',
    popular: false,
    features: [
      'Full Microservices Architecture (Node.js, Express, MongoDB, Docker)',
      'Enterprise Authentication (JWT, Refresh Tokens, Role-Based RBAC)',
      'Real-Time WebSockets / Socket.IO Push Notifications',
      'WebRTC Peer-to-Peer Audio / Video Streaming Capabilities',
      'Docker Containerization & High-Availability Cloud Staging',
      'Custom Admin Backoffice Panel with Analytics & Management',
      'Payment Gateway Integration (Razorpay / Stripe / Webhooks)',
      'RESTful API Documentation & Scalable Database Migrations'
    ],
    cta: 'Architect Custom Platform'
  }
];

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Retrieve service from dataset
  const service = getServiceBySlug(serviceSlug) || servicesData[0];

  // Laser-targeted SEO keyword configuration per service slug
  const seoConfig = {
    'web-development': {
      title: 'Fast Website Development in Indore | 2-Day Live Draft — TezScale',
      description: 'Fast website development in Indore with 2-day live staging & 5-6 day launch. 0.8s load speed, 98+ PageSpeed, mobile-first design, WhatsApp lead button & affordable packages.',
      keywords: 'fast website design agency in Indore, 2 day website development service India, high speed website developer in Indore, mobile first web design company in India, click to WhatsApp ads agency India, website development cost in Indore, business website design charges in India, affordable website development agency in Indore, small business website package with WhatsApp button India, website development company in Indore, low cost website maker Indore, website developer in Vijay Nagar Indore, website design company in Rau Indore, TezScale'
    },
    'social-media': {
      title: 'Social Media & Reels Marketing Agency in Indore — TezScale',
      description: 'Viral Instagram reels production & social media marketing agency in Indore. High-converting short-form video shooting, editing, content strategy & community growth.',
      keywords: 'social media marketing agency in Indore, Instagram reel ads for retail and D2C brands Indore, viral reels making Indore, Instagram growth agency in Vijay Nagar Indore, short video editing agency Indore, B2B marketing agency Indore, TezScale'
    },
    'digital-marketing': {
      title: 'Local SEO & Google Maps Top 3 Agency in Indore — TezScale',
      description: 'Dominate Google Maps Top 3 rankings in Indore. Local SEO, Google Business Profile optimization, transactional keyword ranking & organic lead generation.',
      keywords: 'SEO agency in Indore, best SEO company in Indore, local SEO services in Indore, Google Maps Top 3 ranking agency Indore, Google Business Profile optimization service Indore, Google Maps SEO expert in Indore, local business listing optimization Indore, local SEO monthly packages in India, best SEO agency in Madhya Pradesh, SEO company in Vijay Nagar Indore, Google My Business ranking cost in Indore, TezScale'
    },
    'meta-ads': {
      title: 'Meta Ads & WhatsApp Lead Generation Agency Indore — TezScale',
      description: 'High-ROAS Meta advertising agency in Indore. Facebook, Instagram & Click-to-WhatsApp lead funnels engineered for qualified B2B & local leads with measurable ROI.',
      keywords: 'Meta ads agency in Indore, Facebook and Instagram ads agency in Indore, click to WhatsApp ads agency India, WhatsApp lead generation funnel agency India, Instagram ads agency in Vijay Nagar Indore, Meta ads specialist in Indore, Meta ads management charges in India, Facebook lead generation package for small business India, performance marketing agency in Indore, TezScale'
    },
    'ecommerce': {
      title: 'E-Commerce Website Development & Scaling in Indore — TezScale',
      description: 'E-commerce website development & Shopify store scaling in Indore. 1-step checkout, UPI payment gateways, automated WhatsApp abandoned cart recovery & Meta Ads.',
      keywords: 'ecommerce website development company in Indore, Shopify store development agency in Indore, ecommerce website development cost in India, Shopify store setup charges in India, ecommerce marketing agency for D2C brands India, fast 1-step checkout ecommerce website India, UPI payment gateway integration website developer India, abandoned cart WhatsApp recovery setup India, TezScale'
    },
    'graphic-design': {
      title: 'Logo, Brand Kit & Ad Creative Design in Indore — TezScale',
      description: 'Professional graphic design & brand kit agency in Indore. High-converting ad creatives, 3D visual identities, logos, brochures & complete visual branding packages.',
      keywords: 'graphic design and branding agency in Indore, logo and brand kit designer in Indore, ad creatives designer, marketing brochures Indore, brand identity designer Vijay Nagar Indore, TezScale'
    }
  };

  const currentSEO = seoConfig[service.slug] || {
    title: `${service.title} | TezScale Services`,
    description: service.shortDesc || service.longDesc || 'TezScale high-performance digital services.',
    keywords: 'TezScale, digital services, Indore digital marketing, web development'
  };

  useSEO({
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    canonical: `/services/${service.slug}`
  });

  // Targeted Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: 'Doctor / Clinic',
    company: '',
    message: '',
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSuccess(false);
    setError('');
  }, [serviceSlug]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setError('Please provide a valid contact number.');
      setLoading(false);
      return;
    }

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: `${countryCode} ${cleanPhone}`,
      businessType: formData.businessType,
      company: formData.company || 'Not Specified',
      notes: `Service Inquiry: ${service.title}. Requirements: ${formData.message || 'No additional notes'}`,
      source: `Service Page: ${service.slug}`,
    };

    try {
      const res = await apiFetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        const waText = encodeURIComponent(
          `Hi TezScale, I just submitted an inquiry for "${service.title}". My name is ${formData.name} (${formData.businessType}). Looking forward to our growth consultation.`
        );
        setTimeout(() => {
          window.open(`https://wa.me/919876543210?text=${waText}`, '_blank');
        }, 1200);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Submission failed. Please reach us via WhatsApp directly.');
      }
    } catch (err) {
      setError('Network communication failed. Please contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi TezScale, I want to learn more about "${service.title}". Please share case studies and roadmap.`
  )}`;

  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-[#00A3E0] selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Service Hero Header with Live Background Video */}
        <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#070913] border-b border-slate-800 text-white">
          {/* Background Video: Shifted upwards with scale-120 for 100% full screen cover and perfect logo clearance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-contain md:object-cover portrait:object-contain landscape:object-cover object-center portrait:scale-100 landscape:scale-120 md:scale-120 portrait:-translate-y-6 sm:portrait:-translate-y-8 landscape:-translate-y-10 lg:landscape:-translate-y-16 portrait:[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] landscape:[mask-image:none] transition-opacity duration-700 ease-in-out ${
                contentVisible ? 'opacity-75 sm:opacity-80' : 'opacity-100'
              }`}
            >
              <source src="/page-hero-video.mp4" type="video/mp4" />
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10 w-full flex-1 flex flex-col justify-center">

            {/* Breadcrumb row: Fades smoothly with content */}
            <div className={`flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6 flex-wrap transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-sky-300 font-bold">{service.title}</span>
            </div>

            {/* Hero Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-8 space-y-5">
                {/* Content ABOVE the buttons: Smoothly hides when TEZSCALE appears, restores when video loops */}
                <div
                  className={`w-full flex flex-col items-start transition-all duration-700 ease-in-out transform ${
                    contentVisible
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide shadow-sm mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                    <span>{service.badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                    {service.heroHeadline}
                  </h1>

                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                    {service.longDesc}
                  </p>
                </div>

                {/* Dual Pill CTA Buttons: PERMANENTLY VISIBLE */}
                <div className="flex flex-wrap items-center gap-4 pt-3 relative z-20 mt-3 sm:mt-5">
                  <a
                    href="#service-lead-form"
                    className="px-7 py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00A3E0]/30 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                  >
                    <span>REQUEST STRATEGY BRIEF</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm shadow-sm backdrop-blur-md transition-all duration-300 flex items-center gap-2 cursor-pointer hover:border-emerald-400"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>CHAT ON WHATSAPP</span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </a>
                </div>
              </div>

              {/* Service Icon Box / Visual Summary */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-8 shadow-2xl relative overflow-hidden text-center space-y-4">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00A3E0] via-cyan-400 to-blue-500" />
                  <div className="w-16 h-16 rounded-2xl bg-white/10 text-sky-300 flex items-center justify-center mx-auto shadow-md border border-white/10">
                    {renderIcon(service.iconName, "w-8 h-8")}
                  </div>
                  <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {service.title}
                  </h3>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-medium text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Production Specification Verified</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4 Metric Counters (With Speed Animated Count-Up) */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              {service.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-[#00A3E0]/40 transition-all duration-300 shadow-2xs"
                >
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    <AnimatedCounter value={m.value} duration={1300} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Deliverables & Section 3.1 Targeted Form Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

              {/* Left Column (7 cols): What is Included & Target Personas */}
              <div className="lg:col-span-7 space-y-10">

                {/* Deliverables List */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e0f4ff] text-[#007ba8] text-xs font-bold uppercase tracking-wider">
                    Full Scope Breakdown
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    What is Included in {service.title}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Every deployment is engineered with extreme attention to detail, high security, and mobile-first optimization.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
                    {service.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:border-[#00A3E0]/40 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00A3E0] flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Industry Persona Benefits */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    Industry Specialization
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Tailored for Your Exact Business Vertical
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {service.personaUseCases.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#e0f4ff] text-[#00A3E0] flex items-center justify-center font-bold mb-3">
                          {renderIcon(p.icon, "w-5 h-5")}
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm mb-1">{p.persona}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{p.benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Step Process Roadmap */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
                    Execution Framework
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    How We Deliver {service.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {service.process.map((step) => (
                      <div
                        key={step.step}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <span className="text-xs font-extrabold text-[#00A3E0] bg-[#e0f4ff] px-2.5 py-1 rounded-md">
                            STEP {step.step}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm mt-2">{step.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tools & Technologies Employed
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Targeted In-Page Inquiry Form */}
              <div className="lg:col-span-5" id="service-lead-form">
                <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00A3E0] to-[#0284c7]" />

                  {success ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">Inquiry Received!</h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Thank you! We have recorded your request for <strong>{service.title}</strong>. Redirecting you to WhatsApp for immediate connectivity...
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="px-6 py-2.5 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white text-xs font-bold cursor-pointer transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00A3E0] bg-[#e0f4ff] px-2.5 py-1 rounded-md mb-2">
                          <Lock className="w-3 h-3 text-emerald-500" />
                          <span>Direct Specialist Routing</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          Request Strategy Brief
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Inquiry pre-configured for: <strong className="text-slate-800">{service.title}</strong>
                        </p>
                      </div>

                      {error && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold">
                          {error}
                        </div>
                      )}

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rohan Prajapati"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                        />
                      </div>

                      {/* WhatsApp Phone Input with Country Code */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          WhatsApp Number * <span className="text-[10px] text-slate-400 font-normal">(Digits only)</span>
                        </label>
                        <PhoneInput
                          countryCode={countryCode}
                          setCountryCode={setCountryCode}
                          phoneNumber={phoneNumber}
                          setPhoneNumber={setPhoneNumber}
                          placeholder="98765 43210"
                          id="service-phone-input"
                        />
                      </div>

                      {/* Business Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="rohan@business.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                        />
                      </div>

                      {/* Business Type Dropdown */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Your Business Type *
                        </label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                        >
                          <option value="Doctor / Clinic">Doctor / Clinic</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Engineering">Engineering & Manufacturing</option>
                          <option value="Retail / E-commerce">Retail / E-commerce</option>
                          <option value="Other">Other Enterprise</option>
                        </select>
                      </div>

                      {/* Company or Website */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Company / Website
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="www.mybusiness.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                        />
                      </div>

                      {/* Project Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Brief Requirements <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          rows="2"
                          name="message"
                          maxLength={500}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your objectives, current traffic, or challenges..."
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#00A3E0] focus:border-[#00A3E0] focus:outline-none transition-all"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00A3E0]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Routing Your Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Strategy Consultation</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="text-[11px] text-center text-slate-400 pt-1">
                        100% Confidential • Fast response within 2 hours
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Dedicated Core Technical Engineering Team Section (Featured on Web Development Panel) */}
        {service.slug === 'web-development' && (
          <section className="py-20 bg-slate-50 border-t border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>TezScale Core Technical Architects</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Meet the Lead Web & AI Engineering Team
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Work directly with our senior engineering specialists — eliminating agency middleman markups so you get <strong>the highest quality, blazing-speed website at the most affordable, easy cost</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {technicalTeam.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Member Header: Image + Name & Role */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 border-2 border-sky-400/40 shrink-0 shadow-md">
                          <img
                            src={member.image}
                            alt={`${member.name} - ${member.role} at TezScale`}
                            loading="lazy"
                            className={`w-full h-full ${member.imageClass || 'object-cover object-center'} group-hover:scale-105 transition-transform duration-500`}
                          />
                          <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-slate-900/85 backdrop-blur-md px-2 py-0.5 rounded-md">
                            {member.badge}
                          </span>
                        </div>

                        <div className="space-y-2 text-center sm:text-left flex-1">
                          <span className="inline-block text-[11px] font-extrabold text-[#00A3E0] uppercase tracking-wider bg-[#e0f4ff] px-2.5 py-1 rounded-md">
                            {member.exp}
                          </span>
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#00A3E0] transition-colors">
                            {member.name}
                          </h3>
                          <div className="text-xs font-bold text-slate-600">{member.role}</div>
                          <div className="text-xs text-sky-600 font-semibold">{member.specialty}</div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {member.bio}
                      </p>

                      {/* Key Skills Pills */}
                      <div className="mb-6">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Core Technical Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      {/* Social Links (Only GitHub & LinkedIn) */}
                      <div className="flex items-center gap-2">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-[#0077b5] hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* View Profile Link */}
                      <Link
                        to={`/team/${member.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A3E0] hover:text-[#008bc0] transition-colors group-hover:gap-2"
                      >
                        <span>View Full Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dedicated Easy Cost & Best Quality Website Plans (Featured on Web Development Panel) */}
        {service.slug === 'web-development' && (
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Best Quality • Easy & Affordable Cost</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  High-Performance Websites at Pocket-Friendly Costs
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Why pay bloated agency fees for slow, outdated templates? Get direct engineering from our technical team with <strong>2-day staging delivery, 98+ Google PageSpeed, and transparent pricing with zero hidden fees</strong>.
                </p>
              </div>

              {/* 3 Package Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
                {easyCostPackages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                      pkg.popular
                        ? 'bg-slate-900 text-white shadow-2xl border-2 border-sky-400 scale-[1.02]'
                        : 'bg-slate-50 text-slate-800 border border-slate-200 shadow-sm hover:shadow-lg'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-[#00A3E0] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                        Most Popular Choice
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3 ${
                          pkg.popular ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' : 'bg-blue-100 text-[#00A3E0]'
                        }`}>
                          {pkg.badge}
                        </span>
                        <h3 className={`text-2xl font-black ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>
                          {pkg.name}
                        </h3>
                        <div className={`text-xs font-bold mt-1 ${pkg.popular ? 'text-sky-300' : 'text-[#00A3E0]'}`}>
                          {pkg.tagline}
                        </div>
                        <p className={`text-xs mt-3 leading-relaxed ${pkg.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                          {pkg.subtitle}
                        </p>
                      </div>

                      <div className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-between ${
                        pkg.popular ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'bg-white text-emerald-600 border border-slate-200'
                      }`}>
                        <span>Fast Turnaround:</span>
                        <span className="font-extrabold">{pkg.delivery}</span>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 pt-2">
                        <div className={`text-[11px] font-extrabold uppercase tracking-wider ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                          Included Architecture & Scope
                        </div>
                        <ul className="space-y-2.5">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs leading-snug">
                              <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-sky-400' : 'text-[#00A3E0]'}`} />
                              <span className={pkg.popular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-slate-200/30">
                      <a
                        href="#service-lead-form"
                        className={`w-full py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                          pkg.popular
                            ? 'bg-[#00A3E0] hover:bg-[#008bc0] text-white hover:scale-102'
                            : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-102'
                        }`}
                      >
                        <span>{pkg.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Value Props: Why TezScale Gives the Best Website at Lowest Cost */}
              <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50/60 rounded-3xl border border-sky-200/80 p-8 shadow-xs">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Why TezScale Gives You The Best Website at The Lowest Cost
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Direct developer access, modern single-page frameworks, and lean execution.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">2-Day Staging Delivery</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Review a live working prototype in 48 hours. No endless agency delays.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Zero Agency Retainers</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      You own 100% of your code and domain with transparent, one-time investment.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">0.8s Ultra-Fast Speed</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      98+ PageSpeed guarantees higher SEO ranking and lowers paid ad bounce rates.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-3">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">WhatsApp Lead Routing</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Direct WhatsApp triggers connect buyer inquiries into your phone in &lt; 2 minutes.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* Featured Live SaaS Platforms & Production Web Applications */}
        {service.liveProjects && service.liveProjects.length > 0 && (
          <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Real-World Proof of Concept</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Featured Live SaaS Platforms & Web Applications
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Real-world microservices, multi-tenant SaaS applications, and machine learning systems architected by our core technical team (<strong>Rohan Prajapati & Rustam Rathore</strong>). Click any platform to test the live demo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.liveProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 hover:border-sky-400/60 shadow-lg transition-all duration-300 card-lift flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-sky-300 bg-sky-950/80 border border-sky-500/30 px-2.5 py-1 rounded-md">
                          {proj.badge}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">{proj.category}</span>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                          <span>{proj.name}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8]" />
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {proj.desc}
                        </p>
                      </div>

                      {/* Developer Attribution Tag */}
                      {proj.developer && (
                        <div className="text-[11px] font-semibold text-sky-300/90 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/60 inline-flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-[#00A3E0]" />
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
                        {proj.url && proj.url.startsWith('http') && !proj.url.includes('github') ? 'Live Demo Ready' : 'Architecture Verified'}
                      </span>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#00A3E0] hover:bg-[#008bc0] px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
                      >
                        <span>{proj.url && proj.url.includes('github') ? 'View Architecture' : 'Launch Demo'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Explore Other Services Section */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider">
                  Full Service Catalog
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Explore Other Core Growth Pillars
                </h3>
              </div>
              <Link
                to="/services"
                className="text-xs font-bold text-[#00A3E0] hover:text-[#008bc0] flex items-center gap-1.5 transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.slug}`}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#00A3E0]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#e0f4ff] text-[#00A3E0] flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                      {renderIcon(item.iconName, "w-5 h-5")}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {item.category}
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#00A3E0] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A3E0] group-hover:gap-2 transition-all">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Accelerate With {service.title}?
            </h2>
            <p className="text-blue-100 text-base max-w-xl mx-auto">
              Schedule your free 30-minute growth strategy consultation with our senior digital growth architects today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-slate-100 px-8 py-3.5 rounded-full font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all hover:border-emerald-400"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ServiceDetailPage;
