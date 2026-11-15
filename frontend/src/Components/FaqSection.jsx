import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: 'How fast can TezScale deploy our website or ad campaigns?',
    a: 'Per our accelerated project schedule, a fully functional draft on staging is deployed within 2 days. Final revisions, domain DNS configuration, and live launch are completed within 5-6 business days.',
  },
  {
    q: 'How does the automated WhatsApp lead routing operate?',
    a: 'Every inquiry submitted through the website triggers an instant lead notification to your team, and routes the prospective client directly into an encrypted WhatsApp chat with pre-filled context.',
  },
  {
    q: 'Which industries does TezScale specialize in?',
    a: 'Our core practice areas are Medical Clinics & Doctors, Real Estate Brokerages, Engineering & Manufacturing Exporters, and High-Growth Retail / E-commerce brands.',
  },
  {
    q: 'How are campaign performance and ROI measured?',
    a: 'We provide transparent, real-time dashboards tracking Customer Acquisition Cost (CAC), Return On Ad Spend (ROAS), organic keyword rankings, and confirmed consultation bookings.',
  },
  {
    q: 'Do you offer ongoing website maintenance and support?',
    a: 'Yes! We provide structured Annual Maintenance Contracts (AMC) covering 24/7 uptime monitoring, security patches, routine backups, and ongoing conversion rate optimization.',
  },
];

const FaqSection = ({ onOpenConsultation }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header */}
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

        {/* Accordion list with Drone-style smoothness */}
        <div className="space-y-3.5">
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
        </div>

        {/* Bottom prompt */}
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

      </div>
    </section>
  );
};

export default FaqSection;

