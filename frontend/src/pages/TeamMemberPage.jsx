import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  CheckCircle2,
  Sparkles,
  Layers,
  Database,
  Server,
  ShieldCheck,
  Cpu,
  Globe,
  Terminal,
  Send
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ConsultationModal from '../Components/ConsultationModal';
import AnimatedContent from '../Components/AnimatedContent';
import { teamMembers, getTeamMemberBySlug } from '../data/teamData';

const TeamMemberPage = () => {
  const { memberSlug } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const member = getTeamMemberBySlug(memberSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const otherMembers = teamMembers.filter((m) => m.slug !== member.slug);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#00A3E0] selection:text-white">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      <main className="flex-1">
        {/* Profile Hero Header */}
        <section className="relative pt-24 sm:pt-28 pb-16 bg-[#070913] text-white border-b border-slate-800 overflow-hidden">
          {/* Subtle Ambient Background Beams */}
          <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-sky-400/20 via-blue-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -top-32 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <span>/</span>
              <Link to="/about#team" className="hover:text-white transition-colors">Team</Link>
              <span>/</span>
              <span className="text-sky-300 font-bold">{member.name}</span>
            </div>

            {/* Profile Intro Card */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Profile Photo */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-sky-400/40 shadow-xl bg-slate-800 p-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide shadow-xs">
                    {member.badge}
                  </span>
                </div>

                {/* Profile Meta & Contact */}
                <div className="lg:col-span-8 space-y-5 text-left">
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                      {member.name}
                    </h1>
                    <div className="text-lg sm:text-xl font-bold text-[#00A3E0] mt-1">
                      {member.role}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                      <Briefcase className="w-4 h-4 text-sky-400" />
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    {member.bio}
                  </p>

                  {/* Contact Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-sky-600 hover:text-white border border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-xs"
                      >
                        <Mail className="w-4 h-4 text-sky-400 group-hover:text-white" />
                        <span>{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-xs"
                      >
                        <Phone className="w-4 h-4 text-emerald-400" />
                        <span>{member.phone}</span>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-xs"
                      >
                        <Linkedin className="w-4 h-4 text-blue-400" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-950 hover:text-white border border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-xs"
                      >
                        <Github className="w-4 h-4 text-slate-300" />
                        <span>GitHub Profile</span>
                      </a>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#008bc0] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-[#00A3E0]/35 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
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

        {/* Technical Skills Matrix */}
        {member.technicalSkills && (
          <section className="py-20 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider">
                  Engineering Disciplines
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Technical Skills & Architecture Stack
                </h2>
                <p className="text-slate-600 text-sm mt-2">
                  Key programming languages, frameworks, architectural patterns, and devops tooling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Languages & Frontend */}
                {member.technicalSkills.languagesFrontend && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs card-lift">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-3">Languages & Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.technicalSkills.languagesFrontend.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backend & Architecture */}
                {member.technicalSkills.backendArchitecture && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs card-lift">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-4">
                      <Server className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-3">Backend & Architecture</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.technicalSkills.backendArchitecture.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Databases & Caching */}
                {member.technicalSkills.databasesCaching && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs card-lift">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
                      <Database className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-3">Databases & Caching</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.technicalSkills.databasesCaching.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Auth & Real-Time */}
                {member.technicalSkills.authRealtime && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs card-lift">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-3">Authentication & Real-Time</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.technicalSkills.authRealtime.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools & DevOps */}
                {member.technicalSkills.toolsDevops && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs card-lift">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-4">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-3">Tools, Cloud & DevOps</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.technicalSkills.toolsDevops.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* Professional Experience & Education Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Professional Experience Column (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Career Track</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Professional Experience
                  </h2>
                </div>

                <div className="space-y-6">
                  {member.professionalExperience && member.professionalExperience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 relative pl-8 shadow-2xs"
                    >
                      <div className="absolute left-3 top-7 w-2 h-2 rounded-full bg-[#00A3E0]" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-bold text-[#00A3E0] bg-[#e0f4ff] px-2.5 py-1 rounded-md self-start sm:self-auto">
                          {exp.duration}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-700 mb-3">{exp.company}</div>
                      {exp.description && (
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="space-y-1.5 pt-2 border-t border-slate-200/60">
                          {exp.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="text-xs text-slate-600 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications Column (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Education */}
                {member.education && member.education.length > 0 && (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Academic Credentials</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      Education
                    </h3>
                    <div className="space-y-3">
                      {member.education.map((edu, idx) => (
                        <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                          <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{edu.degree}</h4>
                          <div className="text-xs text-slate-600 mt-1">{edu.institution}</div>
                          <div className="flex items-center gap-3 mt-2 text-xs font-bold text-slate-500">
                            <span>{edu.year}</span>
                            <span>•</span>
                            <span className="text-[#00A3E0]">{edu.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase">
                      <Award className="w-3.5 h-3.5" />
                      <span>Verified Credentials</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      Certifications
                    </h3>
                    <div className="space-y-2.5">
                      {member.certifications.map((cert, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3 shadow-2xs">
                          <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          <span className="text-xs font-bold text-slate-800">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

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
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#00A3E0] border border-sky-200/80 text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                      <span>Hover to Pause</span>
                    </div>
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

              {/* Infinite Right-to-Left Marquee Track */}
              <div className="relative w-full overflow-hidden">
                {/* Left & Right Soft Edge Gradient Masks */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

                <div className="anim-marquee-left flex gap-6 py-4 px-4 sm:px-6">
                  {/* First Block */}
                  <div className="flex gap-6 shrink-0">
                    {[...otherMembers, ...otherMembers].map((m, idx) => (
                      <Link
                        key={`set1-${idx}`}
                        to={`/team/${m.slug}`}
                        className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                            <img
                              src={m.image}
                              alt={m.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-[#00A3E0] px-2.5 py-1 rounded-md shadow-xs">
                              {m.badge}
                            </span>
                          </div>
                          <div className="p-5">
                            <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#00A3E0] transition-colors">
                              {m.name}
                            </h4>
                            <div className="text-xs font-bold text-[#00A3E0] mt-0.5">{m.role}</div>
                            {m.bio && (
                              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                {m.bio}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#00A3E0] gap-1 group-hover:gap-2 transition-all">
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Second Identical Block for Seamless Infinite Loop */}
                  <div className="flex gap-6 shrink-0" aria-hidden="true">
                    {[...otherMembers, ...otherMembers].map((m, idx) => (
                      <Link
                        key={`set2-${idx}`}
                        to={`/team/${m.slug}`}
                        tabIndex={-1}
                        className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                            <img
                              src={m.image}
                              alt={m.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-[#00A3E0] px-2.5 py-1 rounded-md shadow-xs">
                              {m.badge}
                            </span>
                          </div>
                          <div className="p-5">
                            <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#00A3E0] transition-colors">
                              {m.name}
                            </h4>
                            <div className="text-xs font-bold text-[#00A3E0] mt-0.5">{m.role}</div>
                            {m.bio && (
                              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                {m.bio}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#00A3E0] gap-1 group-hover:gap-2 transition-all">
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
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
