import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_METADATA = {
  '/': {
    title: 'TezScale — Digital Marketing & Web Development Agency in Indore',
    description: 'TezScale is Indore\'s top-rated digital marketing & website development company. 2-day live draft, 5-6 day launch, Google Maps Top 3 local SEO, viral reels & Meta Ads funnels.',
    keywords: 'TezScale digital marketing agency, TezScale Indore, digital marketing agency in Indore, best digital marketing company in Indore, performance marketing agency in Indore, B2B lead generation agency in Indore, website development company in Indore, fast website design agency in Indore, 2 day website development service India, high speed website developer in Indore, mobile first web design company in India, SEO agency in Indore, best SEO company in Indore, local SEO services in Indore, Google Maps Top 3 ranking agency Indore, Google Business Profile optimization service Indore, Meta ads agency in Indore, Facebook and Instagram ads agency in Indore, click to WhatsApp ads agency India, WhatsApp lead generation funnel agency India, ecommerce website development company in Indore, Shopify store development agency in Indore, social media marketing agency in Indore, graphic design and branding agency in Indore, logo and brand kit designer in Indore, Vijay Nagar Indore, Palasia Indore, Super Corridor Indore',
  },
  '/about': {
    title: 'About TezScale — Top Digital Marketing & Tech Agency in Indore',
    description: 'Learn about TezScale: Indore\'s growth architects and performance engineers building 0.8s ultra-fast websites, AI-powered lead funnels & high-ROAS Meta campaigns.',
    keywords: 'about TezScale, digital marketing agency Indore, website developer in Vijay Nagar Indore, IT and digital marketing company Super Corridor Indore, best SEO agency in Madhya Pradesh, full stack developers Indore, TezScale founder',
  },
  '/services': {
    title: 'Full-Stack Digital Growth Services & Solutions | TezScale Indore',
    description: 'Explore TezScale high-performance services: Fast Web Development (2-day draft), Google Maps Top 3 Local SEO, Meta Ads, WhatsApp Lead Funnels & Viral Reels.',
    keywords: 'digital marketing services in Indore, website development company in Indore, local SEO services in Indore, Meta ads agency in Indore, WhatsApp lead generation funnel agency India, Shopify store development agency in Indore, graphic design agency Indore',
  },
  '/portfolio': {
    title: 'Client Results & Case Studies | TezScale Indore',
    description: 'Real client results and ROI case studies across Medical Clinics, Real Estate, Industrial Manufacturing & D2C Brands scaled by TezScale in Indore and India.',
    keywords: 'digital marketing case studies Indore, clinic website design Indore, real estate digital marketing agency in Indore, industrial website development for exporters in India, ecommerce marketing agency India, TezScale results',
  },
  '/testimonials': {
    title: 'Client Testimonials & Endorsements | TezScale Indore',
    description: 'Verified reviews and 5-star testimonials from doctors, real estate brokers, and B2B manufacturing leaders who grew 3x with TezScale digital solutions.',
    keywords: 'TezScale reviews, digital marketing agency in Indore reviews, best SEO company in Indore testimonials, client endorsements TezScale',
  },
  '/contact': {
    title: 'Contact TezScale Indore — Get a Free Strategy Call & Audit',
    description: 'Schedule a free growth consultation and website audit with TezScale in Indore. Fast turnaround: 2-day live website drafts & ROI-driven ad campaigns.',
    keywords: 'contact TezScale, digital marketing agency in Vijay Nagar Indore, digital marketing agency near me in Indore, website development cost in Indore, digital marketing packages in Indore',
  },
  '/backoffice': {
    title: 'Backoffice Portal Login | TezScale Platform',
    description: 'Secure unified administration portal for TezScale platform management and lead monitoring.',
    keywords: 'TezScale backoffice, TezScale login, admin portal',
  },
  '/services/web-development': {
    title: 'Fast Website Development in Indore | 2-Day Live Draft — TezScale',
    description: 'Fast website development in Indore with 2-day live staging & 5-6 day launch. 0.8s load speed, 98+ PageSpeed, mobile-first design, WhatsApp lead button & affordable packages.',
    keywords: 'fast website design agency in Indore, 2 day website development service India, high speed website developer in Indore, mobile first web design company in India, click to WhatsApp ads agency India, website development cost in Indore, business website design charges in India, affordable website development agency in Indore, small business website package with WhatsApp button India, website development company in Indore, low cost website maker Indore, website developer in Vijay Nagar Indore, website design company in Rau Indore, TezScale',
  },
  '/services/digital-marketing': {
    title: 'Local SEO & Google Maps Top 3 Agency in Indore — TezScale',
    description: 'Dominate Google Maps Top 3 rankings in Indore. Local SEO, Google Business Profile optimization, transactional keyword ranking & organic lead generation.',
    keywords: 'SEO agency in Indore, best SEO company in Indore, local SEO services in Indore, Google Maps Top 3 ranking agency Indore, Google Business Profile optimization service Indore, Google Maps SEO expert in Indore, local business listing optimization Indore, local SEO monthly packages in India, best SEO agency in Madhya Pradesh, SEO company in Vijay Nagar Indore, Google My Business ranking cost in Indore, TezScale',
  },
  '/services/meta-ads': {
    title: 'Meta Ads & WhatsApp Lead Generation Agency Indore — TezScale',
    description: 'High-ROAS Meta advertising agency in Indore. Facebook, Instagram & Click-to-WhatsApp lead funnels engineered for qualified B2B & local leads with measurable ROI.',
    keywords: 'Meta ads agency in Indore, Facebook and Instagram ads agency in Indore, click to WhatsApp ads agency India, WhatsApp lead generation funnel agency India, Instagram ads agency in Vijay Nagar Indore, Meta ads specialist in Indore, Meta ads management charges in India, Facebook lead generation package for small business India, performance marketing agency in Indore, TezScale',
  },
  '/services/ecommerce': {
    title: 'E-Commerce Website Development & Scaling in Indore — TezScale',
    description: 'E-commerce website development & Shopify store scaling in Indore. 1-step checkout, UPI payment gateways, automated WhatsApp abandoned cart recovery & Meta Ads.',
    keywords: 'ecommerce website development company in Indore, Shopify store development agency in Indore, ecommerce website development cost in India, Shopify store setup charges in India, ecommerce marketing agency for D2C brands India, fast 1-step checkout ecommerce website India, UPI payment gateway integration website developer India, abandoned cart WhatsApp recovery setup India, TezScale',
  },
  '/services/social-media': {
    title: 'Social Media & Reels Marketing Agency in Indore — TezScale',
    description: 'Viral Instagram reels production & social media marketing agency in Indore. High-converting short-form video shooting, editing, content strategy & community growth.',
    keywords: 'social media marketing agency in Indore, Instagram reel ads for retail and D2C brands Indore, viral reels making Indore, Instagram growth agency in Vijay Nagar Indore, short video editing agency Indore, B2B marketing agency Indore, TezScale',
  },
  '/services/graphic-design': {
    title: 'Logo, Brand Kit & Ad Creative Design in Indore — TezScale',
    description: 'Professional graphic design & brand kit agency in Indore. High-converting ad creatives, 3D visual identities, logos, brochures & complete visual branding packages.',
    keywords: 'graphic design and branding agency in Indore, logo and brand kit designer in Indore, ad creatives designer, marketing brochures Indore, brand identity designer Vijay Nagar Indore, TezScale',
  },
};

const RouteSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const meta = ROUTE_METADATA[pathname] || {
      title: 'TezScale — Digital Marketing & Web Development Agency in Indore',
      description: 'TezScale is Indore\'s premier performance marketing, SEO, and web development agency accelerating digital client growth.',
      keywords: 'TezScale, digital marketing agency in Indore, website development company in Indore, local SEO Indore',
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

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', meta.keywords);

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
