import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Palette,
  Megaphone,
  ShoppingCart,
  Share2,
  Infinity as InfinityIcon,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import AnimatedContent from './AnimatedContent';

const serviceSlugMap = {
  'Website Builder & Development': 'web-development',
  'Graphic Design': 'graphic-design',
  'Digital Marketing Support': 'digital-marketing',
  'E-commerce Support': 'ecommerce',
  'Social Media Services': 'social-media',
  'Meta Ads Management': 'meta-ads',
};

const defaultSlugs = [
  'web-development',
  'graphic-design',
  'digital-marketing',
  'ecommerce',
  'social-media',
  'meta-ads',
];

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Code':
    case 'BarChart2':
      return <Code className="w-5 h-5" />;
    case 'Palette':
      return <Palette className="w-5 h-5" />;
    case 'Megaphone':
      return <Megaphone className="w-5 h-5" />;
    case 'ShoppingCart':
      return <ShoppingCart className="w-5 h-5" />;
    case 'Share2':
      return <Share2 className="w-5 h-5" />;
    case 'Infinity':
      return <InfinityIcon className="w-5 h-5" />;
    default:
      return <Layers className="w-5 h-5" />;
  }
};

const defaultCardColors = [
  'bg-[#00A3E0] text-white shadow-[#00A3E0]/25',
  'bg-purple-600 text-white shadow-purple-500/25',
  'bg-emerald-500 text-white shadow-emerald-500/25',
  'bg-amber-500 text-white shadow-amber-500/25',
  'bg-indigo-600 text-white shadow-indigo-500/25',
  'bg-cyan-600 text-white shadow-cyan-500/25',
];

const defaultHomepageServices = [
  {
    title: 'Business Website Development',
    desc: 'Fast, mobile-friendly websites built to turn visitors into phone calls and WhatsApp inquiries—ready for preview in 2 days.',
    actionText: 'Explore Website Plans',
    slug: 'web-development',
    icon: 'Code',
    badgeBg: 'bg-[#00A3E0] text-white shadow-[#00A3E0]/25'
  },
  {
    title: 'Logo, Branding & Ad Design',
    desc: 'Professional logos, social media posters, brochures, and high-converting ad creatives that make your business look trustworthy.',
    actionText: 'See Design Packages',
    slug: 'graphic-design',
    icon: 'Palette',
    badgeBg: 'bg-purple-600 text-white shadow-purple-500/25'
  },
  {
    title: 'Local SEO & Google Maps Ranking',
    desc: 'Rank in the Top 3 on Google Maps and Google Search so nearby customers find and call your business first.',
    actionText: 'Boost Google Ranking',
    slug: 'digital-marketing',
    icon: 'Megaphone',
    badgeBg: 'bg-emerald-500 text-white shadow-emerald-500/25'
  },
  {
    title: 'Online Store (E-Commerce) Setup',
    desc: 'Complete online stores with UPI/card payment gateways, shipping setup, and easy 1-step checkout to grow your product sales.',
    actionText: 'Launch Online Store',
    slug: 'ecommerce',
    icon: 'ShoppingCart',
    badgeBg: 'bg-amber-500 text-white shadow-amber-500/25'
  },
  {
    title: 'Social Media Management',
    desc: 'Consistent Instagram, Facebook, and LinkedIn posts and reels that build local brand trust and engage your customers.',
    actionText: 'View Social Plans',
    slug: 'social-media',
    icon: 'Share2',
    badgeBg: 'bg-indigo-600 text-white shadow-indigo-500/25'
  },
  {
    title: 'Facebook & Instagram (Meta) Ads',
    desc: 'Targeted ad campaigns that send ready-to-buy customer leads straight to your WhatsApp—with clear daily ROI tracking.',
    actionText: 'Start Lead Ads',
    slug: 'meta-ads',
    icon: 'Infinity',
    badgeBg: 'bg-cyan-600 text-white shadow-cyan-500/25'
  }
];

const Services = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const servicesList = defaultHomepageServices;

  return (
    <section id="services" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Eyebrow Tag */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          threshold={0.15}
        >
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f4ff] border border-[#00A3E0]/30 text-[#007ba8] font-sans font-semibold text-xs sm:text-[13px] leading-[1.20] shadow-2xs">
              <span>Our Core Services</span>
            </div>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] md:text-[34px] text-slate-900 tracking-tight leading-[1.20] text-center">
              Everything You Need to <span className="text-[#0EA5E9]">Grow Your Business Online</span>
            </h2>
            <p className="font-sans font-normal text-[15px] sm:text-[16px] text-[#475569] max-w-2xl mx-auto leading-[1.60]">
              Simple, result-driven services designed to bring you more phone calls, WhatsApp inquiries, and online orders.
            </p>
          </div>
        </AnimatedContent>

        {/* 6 Services Grid (Smooth GSAP scroll-triggered cascade animation from bottom to top) */}
        <AnimatedContent
          distance={80}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          stagger={0.12}
          threshold={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {servicesList.map((service, idx) => {
            const iconBg = service.badgeBg || defaultCardColors[idx % defaultCardColors.length];
            const slug = service.slug;

            return (
              <Link
                key={idx}
                to={`/services/${slug}`}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#00A3E0]/60 hover:shadow-md card-lift flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer block"
              >
                {/* Subtle top accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-heading font-semibold text-[18px] sm:text-[20px] leading-[1.30] text-slate-900 mb-2 group-hover:text-[#00A3E0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans font-normal text-[15px] text-[#475569] leading-[1.60] mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Single Clean Action Link (Right-side duplicate removed per blueprint) */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-[14px] sm:text-[15px] text-[#0EA5E9] group-hover:text-[#0284C7] transition-all group-hover:gap-2">
                    <span>View Details & Pricing →</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </AnimatedContent>

        {/* View All Services Page Link */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.7}
          delay={0.2}
          threshold={0.1}
          className="mt-12 text-center"
        >
          <a
            href="/services"
            className="btn-drone-secondary border border-slate-200 hover:border-[#00A3E0]"
          >
            <span>Explore All Services & Tech Deliverables</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </AnimatedContent>

      </div>
    </section>
  );
};

export default Services;
