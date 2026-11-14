import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import TrustedBrands from '../Components/TrustedBrands';
import Services from '../Components/Services';
import OurWork from '../Components/OurWork';
import Testimonials from '../Components/Testimonials';
import CtaBanner from '../Components/CtaBanner';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBrands />
        <Services />
        <OurWork />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

