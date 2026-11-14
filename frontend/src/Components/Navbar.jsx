import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services', hasDropdown: true },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-1.5 flex items-center gap-1 transition-colors ${
                    active
                      ? 'text-blue-600 font-bold'
                      : 'text-slate-600 hover:text-blue-600 font-medium'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  )}
                  {/* Clean blue underline indicator matching image */}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/backoffice"
              className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded-full transition-all flex items-center gap-1.5"
              title="Admin Backoffice Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Backoffice</span>
            </Link>

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
            <Link to="/backoffice" className="p-2 text-slate-500" title="Backoffice">
              <Shield className="w-5 h-5" />
            </Link>
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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 text-left shadow-lg">
          {navItems.map((item) => {
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
          
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              to="/backoffice"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-xs font-bold text-amber-800 bg-amber-50 rounded-xl"
            >
              ⚡ Admin Backoffice Login
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center bg-blue-600 text-white py-3 rounded-full font-bold shadow-md shadow-blue-600/30"
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
