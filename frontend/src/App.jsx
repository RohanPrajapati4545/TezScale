import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import ScrollToTop from './Components/ScrollToTop';
import RouteSEO from './Components/RouteSEO';
import Home from './pages/Home';
import './App.css';

// Lazy-loaded routes for ultra-fast initial bundle size and instant FCP
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TeamMemberPage = lazy(() => import('./pages/TeamMemberPage'));
const Backoffice = lazy(() => import('./pages/Backoffice'));

// Sleek minimal fallback - no screen jitter
const PageFallback = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#00A3E0] animate-spin" />
  </div>
);

function App() {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <RouteSEO />
        <div className="App">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/team/:memberSlug" element={<TeamMemberPage />} />
              <Route path="/backoffice" element={<Backoffice />} />
              <Route path="/admin" element={<Navigate to="/backoffice" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;
