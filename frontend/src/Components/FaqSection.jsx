import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import AnimatedContent from './AnimatedContent';

const faqs = [
  {
    q: 'How fast can TezScale build and launch our business website?',
    a: 'Under TezScale\'s accelerated delivery model, you receive a 100% live functional draft on staging within 2 days. Final client revisions, WhatsApp routing setup, custom domain DNS, and production launch are completed within 5 to 6 business days.',
  },
  {
    q: 'How much does a business website cost in Indore and India in 2026?',
    a: 'In 2026, professional high-speed business websites in India range from ₹8,000 to ₹35,000 depending on scope. TezScale offers pocket-friendly, easy-cost packages with 0.8s load speed, 1-tap WhatsApp lead buttons, free SSL, and zero recurring vendor lock-in fees.',
  },
  {
    q: 'How to rank a business in Google Maps Top 3 in Indore?',
    a: 'Ranking in Indore\'s Google Maps Top 3 local pack requires: (1) 100% completed Google Business Profile (GBP) with local primary categories, (2) Local geo-targeted citations across Vijay Nagar, Palasia, and AB Road, (3) High-frequency 5-star customer reviews with keyword responses, and (4) Structured LocalBusiness schema markup on your website.',
  },
  {
    q: 'How to generate B2B leads on WhatsApp using Meta ads?',
    a: 'We configure precision Click-to-WhatsApp Meta Ad funnels (Facebook & Instagram) linked with Conversions API. When a qualified prospect taps your ad, it opens a pre-filled encrypted WhatsApp chat directly on your phone with zero landing page bounce drop-off.',
  },
  {
    q: 'Which 4 core Indian industries does TezScale specialize in?',
    a: 'TezScale engineers specialized growth funnels for: (1) Medical Clinics & Doctors (patient appointments & Google Business Profile Maps ranking), (2) Real Estate Developers & Brokers (Meta ads for verified site visits), (3) Industrial Manufacturing Exporters in Sanwer Road & Pithampur (B2B product catalogs & RFQs), and (4) E-Commerce & Retail Brands (1-step checkout & WhatsApp cart recovery).',
  },
  {
    q: 'Why does website loading speed matter for Indian mobile users?',
    a: 'Over 82% of Indian buyers browse on mobile 4G/5G connections. Every 1-second delay in page load drops conversion rates by 20%. TezScale builds lightweight, high-speed mobile websites achieving 0.8s load speeds even on mobile data with 98+ Google PageSpeed scores.',
  },
  {
    q: 'What is Generative Engine Optimization (GEO) & how does TezScale optimize for AI Overviews?',
    a: 'Generative Engine Optimization (GEO) is the next generation of SEO designed to get your brand recommended inside Google AI Overviews, Perplexity, and ChatGPT. TezScale implements authoritative FAQ schemas, structured JSON-LD entity graphs, and direct conversational answer blocks.',
  },
  {
    q: 'How can manufacturers and exporters in Pithampur & Sanwer Road get global B2B inquiries?',
    a: 'We engineer structured technical product catalog websites optimized for international search queries, paired with Google Search ads and automated RFP/RFQ WhatsApp pipelines to capture overseas buyers and OEM purchase managers.',
  },
  {
    q: 'How do patient lead generation Meta ads work for medical clinics in Indore?',
    a: 'We run hyper-local geo-targeted Meta campaigns within a 5-10 km radius of your clinic in Vijay Nagar, Palasia, or South Tukoganj. Ads highlight doctor credentials and offer 1-tap WhatsApp consultation scheduling, generating predictable patient appointments.',
  },
  {
    q: 'How are campaign performance and ROI measured at TezScale?',
    a: 'We provide transparent, real-time ROI dashboards tracking Cost Per Lead (CPL), Return On Ad Spend (ROAS), Google Maps Top 3 keyword positions, and confirmed consultation bookings with weekly reporting.',
  },
];

const FaqSection = ({ onOpenConsultation }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          threshold={0.15}
        >
          <div className="text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] text-xs font-bold tracking-wide shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className="text-[#00A3E0]">Questions</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Everything you need to know about partnering with TezScale for your digital growth.
            </p>
          </div>
        </AnimatedContent>

        {/* Accordion list with Drone-style smoothness */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.7}
          ease="power3.out"
          stagger={0.08}
          threshold={0.12}
          className="space-y-3.5"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#00A3E0]/50 bg-[#f0f9ff]/50 shadow-2xs'
                    : 'border-slate-200/90 bg-white hover:border-[#00A3E0]/30'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#00A3E0] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fade-in font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </AnimatedContent>

        {/* Bottom prompt */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.7}
          delay={0.2}
          threshold={0.1}
        >
          <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="font-bold text-slate-900 text-sm">Have a unique business requirement?</div>
              <div className="text-xs text-slate-500">Speak directly with our senior strategy consultant.</div>
            </div>
            <button
              onClick={onOpenConsultation}
              className="btn-drone-primary py-2.5 px-5"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
};

export default FaqSection;

