import Lead from '../models/Lead.js';

// @desc    Submit a new lead from landing page
// @route   POST /api/leads
export const createLead = async (req, res) => {
  try {
    const { name, email, website } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const newLead = await Lead.create({
      name,
      email,
      website: website || '',
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Strategy call request received successfully!',
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
