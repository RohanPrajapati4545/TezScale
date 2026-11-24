import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true,
      minlength: [2, 'Full Name must be at least 2 characters'],
    },
    whatsapp: {
      type: String,
      required: [true, 'WhatsApp Number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    businessType: {
      type: String,
      enum: [
        'Doctor / Clinic',
        'Real Estate',
        'Real Estate / Builder',
        'Engineering',
        'Factory / B2B',
        'Retail / E-commerce',
        'Shop / Online Store',
        'Other',
        'Other Service',
      ],
      default: 'Other',
    },
    serviceRequired: {
      type: String,
      enum: [
        'Website Builder & Development',
        'Graphic Design',
        'Digital Marketing Support',
        'E-commerce Support',
        'Social Media Services',
        'Meta Ads Management',
        'General Consultation',
      ],
      default: 'Website Builder & Development',
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
      trim: true,
    },
    website: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
