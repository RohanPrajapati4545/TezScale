import SiteContent from '../models/SiteContent.js';

export const defaultContent = {
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
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Real Estate Growth',
      subtitle: '+180% High-Intent Leads',
      badge: '+180% Leads',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'E-commerce & Manufacturing',
      subtitle: '+300% Direct Sales',
      badge: '+300% Sales',
      image:
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
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
      sector: 'Healthcare & Clinics',
      rating: 5,
      avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439200/tezscale_assets/client-priya.jpg',
      quote:
        'TezScale completely transformed our online presence and local SEO. Their automated booking workflows brought us 3x more patient consultations in just 90 days!',
      highlight: '3x Patient Consultations',
    },
    {
      name: 'Rohit Verma',
      role: 'Managing Broker, UrbanSpace Realty',
      sector: 'Real Estate & Properties',
      rating: 5,
      avatar: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795439200/tezscale_assets/client-rohit.jpg',
      quote:
        'The lead quality from TezScale Meta Ads and CRM tracking has exceeded all our expectations. Our property closing velocity has more than doubled.',
      highlight: '2x Property Closing',
    },
    {
      name: 'Vikram Patel',
      role: 'VP Operations, Apex Engineering',
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
      image: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg',
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
      image: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431565/tezscale_assets/tezscale-founder.jpg',
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
      image: 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431575/tezscale_assets/rustam-rathore.jpg',
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

// High-Speed In-Memory Cache (0ms DB Latency for GET requests)
let cachedContent = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in memory

// @desc    Get active site content (auto-seed if empty or reset)
export const getContent = async (req, res) => {
  try {
    const now = Date.now();
    if (cachedContent && now - lastCacheTime < CACHE_TTL_MS) {
      res.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
      return res.status(200).json({
        success: true,
        data: cachedContent,
        cached: true,
      });
    }

    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create(defaultContent);
      console.log('🌱 Seeded TezScale specification content into MongoDB');
    } else {
      let needsSave = false;
      if (content.hero?.titleLine1?.includes('actively providing')) {
        content.hero = defaultContent.hero;
        needsSave = true;
      }
      if (!content.team || content.team.length === 0) {
        content.team = defaultContent.team;
        needsSave = true;
      } else if (content.team.some(m => m.slug === 'neha-kulkarni' || m.slug === 'vikram-malhotra' || m.slug === 'priya-deshmukh' || m.slug === 'ananya-roy')) {
        // Strip dummy members from database
        content.team = defaultContent.team;
        needsSave = true;
      }
      if (content.testimonials && content.testimonials.some(t => t.name === 'Rohit Sharma' || t.name === 'Rajesh Singhal' || t.name === 'Ananya Verma')) {
        // Strip dummy testimonials from database
        content.testimonials = defaultContent.testimonials;
        needsSave = true;
      }
      if (needsSave) {
        await content.save();
      }
    }

    cachedContent = content;
    lastCacheTime = now;

    res.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Error fetching site content:', error);
    // If DB fails, instantly return fallback default content
    res.status(200).json({
      success: true,
      data: defaultContent,
      fallback: true,
    });
  }
};

// @desc    Update dynamic site content
export const updateContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    const updates = req.body;

    if (!content) {
      content = await SiteContent.create({ ...defaultContent, ...updates });
    } else {
      content = await SiteContent.findByIdAndUpdate(
        content._id,
        { $set: updates },
        { new: true, runValidators: false }
      );
    }

    cachedContent = content;
    lastCacheTime = Date.now();

    console.log('✅ SiteContent updated in MongoDB Atlas successfully');

    res.status(200).json({
      success: true,
      message: 'Site content updated successfully in database!',
      data: content,
    });
  } catch (error) {
    console.error('Error updating site content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update site content',
      error: error.message,
    });
  }
};

// @desc    Reset site content to default
export const resetContent = async (req, res) => {
  try {
    await SiteContent.deleteMany({});
    const content = await SiteContent.create(defaultContent);
    cachedContent = content;
    lastCacheTime = Date.now();

    res.status(200).json({
      success: true,
      message: 'Site content reset to TezScale specification defaults!',
      data: content,
    });
  } catch (error) {
    console.error('Error resetting site content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset site content',
      error: error.message,
    });
  }
};
