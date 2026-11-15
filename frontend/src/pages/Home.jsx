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

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
