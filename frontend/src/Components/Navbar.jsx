import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Code2, 
  Palette, 
  Megaphone, 
  ShoppingCart, 
  Share2, 
  Infinity as InfinityIcon,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const servicesDropdownList = [
  {
    title: 'Website Builder & Development',
    desc: 'High-speed, responsive & SEO-optimized architectures',
    icon: <Code2 className="w-4 h-4 text-blue-600" />,
    path: '/services',
  },
  {
    title: 'Graphic Design & Brand Kits',
    desc: 'High-converting ad creatives & visual identities',
    icon: <Palette className="w-4 h-4 text-purple-600" />,
    path: '/services',
  },
  {
    title: 'Digital Marketing Support (SEO)',
    desc: 'Google Maps Top 3 & local search dominance',
    icon: <Megaphone className="w-4 h-4 text-emerald-600" />,
    path: '/services',
  },
  {
    title: 'E-Commerce Enablement & Scaling',
    desc: 'Frictionless checkout & cart recovery funnels',
    icon: <ShoppingCart className="w-4 h-4 text-amber-500" />,
    path: '/services',
  },
  {
    title: 'Social Media Strategy & Reels',
    desc: 'Viral short-form content & engaged community',
    icon: <Share2 className="w-4 h-4 text-indigo-600" />,
    path: '/services',
  },
  {
    title: 'Meta Ads Management (FB & IG)',
    desc: 'Precision targeted campaigns with measurable ROAS',
    icon: <InfinityIcon className="w-4 h-4 text-rose-500" />,
    path: '/services',
  },
];

const Navbar = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 anim-navbar shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* TezScale Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M12 6v14" />
                <path d="M16 10l4-4-4-4" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Tez<span className="text-blue-600">Scale</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                Digital Growth Agency
              </div>
            </div>
          </Link>

          {/* Navigation Links with Active Blue State and Indicator Line */}
          <nav className="hidden md:flex items-center gap-7 text-[15px]">
            {/* Home */}
            <Link
              to="/"
              className={`relative py-1.5 flex items-center gap-1 transition-colors ${
                isActive('/') ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600 font-medium'
              }`}
            >
              <span>Home</span>
              {isActive('/') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
              )}
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`relative py-1.5 flex items-center gap-1 transition-colors ${
                isActive('/about') ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600 font-medium'
              }`}
            >
              <span>About Us</span>
              {isActive('/about') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
              )}
            </Link>

            {/* Services with Smooth Animated Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/services"
                className={`relative py-1.5 flex items-center gap-1 transition-colors cursor-pointer ${
                  isActive('/services') ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600 font-medium'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
                {isActive('/services') && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
                )}
              </Link>

              {/* Animated Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 pt-2 w-[480px] z-50 anim-dropdown">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 text-left overflow-hidden">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Our Core Service Offerings
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        6 Pillars
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {servicesDropdownList.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-blue-50/80 transition-all flex items-start gap-2.5 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 group-hover:bg-white group-hover:border-blue-300 flex items-center justify-center flex-shrink-0 transition-all shadow-2xs">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Dropdown Footer */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                      <span className="text-[11px] text-slate-500 font-medium">Looking for a custom plan?</span>
                      <Link
                        to="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <Link
              to="/portfolio"
              className={`relative py-1.5 flex items-center gap-1 transition-colors ${
                isActive('/portfolio') ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600 font-medium'
              }`}
            >
              <span>Portfolio</span>
              {isActive('/portfolio') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
              )}
            </Link>

            {/* Testimonials */}
            <Link
              to="/testimonials"
              className={`relative py-1.5 flex items-center gap-1 transition-colors ${
                isActive('/testimonials') ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600 font-medium'
              }`}
            >
              <span>Testimonials</span>
              {isActive('/testimonials') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
              )}
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`relative py-1.5 flex items-center gap-1 transition-colors ${
                isActive('/contact') ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600 font-medium'
              }`}
            >
              <span>Contact</span>
              {isActive('/contact') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
              )}
            </Link>
          </nav>

          {/* Right Action Button (Clean Consultation CTA - Backoffice removed as requested) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-blue-600/25 transition-all hover:scale-102 hover:shadow-lg cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 text-left shadow-lg anim-slow-slide">
          {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: 'Testimonials', path: '/testimonials' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-base transition-colors ${
                  active
                    ? 'text-blue-600 font-bold bg-blue-50'
                    : 'text-slate-700 font-medium hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center bg-blue-600 text-white py-3 rounded-full font-bold shadow-md shadow-blue-600/30 cursor-pointer"
            >
              Get a Free Consultation &rarr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
