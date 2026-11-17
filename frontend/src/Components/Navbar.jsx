import React, { useState, useRef, useEffect } from 'react';
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
  Infinity as InfinityIcon
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

const Navbar = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
          
          {/* TezScale Brand Header: Clean, Static & Transparent */}
          <Link
            to="/"
            className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none py-1 bg-transparent"
            aria-label="TezScale - Return to homepage"
          >
            {/* 3D UHD Emblem Mark (Transparent Background, No Animation) */}
            <img
              src="/tezscale-logo.png"
              alt="TezScale Logo"
              className="h-11 sm:h-13 lg:h-14 w-auto object-contain bg-transparent flex-shrink-0"
            />

            {/* Brand Typography: Large TEZSCALE & Edge-Aligned Subtitle */}
            <div className="text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight leading-none uppercase text-white">
                TEZ<span className="text-[#00A3E0]">SCALE</span>
              </div>
              <div className="text-[7px] sm:text-[8.5px] lg:text-[9.5px] uppercase font-bold tracking-tight sm:tracking-normal lg:tracking-[0.02em] mt-1 text-slate-300 whitespace-nowrap">
                ACCELERATING DIGITAL GROWTH
              </div>
            </div>
          </Link>

          {/* Navigation Links: Dark on Home, Light on all other pages */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[15.5px] lg:text-base font-bold tracking-normal">
            
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
                        Our Core Service Pillars
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

            {/* About */}
            <Link
              to="/about"
              className={`relative py-1.5 transition-colors ${getNavLinkClass('/about')}`}
            >
              <span>About</span>
              {isActive('/about') && (
                <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${getUnderlineClass()}`} />
              )}
            </Link>

            {/* Results (Portfolio) */}
            <Link
              to="/portfolio"
              className={`relative py-1.5 transition-colors ${getNavLinkClass('/portfolio')}`}
            >
              <span>Results</span>
              {isActive('/portfolio') && (
                <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${getUnderlineClass()}`} />
              )}
            </Link>

            {/* Testimonials */}
            <Link
              to="/testimonials"
              className={`relative py-1.5 transition-colors ${getNavLinkClass('/testimonials')}`}
            >
              <span>Testimonials</span>
              {isActive('/testimonials') && (
                <span className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full transition-all duration-300 ${getUnderlineClass()}`} />
              )}
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

          {/* Right Action Button (Matches reference image's outline pill) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2 rounded-full border border-white/25 hover:border-sky-400/80 bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-md text-white font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] shadow-sm"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg focus:outline-none transition-colors text-white hover:text-sky-300 hover:bg-white/10"
              aria-label="Toggle menu"
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
            { name: 'Services', path: '/services' },
            { name: 'About', path: '/about' },
            { name: 'Results', path: '/portfolio' },
            { name: 'Testimonials', path: '/testimonials' },
            { name: 'FAQs', path: '/#faq' },
          ].map((item) => {
            const active = item.path === '/#faq' ? false : isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (item.path === '/#faq') {
                    scrollToFaq(e);
                  } else {
                    setMobileMenuOpen(false);
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
              className="w-full py-3 rounded-full bg-[#00A3E0] text-white font-bold text-sm shadow-md shadow-[#00A3E0]/20 flex items-center justify-center gap-2"
            >
              <span>Get Free Strategy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;