import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_METADATA = {
  '/': {
    title: 'TezScale — Accelerating Digital Growth | Web, SEO & Performance Marketing',
    description: 'TezScale is a premier digital growth agency in Indore accelerating predictable business growth through high-speed websites, viral reels, Meta Ads & local SEO dominance.',
  },
  '/about': {
    title: 'About TezScale — Digital Growth Architects & Performance Engineers',
    description: 'Meet the TezScale core team: full-stack developers, AI/ML engineers, and performance marketers engineering B2B growth and digital transformation.',
  },
  '/services': {
    title: 'Full-Stack Digital Growth Services & Solutions | TezScale',
    description: 'Explore TezScale high-performance services: Web Development, Local SEO, Viral Instagram Reels, Meta Ads, and E-commerce Scaling.',
  },
  '/portfolio': {
    title: 'Client Results & Measurable Case Studies | TezScale',
    description: 'Proven ROI and real growth case studies for Healthcare Clinics, Real Estate, and B2B Manufacturing brands scaled by TezScale.',
  },
  '/testimonials': {
    title: 'Client Testimonials & Endorsements | TezScale',
    description: 'Verified reviews, 5-star ratings, and video endorsements from doctors, brokers, and industry leaders who scaled with TezScale.',
  },
  '/contact': {
    title: 'Contact TezScale — Schedule Your Free Digital Growth Strategy Session',
    description: 'Get in touch with TezScale growth architects in Indore for a free consultation, website audit, and personalized growth roadmap.',
  },
  '/backoffice': {
    title: 'Backoffice Portal Login | TezScale Platform',
    description: 'Secure unified administration portal for TezScale platform management and lead monitoring.',
  },
  '/services/web-development': {
    title: 'Website Builder & Full-Stack Web Development | TezScale',
    description: 'Ultra-fast, mobile-first responsive web development with 98+ PageSpeed, modern UI/UX, and conversion optimization.',
  },
  '/services/graphic-design': {
    title: 'Graphic Design & Brand Kits | TezScale',
    description: 'High-converting ad creatives, 3D visual identities, logos, brochures, and comprehensive brand kit packages.',
  },
  '/services/digital-marketing': {
    title: 'Digital Marketing Support & Local SEO | TezScale',
    description: 'Dominate Google Maps Top 3 rankings, local pack optimization, and high-intent transactional search visibility.',
  },
  '/services/ecommerce': {
    title: 'E-Commerce Enablement & Scaling | TezScale',
    description: 'Frictionless checkout architectures, cart recovery funnels, Razorpay integration, and direct-to-consumer scaling.',
  },
  '/services/social-media': {
    title: 'Social Media Strategy & Viral Reels Production | TezScale',
    description: 'Viral short-form Instagram reels, video editing, storytelling, and organic B2B LinkedIn growth management.',
  },
  '/services/meta-ads': {
    title: 'Meta Ads Management (Facebook & Instagram) | TezScale',
    description: 'Precision-targeted paid advertising campaigns engineered for maximum ROAS, low-cost lead generation, and pixel tracking.',
  },
};

const RouteSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const meta = ROUTE_METADATA[pathname] || {
      title: 'TezScale — Accelerating Digital Growth',
      description: 'TezScale Digital Growth Agency — Web Development, Local SEO, Viral Reels & Performance Marketing.',
    };

    // Update document.title
    document.title = meta.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const fullUrl = `https://tez-scale-navy.vercel.app${pathname === '/' ? '' : pathname}`;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Update Open Graph Meta
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.title);

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', meta.description);
  }, [location.pathname]);

  return null;
};

export default RouteSEO;
