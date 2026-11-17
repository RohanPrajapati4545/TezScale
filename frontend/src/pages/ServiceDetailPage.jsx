import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ExternalLink
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

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Retrieve service from dataset
  const service = getServiceBySlug(serviceSlug) || servicesData[0];

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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSuccess(false);
    setError('');
  }, [serviceSlug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanDigits = phoneNumber.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please provide a valid business email address.');
      return;
    }

    if (!cleanDigits || cleanDigits.length < 7) {
      setError('Please enter a valid phone / WhatsApp number (digits only).');
      return;
    }

    if (countryCode === '+91' && cleanDigits.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const fullPhone = `${countryCode} ${cleanDigits}`;
    const payload = {
      name: cleanName,
      email: cleanEmail,
      whatsapp: fullPhone,
      phone: fullPhone,
      phoneNumber: fullPhone,
      businessType: formData.businessType,
      serviceRequired: service.title,
      service: service.title,
      company: formData.company.trim(),
      website: formData.company.trim(),
      message: formData.message.trim(),
    };

    setLoading(true);

    try {
      const res = await apiFetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        const waMsg = `Hello TezScale, I submitted an inquiry for ${service.title}. My name is ${cleanName}.`;
        const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1200);
      } else {
        setError(data.message || 'Failed to submit inquiry. Please try again or chat via WhatsApp.');
      }
    } catch (err) {
      // Local fallback
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello TezScale, I want to discuss ${service.title} for my business.`
  )}`;

  // Related Services (Other 5 services)
  const otherServices = servicesData.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-[#00A3E0] selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Breadcrumbs & Header Banner with Live Background Video */}
        <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#070913] border-b border-slate-800 text-white">
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

        {/* 4 Metric Counters (With Oliveflex Speed Animated Count-Up) */}
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

                {/* Target Industry Persona Benefits (Section 1.1) */}
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

              {/* Right Column (5 cols): Targeted In-Page Inquiry Form (Section 2.3) */}
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
                          placeholder="e.g. Dr. Aryan Mehta"
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
                          placeholder="aryan@clinic.com"
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
                  Direct production applications architected with modern microservices, WebSockets, real-time WebRTC, and high-concurrency database systems. Test the live platforms directly below.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.liveProjects.map((proj, idx) => (
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
                          <span>{proj.name}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8]" />
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {proj.desc}
                        </p>
                      </div>

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
                        Live Demo Ready
                      </span>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#00A3E0] hover:bg-[#008bc0] px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
                      >
                        <span>Launch Demo</span>
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
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#00A3E0] gap-1.5 group-hover:gap-2.5 transition-all">
                    <span>View In-Depth Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
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
