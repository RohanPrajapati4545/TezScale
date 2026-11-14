import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
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
  ArrowRight
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
];

const PortfolioPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const { content } = useContent();
  const metrics = content?.metrics || {};

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Client Impact</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Real Results for <span className="text-blue-600">Real Businesses</span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore how we helped healthcare clinics, property developers, manufacturers, and direct-to-consumer brands unlock predictable growth.
            </p>

            {/* 3 Metric Counters */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 text-left flex items-center gap-4 shadow-xs card-lift">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 leading-tight">
                    {metrics.stat1Value || '250%'}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {metrics.stat1Label || 'Average Growth'}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 text-left flex items-center gap-4 shadow-xs card-lift">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 leading-tight">
                    {metrics.stat2Value || '500+'}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {metrics.stat2Label || 'Happy Clients'}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 text-left flex items-center gap-4 shadow-xs card-lift">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 leading-tight">
                    {metrics.stat3Value || '5+'}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {metrics.stat3Label || 'Years Experience'}
                  </div>
                </div>
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
                { id: 'healthcare', label: 'Medical & Clinics' },
                { id: 'realestate', label: 'Real Estate' },
                { id: 'ecommerce', label: 'E-Commerce' },
                { id: 'engineering', label: 'Engineering B2B' },
                { id: 'saas', label: 'SaaS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filter === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="pt-3">
                      <button
                        onClick={() => setModalOpen(true)}
                        className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Replicate These Results</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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

