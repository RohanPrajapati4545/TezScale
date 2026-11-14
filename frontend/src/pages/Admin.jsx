import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Settings,
  Sparkles,
  Layers,
  Award,
  MessageSquare,
  Megaphone,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  Save,
  RotateCcw,
  Search,
  Filter,
  RefreshCw,
  Plus,
  AlertCircle,
  Home,
  Check,
  LogOut,
  Loader2,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import apiFetch from '../api/apiClient';

const Admin = () => {
  const { content, updateContent, resetContent } = useContent();
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/backoffice');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/backoffice');
  };

  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadStats, setLeadStats] = useState({ total: 0, new: 0, inProgress: 0, converted: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form State for dynamic site content
  const [formData, setFormData] = useState(content);
  const [saveStatus, setSaveStatus] = useState({ show: false, message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Keep formData in sync when content loads
  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  // Fetch leads
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await apiFetch('/leads');
      const data = await res.json();
      if (res.ok && data.data) {
        setLeads(data.data);
        if (data.stats) setLeadStats(data.stats);
      }
    } catch (err) {
      console.warn('Could not fetch leads (backend offline?):', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update lead status
  const handleLeadStatusChange = async (leadId, newStatus) => {
    try {
      const res = await apiFetch(`/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
        fetchLeads(); // refresh counts
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await apiFetch(`/leads/${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== leadId));
        fetchLeads();
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  // Save Site Content
  const handleSaveContent = async () => {
    setIsSaving(true);
    const result = await updateContent(formData);
    setIsSaving(false);
    setSaveStatus({
      show: true,
      message: result.message || 'Changes saved successfully!',
      type: result.success ? 'success' : 'error',
    });
    setTimeout(() => setSaveStatus({ show: false, message: '', type: 'success' }), 3500);
  };

  // Reset to default
  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all website content back to original GrowthMax defaults?')) return;
    const result = await resetContent();
    setSaveStatus({
      show: true,
      message: result?.message || 'Content reset to default!',
      type: 'success',
    });
    setTimeout(() => setSaveStatus({ show: false, message: '', type: 'success' }), 3500);
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      lead.name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.whatsapp?.toLowerCase().includes(query) ||
      lead.businessType?.toLowerCase().includes(query) ||
      lead.serviceRequired?.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col anim-slow-fade">
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg border-b border-slate-800 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              A
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight flex items-center gap-2">
                Tezscale <span className="text-blue-400">Admin Portal</span>
                <span className="text-[10px] font-semibold bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Live Control
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all duration-300 hover:scale-102"
            >
              <Home className="w-4 h-4" />
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full anim-slow-slide">
        
        {/* Toast Alert */}
        {saveStatus.show && (
          <div
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all duration-500 anim-slow-slide ${
              saveStatus.type === 'success'
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-rose-600 text-white shadow-rose-600/30'
            }`}
          >
            {saveStatus.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{saveStatus.message}</span>
          </div>
        )}

        {/* Dashboard Tabs Bar */}
        <div className="bg-white rounded-xl p-1.5 shadow-xs border border-slate-200/90 mb-8 flex flex-wrap gap-1.5 transition-all duration-500">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Leads</span>
            {leads.length > 0 && (
              <span
                className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'leads' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-700'
                }`}
              >
                {leads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hero & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services & Solutions</span>
          </button>

          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'work'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Our Work & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab('banner')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'banner'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>CTA Banner</span>
          </button>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6 anim-slow-slide">
            {/* Stat Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between transition-all duration-500 hover:shadow-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Total Leads</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">{leadStats.total || leads.length}</div>
                </div>
                <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between transition-all duration-500 hover:shadow-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">New Leads</div>
                  <div className="text-2xl font-black text-blue-600 mt-1">{leadStats.new || 0}</div>
                </div>
                <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between transition-all duration-500 hover:shadow-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">In Progress</div>
                  <div className="text-2xl font-black text-amber-600 mt-1">{leadStats.inProgress || 0}</div>
                </div>
                <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between transition-all duration-500 hover:shadow-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Converted</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">{leadStats.converted || 0}</div>
                </div>
                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-500">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lead by name, email, or website..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <button
                  onClick={fetchLeads}
                  disabled={leadsLoading}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  title="Refresh Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${leadsLoading ? 'animate-spin text-blue-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 tracking-wider">
                      <th className="py-4 px-6">Client Info</th>
                      <th className="py-4 px-6">WhatsApp</th>
                      <th className="py-4 px-6">Business Vertical</th>
                      <th className="py-4 px-6">Service Requested</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {leadsLoading ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-500">
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <span className="font-semibold text-sm">Fetching leads from database...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          No leads found. Users who fill the consultation form will appear here in real-time!
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">{lead.name}</div>
                            <a href={`mailto:${lead.email}`} className="text-xs text-blue-600 hover:underline">
                              {lead.email}
                            </a>
                            {lead.message && (
                              <div className="text-[11px] text-slate-500 mt-1 italic max-w-xs truncate" title={lead.message}>
                                "{lead.message}"
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {lead.whatsapp ? (
                              <a
                                href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                              >
                                <span>{lead.whatsapp}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-slate-400 text-xs">N/A</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {lead.businessType || 'Other'}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-medium text-slate-700 text-xs">
                            {lead.serviceRequired || 'Website Builder & Development'}
                          </td>
                          <td className="py-4 px-6 text-slate-500 text-xs">
                            {lead.createdAt
                              ? new Date(lead.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'Just now'}
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead._id, e.target.value)}
                              className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-colors cursor-pointer ${
                                lead.status === 'New'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : lead.status === 'In Progress'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : lead.status === 'Converted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : lead.status === 'Contacted'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeleteLead(lead._id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO & STATS SETTINGS */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Hero Section & Visual Stats</h3>
                <p className="text-xs text-slate-500">Edit the top banner, headlines, CTA buttons and floating live metrics.</p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={formData?.hero?.badge || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, badge: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary CTA Button</label>
                <input
                  type="text"
                  value={formData?.hero?.primaryCta || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, primaryCta: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title Line 1</label>
                <input
                  type="text"
                  value={formData?.hero?.titleLine1 || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine1: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title Line 2 (Colored)</label>
                <input
                  type="text"
                  value={formData?.hero?.titleLine2 || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine2: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hero Description</label>
                <textarea
                  rows="3"
                  value={formData?.hero?.description || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, description: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Secondary CTA Button</label>
                <input
                  type="text"
                  value={formData?.hero?.secondaryCta || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, secondaryCta: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Laptop Traffic Metric</label>
                <input
                  type="text"
                  value={formData?.hero?.trafficStat || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, trafficStat: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Traffic Growth %</label>
                <input
                  type="text"
                  value={formData?.hero?.trafficGrowth || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, trafficGrowth: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Floating ROI Stat</label>
                <input
                  type="text"
                  value={formData?.hero?.roiStat || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, roiStat: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & SOLUTIONS */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Services & Solutions</h3>
                <p className="text-xs text-slate-500">Add, edit, or remove services offered by your agency.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newServices = [
                      ...(formData.services || []),
                      {
                        title: 'New Service',
                        desc: 'Service description here...',
                        icon: 'BarChart2',
                        badgeBg: 'bg-blue-50',
                      },
                    ];
                    setFormData({ ...formData, services: newServices });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>

                <button
                  onClick={handleSaveContent}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Section Header Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData?.servicesSection?.badge || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      servicesSection: { ...formData.servicesSection, badge: e.target.value },
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Title</label>
                <input
                  type="text"
                  value={formData?.servicesSection?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      servicesSection: { ...formData.servicesSection, title: e.target.value },
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Services Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData?.services?.map((serv, index) => (
                <div key={index} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Service #{index + 1}</span>
                    <button
                      onClick={() => {
                        const updated = formData.services.filter((_, i) => i !== index);
                        setFormData({ ...formData, services: updated });
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                      title="Remove Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={serv.title}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].title = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={serv.desc}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].desc = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Icon</label>
                    <select
                      value={serv.icon}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[index].icon = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="BarChart2">BarChart2 (SEO)</option>
                      <option value="Megaphone">Megaphone (Social Media)</option>
                      <option value="Target">Target (Ads / Performance)</option>
                      <option value="Edit3">Edit3 (Content)</option>
                      <option value="Monitor">Monitor (Web Dev)</option>
                      <option value="Mail">Mail (Email Marketing)</option>
                      <option value="TrendingUp">TrendingUp</option>
                      <option value="Cpu">Cpu / Tech</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OUR WORK & METRICS */}
        {activeTab === 'work' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Our Work & Company Stats</h3>
                <p className="text-xs text-slate-500">Edit the 3 milestone metrics and case study projects.</p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

            {/* Metric counters */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-3">Key Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-400">Stat 1</span>
                  <input
                    type="text"
                    value={formData?.metrics?.stat1Value || ''}
                    placeholder="150+"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, stat1Value: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-lg font-bold"
                  />
                  <input
                    type="text"
                    value={formData?.metrics?.stat1Label || ''}
                    placeholder="Happy Clients"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, stat1Label: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-400">Stat 2</span>
                  <input
                    type="text"
                    value={formData?.metrics?.stat2Value || ''}
                    placeholder="250%"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, stat2Value: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-lg font-bold"
                  />
                  <input
                    type="text"
                    value={formData?.metrics?.stat2Label || ''}
                    placeholder="Avg. Growth"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, stat2Label: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-400">Stat 3</span>
                  <input
                    type="text"
                    value={formData?.metrics?.stat3Value || ''}
                    placeholder="5+ Years"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, stat3Value: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-lg font-bold"
                  />
                  <input
                    type="text"
                    value={formData?.metrics?.stat3Label || ''}
                    placeholder="Industry Experience"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, stat3Label: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900 mb-3">Case Studies Portfolio</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData?.caseStudies?.map((study, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-400">Project #{idx + 1}</span>
                    <div>
                      <label className="text-xs font-bold text-slate-600 block mb-0.5">Title</label>
                      <input
                        type="text"
                        value={study.title}
                        onChange={(e) => {
                          const updated = [...formData.caseStudies];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, caseStudies: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={study.subtitle}
                        onChange={(e) => {
                          const updated = [...formData.caseStudies];
                          updated[idx].subtitle = e.target.value;
                          setFormData({ ...formData, caseStudies: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 block mb-0.5">Badge</label>
                      <input
                        type="text"
                        value={study.badge}
                        onChange={(e) => {
                          const updated = [...formData.caseStudies];
                          updated[idx].badge = e.target.value;
                          setFormData({ ...formData, caseStudies: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Client Testimonials</h3>
                <p className="text-xs text-slate-500">Manage feedback and quotes from clients.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const updated = [
                      ...(formData.testimonials || []),
                      {
                        name: 'New Client',
                        role: 'Co-founder, Startup',
                        quote: '“Amazing results delivered by the team!”',
                        avatar: '',
                        rating: 5,
                      },
                    ];
                    setFormData({ ...formData, testimonials: updated });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>

                <button
                  onClick={handleSaveContent}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {formData?.testimonials?.map((testi, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Testimonial #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = formData.testimonials.filter((_, i) => i !== idx);
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Client Name</label>
                      <input
                        type="text"
                        value={testi.name}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Role / Company</label>
                      <input
                        type="text"
                        value={testi.role}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">Quote</label>
                      <textarea
                        rows="2"
                        value={testi.quote}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].quote = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CTA BANNER */}
        {activeTab === 'banner' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Bottom CTA Banner</h3>
                <p className="text-xs text-slate-500">Edit the large blue banner shown above the footer.</p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Banner Title</label>
                <input
                  type="text"
                  value={formData?.ctaBanner?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ctaBanner: { ...formData.ctaBanner, title: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Banner Subtitle</label>
                <input
                  type="text"
                  value={formData?.ctaBanner?.subtitle || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ctaBanner: { ...formData.ctaBanner, subtitle: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData?.ctaBanner?.buttonText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ctaBanner: { ...formData.ctaBanner, buttonText: e.target.value },
                    })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
