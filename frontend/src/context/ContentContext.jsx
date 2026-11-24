import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiFetch, { clearApiCache } from '../api/apiClient';

const ContentContext = createContext();

export const defaultSiteContent = {
  agencyName: 'TezScale',
  agencyTagline: 'Accelerating Digital Growth',
  branding: {
    logoUrl: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431529/tezscale_assets/tezscale-logo.png',
    faviconUrl: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431529/tezscale_assets/tezscale-logo.png',
    agencyName: 'TezScale',
    tagline: 'ACCELERATING DIGITAL GROWTH',
  },
  media: {
    homeHeroVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431532/tezscale_assets/tezscale-hero-video.mp4',
    homeHeroBgImage: '',
    servicesHeroVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431561/tezscale_assets/services-hero-video.mp4',
    aboutHeroVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4',
    testimonialsHeroVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4',
    portfolioHeroVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4',
    contactHeroVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4',
    agencyHqVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4',
  },
  hero: {
    badge: 'Welcome to TezScale',
    titleLine1: 'Transform your Marketing Strategy',
    titleLine2: 'with the Power of TezScale',
    description:
      'Elevate your campaigns, maximize ROI, and accelerate predictable digital growth with our full-stack web, branding, and performance marketing solutions.',
    primaryCta: 'What we do?',
    secondaryCta: 'Explore Services',
    stat1Value: '5K+',
    stat1Label: 'Clients Scaled',
    stat2Value: '300%+',
    stat2Label: 'Avg ROAS Growth',
    stat3Value: '4.9/5',
    stat3Label: 'Client Rating',
    backgroundVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431532/tezscale_assets/tezscale-hero-video.mp4',
    backgroundImage: '',
    modalVideo: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431532/tezscale_assets/tezscale-hero-video.mp4',
  },
  trustBar: {
    sectors: ['Healthcare (Clinics)', 'Real Estate', 'Engineering & Manufacturing'],
    trustedText: 'Trusted by 500+ High-Growth Clients',
  },
  servicesSection: {
    badge: 'Our Core Offerings',
    title: 'Complete Digital Marketing Solutions',
    description: 'End-to-end services to help you build, grow and scale your business online with measurable ROI.',
  },
  services: [
    {
      id: 'web-dev',
      slug: 'web-development',
      title: 'Website Builder & Development',
      desc: 'Creation of responsive, ultra-fast & SEO-optimized websites built on modern frameworks with mobile-first indexing.',
      icon: 'Code',
      iconName: 'Code2',
      badgeBg: 'bg-[#00A3E0] text-white',
      badge: 'Best Quality at Easy Cost • Accelerated 2-Day Staging in Indore',
      category: 'Engineering & Conversion UI',
      deliverables: [
        'Ultra-fast Vite & React single-page architecture (zero lag)',
        '100% mobile & tablet responsive layout tested across 30+ viewports',
        'Instant encrypted WhatsApp lead routing with pre-filled triggers',
        'Clean Section 3.1 compliant consultation & lead capture forms',
        'Free SSL certificates, DNS hosting setup & 24/7 uptime monitoring',
        'Comprehensive on-page technical SEO & structured schema markup',
      ],
      tech: ['React', 'Tailwind CSS', 'Node.js', 'Vite', 'MongoDB'],
      stats: '100% Mobile Optimized',
    },
    {
      id: 'graphic-design',
      slug: 'graphic-design',
      title: 'Graphic Design & Brand Kits',
      desc: 'Visual identity creation, high-impact logos, brochures, social media assets, and comprehensive brand kits.',
      icon: 'Palette',
      iconName: 'Palette',
      badgeBg: 'bg-purple-600 text-white',
      badge: 'Conversion-Focused Assets',
      category: 'Visual Identity & Ad Creatives',
      deliverables: [
        'Complete brand identity (logos, color palettes, fonts)',
        'High-CTR Meta & Google ad creative variations',
        'Corporate presentation decks & brochure designs',
        'Marketing collateral for print & digital distribution',
      ],
      tech: ['Figma', 'Adobe Photoshop', 'Illustrator', 'Canva Pro'],
      stats: 'High-CTR Ad Creatives',
    },
    {
      id: 'seo-marketing',
      slug: 'digital-marketing',
      title: 'Digital Marketing Support (SEO)',
      desc: 'Holistic growth strategies encompassing technical SEO, Google Maps Top 3 ranking, and conversion funnels.',
      icon: 'Megaphone',
      iconName: 'Megaphone',
      badgeBg: 'bg-emerald-500 text-white',
      badge: 'Indore Local SEO & Top 3 Maps Rank',
      category: 'Organic Growth & Local Search',
      deliverables: [
        'Local SEO & Google Business Profile (GBP) Top 3 Map pack ranking',
        'Keyword research & competitor gap analysis for local buyers',
        'High-authority local directory citations & review velocity strategy',
        'Conversion-optimized landing funnels tailored for local search',
      ],
      tech: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Google Analytics 4'],
      stats: 'Top 3 Google Maps Ranking',
    },
    {
      id: 'ecommerce',
      slug: 'ecommerce',
      title: 'E-Commerce Enablement & Scaling',
      desc: 'Empowering retail clients to sell online with seamless payment gateways, inventory control & shopping cart optimization.',
      icon: 'ShoppingCart',
      iconName: 'ShoppingCart',
      badgeBg: 'bg-amber-500 text-white',
      badge: 'Direct-to-Consumer Engine',
      category: 'Online Store & Cart Optimization',
      deliverables: [
        'Custom Shopify or MERN headless e-commerce store architecture',
        'Razorpay, Cashfree & Stripe secure 1-click checkout flow',
        'Automated abandoned cart WhatsApp recovery triggers',
        'High-converting mobile product detail pages (PDP)',
      ],
      tech: ['Shopify', 'Razorpay', 'Next.js', 'Tailwind CSS'],
      stats: '3x Cart Checkout Velocity',
    },
    {
      id: 'social-media',
      slug: 'social-media',
      title: 'Social Media Strategy & Reels',
      desc: 'Organic growth strategies across LinkedIn, Instagram & YouTube with active community management and short-form video creation.',
      icon: 'Share2',
      iconName: 'Share2',
      badgeBg: 'bg-indigo-600 text-white',
      badge: 'Viral Short-Form Content',
      category: 'Brand Awareness & Community',
      deliverables: [
        'Monthly viral short-form video scripting (Reels / Shorts)',
        'High-engagement carousel graphic templates',
        'Proactive comment & DM community management',
        'Influencer outreach & collaborative brand campaigns',
      ],
      tech: ['CapCut', 'Premiere Pro', 'Meta Business Suite', 'Metricool'],
      stats: '10x Social Engagement',
    },
    {
      id: 'meta-ads',
      slug: 'meta-ads',
      title: 'Meta Ads Management (FB & IG)',
      desc: 'High-ROI paid advertising campaigns on Facebook & Instagram with pixel tracking, audience retargeting & lead generation.',
      icon: 'Infinity',
      iconName: 'InfinityIcon',
      badgeBg: 'bg-cyan-600 text-white',
      badge: 'Algorithmic Lead Generation',
      category: 'Performance Marketing',
      deliverables: [
        'Advanced Meta Conversions API (CAPI) & pixel tracking',
        'Dynamic creative testing (A/B testing ad copy & creatives)',
        'Lookalike & custom retargeting funnel sequences',
        'Instant WhatsApp CRM notifications for new ad leads',
      ],
      tech: ['Meta Ads Manager', 'Conversions API', 'Google Tag Manager', 'Zapier'],
      stats: '3.5x+ Proven ROAS',
    },
  ],
  whyChooseUs: {
    badge: 'Why Choose TezScale',
    title: 'Your Growth, Our Mission',
    description:
      'We combine creativity, technology and data-driven strategies to deliver measurable results. Tailored specifically for Medical Clinics, Real Estate Brokers, Engineering Firms, and Ambitious Entrepreneurs.',
    founderImage: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431565/tezscale_assets/tezscale-founder.jpg',
    founderVisual: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431570/tezscale_assets/founder-nobg.png',
    badge1Title: 'Your Growth',
    badge1Subtitle: 'Our Priority',
    badge2Title: '+300%',
    badge2Subtitle: 'Traffic Growth',
    hqVideoUrl: 'https://res.cloudinary.com/qwpdsvyf/video/upload/v1795431546/tezscale_assets/page-hero-video.mp4',
    points: [
      'Result-Driven B2B Lead Generation',
      '24/7 Dedicated Support & Monitoring',
      'Industry-Specific Expert Teams',
      'Custom Tailored Solutions & Tech Stack',
      'Transparent Reporting & ROI Dashboards',
      'Long-Term Growth Partnerships',
    ],
  },
  portfolioSection: {
    badge: 'Our Work',
    title: 'Some Success Stories',
    description: 'Real results. Real businesses. Real growth across our targeted verticals.',
  },
  portfolio: [
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
      categoryName: 'Retail & E-Commerce',
      metric: '+300% Direct Sales',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      description: 'High-speed headless storefront architecture integrated with 1-click Razorpay checkout and automated WhatsApp cart recovery flows.',
      results: [
        '300% increase in weekly direct-to-consumer store revenue',
        '28% recovery of abandoned carts through automated triggers',
        '0.9s average mobile page load time across pan-India networks',
      ],
    },
    {
      id: 4,
      title: 'Industrial B2B Export Acquisition',
      subtitle: 'Precision Engineering & Manufacturing Firm',
      category: 'manufacturing',
      categoryName: 'Engineering & B2B',
      metric: '+400% Inbound B2B Inquiries',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      description: 'Technical B2B keyword ranking combined with interactive product CAD specification sheets and verified RFQ submission pipelines.',
      results: [
        'Ranked #1 for 20+ specialized industrial machinery keywords',
        'Secured 4 multi-crore international export contracts',
        '55% reduction in customer acquisition cost vs trade expos',
      ],
    },
  ],
  caseStudies: [
    {
      title: 'Clinic SEO Success',
      subtitle: '+220% Patient Inquiries',
      badge: '+220% Traffic',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Real Estate Growth',
      subtitle: '+180% High-Intent Leads',
      badge: '+180% Leads',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'E-commerce & Manufacturing',
      subtitle: '+300% Direct Sales',
      badge: '+300% Sales',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    },
  ],
  dashboardMetrics: {
    totalInquiriesOverride: '',
    newLeadsOverride: '',
    weeklyVisitors: '2,456',
    activeAudience: '29,700',
    pipelineValue: '₹4.2 Cr',
  },
  metrics: {
    stat1Value: '250%',
    stat1Label: 'Average Growth',
    stat2Value: '500+',
    stat2Label: 'Happy Clients',
    stat3Value: '5+',
    stat3Label: 'Years Experience',
  },
  testimonialsSection: {
    badge: 'Client Endorsements',
    title: 'What Our Clients Say',
    description: 'Trusted by doctors, brokers, and industry leaders.',
  },
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      role: 'Clinic Director, Apex Healthcare (Vijay Nagar, Indore)',
      sector: 'Healthcare & Clinics',
      rating: 5,
      avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439200/tezscale_assets/client-priya.jpg',
      quote:
        'TezScale completely transformed our online presence and local SEO. Their automated booking workflows brought us 3x more patient consultations in just 90 days!',
      highlight: '3x Patient Consultations',
    },
    {
      name: 'Rohit Verma',
      role: 'Managing Broker, UrbanSpace Realty (AB Road & Super Corridor, Indore)',
      sector: 'Real Estate & Properties',
      rating: 5,
      avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439200/tezscale_assets/client-rohit.jpg',
      quote:
        'The lead quality from TezScale Meta Ads and CRM tracking has exceeded all our expectations. Our property closing velocity has more than doubled.',
      highlight: '2x Property Closing',
    },
    {
      name: 'Vikram Patel',
      role: 'VP Operations, Apex Engineering (Pithampur Industrial Area)',
      sector: 'Industrial Manufacturing B2B',
      rating: 5,
      avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439201/tezscale_assets/client-vikram.jpg',
      quote:
        'As an industrial B2B exporter, getting genuine buyer inquiries online was our biggest bottleneck. TezScale optimized our global digital footprint and we secured multi-country supply contracts.',
      highlight: 'Global B2B Contracts',
    },
  ],
  team: [
    {
      slug: 'rohan-prajapati',
      name: 'Rohan Prajapati',
      role: 'Lead Full-Stack Web Developer',
      badge: 'Full-Stack Developer',
      service: 'web-development',
      serviceName: 'Website Builder & Development',
      location: 'Indore, India',
      experience: '1+ Years in Microservices SaaS & Full-Stack Development',
      phone: '+916262778128',
      whatsapp: 'https://wa.me/916262778128?text=Hi%20Rohan,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
      email: 'rohanprajapati4545@gmail.com',
      image: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg',
      bio: 'MERN Stack Developer with extensive expertise building microservices-based SaaS platforms (React.js, Node.js, Express.js, MongoDB, Docker, Socket.IO, WebRTC). Leading digital engineering at TezScale.',
      social: {
        github: 'https://github.com/RohanPrajapati4545',
        linkedin: 'https://linkedin.com/in/rohan-prajapati-517128206/',
        whatsapp: 'https://wa.me/916262778128?text=Hi%20Rohan,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
        email: 'rohanprajapati4545@gmail.com',
      },
    },
    {
      slug: 'shubham-karma',
      name: 'Shubham Karma',
      role: 'International Logistics & B2B Trade Specialist',
      badge: 'International Logistics',
      service: 'digital-marketing',
      serviceName: 'International Logistics & B2B Trade',
      location: 'Indore, Madhya Pradesh, India',
      experience: '3+ Years in International Logistics, Export Compliance & Supply Chain',
      phone: '+916262778128',
      whatsapp: 'https://wa.me/916262778128?text=Hi%20Shubham,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
      email: 'Shubhamvkarma143@gmail.com',
      image: '/shubham-karma.jpg',
      bio: 'Results-driven international business and trade logistics specialist with proven track record in end-to-end global supply chains, customs compliance, and export documentation. Specialized in US freight logistics, duty tariff optimization, Athena ASN management, and accelerating international B2B trade pipelines.',
      social: {
        whatsapp: 'https://wa.me/916262778128?text=Hi%20Shubham,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
        email: 'Shubhamvkarma143@gmail.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      slug: 'rustam-rathore',
      name: 'Rustam Rathore',
      role: 'AI/ML Engineer',
      badge: 'AI & Machine Learning',
      service: 'web-development',
      serviceName: 'Website Builder & Development',
      location: 'LIG Square, Indore (M.P), India',
      experience: 'Machine Learning, Deep Learning & Generative AI',
      phone: '+916262778128',
      whatsapp: 'https://wa.me/916262778128?text=Hi%20Rustam,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
      email: 'rustamrathore@gmail.com',
      image: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431575/tezscale_assets/rustam-rathore.jpg',
      bio: 'AI/ML specialist with deep expertise in Python, PyTorch, Scikit-learn, LangChain, and RAG pipelines. Architecting automated machine learning pipelines and generative AI solutions.',
      social: {
        github: 'https://github.com/Rustam-Rathore',
        linkedin: 'https://linkedin.com/in/rustam-rathore-9637162a7/',
        whatsapp: 'https://wa.me/916262778128?text=Hi%20Rustam,%20I%20want%20to%20connect%20with%20you%20regarding%20TezScale%20services.',
        email: 'rustamrathore@gmail.com',
      },
    },
  ],
  faqs: [
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
  ],
  about: {
    steps: [
      {
        step: '01',
        title: 'Discovery & Deep Audit',
        desc: 'We analyze your existing website, competitor benchmarks, conversion barriers, and local search opportunities.',
      },
      {
        step: '02',
        title: 'Custom Architecture',
        desc: 'Crafting tailored ad creative sets, responsive high-speed landing funnels, and precision keyword targeting.',
      },
      {
        step: '03',
        title: 'Agile Launch & Staging',
        desc: 'Per our accelerated roadmap, review a working draft in 2 days and go live with DNS setup within 5-6 business days.',
      },
      {
        step: '04',
        title: 'Scale & Multiply ROI',
        desc: 'Automated WhatsApp routing delivers leads in < 2 mins while we continuously optimize CAC and ROAS.',
      },
    ],
    pillars: [
      {
        title: 'Result-Driven Strategies',
        desc: 'We don’t settle for vanity clicks. Every campaign is laser-focused on qualified lead generation and tangible revenue.',
      },
      {
        title: '24/7 Support & Monitoring',
        desc: 'Continuous uptime monitoring, instant WhatsApp support, and regular technical health checks for your digital assets.',
      },
      {
        title: 'Expert Multi-Disciplinary Team',
        desc: 'Full-stack developers, Google/Meta certified media buyers, and UI/UX designers collaborating under one roof.',
      },
      {
        title: 'Transparent Reporting',
        desc: 'No vague spreadsheets. Clear, real-time dashboards showing exactly how much you invested and what it produced.',
      },
    ],
  },
  ctaBanner: {
    title: 'Ready to Scale Your Business Digitally?',
    subtitle: "Let's build a customized, high-converting digital growth roadmap together.",
    buttonText: 'Get a Free Consultation',
  },
  contactInfo: {
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'hello@tezscale.com',
    location: 'Indore, MP, India',
    businessHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
    socials: {
      linkedin: 'https://www.linkedin.com/company/tezscale/posts/',
      instagram: 'https://www.instagram.com/tezscale/',
      youtube: 'https://www.youtube.com/@tezscale',
      github: 'https://github.com/RohanPrajapati4545',
    },
  },
};

