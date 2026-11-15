import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiFetch, { clearApiCache } from '../api/apiClient';

const ContentContext = createContext();

export const defaultSiteContent = {
  agencyName: 'TezScale',
  agencyTagline: 'Digital Growth & Marketing Agency',
  hero: {
    badge: 'Grow Faster. Get More Leads.',
    titleLine1: 'Scale Your Business',
    titleLine2: 'with Digital Marketing',
    description:
      'Get high-quality leads, more customers and real business growth with data-driven digital marketing strategies.',
    primaryCta: 'Get Free Consultation',
    secondaryCta: 'Watch How It Works',
    trafficStat: '+250%',
    trafficGrowth: 'Business Growth',
    roiStat: '98%',
    roiLabel: 'Client Satisfaction',
  },
  trustBar: {
    sectors: ['Healthcare (Clinics)', 'Real Estate', 'Engineering & Manufacturing'],
    trustedText: 'Trusted by 500+ High-Growth Clients',
  },
  servicesSection: {
    badge: 'Our Core Service Pillars',
    title: 'Complete Digital Marketing Solutions',
    description: 'End-to-end services to help you build, grow and scale your business online with measurable ROI.',
  },
  services: [
    {
      title: 'Website Builder & Development',
      desc: 'Creation of responsive, ultra-fast & SEO-optimized websites built on modern frameworks with mobile-first indexing.',
      icon: 'Code',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      title: 'Graphic Design & Creative Brand Kits',
      desc: 'Visual identity creation, high-impact logos, brochures, social media assets, and comprehensive brand kits.',
      icon: 'Palette',
      badgeBg: 'bg-purple-600 text-white',
    },
    {
      title: 'Digital Marketing Support (Local SEO)',
      desc: 'Holistic growth strategies encompassing technical SEO, high-converting content marketing, and automated email funnels.',
      icon: 'Megaphone',
      badgeBg: 'bg-emerald-500 text-white',
    },
    {
      title: 'E-commerce Enablement & Scaling',
      desc: 'Empowering retail clients to sell online with seamless payment gateways, inventory control & shopping cart optimization.',
      icon: 'ShoppingCart',
      badgeBg: 'bg-amber-500 text-white',
    },
    {
      title: 'Social Media Strategy & Reels',
      desc: 'Organic growth strategies across LinkedIn, Instagram & X with active community management and content scheduling.',
      icon: 'Share2',
      badgeBg: 'bg-indigo-600 text-white',
    },
    {
      title: 'Meta Ads Management (FB & IG)',
      desc: 'High-ROI paid advertising campaigns on Facebook & Instagram with pixel tracking, audience retargeting & lead generation.',
      icon: 'Infinity',
      badgeBg: 'bg-emerald-600 text-white',
    },
  ],
  whyChooseUs: {
    badge: 'Why Choose TezScale',
    title: 'Your Growth, Our Mission',
    description:
      "We combine creativity, technology and data-driven strategies to deliver measurable results. Tailored specifically for Medical Clinics, Real Estate Brokers, Engineering Firms, and Ambitious Entrepreneurs.",
    points: [
      'Result-Driven B2B Lead Generation',
      '24/7 Dedicated Support & Monitoring',
      'Industry-Specific Expert Teams',
      'Custom Tailored Solutions & Tech Stack',
      'Transparent Reporting & ROI Dashboards',
      'Long-Term Growth Partnerships',
    ],
    buttonText: 'About TezScale',
  },
  portfolioSection: {
    badge: 'Our Work',
    title: 'Some Success Stories',
    description: 'Real results. Real businesses. Real growth across our targeted verticals.',
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
      role: 'Clinic Director, Apex Healthcare',
      quote:
        'TezScale completely transformed our online presence and local SEO. Their automated booking workflows brought us 3x more patient consultations in just 90 days!',
      avatar:
        'https://images.unsplash.com/photo-1594824813589-9a25b1641ba5?auto=format&fit=crop&w=150&q=75',
      rating: 5,
    },
    {
      name: 'Rohit Verma',
      role: 'Managing Broker, UrbanSpace Realty',
      quote:
        'The lead quality from TezScale Meta Ads and CRM tracking has exceeded all our expectations. Our property closing velocity has more than doubled.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=75',
      rating: 5,
    },
    {
      name: 'Vikram Patel',
      role: 'VP Operations, Apex Engineering',
      quote:
        'TezScale engineered a comprehensive B2B product catalog and digital branding that allowed us to acquire high-value manufacturing contracts overseas.',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=75',
      rating: 5,
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
const STORAGE_KEY = 'tezscale_cached_content_v2';

const getInitialContent = () => {
  if (typeof window === 'undefined') return defaultSiteContent;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
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
