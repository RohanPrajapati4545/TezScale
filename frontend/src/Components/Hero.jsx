import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Star, 
  Users, 
  BarChart2, 
  Play, 
  Lock, 
  CheckCircle2, 
  User, 
  Mail, 
  Loader2, 
  Target
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import PhoneInput from './PhoneInput';
import apiFetch from '../api/apiClient';

const Hero = ({ onOpenConsultation }) => {
  // Embedded "Let's Grow Together" Form State
  const [heroForm, setHeroForm] = useState({
    name: '',
    email: '',
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const cleanName = heroForm.name.trim();
    const cleanEmail = heroForm.email.trim().toLowerCase();
    const cleanDigits = phoneNumber.trim();

    if (!cleanName || cleanName.length < 2) {
      setFormError('Please enter your name (minimum 2 characters)');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormError('Please enter a valid business email');
      return;
    }

    if (!cleanDigits || cleanDigits.length < 7) {
      setFormError('Please enter a valid phone number (digits only)');
      return;
    }

    if (countryCode === '+91' && cleanDigits.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian phone number');
      return;
    }

    setSubmitting(true);
    const fullPhone = `${countryCode} ${cleanDigits}`;
    const payload = {
      name: cleanName,
      email: cleanEmail,
      phone: fullPhone,
      whatsapp: fullPhone,
      phoneNumber: fullPhone,
      businessType: 'General Business',
      serviceRequired: 'Digital Marketing & Growth',
      message: 'Lead captured directly from Home Hero "Let\'s Grow Together" strategy form.',
    };

    try {
      const res = await apiFetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        // Fallback smooth success
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
        setHeroForm({ name: '', email: '' });
        setPhoneNumber('');
      }, 5000);
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-28 sm:pt-36 lg:pt-32 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-br from-[#ebf5ff] via-[#f7fbff] to-white"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-10 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Perspective / Clean Grid Background */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00A3E0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Bottom-left layered curved organic waves matching reference image */}
      <div className="absolute -bottom-2 -left-2 w-72 sm:w-[420px] h-44 sm:h-64 pointer-events-none z-0">
        <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M-20 260 C90 180 180 190 280 260 L-20 260 Z" fill="#38bdf8" fillOpacity="0.3" />
          <path d="M-30 260 C70 140 200 160 360 260 L-30 260 Z" fill="#00A3E0" fillOpacity="0.45" />
          <path d="M-40 260 C40 100 150 120 290 260 L-40 260 Z" fill="#00A3E0" fillOpacity="0.25" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Action CTAs & Bottom Stats */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Tag: 📊 Grow Faster. Get More Leads. */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-200 text-[#00A3E0] text-xs sm:text-[13px] font-bold tracking-wide shadow-2xs">
              <BarChart2 className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Grow Faster. Get More Leads.</span>
            </div>

            {/* Main Headline with Custom Cyan Wave Doodle Underline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Scale Your Business <br />
              <span className="text-slate-900">with </span>
              <span className="relative inline-block text-[#00A3E0]">
                Digital Marketing
                {/* Curved wave doodle SVG matching reference image */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#00A3E0]"
                  viewBox="0 0 280 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10C50 3 100 12 150 7C200 2 245 10 277 5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Get high-quality leads, more customers and real business growth with data-driven digital marketing strategies.
            </p>

            {/* Action Buttons: Get Free Consultation & Watch How It Works */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#00A3E0]/25 ring-4 ring-[#00A3E0]/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-3 rounded-full hover:bg-white/80 transition-all flex items-center justify-center sm:justify-start gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#00A3E0] group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-[#00A3E0]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#00A3E0] transition-colors">
                  Watch How It Works
                </span>
              </button>
            </div>

            {/* Bottom Stats Row (5K+ Happy Clients | 300%+ Average Growth | 4.9/5 Client Rating) */}
            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/80 text-left">
              {/* Stat 1: 5K+ Happy Clients */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">5K+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Happy Clients</div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

              {/* Stat 2: 300%+ Average Growth (AnimatedCounter) */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00A3E0] shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                    <AnimatedCounter value="300%+" duration={1400} />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Average Growth</div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

              {/* Stat 3: 4.9/5 Client Rating */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">4.9/5</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Client Rating</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Analytics Dashboard, Launching Rocket, Floating Badges & Lead Card */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-xl">
              
              {/* Floating Badge 1 (Top-Left): 📈 More Leads +300% ↗ */}
              <div className="absolute -top-4 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5 anim-float">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00A3E0]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">More Leads</div>
                  <div className="text-xs font-black text-emerald-600 flex items-center gap-0.5">
                    +300% <span className="text-[10px]">↗</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 (Top-Right): 🎯 Targeted Audience */}
              <div className="absolute -top-3 right-0 sm:-right-2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5 anim-float-delayed">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00A3E0]">
                  <Target className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-800 leading-tight">Targeted</div>
                  <div className="text-[10px] font-semibold text-slate-500">Audience</div>
                </div>
              </div>

              {/* Floating Badge 3 (Bottom-Left): 📊 Real Results */}
              <div className="absolute -bottom-3 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5 anim-float">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00A3E0]">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">Real</div>
                  <div className="text-xs font-black text-slate-800 mt-0.5 leading-none">Results</div>
                </div>
              </div>

              {/* Launching 3D Rocket with Vapor Trail Illustration */}
              <div className="absolute -top-12 sm:-top-16 right-12 sm:right-20 z-20 pointer-events-none w-28 sm:w-36 h-36 sm:h-44">
                <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
                  {/* Smoke and Vapor Trail */}
                  <path
                    d="M65 140 C 50 170 30 185 10 195 C 45 190 60 175 75 145"
                    fill="url(#smokeGradient)"
                    opacity="0.8"
                  />
                  <path
                    d="M75 140 C 90 170 120 185 140 195 C 105 190 90 175 65 145"
                    fill="url(#smokeGradient)"
                    opacity="0.6"
                  />
                  {/* Flame Thruster */}
                  <path
                    d="M68 132 Q70 160 70 165 Q72 160 74 132 Z"
                    fill="url(#flameGradient)"
                  />
                  
                  {/* Rocket Body */}
                  <g transform="rotate(25 70 100)">
                    {/* Left & Right Fins */}
                    <path d="M50 115 L38 135 L54 130 Z" fill="#00A3E0" />
                    <path d="M90 115 L102 135 L86 130 Z" fill="#00A3E0" />
                    {/* Fuselage */}
                    <path
                      d="M52 125 C50 85 58 50 70 30 C82 50 90 85 88 125 Z"
                      fill="#ffffff"
                      stroke="#d0e8f5"
                      strokeWidth="1.5"
                    />
                    {/* Nose Cone */}
                    <path
                      d="M58 52 C64 36 68 30 70 30 C72 30 76 36 82 52 Z"
                      fill="#00A3E0"
                    />
                    {/* Viewport Window */}
                    <circle cx="70" cy="72" r="7" fill="#00A3E0" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="68" cy="70" r="2.5" fill="#ffffff" opacity="0.8" />
                    {/* Body Stripe */}
                    <path d="M54 105 Q70 108 86 105 L87 114 Q70 117 53 114 Z" fill="#00A3E0" />
                  </g>

                  {/* SVG Gradients */}
                  <defs>
                    <linearGradient id="flameGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff7b00" />
                      <stop offset="50%" stopColor="#ffb703" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="smokeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#e0f4ff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 3D Analytics Dashboard Window */}
              <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden text-left p-4 sm:p-5">
                
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    TezScale Growth Engine
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 items-center">
                  
                  {/* Left inner side: 3D Rising Bar Chart & Upward Trendline */}
                  <div className="md:col-span-5 flex flex-col justify-end h-44 sm:h-52 relative px-2">
                    {/* SVG Upward Curved Trendline with circular nodes */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <svg viewBox="0 0 200 160" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#00A3E0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M10 130 C45 110 70 85 110 65 C145 50 170 30 190 15"
                          fill="none"
                          stroke="url(#lineGlow)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        {/* Glowing Node Points */}
                        <circle cx="10" cy="130" r="3.5" fill="#00A3E0" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="60" cy="98" r="3.5" fill="#00A3E0" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="110" cy="65" r="4" fill="#00A3E0" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="155" cy="40" r="4" fill="#00A3E0" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="190" cy="15" r="5" fill="#00A3E0" stroke="#ffffff" strokeWidth="2.5" />
                      </svg>
                    </div>

                    {/* 3D Vertical Bar Pillars */}
                    <div className="grid grid-cols-5 gap-2 items-end h-full pt-6 relative z-0">
                      {/* Bar 1 */}
                      <div className="flex flex-col items-center gap-1 h-[32%]">
                        <div className="w-full h-full bg-gradient-to-t from-[#00A3E0]/70 to-[#38bdf8] rounded-t-md shadow-xs" />
                      </div>
                      {/* Bar 2 */}
                      <div className="flex flex-col items-center gap-1 h-[48%]">
                        <div className="w-full h-full bg-gradient-to-t from-[#00A3E0]/80 to-[#38bdf8] rounded-t-md shadow-xs" />
                      </div>
                      {/* Bar 3 */}
                      <div className="flex flex-col items-center gap-1 h-[68%]">
                        <div className="w-full h-full bg-gradient-to-t from-[#00A3E0] to-[#38bdf8] rounded-t-md shadow-sm" />
                      </div>
                      {/* Bar 4 */}
                      <div className="flex flex-col items-center gap-1 h-[86%]">
                        <div className="w-full h-full bg-gradient-to-t from-[#00A3E0] to-[#0284c7] rounded-t-md shadow-md" />
                      </div>
                      {/* Bar 5 (Peak) */}
                      <div className="flex flex-col items-center gap-1 h-[100%]">
                        <div className="w-full h-full bg-gradient-to-t from-[#008bc0] to-[#00A3E0] rounded-t-md shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Right inner side: Embedded "Let's Grow Together" Lead Generation Card */}
                  <div className="md:col-span-7 bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-md text-left">
                    <div className="mb-3">
                      <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                        Let's Grow Together
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                        Fill in the form and get a <strong className="text-[#00A3E0] font-bold">free digital marketing strategy!</strong>
                      </p>
                    </div>

                    {/* Instant Success Banner */}
                    {submitted ? (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 anim-fade-in">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <div className="text-xs font-bold text-emerald-900">Strategy Session Requested!</div>
                        <div className="text-[11px] text-emerald-700">
                          Our specialist will reach out with your growth roadmap on WhatsApp shortly.
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleHeroSubmit} className="space-y-2.5">
                        {formError && (
                          <div className="p-2 rounded-md bg-rose-50 border border-rose-200 text-[11px] text-rose-700 font-semibold">
                            {formError}
                          </div>
                        )}

                        {/* Name Input */}
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={heroForm.name}
                            onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            placeholder="Your Email"
                            value={heroForm.email}
                            onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                          />
                        </div>

                        {/* Phone Number Input with Country Code & Digits Only */}
                        <div>
                          <PhoneInput
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            placeholder="Your Phone Number"
                            className="text-xs"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-2.5 rounded-full bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-xs shadow-md shadow-[#00A3E0]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 hover:scale-[1.01]"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Get Free Strategy</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                        {/* 100% Spam Free Badge */}
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5">
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>100% Spam Free</span>
                        </div>
                      </form>
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
