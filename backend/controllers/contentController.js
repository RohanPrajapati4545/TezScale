import SiteContent from '../models/SiteContent.js';

const defaultContent = {
  hero: {
    badge: 'Grow Faster. Rank Higher.',
    titleLine1: 'Your Partner for',
    titleLine2: 'Digital Growth',
    description:
      'We are a full-service digital marketing agency helping businesses grow online with data-driven strategies, creative campaigns and measurable results.',
    primaryCta: 'Get a Free Strategy Call',
    secondaryCta: 'Explore Our Services',
    trafficStat: '125K',
    trafficGrowth: '+78%',
    roiStat: '320%',
  },
  metrics: {
    stat1Value: '150+',
    stat1Label: 'Happy Clients',
    stat2Value: '250%',
    stat2Label: 'Avg. Growth',
    stat3Value: '5+ Years',
    stat3Label: 'Industry Experience',
  },
  servicesSection: {
    badge: 'Our Services',
    title: 'Complete Digital Marketing Solutions',
    description:
      'From strategy to execution, we provide end-to-end digital marketing services to help your business attract, engage and convert.',
  },
  services: [
    {
      title: 'SEO',
      desc: 'Rank higher and get organic traffic.',
      icon: 'BarChart2',
      badgeBg: 'bg-blue-50',
    },
    {
      title: 'Social Media Marketing',
      desc: 'Build your brand & grow your community.',
      icon: 'Megaphone',
      badgeBg: 'bg-sky-50',
    },
    {
      title: 'Performance Marketing',
      desc: 'Drive targeted leads with data-backed ads.',
      icon: 'Target',
      badgeBg: 'bg-amber-50',
    },
    {
      title: 'Content Marketing',
      desc: 'Create content that converts.',
      icon: 'Edit3',
      badgeBg: 'bg-blue-50',
    },
    {
      title: 'Web Development',
      desc: 'Modern websites for better business.',
      icon: 'Monitor',
      badgeBg: 'bg-cyan-50',
    },
    {
      title: 'Email Marketing',
      desc: 'Turn subscribers into loyal customers.',
      icon: 'Mail',
      badgeBg: 'bg-indigo-50',
    },
  ],
  portfolioSection: {
    badge: 'Our Work',
    title: 'Real Results for Real Businesses',
    description:
      'Explore some of our successful projects where we helped brands grow and achieve their goals.',
  },
  caseStudies: [
    {
      title: 'E-Commerce Brand',
      subtitle: 'Organic Traffic Growth',
      badge: 'Growth +250%',
      type: 'ecommerce',
    },
    {
      title: 'Restaurant Business',
      subtitle: 'More Qualified Leads',
      badge: 'Leads +400%',
      type: 'restaurant',
    },
    {
      title: 'SaaS Company',
      subtitle: 'Increased Sales',
      badge: 'Sales +300%',
      type: 'saas',
    },
  ],
  testimonialsSection: {
    badge: 'Testimonials',
    title: 'What Our Clients Say',
    description:
      "Don't just take our word for it. Here's what our clients have to say about working with us.",
  },
  testimonials: [
    {
      name: 'Rohit Sharma',
      role: 'Founder, TechVista',
      quote:
        '“GrowthMax helped us 3x our website traffic in just 3 months! Their strategy and team are absolutely amazing.”',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
    },
    {
      name: 'Pooja Patel',
      role: 'Marketing Head, NexaPay',
      quote:
        '“The ROI on our ad campaigns exceeded every benchmark. They transformed our customer acquisition completely.”',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
    },
    {
      name: 'Aman Verma',
      role: 'CEO, UrbanDine',
      quote:
        '“Clear reporting, transparent metrics, and real business results from month one. Highly recommended team!”',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
    },
  ],
  ctaBanner: {
    title: 'Ready to Boost Your Business Online?',
    subtitle: "Let's create a winning digital strategy together.",
    buttonText: 'Get a Free Strategy Call',
  },
};

// @desc    Get active site content (auto-seed if empty)
// @route   GET /api/content
export const getContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create(defaultContent);
      console.log('🌱 Seeded default site content into MongoDB');
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
// @route   PUT /api/content
export const updateContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent(defaultContent);
    }

    // Merge incoming changes
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
// @route   POST /api/content/reset
export const resetContent = async (req, res) => {
  try {
    await SiteContent.deleteMany({});
    const content = await SiteContent.create(defaultContent);

    res.status(200).json({
      success: true,
      message: 'Site content reset to default successfully!',
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
