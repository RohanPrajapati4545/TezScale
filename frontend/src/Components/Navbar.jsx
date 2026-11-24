import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Send,
  Menu, 
  X, 
  Code2, 
  Palette, 
  Megaphone, 
  ShoppingCart, 
  Share2, 
  Infinity as InfinityIcon
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import tezscaleLogo from '../assets/tezscale-logo.png';

const servicesDropdownList = [
  {
    title: 'Website Builder & Development',
    desc: 'High-speed, responsive & SEO-optimized architectures',
    icon: <Code2 className="w-4 h-4 text-[#00A3E0]" />,
    path: '/services/web-development',
  },
  {
    title: 'Graphic Design & Brand Kits',
    desc: 'High-converting ad creatives & visual identities',
    icon: <Palette className="w-4 h-4 text-purple-600" />,
    path: '/services/graphic-design',
  },
  {
    title: 'Digital Marketing Support (SEO)',
    desc: 'Google Maps Top 3 & local search dominance',
    icon: <Megaphone className="w-4 h-4 text-emerald-600" />,
    path: '/services/digital-marketing',
  },
  {
    title: 'E-Commerce Enablement & Scaling',
    desc: 'Frictionless checkout & cart recovery funnels',
    icon: <ShoppingCart className="w-4 h-4 text-amber-500" />,
    path: '/services/ecommerce',
  },
  {
    title: 'Social Media Strategy & Reels',
    desc: 'Viral short-form content & engaged community',
    icon: <Share2 className="w-4 h-4 text-indigo-600" />,
    path: '/services/social-media',
  },
  {
    title: 'Meta Ads Management (FB & IG)',
    desc: 'Precision targeted campaigns with measurable ROAS',
    icon: <InfinityIcon className="w-4 h-4 text-[#00A3E0]" />,
    path: '/services/meta-ads',
  },
];

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

const Navbar = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { content } = useContent();
  const branding = content?.branding || {};
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);

  const isHomePage = location.pathname === '/';

  // Smooth scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Nav link styling: High contrast light text with glowing sky active state
  const getNavLinkClass = (path) => {
    const active = isActive(path);
    return active
      ? 'text-[#38bdf8] font-black'
      : 'text-slate-100 font-semibold hover:text-white';
  };

  const getUnderlineClass = () => 'bg-[#38bdf8]';

  // Cross-page and same-page smooth scroll to Home FAQs section
  const scrollToFaq = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      const el = document.getElementById('faq');
      if (el) {
        const navHeight = 80;
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        window.history.pushState(null, '', '/#faq');
      }
    } else {
      navigate('/#faq');
    }
  };

  const isTransparent = !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isTransparent
          ? 'bg-transparent border-b border-transparent shadow-none'
          : 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* TezScale Logo & Brand Name: Click redirects to Home and scrolls smoothly to top */}
          <Link
            to="/"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
              }
            }}
            aria-label="TezScale Home"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <picture>
              <source srcSet="/tezscale-logo.webp" type="image/webp" />
              <img
                src={branding.logoUrl || tezscaleLogo}
                alt="TezScale Logo"
                width="160"
                height="48"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,163,224,0.35)] group-hover:scale-105 transition-transform duration-300"
              />
            </picture>
            <div className="flex flex-col justify-center text-left">
              <div className="text-xl sm:text-[27px] font-black tracking-tight leading-none uppercase">
                {renderBrandName(branding.agencyName)}
              </div>
              <div className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider font-bold mt-1 text-slate-300 leading-none group-hover:text-white transition-colors">
                {branding.tagline && branding.tagline !== 'ACCELERATING DIGITAL GROWTH' ? branding.tagline : 'GROW YOUR BUSINESS ONLINE'}
              </div>
            </div>
          </Link>

          {/* Navigation Links: Dark on Home, Light on all other pages */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[15px] font-semibold tracking-normal font-sans">
            
            {/* Home */}
            <Link
              to="/"
              className={`relative py-1.5 transition-colors ${getNavLinkClass('/')}`}
            >
              <span>Home</span>
              {isActive('/') && (
                <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${getUnderlineClass()}`} />
              )}
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`relative py-1.5 transition-colors ${getNavLinkClass('/about')}`}
            >
              <span>About Us</span>
              {isActive('/about') && (
                <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${getUnderlineClass()}`} />
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
                className={`relative py-1.5 flex items-center gap-1 transition-colors cursor-pointer ${getNavLinkClass('/services')}`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    servicesDropdownOpen
                      ? 'rotate-180 text-[#38bdf8]'
                      : 'text-slate-300'
                  }`}
                />
                {isActive('/services') && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${getUnderlineClass()}`} />
                )}
              </Link>

              {/* Animated Services Dropdown Menu - Always Solid White */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-16 pt-2 w-[460px] z-50 anim-dropdown">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 text-left overflow-hidden text-slate-800">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Our Core Services
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
                            <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Dropdown Footer */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                      <span className="text-[11px] text-slate-500 font-medium">Looking for a custom growth plan?</span>
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

            {/* How We Work */}
            <Link
              to="/#how-we-work"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  const el = document.getElementById('how-we-work') || document.getElementById('why-choose-us');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative py-1.5 transition-colors cursor-pointer text-slate-200 hover:text-white"
            >
              <span>How We Work</span>
            </Link>

            {/* Industries */}
            <Link
              to="/#industries"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  const el = document.getElementById('industries') || document.getElementById('industry-solutions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative py-1.5 transition-colors cursor-pointer text-slate-200 hover:text-white"
            >
              <span>Industries</span>
            </Link>

            {/* FAQs: Works from ANY page, scrolls to Home FAQs */}
            <Link
              to="/#faq"
              onClick={scrollToFaq}
              className="relative py-1.5 transition-colors cursor-pointer text-slate-100 font-semibold hover:text-white"
            >
              <span>FAQs</span>
            </Link>
          </nav>

          {/* Right Action Button: Get Free Audit */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 min-h-[44px] rounded-full border border-sky-400/50 hover:border-sky-300 bg-sky-500/15 hover:bg-sky-500/25 backdrop-blur-md text-white hover:text-sky-200 font-semibold text-xs sm:text-[15px] transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02] shadow-sm font-sans"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Get Free Audit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[48px] min-h-[48px] p-2.5 rounded-lg focus:outline-none transition-colors text-white hover:text-sky-300 hover:bg-white/10 flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b px-4 pt-3 pb-6 space-y-1.5 text-left shadow-xl anim-slow-slide border-slate-800 bg-slate-950/98 backdrop-blur-xl">
          {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'How We Work', path: '/#how-we-work' },
            { name: 'Industries', path: '/#industries' },
            { name: 'FAQs', path: '/#faq' },
          ].map((item) => {
            const active = item.path === '/#faq' || item.path.startsWith('/#') ? false : isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.path === '/#faq') {
                    scrollToFaq(e);
                  } else if (item.path === '/#how-we-work') {
                    const el = document.getElementById('how-we-work') || document.getElementById('why-choose-us');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (item.path === '/#industries') {
                    const el = document.getElementById('industries') || document.getElementById('industry-solutions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`block px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? 'text-[#38bdf8] font-bold bg-white/10'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 min-h-[44px] rounded-full bg-[#00A3E0] text-white font-bold text-sm shadow-md shadow-[#00A3E0]/20 flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <Send className="w-4 h-4" />
              <span>Get Free Audit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;