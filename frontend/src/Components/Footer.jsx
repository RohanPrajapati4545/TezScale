import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { content } = useContent();
  const contact = content?.contactInfo || {
    phone: '+91 98765 43210',
    email: 'hello@growthmax.in',
    location: 'Indore, MP',
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

  return (
    <footer id="contact" className="bg-[#0b132b] text-slate-300 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 text-left">
          
          {/* Col 1: Branding & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 18L10 6L14 13L17 8L20 18H16L14 13L11 18H4Z" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white tracking-tight">
                  Growth<span className="text-blue-500">Max</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Digital Marketing Agency
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We help businesses grow online with smart digital solutions.
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#home" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                in
              </a>
              <a href="#home" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                ▶
              </a>
              <a href="#home" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                📸
              </a>
              <a href="#home" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-400 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold">
                𝕏
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#why-choose-us" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Our Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">SEO</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Social Media Marketing</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Website Development</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Meta Ads</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Graphic Design</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Us & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href={`tel:${contact.phone || '+919876543210'}`} className="hover:text-white">
                  {contact.phone || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href={`mailto:${contact.email || 'hello@growthmax.in'}`} className="hover:text-white">
                  {contact.email || 'hello@growthmax.in'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{contact.location || 'Indore, MP'}</span>
              </li>
            </ul>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-2">Subscribe to Our Newsletter</div>
              <p className="text-[11px] text-slate-400 mb-2">Get the latest marketing tips & updates.</p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-white" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © 2025 GrowthMax. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#home" className="hover:text-slate-400 transition-colors">Terms & Conditions</a>
            <span>|</span>
            <Link to="/backoffice" className="text-blue-400 hover:text-blue-300 font-semibold">
              Admin Login
            </Link>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Button bottom right matching screenshot */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all animate-bounce"
        title="Chat on WhatsApp"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </footer>
  );
};

export default Footer;
