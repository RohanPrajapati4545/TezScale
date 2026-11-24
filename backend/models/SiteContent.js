import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    branding: { type: Object, default: {} },
    media: { type: Object, default: {} },
    hero: { type: Object, default: {} },
    trustBar: { type: Object, default: {} },
    servicesSection: { type: Object, default: {} },
    services: { type: Array, default: [] },
    whyChooseUs: { type: Object, default: {} },
    portfolioSection: { type: Object, default: {} },
    dashboardMetrics: { type: Object, default: {} },
    metrics: { type: Object, default: {} },
    caseStudies: { type: Array, default: [] },
    testimonialsSection: { type: Object, default: {} },
    testimonials: { type: Array, default: [] },
    team: { type: Array, default: [] },
    ctaBanner: { type: Object, default: {} },
    contactInfo: { type: Object, default: {} },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const SiteContent = mongoose.model('SiteContent', siteContentSchema);

export default SiteContent;
