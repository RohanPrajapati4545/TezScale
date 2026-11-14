import SiteContent from '../models/SiteContent.js';

export const defaultContent = {
  hero: {
    badge: 'Grow Faster. Grow Smarter.',
    titleLine1: 'We are actively providing services to',
    titleLine2: 'digitally grow your business with us.',
    description:
      'Transform your online presence with result-driven digital marketing strategies that bring real business growth.',
    primaryCta: 'Get a Free Consultation',
    secondaryCta: 'Watch Our Video',
    trafficStat: '+250%',
    trafficGrowth: 'Business Growth',
    roiStat: '98%',
    roiLabel: 'Client Satisfaction',
  },
  trustBar: {
    sectors: ['Healthcare', 'Real Estate', 'Engineering'],
    trustedText: 'Trusted by 500+ Happy Clients',
  },
  servicesSection: {
    badge: 'Our Services',
    title: 'Complete Digital Marketing Solutions',
    description: 'End-to-end services to help you build, grow and scale your business online.',
  },
  services: [
    {
      title: 'Website Builder & Development',
      desc: 'Modern, fast & SEO-friendly websites.',
      icon: 'Code',
      badgeBg: 'bg-blue-600 text-white',
    },
    {
      title: 'Graphic Design',
      desc: 'Creative designs that stand out.',
      icon: 'Palette',
      badgeBg: 'bg-purple-600 text-white',
    },
    {
      title: 'Digital Marketing Support',
      desc: 'SEO, content & email marketing.',
      icon: 'Megaphone',
      badgeBg: 'bg-emerald-500 text-white',
    },
    {
      title: 'E-commerce Support',
      desc: 'Sell online with confidence.',
      icon: 'ShoppingCart',
      badgeBg: 'bg-amber-500 text-white',
    },
    {
      title: 'Social Media Services',
      desc: 'Grow your community.',
      icon: 'Share2',
      badgeBg: 'bg-indigo-600 text-white',
    },
    {
      title: 'Meta Ads Management',
      desc: 'Get more leads & sales.',
      icon: 'Infinity',
      badgeBg: 'bg-emerald-600 text-white',
    },
  ],
  whyChooseUs: {
    badge: 'Why Choose Us',
    title: 'Your Growth, Our Mission',
    description:
      "We combine creativity, technology and data-driven strategies to deliver measurable results. From SEO to Meta Ads, we're here to help your business reach new heights.",
    points: [
      'Result-Driven Strategies',
      '24/7 Support',
      'Expert Team',
      'Custom Solutions',
      'Transparent Reporting',
      'Long-Term Partnership',
    ],
    buttonText: 'About Us',
  },
  portfolioSection: {
    badge: 'Our Work',
    title: 'Some Success Stories',
    description: 'Real results. Real businesses. Real growth.',
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
      subtitle: '+220% Traffic',
      badge: '+220% Traffic',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Real Estate Growth',
      subtitle: '+180% Leads',
      badge: '+180% Leads',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'E-commerce Boost',
      subtitle: '+300% Sales',
      badge: '+300% Sales',
      image:
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    },
  ],
  testimonialsSection: {
    badge: 'Testimonials',
    title: 'What Our Clients Say',
    description: 'Trusted by businesses across industries.',
  },
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      role: 'Clinic Owner',
      quote:
        'GrowthMax completely transformed our online presence. Their strategies brought us 3x more leads in just 3 months!',
      avatar:
        'https://images.unsplash.com/photo-1594824813589-9a25b1641ba5?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
    {
      name: 'Rohit Verma',
      role: 'Director, UrbanSpace',
      quote:
        'Outstanding ROI on our Meta ad campaigns. The leads are highly qualified and our sales velocity has doubled.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
  ],
  ctaBanner: {
    title: 'Ready to Grow Your Business?',
    subtitle: "Let's create a winning digital strategy together.",
    buttonText: 'Get a Free Consultation',
  },
  contactInfo: {
    phone: '+91 98765 43210',
    email: 'hello@growthmax.in',
    location: 'Indore, MP',
  },
};

// @desc    Get active site content (auto-seed if empty or reset)
export const getContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create(defaultContent);
      console.log('🌱 Seeded updated site content into MongoDB');
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch site content',
      error: error.message,
    });
  }
};

// @desc    Update dynamic site content
export const updateContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent(defaultContent);
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      content[key] = updates[key];
    });

    await content.save();

    res.status(200).json({
      success: true,
      message: 'Site content updated successfully!',
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

    res.status(200).json({
      success: true,
      message: 'Site content reset to updated design defaults!',
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
