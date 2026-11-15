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
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const servicesDropdownList = [
  {
    title: 'Website Builder & Development',
    desc: 'High-speed, responsive & SEO-optimized architectures',
    icon: <Code2 className="w-4 h-4 text-[#00A3E0]" />,
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
    icon: <InfinityIcon className="w-4 h-4 text-[#00A3E0]" />,
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
    <>
      {/* Top Announcement Bar (Drone.io Cyan Ribbon Style) */}
      <div className="bg-[#00A3E0] text-white text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-1.5 shadow-xs">
        <span>TezScale 2.0 is Live: Powering High-Growth B2B & Digital Businesses.</span>
        <button
          onClick={onOpenConsultation}
          className="underline hover:text-white/90 font-bold ml-1 cursor-pointer transition-colors"
        >
          Read the Announcement &rarr;
        </button>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300 anim-navbar shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* TezScale Logo (Drone.io Branding Style) */}
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00A3E0] to-[#38bdf8] flex items-center justify-center text-white shadow-md shadow-[#00A3E0]/30 group-hover:scale-105 transition-transform duration-300">
                {/* Modern circular tech icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
                  TEZ<span className="text-[#00A3E0]">SCALE</span>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">
                  by DIGITAL GROWTH
                </div>
              </div>
            </Link>

            {/* Navigation Links with Active Cyan State and Uppercase Drone Style */}
            <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold tracking-wider uppercase">
              {/* Home */}
              <Link
                to="/"
                className={`relative py-1.5 transition-colors ${
                  isActive('/') ? 'text-[#00A3E0] font-black' : 'text-slate-800 hover:text-[#00A3E0]'
                }`}
              >
                <span>HOME</span>
                {isActive('/') && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#00A3E0] rounded-full transition-all duration-300" />
                )}
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                className={`relative py-1.5 transition-colors ${
                  isActive('/about') ? 'text-[#00A3E0] font-black' : 'text-slate-800 hover:text-[#00A3E0]'
                }`}
              >
                <span>ABOUT US</span>
                {isActive('/about') && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#00A3E0] rounded-full transition-all duration-300" />
                )}
              </Link>

              {/* Services with Hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/services"
                  className={`relative py-1.5 flex items-center gap-1 transition-colors cursor-pointer ${
                    isActive('/services') ? 'text-[#00A3E0] font-black' : 'text-slate-800 hover:text-[#00A3E0]'
                  }`}
                >
                  <span>SERVICES</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#00A3E0]' : 'text-slate-400'
                    }`}
                  />
                  {isActive('/services') && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#00A3E0] rounded-full transition-all duration-300" />
                  )}
                </Link>

                {/* Animated Services Dropdown Menu */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full -left-20 pt-2 w-[480px] z-50 anim-dropdown">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 text-left overflow-hidden">
                      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Our Core Service Offerings
                        </span>
                        <span className="text-[10px] font-bold text-[#00A3E0] bg-[#e0f4ff] px-2 py-0.5 rounded-full">
                          6 Pillars
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {servicesDropdownList.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.path}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-2.5 rounded-lg hover:bg-[#f0f9ff] transition-all flex items-start gap-2.5 group"
                          >
                            <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-200/80 group-hover:bg-white group-hover:border-[#00A3E0]/40 flex items-center justify-center flex-shrink-0 transition-all shadow-2xs">
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-[#00A3E0] transition-colors leading-snug">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 normal-case font-normal">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Dropdown Footer */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                        <span className="text-[11px] text-slate-500 font-medium normal-case">Looking for custom growth roadmap?</span>
                        <Link
                          to="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-xs font-bold text-[#00A3E0] hover:text-[#008bc0] flex items-center gap-1 group"
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
                className={`relative py-1.5 transition-colors ${
                  isActive('/portfolio') ? 'text-[#00A3E0] font-black' : 'text-slate-800 hover:text-[#00A3E0]'
                }`}
              >
                <span>PORTFOLIO</span>
                {isActive('/portfolio') && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#00A3E0] rounded-full transition-all duration-300" />
                )}
              </Link>

              {/* Testimonials */}
              <Link
                to="/testimonials"
                className={`relative py-1.5 transition-colors ${
                  isActive('/testimonials') ? 'text-[#00A3E0] font-black' : 'text-slate-800 hover:text-[#00A3E0]'
                }`}
              >
                <span>TESTIMONIALS</span>
                {isActive('/testimonials') && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#00A3E0] rounded-full transition-all duration-300" />
                )}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`relative py-1.5 transition-colors ${
                  isActive('/contact') ? 'text-[#00A3E0] font-black' : 'text-slate-800 hover:text-[#00A3E0]'
                }`}
              >
                <span>CONTACT</span>
                {isActive('/contact') && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#00A3E0] rounded-full transition-all duration-300" />
                )}
              </Link>
            </nav>

            {/* Right Action Buttons (Login + Get Started in Drone Style) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/backoffice"
                className="btn-drone-login"
                title="Admin Backoffice"
              >
                LOGIN
              </Link>

              <button
                onClick={onOpenConsultation}
                className="btn-drone-primary"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:text-[#00A3E0] hover:bg-[#f0f9ff] focus:outline-none"
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
              { name: 'HOME', path: '/' },
              { name: 'ABOUT US', path: '/about' },
              { name: 'SERVICES', path: '/services' },
              { name: 'PORTFOLIO', path: '/portfolio' },
              { name: 'TESTIMONIALS', path: '/testimonials' },
              { name: 'CONTACT', path: '/contact' },
              { name: 'LOGIN', path: '/backoffice' },
            ].map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-md text-sm font-bold tracking-wider uppercase transition-colors ${
                    active
                      ? 'text-[#00A3E0] font-black bg-[#f0f9ff]'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-[#00A3E0]'
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
                className="w-full btn-drone-primary py-3 justify-center"
              >
                GET STARTED &rarr;
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
