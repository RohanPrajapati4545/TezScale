import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import FloatingSpeedDial from './FloatingSpeedDial';
import tezscaleLogo from '../assets/tezscale-logo.png';

const Footer = ({ onOpenConsultation }) => {
  const { content } = useContent();
  const contact = content?.contactInfo || {
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'hello@tezscale.com',
    location: 'Indore, MP, India',
    businessHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
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

  // Exact pre-filled WhatsApp message from PDF Section 3.3
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hello, I am interested in growing my business digitally. Can we discuss your services?'
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
              className="inline-flex items-center gap-3 sm:gap-4 select-none py-1 bg-transparent"
              aria-label="TezScale - Return to homepage"
            >
              <img
                src={tezscaleLogo}
                alt="TezScale Logo"
                className="h-12 sm:h-14 w-auto object-contain bg-transparent flex-shrink-0"
              />
              <div className="text-left flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
                  TEZ<span className="text-[#00A3E0]">SCALE</span>
                </div>
                <div className="text-[8.5px] sm:text-[10px] uppercase font-bold tracking-tight sm:tracking-normal mt-1 text-slate-300 whitespace-nowrap">
                  ACCELERATING DIGITAL GROWTH
                </div>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We are actively providing services to digitally grow your business with us. Engineered for high-converting B2B lead generation.
            </p>

            {/* Social Icons matching specification */}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-md bg-slate-900 hover:bg-[#00A3E0] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold border border-slate-800" aria-label="LinkedIn">
                in
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-md bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold border border-slate-800" aria-label="YouTube">
                ▶
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-md bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold border border-slate-800" aria-label="Instagram">
                📸
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-md bg-slate-900 hover:bg-[#00A3E0] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold border border-slate-800" aria-label="X">
                𝕏
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
                <Phone className="w-4 h-4 text-[#00A3E0] flex-shrink-0" />
                <a href={`tel:${contact.phone || '+919876543210'}`} className="hover:text-white">
                  {contact.phone || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00A3E0] flex-shrink-0" />
                <a href={`mailto:${contact.email || 'hello@tezscale.com'}`} className="hover:text-white">
                  {contact.email || 'hello@tezscale.com'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A3E0] flex-shrink-0" />
                <span>{contact.location || 'Indore, MP, India'}</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-[11px]">{contact.businessHours || 'Mon - Sat: 9:00 AM - 7:00 PM'}</span>
              </li>
            </ul>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-1.5 uppercase tracking-wide">Weekly Growth Insights</div>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-md text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#00A3E0] hover:bg-[#008bc0] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
            </div>
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
            <span>|</span>
            <Link to="/backoffice" className="text-[#00A3E0] hover:text-[#38bdf8] font-semibold">
              TezScale Backoffice
            </Link>
          </div>
        </div>

      </div>

      {/* Floating Speed Dial Contact Widget (WhatsApp, Call, Send Query) matching design */}
      <FloatingSpeedDial onOpenConsultation={onOpenConsultation} />
    </footer>
  );
};

export default Footer;
