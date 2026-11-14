import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
              G
            </div>
            <span className="text-white font-bold text-base tracking-tight">GrowthMax Agency</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#about" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#lead-form" className="hover:text-white transition-colors">Contact</a>
            <span className="text-slate-600">|</span>
            <Link to="/admin" className="text-blue-400 hover:text-blue-300 font-semibold">
              Admin Portal
            </Link>
            <span className="text-slate-600">|</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>

          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Tezscale / GrowthMax. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
