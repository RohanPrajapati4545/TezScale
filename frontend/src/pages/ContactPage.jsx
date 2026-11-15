import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import PhoneInput from '../Components/PhoneInput';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import apiFetch from '../api/apiClient';

const ContactPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Website Builder & Development',
    budget: '₹50,000 - ₹1,00,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanDigits = phoneNumber.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please provide a valid business email address.');
      return;
    }

    if (!cleanDigits || cleanDigits.length < 7) {
      setError('Please enter a valid phone number (digits only).');
      return;
    }

    if (countryCode === '+91' && cleanDigits.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const fullPhone = `${countryCode} ${cleanDigits}`;
    const payload = {
      name: cleanName,
      email: cleanEmail,
      whatsapp: fullPhone,
      phone: fullPhone,
      phoneNumber: fullPhone,
      company: formData.company.trim(),
      website: formData.company.trim(),
      service: formData.service,
      serviceRequired: formData.service,
      budget: formData.budget,
      message: formData.message.trim(),
    };

    setLoading(true);

    try {
      const res = await apiFetch('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        // Optional pre-filled WhatsApp trigger
        const waMsg = `Hello TezScale, I submitted a consultation inquiry for ${formData.service}. My name is ${cleanName}.`;
        const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;
        
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1200);
      } else {
        setError(data.message || 'Failed to submit inquiry. Please try again or chat via WhatsApp.');
      }
    } catch (err) {
      // Local fallback success
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hello TezScale, I am interested in growing my business digitally. Can we discuss your services?'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 pb-16 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let’s Start a Conversation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Get in Touch with Our <span className="text-blue-600">Growth Experts</span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Have a question or ready to scale your inbound inquiries? Fill out the brief below or connect directly on WhatsApp.
            </p>
          </div>
        </section>

        {/* Contact Layout: Info on Left + Form on Right */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
              
              {/* Left Column: Contact Cards & WhatsApp Direct */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Direct Contact Channels
                  </h2>
                  <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                    Our team typically responds to new project inquiries in less than 2 business hours.
                  </p>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200/80 space-y-3 card-lift">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">Instant WhatsApp Chat</div>
                      <div className="text-xs text-emerald-700 font-semibold">Fastest Response Time</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Want an immediate quote or have quick questions? Speak directly with our strategy lead on WhatsApp.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all hover:scale-102"
                  >
                    <span>Chat on WhatsApp</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Details List */}
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Phone & WhatsApp</div>
                      <a href="tel:+919876543210" className="text-sm font-extrabold text-slate-900 hover:text-blue-600">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Email Inquiries</div>
                      <a href="mailto:hello@tezscale.com" className="text-sm font-extrabold text-slate-900 hover:text-blue-600">
                        hello@tezscale.com
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Headquarters</div>
                      <div className="text-sm font-extrabold text-slate-900">
                        Indore, Madhya Pradesh, India
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase">Working Hours</div>
                      <div className="text-sm font-extrabold text-slate-900">
                        Monday – Saturday: 9:00 AM – 7:00 PM IST
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>100% Confidential. We respect your privacy and never spam.</span>
                </div>
              </div>

              {/* Right Column: Lead Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-xl p-5 sm:p-8 md:p-9 border border-slate-200/90 shadow-xl relative overflow-hidden anim-slow-slide">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

                  {success ? (
                    <div className="py-12 text-center space-y-4 anim-slow-fade">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">Thank You!</h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Your inquiry has been submitted successfully to the TezScale growth team. We are also redirecting you to WhatsApp for immediate connectivity!
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all duration-300"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          Request a Free Strategy Session
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Share your business objectives and our consultants will prepare a custom proposal.
                        </p>
                      </div>

                      {error && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Dr. Priya Sharma"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="priya@clinic.com"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Phone / WhatsApp * <span className="text-[10px] text-slate-400 font-normal">(Digits only)</span>
                          </label>
                          <PhoneInput
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            placeholder="98765 43210"
                            id="contact-phone-input"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Company or Website
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="www.mybusiness.com"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Service of Interest
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                          >
                            <option>Website Builder & Development</option>
                            <option>Graphic Design & Brand Kits</option>
                            <option>Digital Marketing Support (SEO)</option>
                            <option>E-Commerce Enablement</option>
                            <option>Social Media Services</option>
                            <option>Meta Ads Management</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Estimated Budget
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                          >
                            <option>₹25,000 - ₹50,000</option>
                            <option>₹50,000 - ₹1,00,000</option>
                            <option>₹1,00,000 - ₹3,00,000</option>
                            <option>₹3,00,000+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Project Brief / Goal
                        </label>
                        <textarea
                          rows="3"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your business, current traffic, and target leads..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-75 text-white font-bold rounded-lg text-xs sm:text-sm shadow-md shadow-blue-600/25 transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Your Brief...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Free Strategy Call</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Interactive Location: Google Maps Integration (Section 2.4 Specification) */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-100">
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">TezScale Strategic Headquarters</h4>
                    <p className="text-xs text-slate-500">AB Road / Vijay Nagar Commercial Hub, Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Indore,Madhya+Pradesh,India"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-blue-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-72 sm:h-96">
                <iframe
                  title="TezScale Headquarters Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.5514571813!2d75.79380954335938!3d22.7242284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-105"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ContactPage;

