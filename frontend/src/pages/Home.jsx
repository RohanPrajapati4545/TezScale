import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import IndustrySolutions from '../Components/IndustrySolutions';
import WhyChooseUs from '../Components/WhyChooseUs';
import OurWork from '../Components/OurWork';
import Testimonials from '../Components/Testimonials';
import FaqSection from '../Components/FaqSection';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import { useContent } from '../context/ContentContext';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const { loading } = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  // Conditional Loader: ONLY appears when data is actively loading!
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 animate-pulse">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M12 6v14" />
            <path d="M16 10l4-4-4-4" />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span>Loading TezScale Platform...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenConsultation={() => setModalOpen(true)} />
        <Services onOpenConsultation={() => setModalOpen(true)} />
        <IndustrySolutions onOpenConsultation={() => setModalOpen(true)} />
        <WhyChooseUs onOpenConsultation={() => setModalOpen(true)} />
        <OurWork onOpenConsultation={() => setModalOpen(true)} />
        <Testimonials onOpenConsultation={() => setModalOpen(true)} />
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
