import Lead from '../models/Lead.js';

// @desc    Submit a new lead from landing page / consultation modal
// @route   POST /api/leads
export const createLead = async (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    const whatsapp = (req.body.whatsapp || req.body.phone || req.body.phoneNumber || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const message = (req.body.message || req.body.projectBrief || '').trim().slice(0, 500);
    const website = (req.body.website || req.body.company || '').trim();

    // Normalize serviceRequired to valid enum
    const validServices = [
      'Website Builder & Development',
      'Graphic Design',
      'Digital Marketing Support',
      'E-commerce Support',
      'Social Media Services',
      'Meta Ads Management',
      'General Consultation',
    ];
    let serviceRequired = req.body.serviceRequired || req.body.service || 'Website Builder & Development';
    if (!validServices.includes(serviceRequired)) {
      serviceRequired = 'Website Builder & Development';
    }

    // Normalize businessType to valid enum
    const validBusinessTypes = ['Doctor / Clinic', 'Real Estate', 'Engineering', 'Retail / E-commerce', 'Other'];
    let businessType = req.body.businessType || 'Other';
    if (!validBusinessTypes.includes(businessType)) {
      businessType = 'Other';
    }

    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, message: 'Full Name must be at least 2 characters' });
    }

    if (!whatsapp || whatsapp.length < 7) {
      return res.status(400).json({ success: false, message: 'Valid phone / WhatsApp number is required' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required' });
    }

    const newLead = await Lead.create({
      name,
      whatsapp,
      email,
      businessType,
      serviceRequired,
      message,
      website,
      status: 'New',
    });

    // Automated Email Notification Simulation (per PDF Section 3.2)
    const emailSubject = `New Lead Alert: [${newLead.serviceRequired}] - [${newLead.name}]`;
    console.log(`📧 [Admin Notification Email Triggered] Subject: "${emailSubject}"`);
    console.log(`📩 [Client Welcome Notification Scheduled] Sent to: ${newLead.email} & WhatsApp: ${newLead.whatsapp}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your request has been recorded. Our specialist will contact you within 24 hours on WhatsApp.',
      data: newLead,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting lead',
      error: error.message,
    });
  }
};

// @desc    Get all leads with summary metrics for admin
// @route   GET /api/leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const inProgressLeads = leads.filter((l) => l.status === 'In Progress').length;
    const convertedLeads = leads.filter((l) => l.status === 'Converted').length;

    res.status(200).json({
      success: true,
      stats: {
        total: totalLeads,
        new: newLeads,
        inProgress: inProgressLeads,
        converted: convertedLeads,
      },
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching leads',
      error: error.message,
    });
  }
};

// @desc    Update lead status / notes
// @route   PATCH /api/leads/:id
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating lead',
      error: error.message,
    });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting lead',
      error: error.message,
    });
  }
};
