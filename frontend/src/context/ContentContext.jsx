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
      name: 'Siddharth Mehta',
      role: 'Head of Growth, FinScale Technologies',
      sector: 'Fintech Solutions',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      quote:
        'Speed and execution precision set TezScale apart. They delivered our entire platform staging in 2 days as promised, and our customer acquisition cost dropped by 45% in month two.',
      highlight: '-45% Cost Per Lead',
    },
  ],
  team: [
    {
      slug: 'rohan-prajapati',
      name: 'Rohan Prajapati',
      role: 'Lead Full-Stack Web Developer',
      badge: 'Full-Stack Developer',
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
      image: '/tezscale-founder.jpg',
      bio: 'Strategic advisor to 200+ high-growth B2B firms. Specializes in scalable inbound funnels, algorithmic media buying, and predictable revenue acceleration systems.',
      social: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      slug: 'neha-kulkarni',
      name: 'Dr. Neha Kulkarni',
      role: 'VP, Performance & Meta Ads',
      badge: 'Paid Acquisition',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=600&q=80',
      bio: 'Ex-agency media director overseeing ₹15M+ in ad spend with an average ROAS of 4.2x across healthcare, dental clinics, and high-ticket real estate campaigns.',
      social: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      slug: 'rustam-rathore',
      name: 'Rustam Rathore',
      role: 'AI/ML Engineer',
      badge: 'AI & Machine Learning',
      image: '/rustam-rathore.jpg',
      bio: 'AI/ML specialist with deep expertise in Python, PyTorch, Scikit-learn, LangChain, and RAG pipelines. Architecting automated machine learning pipelines and generative AI solutions.',
      social: {
        github: 'https://github.com/Rustam-Rathore',
        linkedin: 'https://linkedin.com/in/rustam-rathore-9637162a7/',
      },
    },
    {
      slug: 'vikram-malhotra',
      name: 'Vikram Malhotra',
      role: 'Senior Cloud & DevOps Engineer',
      badge: 'Cloud & DevOps',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80',
      bio: 'Cloud architecture expert with 6+ years deploying scalable Kubernetes clusters, automated CI/CD pipelines, and zero-downtime microservices.',
      social: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      slug: 'priya-deshmukh',
      name: 'Priya Deshmukh',
      role: 'Head of UI/UX & Conversion Architecture',
      badge: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80',
      bio: 'Conversion-focused visual designer specializing in brand identity systems, high-converting checkout flows, and accessible SaaS design systems.',
      social: {
        linkedin: 'https://linkedin.com',
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
const STORAGE_KEY = 'tezscale_cached_content_v5';

const getInitialContent = () => {
  if (typeof window === 'undefined') return defaultSiteContent;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.hero?.titleLine1?.includes('actively providing')) {
        parsed.hero = { ...defaultSiteContent.hero };
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