// Key for fast offline & instant local persistence
const STORAGE_KEY = 'tezscale_cached_content_v9';
export const STORAGE_TEAM_KEY = 'tezscale_custom_team';
export const STORAGE_TESTIMONIALS_KEY = 'tezscale_custom_testimonials';

const getInitialContent = () => {
  if (typeof window === 'undefined') return defaultSiteContent;
  try {
    let teamData = defaultSiteContent.team;
    try {
      const customTeamRaw = localStorage.getItem(STORAGE_TEAM_KEY);
      if (customTeamRaw) {
        const parsedCustomTeam = JSON.parse(customTeamRaw);
        if (Array.isArray(parsedCustomTeam) && parsedCustomTeam.length > 0) {
          teamData = parsedCustomTeam;
        }
      }
    } catch (e) { }

    let testimonialsData = defaultSiteContent.testimonials;
    try {
      const customTestimonialsRaw = localStorage.getItem(STORAGE_TESTIMONIALS_KEY);
      if (customTestimonialsRaw) {
        const parsedCustomTestimonials = JSON.parse(customTestimonialsRaw);
        if (Array.isArray(parsedCustomTestimonials) && parsedCustomTestimonials.length > 0) {
          testimonialsData = parsedCustomTestimonials;
        }
      }
    } catch (e) { }

    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('tezscale_cached_content_v8');
    if (saved) {
      const parsed = JSON.parse(saved);
      const effectiveTeam = (parsed.team && Array.isArray(parsed.team) && parsed.team.length > 0)
        ? parsed.team
        : teamData;
      const effectiveTestimonials = (parsed.testimonials && Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0)
        ? parsed.testimonials
        : testimonialsData;
      return { ...defaultSiteContent, ...parsed, team: effectiveTeam, testimonials: effectiveTestimonials };
    }
    return { ...defaultSiteContent, team: teamData, testimonials: testimonialsData };
  } catch (e) { }
  return defaultSiteContent;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(getInitialContent);
  const [loading, setLoading] = useState(false);

  // Cross-tab live sync: when Admin saves changes in /backoffice tab,
  // all other open tabs (About, Testimonials, Home) instantly update without refresh
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const freshData = JSON.parse(e.newValue);
          setContent(freshData);
        } catch (err) { }
      } else if (e.key === STORAGE_TEAM_KEY && e.newValue) {
        try {
          const freshTeam = JSON.parse(e.newValue);
          if (Array.isArray(freshTeam)) {
            setContent(prev => ({ ...prev, team: freshTeam }));
          }
        } catch (err) { }
      } else if (e.key === STORAGE_TESTIMONIALS_KEY && e.newValue) {
        try {
          const freshTestimonials = JSON.parse(e.newValue);
          if (Array.isArray(freshTestimonials)) {
            setContent(prev => ({ ...prev, testimonials: freshTestimonials }));
          }
        } catch (err) { }
      }
    };

    const handleCustomUpdate = (e) => {
      if (e.detail) {
        setContent(e.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('tezscale_content_updated', handleCustomUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tezscale_content_updated', handleCustomUpdate);
    };
  }, []);

  // Background fetch (Stale-While-Revalidate with resilient team merge)
  const fetchContent = useCallback(async () => {
    try {
      const res = await apiFetch('/content', {
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        // Safe team merge: Do not let a stale/smaller backend response overwrite custom local additions
        let preservedTeam = data.data.team || [];
        try {
          const customTeamRaw = localStorage.getItem(STORAGE_TEAM_KEY);
          if (customTeamRaw) {
            const parsedCustomTeam = JSON.parse(customTeamRaw);
            if (Array.isArray(parsedCustomTeam) && parsedCustomTeam.length > 0) {
              if (parsedCustomTeam.length >= preservedTeam.length) {
                preservedTeam = parsedCustomTeam;
              }
            }
          }
        } catch (e) { }

        if (!preservedTeam || preservedTeam.length === 0) {
          preservedTeam = defaultSiteContent.team;
        }

        const mergedData = {
          ...data.data,
          team: preservedTeam,
        };

        setContent(mergedData);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
          if (preservedTeam && preservedTeam.length > 0) {
            localStorage.setItem(STORAGE_TEAM_KEY, JSON.stringify(preservedTeam));
          }
        } catch (e) { }
      }
    } catch (err) {
      // Retain instant local content without blocking user
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContent = async (updatedData) => {
    try {
      // 1. Immediately persist custom team to isolated dedicated storage
      if (updatedData.team && Array.isArray(updatedData.team)) {
        try {
          localStorage.setItem(STORAGE_TEAM_KEY, JSON.stringify(updatedData.team));
        } catch (e) { }
      }
      if (updatedData.testimonials && Array.isArray(updatedData.testimonials)) {
        try {
          localStorage.setItem(STORAGE_TESTIMONIALS_KEY, JSON.stringify(updatedData.testimonials));
        } catch (e) { }
      }

      // 2. Set React state & broadcast across current and other tabs
      setContent(updatedData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        window.dispatchEvent(new CustomEvent('tezscale_content_updated', { detail: updatedData }));
      } catch (e) { }

      clearApiCache('/content');

      // 3. Sync to backend database
      const res = await apiFetch('/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
        timeout: 25000,
      });
      const data = await res.json();
      if (res.ok && data.data) {
        const mergedBackend = {
          ...data.data,
          team: (updatedData.team && updatedData.team.length > 0) ? updatedData.team : (data.data.team || updatedData.team),
        };
        setContent(mergedBackend);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedBackend));
        if (mergedBackend.team && mergedBackend.team.length > 0) {
          localStorage.setItem(STORAGE_TEAM_KEY, JSON.stringify(mergedBackend.team));
        }
        return { success: true, message: 'Updated & synced across site instantly!' };
      }
      return { success: true, message: 'Updated live!' };
    } catch (err) {
      console.warn('Backend sync note:', err);
      return { success: true, message: 'Updated live (local fallback)' };
    }
  };

  const resetContent = async () => {
    try {
      setContent(defaultSiteContent);
      clearApiCache('/content');
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent));
        localStorage.removeItem(STORAGE_TEAM_KEY);
        window.dispatchEvent(new CustomEvent('tezscale_content_updated', { detail: defaultSiteContent }));
      } catch (e) { }

      await apiFetch('/content/reset', { method: 'POST' });
      return { success: true, message: 'Reset to TezScale specification defaults!' };
    } catch (err) {
      return { success: true, message: 'Reset to TezScale specification defaults!' };
    }
  };

  useEffect(() => {
    // Non-blocking background sync
    fetchContent();
  }, [fetchContent]);

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        updateContent,
        resetContent,
        refreshContent: fetchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export default ContentContext;
