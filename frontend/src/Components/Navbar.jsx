import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo matching screenshot */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18L10 6L14 13L17 8L20 18H16L14 13L11 18H4Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Growth<span className="text-blue-600">Max</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Digital Marketing Agency
              </div>
            </div>
          </Link>

          {/* Navigation Links matching screenshot */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-semibold text-slate-600">
            <a href="#home" className="text-blue-600 font-bold relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full">
              Home
            </a>
            <a href="#why-choose-us" className="hover:text-blue-600 transition-colors">
              About Us
            </a>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-blue-600 transition-colors">
              <a href="#services">Services</a>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />
            </div>
            <a href="#work" className="hover:text-blue-600 transition-colors">
              Portfolio
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/backoffice"
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              title="Admin Backoffice"
            >
              <Shield className="w-4 h-4" />
            </Link>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-102 cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/backoffice" className="p-2 text-slate-500">
              <Shield className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 text-left">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-blue-600">Home</a>
          <a href="#why-choose-us" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-semibold text-slate-700">About Us</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-semibold text-slate-700">Services</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-semibold text-slate-700">Portfolio</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-semibold text-slate-700">Testimonials</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-semibold text-slate-700">Contact</a>
          <Link to="/backoffice" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-amber-700 bg-amber-50 rounded-xl">
            ⚡ Admin Backoffice Login
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full text-center bg-blue-600 text-white py-3 rounded-full font-bold mt-2 shadow-md shadow-blue-600/30"
          >
            Get a Free Consultation &rarr;
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
