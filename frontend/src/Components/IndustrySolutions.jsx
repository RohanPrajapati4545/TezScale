import React, { useState } from 'react';
import { Stethoscope, Building2, Wrench, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedContent from './AnimatedContent';

const verticals = [
  {
    id: 'healthcare',
    icon: <Stethoscope className="w-5 h-5" />,
    badge: 'Doctors & Clinics',
    title: 'Fill Your Daily Appointment Slots',
    description:
      'Fill your daily appointment slots. Rank on Google Maps for treatments in your area and let patients book directly via WhatsApp.',
    kpis: [
      { label: 'Avg. Inquiries Growth', value: '+220%' },
      { label: 'Booking Friction', value: '-65%' },
      { label: 'Google Maps Top 3', value: '92%' },
    ],
    features: [
      'Top 3 Google Maps clinic ranking for treatments',
      'Instant WhatsApp appointment booking without friction',
      'Automated 5-star Google review collection system',
      'High-speed mobile clinic profile with doctor bio',
    ],
    tagline: 'Healthcare Growth Blueprint',
  },
  {
    id: 'realestate',
    icon: <Building2 className="w-5 h-5" />,
    badge: 'Real Estate Brokers & Builders',
    title: 'Verified Site-Visit Bookings for Projects',
    description:
      'Get verified site-visit bookings for plots, flats, and commercial projects using targeted Meta Ads and instant WhatsApp follow-ups.',
    kpis: [
      { label: 'Qualified Buyer Leads', value: '+180%' },
      { label: 'Cost Per Acquisition', value: '-34%' },
      { label: 'WhatsApp Lead Alert', value: '< 2 Mins' },
    ],
    features: [
      'Hyper-targeted Facebook & Instagram buyer ads',
      'High-speed project landing page with floor plans',
      'Direct WhatsApp lead alerts sent to your sales team',
      'Automated retargeting ads for warm site visitors',
    ],
    tagline: 'Real Estate Sales Velocity',
  },
  {
    id: 'engineering',
    icon: <Wrench className="w-5 h-5" />,
    badge: 'Manufacturers & Exporters',
    title: 'Showcase Factory Capacity & Win B2B RFQs',
    description:
      'Showcase your factory capacity, product catalogs, and ISO certifications to bulk B2B buyers across India and overseas.',
    kpis: [
      { label: 'B2B RFQ Volume', value: '+140%' },
      { label: 'Global Search Reach', value: '18+ Nations' },
      { label: 'Commercial Contract Size', value: 'High 7-Fig' },
    ],
    features: [
      'Digital machinery & industrial product catalogs',
      'Google Search visibility for OEM & bulk buyer keywords',
      'Fast 1-second loading catalog website with PDF downloads',
      'Direct WhatsApp and email RFQ quotation forms',
    ],
    tagline: 'Industrial B2B Engine',
  },
  {
    id: 'retail',
    icon: <ShoppingBag className="w-5 h-5" />,
    badge: 'Retail & Online Stores',
    title: 'Sell Directly to Customers Across India',
    description:
      'Sell directly to customers across India with a fast mobile store, UPI/card checkout, and repeat-buyer Instagram ads.',
    kpis: [
      { label: 'Cart Conversion Rate', value: '+300%' },
      { label: 'Return On Ad Spend', value: '4.2x' },
      { label: 'Mobile Page Speed', value: '0.8s' },
    ],
    features: [
      'Instant UPI, card & COD 1-step checkout page',
      'Automated WhatsApp abandoned cart recovery notifications',
      'High-converting Instagram reels & Meta shopping ads',
      'Order dispatch notifications & live shipment tracking',
    ],
    tagline: 'E-Commerce Growth Engine',
  },
];

const IndustrySolutions = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState(verticals[0].id);

  const activeData = verticals.find((v) => v.id === activeTab) || verticals[0];

  return (
    <section id="industries" className="pt-24 pb-24 bg-slate-50/70 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          threshold={0.15}
        >
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-[#0EA5E9]/30 text-[#0284C7] font-sans font-semibold text-xs sm:text-[13px] leading-[1.20] tracking-wide">
              <span>Built for Your Industry</span>
            </div>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] md:text-[34px] text-slate-900 tracking-tight leading-[1.20] text-center">
              Specialized Growth Plans for <span className="text-[#0EA5E9]">Your Business Sector</span>
            </h2>
            <p className="font-sans font-normal text-[15px] sm:text-[16px] text-[#475569] leading-[1.60] max-w-2xl mx-auto">
              We use proven website and lead-generation setups tailored for Doctors & Clinics, Real Estate Builders, Manufacturers & Exporters, and Online Stores.
            </p>
          </div>
        </AnimatedContent>

        {/* Interactive Segmented Tabs */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.7}
          delay={0.1}
          threshold={0.15}
          className="flex justify-start sm:justify-center mb-10 overflow-x-auto pb-2 scrollbar-none px-1 max-w-full"
        >
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs">
            {verticals.map((v) => {
              const isActive = activeTab === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveTab(v.id)}
                  className={`subnav-pill font-sans text-xs sm:text-sm font-semibold transition-all ${isActive ? 'active' : ''}`}
                >
                  {v.icon}
                  <span>{v.badge}</span>
                </button>
              );
            })}
          </div>
        </AnimatedContent>

        {/* Detailed Portal Showcase Card */}
        <AnimatedContent
          distance={70}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          threshold={0.15}
        >
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-sm max-w-5xl mx-auto text-left transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Content (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e0f4ff] text-[#007ba8] text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>{activeData.tagline}</span>
                </div>

                <h3 className="font-heading font-semibold text-[18px] sm:text-[20px] text-slate-900 tracking-tight leading-[1.30]">
                  {activeData.title}
                </h3>

                <p className="font-sans font-normal text-[15px] sm:text-[16px] text-[#475569] leading-[1.60]">
                  {activeData.description}
                </p>

                {/* Checklist with Cyan Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {activeData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 font-sans font-medium text-[14px] sm:text-[15px] text-slate-700 leading-[1.50]">
                      <CheckCircle2 className="w-4 h-4 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenConsultation}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-sans font-semibold text-[15px] leading-none transition-all shadow-md shadow-[#0EA5E9]/20 hover:shadow-lg min-h-[44px] cursor-pointer"
                  >
                    <span>Get Your Industry Plan</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Right KPI Metric Box (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#08101e] to-[#0b192c] rounded-xl p-6 text-white space-y-4 shadow-xl border border-sky-900/40">
                <div className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider border-b border-white/10 pb-2">
                  Proven Impact Benchmarks
                </div>

                <div className="space-y-4">
                  {activeData.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">{kpi.label}</span>
                      <span className="text-xl font-bold font-heading text-[#0EA5E9]">
                        <AnimatedCounter value={kpi.value} duration={1200} />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-300 pt-1 text-center italic">
                  *Verified client outcomes across Q1-Q3 deployments
                </div>
              </div>

            </div>
          </div>
        </AnimatedContent>

        {/* Semantic HTML Block for Google SEO crawling of all 4 verticals */}
        <div className="sr-only">
          {verticals.map((v) => (
            <article key={v.id}>
              <p className="font-bold">{v.badge}</p>
              <p>{v.description}</p>
              <ul>
                {v.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustrySolutions;
