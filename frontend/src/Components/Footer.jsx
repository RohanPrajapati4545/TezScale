import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Check, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import FloatingSpeedDial from './FloatingSpeedDial';
import tezscaleLogo from '../assets/tezscale-logo.png';

const renderBrandName = (name) => {
  const brand = name || 'TezScale';
  if (brand.toUpperCase() === 'TEZSCALE') {
    return (
      <>
        <span className="text-white">TEZ</span>
        <span className="bg-gradient-to-r from-[#1578DE] via-[#11A8DD] to-[#1AC2CD] bg-clip-text text-transparent">
          SCALE
        </span>
      </>
    );
  }
  return brand;
};

const Footer = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const contact = content?.contactInfo || {
    phone: '+91 (Indore Desk) • WhatsApp Direct',
    whatsapp: '+91 (Indore Desk) • WhatsApp Direct',
    email: 'hello@tezscale.com',
    location: 'Indore, Madhya Pradesh, India',
    businessHours: 'Mon – Sat: 9:00 AM – 7:00 PM IST',
  };

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  // WhatsApp routing directly linked to verified number or instant chat
  const phoneDigits = (contact.whatsapp || contact.phone || '').replace(/\D/g, '');
  const cleanWaNumber = phoneDigits && !phoneDigits.includes('98765') ? phoneDigits : '919876543210';
  const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    'Hello TezScale, I am interested in growing my business digitally. Can we discuss your services?'
  )}`;

  return (
    <footer id="contact" className="bg-[#08101e] text-slate-300 pt-16 pb-12 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80 text-left">
          
          {/* Col 1: Branding & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.pushState(null, '', '/');
                }
              }}
              aria-label="TezScale Home"
              className="inline-flex items-center gap-3 cursor-pointer group select-none"
            >
              <img
                src={content?.branding?.logoUrl || tezscaleLogo}
                alt="TezScale Logo"
                className="h-11 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,163,224,0.35)] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-center text-left">
                <div className="text-xl sm:text-[27px] font-black tracking-tight uppercase leading-none">
                  {renderBrandName(content?.branding?.agencyName)}
                </div>
                <div className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-slate-400 font-bold mt-1 leading-none group-hover:text-slate-300 transition-colors">
                  {content?.branding?.tagline || 'GROW YOUR BUSINESS ONLINE'}
                </div>
              </div>
            </Link>

            <p className="font-sans font-normal text-[14px] sm:text-[15px] text-[#CBD5E1] leading-[1.60] max-w-sm">
              We help Indian clinics, builders, factories, and local brands get more daily customer inquiries through fast websites, Google Maps SEO, and Meta Ads.
            </p>

            {/* Social Icons: LinkedIn, Instagram, WhatsApp, YouTube */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/company/tezscale/posts/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-slate-900 hover:bg-[#0077b5] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 shadow-sm"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/tezscale/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-slate-900 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 shadow-sm"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 shadow-sm"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@tezscale"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-slate-900 hover:bg-[#ff0000] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800 shadow-sm"
                aria-label="YouTube"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium uppercase tracking-wide">
              <li><Link to="/" className="hover:text-[#00A3E0] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#00A3E0] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#00A3E0] transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#00A3E0] transition-colors">Portfolio</Link></li>
              <li><Link to="/testimonials" className="hover:text-[#00A3E0] transition-colors">Testimonials</Link></li>
              <li><Link to="/#faq" className="hover:text-[#00A3E0] transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-[#00A3E0] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Core 6 Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Core Pillars</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/services/web-development" className="hover:text-[#00A3E0] transition-colors">Website Builder & Dev</Link></li>
              <li><Link to="/services/graphic-design" className="hover:text-[#00A3E0] transition-colors">Graphic Design & Brand Kits</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-[#00A3E0] transition-colors">Digital Marketing Support (SEO)</Link></li>
              <li><Link to="/services/ecommerce" className="hover:text-[#00A3E0] transition-colors">E-commerce Enablement</Link></li>
              <li><Link to="/services/social-media" className="hover:text-[#00A3E0] transition-colors">Social Media Strategy</Link></li>
              <li><Link to="/services/meta-ads" className="hover:text-[#00A3E0] transition-colors">Meta Ads Management</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Hours</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
                <a href={contact.phone && !contact.phone.includes('98765') ? `tel:${contact.phone.replace(/\s+/g, '')}` : whatsappUrl} className="hover:text-white">
                  {contact.phone && !contact.phone.includes('98765') ? contact.phone : '+91 (Indore Desk) • Chat on WhatsApp'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
                <a href={`mailto:${contact.email || 'hello@tezscale.com'}`} className="hover:text-white">
                  {contact.email || 'hello@tezscale.com'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
                <span>{contact.location || 'Indore, Madhya Pradesh, India'}</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-[12px]">{contact.businessHours || 'Mon – Sat: 9:00 AM – 7:00 PM IST'}</span>
              </li>
            </ul>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-1.5 uppercase tracking-wide">Free Weekly Growth Tips</div>
              <form onSubmit={handleSubscribe} className="relative">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address for weekly growth tips
                </label>
                <input
                  id="footer-newsletter-email"
                  aria-label="Enter your email address for weekly growth tips"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-md text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to weekly growth tips"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Local Business Corridors & Specialized Industry Niches SEO Strip */}
        <div className="py-6 border-b border-slate-800/60 text-left space-y-2.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Indore & MP Hubs:</span>
            <span>Vijay Nagar</span> •
            <span>Palasia</span> •
            <span>AB Road</span> •
            <span>Super Corridor</span> •
            <span>Scheme 54</span> •
            <span>Bhawarkua</span> •
            <span>Rau</span> •
            <span>Pithampur Industrial Area</span> •
            <span>Sanwer Road</span> •
            <span>Dewas</span> •
            <span>Ujjain</span> •
            <span>Bhopal</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Industry Niches:</span>
            <span>Medical Clinics & Doctors</span> •
            <span>Real Estate Developers & Builders</span> •
            <span>Industrial Manufacturing & Exporters</span> •
            <span>E-Commerce & D2C Brands</span> •
            <span>B2B Startups & SMEs</span>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} TezScale. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#home" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* Floating Speed Dial Contact Widget (WhatsApp, Call, Send Query) matching design */}
      <FloatingSpeedDial onOpenConsultation={onOpenConsultation} />
    </footer>
  );
};

export default Footer;
