import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18L10 6L14 13L17 8L20 18H16L14 13L11 18H4Z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Growth<span className="text-blue-600">Max</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Digital Marketing Agency
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
            <a href="#home" className="text-blue-600 font-semibold relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full">
              Home
            </a>
            <a href="#services" className="hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#work" className="hover:text-blue-600 transition-colors">
              Our Work
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About Us
            </a>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Panel</span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-500/25 transition-all hover:gap-3"
            >
              <span>Get a Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <a href="#home" className="block px-3 py-2 text-base font-semibold text-blue-600">Home</a>
          <a href="#services" className="block px-3 py-2 text-base font-medium text-slate-700">Services</a>
          <a href="#work" className="block px-3 py-2 text-base font-medium text-slate-700">Our Work</a>
          <a href="#about" className="block px-3 py-2 text-base font-medium text-slate-700">About Us</a>
          <Link to="/admin" className="block px-3 py-2 text-base font-bold text-amber-700 bg-amber-50 rounded-lg">
            ⚡ Open Admin Panel
          </Link>
          <a href="#lead-form" className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-full font-semibold mt-4">
            Get a Free Strategy Call &rarr;
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
