import mongoose from 'mongoose';

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  specialty: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);

// Portfolio Item Schema
const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  services: [String],
  images: [String],
  testimonial: { type: String },
  clientName: { type: String },
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientRole: { type: String },
  clientImage: { type: String },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventType: { type: String, required: true },
  eventLocation: { type: String },
  guestCount: { type: Number },
  budget: { type: String },
  services: [String],
  message: { type: String },
  status: { type: String, enum: ['pending', 'contacted', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Admin User Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// Site Settings Schema
const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'LID EVENT & MORE' },
  contactEmail: { type: String, default: 'esejilynda@gmail.com' },
  contactPhone: { type: String, default: '08163007792' },
  address: { type: String, default: 'no 7 mbamalu estate praise center off jakpa road warri delta state' },
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String,
    linkedin: String,
  },
  updatedAt: { type: Date, default: Date.now },
});

export const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', settingsSchema);
