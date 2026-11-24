import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  Code2
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import AnimatedContent from '../Components/AnimatedContent';
import { teamMembers, getTeamMemberBySlug } from '../data/teamData';
import { useContent } from '../context/ContentContext';
import { resolveMediaUrl } from '../api/apiClient';

const TeamMemberPage = () => {
  const { memberSlug } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
  const { content } = useContent();

  const dynamicTeam = (content?.team && content.team.length > 0) ? content.team : teamMembers;
  const dynamicMember = dynamicTeam.find((m) => m.slug === memberSlug || m.id === memberSlug);
  const staticMember = teamMembers.find((m) => m.slug === memberSlug || m.id === memberSlug);
  const member = dynamicMember 
    ? (staticMember ? { ...staticMember, ...dynamicMember } : dynamicMember)
    : (staticMember || getTeamMemberBySlug(memberSlug));

  useSEO({
    title: member ? `${member.name} - ${member.role} | TezScale Leadership` : 'Team Member | TezScale',
    description: member ? `${member.name} (${member.role}) at TezScale. ${member.bio.slice(0, 150)}` : 'TezScale leadership profile.',
    canonical: member ? `/team/${member.slug}` : '/about'
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }
  }, [memberSlug]);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-white">
        <Navbar onOpenConsultation={() => setModalOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold">Team Member Not Found</h2>
          <Link
            to="/about"
            className="mt-4 px-6 py-2.5 bg-[#00A3E0] rounded-full text-white font-bold text-sm"
          >
            Back to About Us
          </Link>
        </div>
        <Footer onOpenConsultation={() => setModalOpen(true)} />
      </div>
    );
  }

  const otherMembers = dynamicTeam.filter((m) => m.slug !== member.slug);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#00A3E0] selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Profile Hero Header with Live Background Video (Transparent Content Container for 100% Clear Video Visibility) */}
        <section className="relative pt-24 sm:pt-28 pb-16 bg-[#070913] text-white border-b border-slate-800 overflow-hidden min-h-[70vh] flex flex-col justify-center">
          {/* Background Video - High Opacity, Clear & Crisp */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center opacity-90 sm:opacity-95"
            >
              <source src="/page-hero-video.mp4" type="video/mp4" />
              <source src="/services-hero-video.mp4" type="video/mp4" />
            </video>
            {/* Subtle Vignette Gradient - Keeps Background Video Fully Clear & Visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070913]/60 via-transparent to-[#070913]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-8 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <span>/</span>
              <Link to="/about#team" className="hover:text-white transition-colors">Team</Link>
              <span>/</span>
              <span className="text-sky-300 font-bold">{member.name}</span>
            </div>

            {/* Profile Content Container: Transparent (No solid dark bg color blocking video) */}
            <div className="p-2 sm:p-4 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Profile Photo */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative group w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-2 border-sky-400/60 shadow-2xl bg-slate-950/60 backdrop-blur-md p-1.5">
                    <img
                      src={resolveMediaUrl(member.image, 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg')}
                      alt={`${member.name} - ${member.role} at TezScale`}
                      className={`w-full h-full ${member.imageClass || 'object-cover object-center'} rounded-2xl group-hover:scale-105 transition-transform duration-500`}
                      onError={(e) => {
                        e.currentTarget.src = 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg';
                      }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-sky-400/40 text-sky-300 text-xs font-bold tracking-wide shadow-lg">
                    {member.badge}
                  </span>
                </div>

                {/* Profile Meta & Details */}
                <div className="lg:col-span-8 space-y-5 text-left">
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                      {member.name}
                    </h1>
                    <div className="text-lg sm:text-xl font-bold text-[#00A3E0] mt-1 drop-shadow-sm">
                      {member.role}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
                      <Briefcase className="w-4 h-4 text-sky-400" />
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal max-w-2xl bg-slate-950/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                    {member.bio}
                  </p>

                  {/* Portfolio & Social Links (Only LinkedIn & GitHub) */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/70 hover:bg-[#00A3E0] hover:text-white border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md transition-all shadow-md"
                      >
                        <Linkedin className="w-4 h-4 text-sky-400 group-hover:text-white" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 hover:text-white border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md transition-all shadow-md"
                      >
                        <Github className="w-4 h-4 text-slate-300" />
                        <span>GitHub Profile</span>
                      </a>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#008bc0] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-[#00A3E0]/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Connect for Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Live Projects & Production SaaS Architectures Section */}
        {member.projects && member.projects.length > 0 && (
          <section id="projects" className="py-20 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Production Platforms</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Featured Live Projects & SaaS Architectures
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Real-world microservices, multi-tenant SaaS applications, and real-time systems architected by <strong className="text-slate-900">{member.name}</strong>. Click any platform to launch the live demo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {member.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all duration-300 card-lift flex flex-col justify-between group"
                  >
                    <div className="space-y-4 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#00A3E0] bg-[#e0f4ff] px-2.5 py-1 rounded-md">
                          {proj.badge}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">{proj.category}</span>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#00A3E0] transition-colors flex items-center gap-2">
                          <span>{proj.name}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00A3E0]" />
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {proj.desc}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live in Production
                      </span>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#00A3E0] hover:bg-[#008bc0] px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-105"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Explore Other Team Members (Continuous Right-to-Left Animated Marquee) */}
        {otherMembers.length > 0 && (
          <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
            <AnimatedContent
              distance={80}
              direction="horizontal"
              duration={0.8}
              ease="power3.out"
              threshold={0.15}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider">TezScale Core Team</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                      Meet Other Leadership & Architecture Specialists
                    </h3>
                  </div>
                  <div>
                    <Link
                      to="/about#team"
                      className="text-xs font-bold text-[#00A3E0] hover:text-[#008bc0] flex items-center gap-1.5 transition-colors"
                    >
                      <span>All Team Members</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Continuous Seamless Hardware-Accelerated Right-to-Left Marquee Track */}
              <div className="relative w-full overflow-hidden">
                {/* Left & Right Soft Edge Gradient Masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

                <div className="anim-marquee-left flex gap-6 py-4 px-4 sm:px-6">
                  {/* First Block */}
                  <div className="flex gap-6 shrink-0">
                    {otherMembers.map((m, idx) => (
                      <Link
                        key={`other-set1-${idx}`}
                        to={`/team/${m.slug}`}
                        className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          {/* Image Container with Proper Portrait Height & Framing */}
                          <div className="h-72 sm:h-80 w-full overflow-hidden bg-slate-100 relative">
                            <img
                              src={resolveMediaUrl(m.image, 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg')}
                              alt={m.name}
                              className={`w-full h-full ${m.imageClass || 'object-cover object-center'} group-hover:scale-104 transition-transform duration-500`}
                              onError={(e) => {
                                e.currentTarget.src = 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute top-3.5 right-3.5 text-[10px] font-bold text-white bg-slate-900/85 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-md shadow-xs">
                              {m.badge}
                            </span>
                          </div>
                          <div className="p-5 text-left">
                            <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#00A3E0] transition-colors">
                              {m.name}
                            </h4>
                            <div className="text-xs font-bold text-[#00A3E0] mt-0.5">{m.role}</div>
                            {m.bio && (
                              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed min-h-[48px]">
                                {m.bio}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A3E0] group-hover:gap-2 transition-all">
                          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            TezScale Core
                          </span>
                          <span className="flex items-center gap-1">
                            <span>View Profile</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Second Block (Duplicate for Seamless Loop) */}
                  <div className="flex gap-6 shrink-0" aria-hidden="true">
                    {otherMembers.map((m, idx) => (
                      <Link
                        key={`other-set2-${idx}`}
                        to={`/team/${m.slug}`}
                        tabIndex={-1}
                        className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          {/* Image Container with Proper Portrait Height & Framing */}
                          <div className="h-72 sm:h-80 w-full overflow-hidden bg-slate-100 relative">
                            <img
                              src={resolveMediaUrl(m.image, 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg')}
                              alt={m.name}
                              className={`w-full h-full ${m.imageClass || 'object-cover object-center'} group-hover:scale-104 transition-transform duration-500`}
                              onError={(e) => {
                                e.currentTarget.src = 'https://res.cloudinary.com/qwpdsvyf/image/upload/v1795431573/tezscale_assets/rohan-prajapati.jpg';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute top-3.5 right-3.5 text-[10px] font-bold text-white bg-slate-900/85 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-md shadow-xs">
                              {m.badge}
                            </span>
                          </div>
                          <div className="p-5 text-left">
                            <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#00A3E0] transition-colors">
                              {m.name}
                            </h4>
                            <div className="text-xs font-bold text-[#00A3E0] mt-0.5">{m.role}</div>
                            {m.bio && (
                              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed min-h-[48px]">
                                {m.bio}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A3E0] group-hover:gap-2 transition-all">
                          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            TezScale Core
                          </span>
                          <span className="flex items-center gap-1">
                            <span>View Profile</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </section>
        )}
      </main>

      <Footer onOpenConsultation={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TeamMemberPage;
