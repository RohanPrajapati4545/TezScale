import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiFetch, { clearApiCache } from '../api/apiClient';

const ContentContext = createContext();

export const defaultSiteContent = {
  agencyName: 'TezScale',
  agencyTagline: 'Accelerating Digital Growth',
  branding: {
    logoUrl: '/tezscale-logo.png',
    faviconUrl: '/tezscale-logo.png',
    agencyName: 'TezScale',
    tagline: 'ACCELERATING DIGITAL GROWTH',
  },
  media: {
    homeHeroVideo: '/tezscale-hero-video.mp4',
    homeHeroBgImage: '',
    servicesHeroVideo: '/services-hero-video.mp4',
    aboutHeroVideo: '/page-hero-video.mp4',
    testimonialsHeroVideo: '/page-hero-video.mp4',
    portfolioHeroVideo: '/page-hero-video.mp4',
    contactHeroVideo: '/page-hero-video.mp4',
    agencyHqVideo: '/page-hero-video.mp4',
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
    backgroundVideo: '/tezscale-hero-video.mp4',
    backgroundImage: '',
    modalVideo: '/tezscale-hero-video.mp4',
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
      title: 'Website Builder & Development',
      desc: 'Creation of responsive, ultra-fast & SEO-optimized websites built on modern frameworks with mobile-first indexing.',
      icon: 'Code',
      badgeBg: 'bg-[#00A3E0] text-white',
    },
    {
      title: 'Graphic Design & Brand Kits',
      desc: 'Visual identity creation, high-impact logos, brochures, social media assets, and comprehensive brand kits.',
      icon: 'Palette',
      badgeBg: 'bg-purple-600 text-white',
    },
    {
      title: 'Digital Marketing Support (SEO)',
      desc: 'Holistic growth strategies encompassing technical SEO, Google Maps Top 3 ranking, and conversion funnels.',
      icon: 'Megaphone',
      badgeBg: 'bg-emerald-500 text-white',
    },
    {
      title: 'E-Commerce Enablement & Scaling',
      desc: 'Empowering retail clients to sell online with seamless payment gateways, inventory control & shopping cart optimization.',
      icon: 'ShoppingCart',
      badgeBg: 'bg-amber-500 text-white',
    },
    {
      title: 'Social Media Strategy & Reels',
      desc: 'Organic growth strategies across LinkedIn, Instagram & YouTube with active community management and short-form video creation.',
      icon: 'Share2',
      badgeBg: 'bg-indigo-600 text-white',
    },
    {
      title: 'Meta Ads Management (FB & IG)',
      desc: 'High-ROI paid advertising campaigns on Facebook & Instagram with pixel tracking, audience retargeting & lead generation.',
      icon: 'Infinity',
      badgeBg: 'bg-cyan-600 text-white',
    },
  ],
  whyChooseUs: {
    badge: 'Why Choose TezScale',
    title: 'Your Growth, Our Mission',
    description:
      'We combine creativity, technology and data-driven strategies to deliver measurable results. Tailored specifically for Medical Clinics, Real Estate Brokers, Engineering Firms, and Ambitious Entrepreneurs.',
    founderImage: '/tezscale-founder.jpg',
    badge1Title: 'Your Growth',
    badge1Subtitle: 'Our Priority',
    badge2Title: '+300%',
    badge2Subtitle: 'Traffic Growth',
    hqVideoUrl: '/page-hero-video.mp4',
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
  caseStudies: [
    {
      title: 'Clinic SEO Success',
      subtitle: '+220% Patient Inquiries',
      badge: '+220% Traffic',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=75',
    },
    {
      title: 'Real Estate Growth',
      subtitle: '+180% High-Intent Leads',
      badge: '+180% Leads',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75',
    },
    {
      title: 'E-commerce & Manufacturing',
      subtitle: '+300% Direct Sales',
      badge: '+300% Sales',
      image:
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=75',
    },
  ],
  testimonialsSection: {
    badge: 'Client Endorsements',
    title: 'What Our Clients Say',
    description: 'Trusted by doctors, brokers, and industry leaders.',
  },
  testimonials: [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      role: 'Clinic Director, Apex Healthcare',
      sector: 'Healthcare & Clinics',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1594824813589-9a25b1641ba5?auto=format&fit=crop&w=150&q=80',
      quote:
        'TezScale completely transformed our online presence and local SEO. Their automated booking workflows brought us 3x more patient consultations in just 90 days!',
      highlight: '3x Patient Consultations',
    },
    {
      id: 2,
      name: 'Rohit Verma',
      role: 'Managing Broker, UrbanSpace Realty',
      sector: 'Real Estate & Properties',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      quote:
        'The lead quality from TezScale Meta Ads and CRM tracking has exceeded all our expectations. Our property closing velocity has more than doubled.',
      highlight: '2x Property Closing',
    },
    {
      id: 3,
      name: 'Vikram Patel',
      role: 'VP Operations, Apex Engineering',
      sector: 'Industrial Manufacturing B2B',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
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
      image: '/rohan-prajapati.jpg',
      bio: 'MERN Stack Developer with extensive expertise building microservices-based SaaS platforms (React.js, Node.js, Express.js, MongoDB, Docker, Socket.IO, WebRTC). Leading digital engineering at TezScale.',
      social: {
        github: 'https://github.com/RohanPrajapati4545',
        linkedin: 'https://linkedin.com/in/rohan-prajapati-517128206/',
      },
    },
    {
      slug: 'aarav-singhania',
      name: 'Aarav Singhania',
      role: 'Founder & Chief Growth Officer',
      badge: 'Growth Strategy',
      service: 'digital-marketing',
      serviceName: 'Digital Marketing Support (SEO)',
      image: '/tezscale-founder.jpg',
      bio: 'Strategic advisor to 200+ high-growth B2B firms. Specializes in scalable inbound funnels, algorithmic media buying, and predictable revenue acceleration systems.',
      social: {
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
      image: '/rustam-rathore.jpg',
      bio: 'AI/ML specialist with deep expertise in Python, PyTorch, Scikit-learn, LangChain, and RAG pipelines. Architecting automated machine learning pipelines and generative AI solutions.',
      social: {
        github: 'https://github.com/Rustam-Rathore',
        linkedin: 'https://linkedin.com/in/rustam-rathore-9637162a7/',
      },
    },
  ],
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
  },
};

