import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Sparkles,
  Search,
  Layers,
  Rocket
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

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

const About = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = useContent();
  const whyUs = content?.whyChooseUs || {};

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About TezScale</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Engineering Predictable <span className="text-blue-600">Digital Growth</span> for Modern Enterprises
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              We are a full-service digital marketing and tech acceleration partner helping clinics, real estate brokers, B2B exporters, and retailers dominate their markets.
            </p>

            {/* Quick Metrics Banner */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center card-lift">
                <div className="text-3xl font-black text-blue-600">250%</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Average ROI Growth</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center card-lift">
                <div className="text-3xl font-black text-emerald-600">500+</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Happy Clients</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center card-lift">
                <div className="text-3xl font-black text-indigo-600">5+</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Years Experience</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center card-lift">
                <div className="text-3xl font-black text-amber-500">98%</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">Client Retention Rate</div>
              </div>
            </div>
          </div>
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
                    <span>Partner with TezScale</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pil, idx) => (
                <div key={idx} className="bg-slate-50/60 p-6 rounded-3xl border border-slate-200/80 card-lift">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs mb-4">
                    {pil.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{pil.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pil.desc}</p>
                </div>
              ))}
            </div>
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

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default About;
