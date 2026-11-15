import React, { useState } from 'react';
import { Stethoscope, Building2, Wrench, ShoppingBag, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

const verticals = [
  {
    id: 'healthcare',
    icon: <Stethoscope className="w-5 h-5" />,
    badge: 'Medical Clinics & Doctors',
    title: 'Precision Patient Acquisition & Local SEO',
    description:
      'Tailored for multi-specialty clinics, dental practices, and hospitals. We dominate local map packs, streamline automated WhatsApp patient booking, and build 5-star clinic reputation.',
    kpis: [
      { label: 'Avg. Inquiries Growth', value: '+220%' },
      { label: 'Booking Friction', value: '-65%' },
      { label: 'Google Maps Top 3', value: '92%' },
    ],
    features: [
      'Localized Medical SEO & Schema Optimization',
      'Instant WhatsApp Appointment Booking Bot',
      'Automated Google Reviews & Reputation Defense',
      'Trust-Centric Patient Experience Portals',
    ],
    tagline: 'Healthcare Lead Architecture',
  },
  {
    id: 'realestate',
    icon: <Building2 className="w-5 h-5" />,
    badge: 'Real Estate Brokers & Developers',
    title: 'High-Intent Buyer Leads via Meta Ads',
    description:
      'Transform property marketing with hyper-targeted Facebook & Instagram campaigns, immersive property landing funnels, and zero-lead-leakage CRM integrations.',
    kpis: [
      { label: 'Qualified Leads Jump', value: '+180%' },
      { label: 'Cost Per Acquisition', value: '-34%' },
      { label: 'Lead Response Time', value: '< 2 Mins' },
    ],
    features: [
      'Micro-Targeted Meta Ads (High Net Worth Buyers)',
      'High-Speed Virtual Tour Landing Pages',
      'Instant WhatsApp Lead Routing to Sales Team',
      'Retargeting Campaigns for Open Inquiries',
    ],
    tagline: 'Property Sales Velocity',
  },
  {
    id: 'engineering',
    icon: <Wrench className="w-5 h-5" />,
    badge: 'Engineering & Manufacturing B2B',
    title: 'Global Industrial Branding & RFP Generation',
    description:
      'Engineered for industrial machinery, OEM suppliers, and manufacturing exporters. We build high-authority technical storefronts that win lucrative domestic and global contracts.',
    kpis: [
      { label: 'B2B RFQ Volume', value: '+140%' },
      { label: 'Global Search Reach', value: '18+ Nations' },
      { label: 'Contract Deal Value', value: 'High 7-Fig' },
    ],
    features: [
      'Structured Technical Product & Spec Catalogs',
      'Industrial B2B LinkedIn & Search Campaigns',
      'High-Authority Global Domain Positioning',
      'Direct RFP / Quote Request Workflows',
    ],
    tagline: 'Industrial B2B Engine',
  },
  {
    id: 'retail',
    icon: <ShoppingBag className="w-5 h-5" />,
    badge: 'E-commerce & Local Entrepreneurs',
    title: 'End-to-End Storefronts & Shopping Cart ROI',
    description:
      'For ambitious retailers and brand creators wanting to scale online. From fast website builders to payment gateways, checkout optimization, and profitable ROAS ad funnels.',
    kpis: [
      { label: 'Cart Conversion Rate', value: '+300%' },
      { label: 'Return On Ad Spend', value: '4.2x' },
      { label: 'Mobile Page Speed', value: '0.8s' },
    ],
    features: [
      'High-Speed Mobile-First E-commerce Stores',
      'Seamless Payment Gateways & Inventory Sync',
      'Multi-Channel Performance Ad Scaling',
      'Cart Abandonment Recovery Workflows',
    ],
    tagline: 'Direct-to-Consumer Growth',
  },
];

const IndustrySolutions = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState(verticals[0].id);

  const activeData = verticals.find((v) => v.id === activeTab) || verticals[0];

  return (
    <section id="industry-solutions" className="py-24 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] live-pulse-dot" />
            <span>Target Audience Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
            Engineered For Your <span className="text-[#00A3E0]">Specific Industry</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We don't do generic marketing. Every vertical benefits from battle-tested strategies tailored to your exact buyer journey.
          </p>
        </div>

        {/* Drone-style Interactive Segmented Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs">
            {verticals.map((v) => {
              const isActive = activeTab === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveTab(v.id)}
                  className={`subnav-pill ${isActive ? 'active' : ''}`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-white live-pulse-dot" />}
                  {v.icon}
                  <span>{v.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Portal Showcase Card with Drone Style */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-sm max-w-5xl mx-auto text-left transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e0f4ff] text-[#007ba8] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>{activeData.tagline}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeData.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeData.description}
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#00A3E0] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenConsultation}
                  className="btn-drone-primary"
                >
                  <span>Request {activeData.badge} Strategy Call</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Right KPI Metric Box (5 cols) in Drone Tech Navy */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#08101e] to-[#0b192c] rounded-xl p-6 text-white space-y-4 shadow-xl border border-sky-900/40">
              <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider border-b border-white/10 pb-2">
                Proven Impact Benchmarks
              </div>

              <div className="space-y-4">
                {activeData.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">{kpi.label}</span>
                    <span className="text-xl font-black text-[#00A3E0]">{kpi.value}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 pt-1 text-center italic">
                *Verified client outcomes across Q1-Q3 deployments
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default IndustrySolutions;