// Key for fast offline & instant local persistence
const STORAGE_KEY = 'tezscale_cached_content_v6';

const getInitialContent = () => {
  if (typeof window === 'undefined') return defaultSiteContent;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.hero?.titleLine1?.includes('actively providing')) {
        parsed.hero = { ...defaultSiteContent.hero };
      }
      // Purge old dummy reviews
      if (parsed.testimonials && parsed.testimonials.some(t => t.name === 'Rohit Sharma' || t.name === 'Rajesh Singhal')) {
        parsed.testimonials = defaultSiteContent.testimonials;
      }
      // Purge old dummy team members
      if (parsed.team && parsed.team.some(m => m.slug === 'neha-kulkarni' || m.slug === 'vikram-malhotra')) {
        parsed.team = defaultSiteContent.team;
      }
      return { ...defaultSiteContent, ...parsed };
    }
  } catch (e) {}
  return defaultSiteContent;
};

export const ContentProvider = ({ children }) => {
  // Always immediately initialized - NEVER blocks UI with a full-screen spinner
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
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Background fetch (Stale-While-Revalidate)
  const fetchContent = useCallback(async () => {
    try {
      const res = await apiFetch('/content', {
        signal: AbortSignal.timeout(3500),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setContent(data.data);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
        } catch (e) {}
      }
    } catch (err) {
      // Retain instant default content without blocking user
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContent = async (updatedData) => {
    try {
      setContent(updatedData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      } catch (e) {}

      clearApiCache('/content');

      const res = await apiFetch('/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setContent(data.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
        return { success: true, message: 'Updated successfully in database!' };
      }
      return { success: true, message: 'Saved locally' };
    } catch (err) {
      return { success: true, message: 'Saved locally' };
    }
  };

  const resetContent = async () => {
    try {
      setContent(defaultSiteContent);
      clearApiCache('/content');
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent));
      } catch (e) {}

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

  // Synchronize dynamic favicon whenever branding changes
  useEffect(() => {
    const faviconUrl = content?.branding?.faviconUrl;
    if (faviconUrl) {
      const links = document.querySelectorAll("link[rel*='icon']");
      if (links.length > 0) {
        links.forEach((l) => (l.href = faviconUrl));
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl;
        document.head.appendChild(link);
      }
    }
  }, [content?.branding?.faviconUrl]);

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        updateContent,
        resetContent,
        fetchContent,
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
