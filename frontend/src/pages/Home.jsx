import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import IndustrySolutions from '../Components/IndustrySolutions';
import WhyChooseUs from '../Components/WhyChooseUs';
import FaqSection from '../Components/FaqSection';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';

const Home = () => {
  useSEO({
    title: 'TezScale | Affordable Web Development, Viral Reels & Digital Marketing in Indore',
    description: 'Looking for affordable, easy-cost website development in Indore, viral Instagram reels making, or local SEO to rank #1 on Google Maps? TezScale delivers high-speed results with 2-day staging draft.',
    keywords: 'web development company in Indore, affordable website design Indore, easy cost website development Indore, website maker in Indore, viral reels making Indore, Instagram reels video production, short video editing Indore, social media marketing agency Indore, digital marketing agency in Indore, local SEO Indore, Google Maps ranking Indore, TezScale',
    canonical: '/'
  });

  const [modalOpen, setModalOpen] = useState(false);

  // Auto-open enquiry modal on first-time website visit
  useEffect(() => {
    try {
      const hasSeenModal = sessionStorage.getItem('tezscale_first_visit_modal');
      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setModalOpen(true);
          sessionStorage.setItem('tezscale_first_visit_modal', 'true');
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      const timer = setTimeout(() => setModalOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-[#00A3E0] selection:text-white">
      {/* Navigation */}
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenConsultation={() => setModalOpen(true)} />
        <Services onOpenConsultation={() => setModalOpen(true)} />
        <IndustrySolutions onOpenConsultation={() => setModalOpen(true)} />
        <WhyChooseUs onOpenConsultation={() => setModalOpen(true)} />
        <FaqSection onOpenConsultation={() => setModalOpen(true)} />
      </main>

      {/* Footer with Floating Speed Dial */}
      <Footer onOpenConsultation={() => setModalOpen(true)} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;
