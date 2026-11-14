import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
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
  Layers
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const detailedServices = [
  {
    id: 'web-dev',
    title: 'Website Builder & Development',
    category: 'Engineering & Conversion UI',
    icon: <Code2 className="w-6 h-6 text-blue-600" />,
    badge: 'Accelerated 2-Day Staging',
    desc: 'High-speed, SEO-optimized web platforms built with Vite, React, and Tailwind CSS. Designed to turn visitors into booked consultation calls.',
    deliverables: [
      'Ultra-fast Vite/React single-page architecture',
      'Mobile-responsive layout with 95+ PageSpeed scores',
      'Instant encrypted WhatsApp lead routing button',
      'SSL certificate, DNS hosting setup & 24/7 uptime',
      'Interactive Consultation Booking Modal',
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Vite', 'MongoDB'],
    stats: '100% Mobile Optimized',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Creative Brand Kits',
    category: 'Visual Identity & Ad Creatives',
    icon: <Palette className="w-6 h-6 text-purple-600" />,
    badge: 'Conversion-Focused Assets',
    desc: 'Captivating visual identities that build instant trust. From brand style guides to scroll-stopping social ad banners that maximize CTR.',
    deliverables: [
      'Complete brand identity (logos, color palettes, fonts)',
      'High-CTR Meta & Google ad creative variations',
      'Corporate presentation decks & brochure designs',
      'Marketing collateral for print & digital distribution',
      'Social media banner templates & story assets',
    ],
    tech: ['Figma', 'Adobe Photoshop', 'Illustrator', 'Canva Pro'],
    stats: '3x Click-Through Rate',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Support (Local SEO)',
    category: 'Search Engine Dominance',
    icon: <Megaphone className="w-6 h-6 text-emerald-600" />,
    badge: 'Google Maps Top 3',
    desc: 'Comprehensive search engine optimization built to dominate local market share for clinics, property brokers, and local enterprises.',
    deliverables: [
      'Google My Business (GMB) / Maps pack optimization',
      'Structured schema markup for clinics & real estate',
      'High-intent transactional keyword research',
      'Technical SEO audits & Core Web Vitals fixes',
      'Monthly keyword rank & traffic growth reports',
    ],
    tech: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Schema.org'],
    stats: '+220% Organic Search Growth',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Enablement & Scaling',
    category: 'Direct-to-Consumer Growth',
    icon: <ShoppingCart className="w-6 h-6 text-amber-500" />,
    badge: 'Revenue Expansion',
    desc: 'Turn your product catalog into a high-converting automated sales machine with seamless checkout, payment gateways, and cart recovery.',
    deliverables: [
      'End-to-end e-commerce store architecture',
      'Frictionless 1-step checkout & payment integration',
      'Automated abandoned cart WhatsApp & email recovery',
      'Inventory synchronization & order management',
      'Cross-sell & up-sell conversion funnel setup',
    ],
    tech: ['Shopify', 'WooCommerce', 'Razorpay', 'Stripe', 'Klaviyo'],
    stats: '+300% Sales Increase',
  },
  {
    id: 'social-media',
    title: 'Social Media Management & Viral Reach',
    category: 'Organic Audience Building',
    icon: <Share2 className="w-6 h-6 text-indigo-600" />,
    badge: 'Engaged Community',
    desc: 'Consistent, brand-aligned storytelling across Instagram, LinkedIn, and Facebook that transforms cold prospects into loyal brand advocates.',
    deliverables: [
      'Monthly strategic content calendars & copywriting',
      'Engaging short-form video scripts & Reel creation',
      'Active community management & comment moderation',
      'Hashtag strategy & viral reach optimization',
      'Influencer outreach & cross-collaboration',
    ],
    tech: ['Meta Business Suite', 'Buffer', 'Canva', 'CapCut Pro'],
    stats: '5x Audience Engagement',
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads Management (FB & Instagram)',
    category: 'Paid Acquisition & ROAS',
    icon: <InfinityIcon className="w-6 h-6 text-rose-500" />,
    badge: 'Hyper-Targeted Leads',
    desc: 'High-ROI paid advertising campaigns engineered to generate qualified B2B inquiries and buyer leads at optimal Customer Acquisition Cost.',
    deliverables: [
      'High-intent audience research & lookalike segments',
      'A/B split testing for headlines, copies & creatives',
      'Custom conversion API & pixel tracking integration',
      'Retargeting funnels for unconverted landing visitors',
      'Transparent weekly ROAS & CAC analytics dashboard',
    ],
    tech: ['Meta Ads Manager', 'Conversion API', 'Google Tag Manager', 'Hotjar'],
    stats: '3.8x Avg ROAS',
  },
];

const ServicesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = useContent();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Services Page Hero */}
        <section className="pt-16 pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Growth Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Complete <span className="text-blue-600">Digital Solutions</span> Built to Convert & Scale
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              From accelerated web architecture to precision Meta Ads and Local Map dominance, we build the digital infrastructure your business needs to win.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full text-sm font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-102 cursor-pointer"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 6 Core Detailed Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1 leading-snug">
                        {service.title}
                      </h3>
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

                  {/* Card Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-blue-600">{service.stats}</span>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer group"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions Banner */}
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
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
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ServicesPage;

