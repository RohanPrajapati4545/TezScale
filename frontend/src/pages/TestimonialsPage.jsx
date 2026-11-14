import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import { 
  Star, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Stethoscope, 
  Send 
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const clientReviews = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    role: 'Medical Director, City Dental Clinic',
    sector: 'Healthcare & Clinics',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1594824813589-9a25b1641ba5?auto=format&fit=crop&w=150&q=80',
    quote:
      'TezScale completely transformed our online patient acquisition. Our local clinic appointments jumped 3x in just 90 days! Their automated WhatsApp booking flow eliminated patient drop-offs, and we now rank #1 on Google Maps.',
    highlight: '3x Patient Bookings',
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    role: 'Founder & CEO, TechVista SaaS',
    sector: 'Software & Technology',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote:
      'TezScale helped us 3x our qualified website traffic in just 3 months! Their engineering agility and full-funnel strategy are absolutely phenomenal. The fastest, most transparent team we have worked with.',
    highlight: '3x Traffic Growth',
  },
  {
    id: 3,
    name: 'Rajesh Singhal',
    role: 'Managing Partner, Apex Skyline Realty',
    sector: 'Real Estate & Properties',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote:
      'Before partnering with TezScale, we wasted substantial budget on Meta ads with junk inquiries. TezScale built high-converting property showcase funnels with sub-2-minute lead notifications. We closed ₹4.2 Cr in property sales.',
    highlight: '₹4.2 Cr Sales Closed',
  },
  {
    id: 4,
    name: 'Ananya Verma',
    role: 'Co-founder, Luxe Retail & E-Commerce',
    sector: 'Direct-to-Consumer Retail',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    quote:
      'Our e-commerce store ROAS jumped from 1.6x to 4.1x within 60 days. The automated WhatsApp abandoned cart recovery recovered 38% of our dropped customers. TezScale is an indispensable growth partner.',
    highlight: '4.1x Meta Ads ROAS',
  },
  {
    id: 5,
    name: 'Vikram Patel',
    role: 'Managing Director, Precision Engineering Export',
    sector: 'Industrial Manufacturing B2B',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote:
      'As an industrial exporter, getting genuine B2B buyer inquiries online was our biggest bottleneck. TezScale designed our international technical catalog and optimized our digital footprint. We secured supply contracts across UAE.',
    highlight: 'Global Export Contracts',
  },
  {
    id: 6,
    name: 'Siddharth Mehta',
    role: 'Head of Growth, FinScale Technologies',
    sector: 'Fintech Solutions',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    quote:
      'Speed and execution precision set TezScale apart. They delivered our entire platform staging in 2 days as promised, and our customer acquisition cost dropped by 45% in month two.',
    highlight: '-45% Cost Per Lead',
  },
];

const brandLogos = ['Google', 'Meta', 'Microsoft', 'HubSpot', 'Slack', 'Notion'];

const TestimonialsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = useContent();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Social Proof & Client Stories</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Trusted by Over <span className="text-blue-600">500+ Businesses</span> Across Industries
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Don’t just take our word for it. Here is what healthcare founders, real estate developers, and business owners say about partnering with TezScale.
            </p>

            {/* 5-Star Rating Aggregate Banner */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-slate-900">4.9 / 5.0 Rating</span>
                <span className="text-xs text-slate-400 font-medium">(240+ Verified Reviews)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Logos Shelf */}
        <section className="py-8 bg-slate-50 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 font-extrabold text-sm sm:text-base tracking-wider uppercase">
              {brandLogos.map((brand, idx) => (
                <span key={idx} className="hover:text-slate-600 transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {clientReviews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm card-lift flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Row: Stars + Quote Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/80">
                        {item.highlight}
                      </span>
                    </div>

                    {/* Review Quote */}
                    <blockquote className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      "{item.quote}"
                    </blockquote>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{item.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{item.role}</div>
                      <div className="text-[10px] text-blue-600 font-semibold">{item.sector}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion CTA Card */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                <Send className="w-7 h-7 text-white -rotate-12 translate-x-0.5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready to Multiply Your Inbound Leads?
                </h3>
                <p className="text-blue-100 text-sm max-w-md mx-auto">
                  Partner with the team trusted by hundreds of growing brands. Book your free strategy session now.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-slate-100 px-8 py-3.5 rounded-full font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <span>Get a Free Strategy Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TestimonialsPage;

