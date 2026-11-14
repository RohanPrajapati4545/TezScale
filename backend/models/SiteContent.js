import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    hero: {
      badge: { type: String, default: 'Grow Faster. Rank Higher.' },
      titleLine1: { type: String, default: 'Your Partner for' },
      titleLine2: { type: String, default: 'Digital Growth' },
      description: {
        type: String,
        default:
          'We are a full-service digital marketing agency helping businesses grow online with data-driven strategies, creative campaigns and measurable results.',
      },
      primaryCta: { type: String, default: 'Get a Free Strategy Call' },
      secondaryCta: { type: String, default: 'Explore Our Services' },
      trafficStat: { type: String, default: '125K' },
      trafficGrowth: { type: String, default: '+78%' },
      roiStat: { type: String, default: '320%' },
    },
    metrics: {
      stat1Value: { type: String, default: '150+' },
      stat1Label: { type: String, default: 'Happy Clients' },
      stat2Value: { type: String, default: '250%' },
      stat2Label: { type: String, default: 'Avg. Growth' },
      stat3Value: { type: String, default: '5+ Years' },
      stat3Label: { type: String, default: 'Industry Experience' },
    },
    servicesSection: {
      badge: { type: String, default: 'Our Services' },
      title: { type: String, default: 'Complete Digital Marketing Solutions' },
      description: {
        type: String,
        default:
          'From strategy to execution, we provide end-to-end digital marketing services to help your business attract, engage and convert.',
      },
    },
    services: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        icon: { type: String, default: 'BarChart2' },
        badgeBg: { type: String, default: 'bg-blue-50' },
      },
    ],
    portfolioSection: {
      badge: { type: String, default: 'Our Work' },
      title: { type: String, default: 'Real Results for Real Businesses' },
      description: {
        type: String,
        default:
          'Explore some of our successful projects where we helped brands grow and achieve their goals.',
      },
    },
    caseStudies: [
      {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        badge: { type: String, required: true },
        type: { type: String, default: 'ecommerce' },
      },
    ],
    testimonialsSection: {
      badge: { type: String, default: 'Testimonials' },
      title: { type: String, default: 'What Our Clients Say' },
      description: {
        type: String,
        default:
          "Don't just take our word for it. Here's what our clients have to say about working with us.",
      },
    },
    testimonials: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        quote: { type: String, required: true },
        avatar: { type: String, default: '' },
        rating: { type: Number, default: 5 },
      },
    ],
    ctaBanner: {
      title: {
        type: String,
        default: 'Ready to Boost Your Business Online?',
      },
      subtitle: {
        type: String,
        default: "Let's create a winning digital strategy together.",
      },
      buttonText: {
        type: String,
        default: 'Get a Free Strategy Call',
      },
    },
  },
  {
    timestamps: true,
  }
);

const SiteContent = mongoose.model('SiteContent', siteContentSchema);

export default SiteContent;
