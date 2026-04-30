'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle, Sparkles, Calendar, User, Mail, Phone, MapPin, Users, Wallet, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const servicesList = [
  'Event Planning',
  'Wedding Planning',
  'Professional Dancers',
  'Professional Ushers',
  'Modelling Services',
  'Master of Ceremonies',
];

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    eventType: '',
    eventLocation: '',
    guestCount: '',
    budget: '',
    message: '',
  });

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.clientName ||
      !formData.clientEmail ||
      !formData.clientPhone ||
      !formData.eventDate ||
      !formData.eventType
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookingId(data.bookingId);
        setIsSuccess(true);
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          eventDate: '',
          eventType: '',
          eventLocation: '',
          guestCount: '',
          budget: '',
          message: '',
        });
        setSelectedServices([]);
        toast.success('Booking submitted! We\'ll contact you soon.');
      } else {
        toast.error('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('[LID] Booking error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background linear-gradient selection:bg-primary selection:text-white">
      <Navigation />

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-widest text-xs mb-8"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Let's Create Magic</span>
                  </motion.div>
                  <h1 className="text-5xl md:text-8xl font-black text-foreground leading-[0.85] tracking-tighter mb-8">
                    Start Your <span className="text-gradient">Journey.</span>
                  </h1>
                  <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                    Fill out the details below and our dream team will orchestrate your perfect event within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="glass border border-white/40 dark:border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl space-y-12 backdrop-blur-3xl">
                  {/* Step 1: Personal */}
                  <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <User className="text-white w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-black text-foreground tracking-tight">The Visionary</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="clientName" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Full Name *</Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="clientName"
                            name="clientName"
                            placeholder="John Doe"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clientEmail" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Email Address *</Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="clientEmail"
                            name="clientEmail"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.clientEmail}
                            onChange={handleInputChange}
                            className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clientPhone" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Phone Number *</Label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="clientPhone"
                            name="clientPhone"
                            type="tel"
                            placeholder="+234 800 000 0000"
                            value={formData.clientPhone}
                            onChange={handleInputChange}
                            className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Event */}
                  <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                        <Calendar className="text-white w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-black text-foreground tracking-tight">The Celebration</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="eventType" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Event Type *</Label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="w-full bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 h-14 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
                          required
                        >
                          <option value="">Select event type</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Corporate">Corporate Event</option>
                          <option value="Birthday">Birthday Celebration</option>
                          <option value="Festival">Festival/Cultural Event</option>
                          <option value="Private">Private Party</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventDate" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Event Date *</Label>
                        <div className="relative group">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="eventDate"
                            name="eventDate"
                            type="date"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventLocation" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Location</Label>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="eventLocation"
                            name="eventLocation"
                            placeholder="Lagos, Nigeria"
                            value={formData.eventLocation}
                            onChange={handleInputChange}
                            className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="guestCount" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Guests</Label>
                          <div className="relative group">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                              id="guestCount"
                              name="guestCount"
                              type="number"
                              placeholder="500"
                              value={formData.guestCount}
                              onChange={handleInputChange}
                              className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Budget</Label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 h-14 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-medium"
                          >
                            <option value="">Budget</option>
                            <option value="50K-100K">₦50K - 100K</option>
                            <option value="1M+">₦1M+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Services */}
                  <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                        <Sparkles className="text-white w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-black text-foreground tracking-tight">The Essentials</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {servicesList.map((service) => (
                        <motion.button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "p-4 rounded-2xl border-2 text-left transition-all duration-300",
                            selectedServices.includes(service)
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                              : "bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          <span className="text-sm font-bold uppercase tracking-widest">{service}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Final */}
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-black uppercase tracking-widest text-muted-foreground">Tell us your dream...</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe the atmosphere, themes, or any specific requests..."
                        className="bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 min-h-[160px] rounded-3xl p-6 focus:ring-primary/20 text-lg"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-[32px] bg-primary hover:bg-primary/90 text-white font-black text-2xl shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 group"
                  >
                    {isSubmitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Ignite My Event
                        <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto glass border border-white/40 rounded-[64px] p-16 text-center shadow-3xl backdrop-blur-3xl"
              >
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-primary animate-pulse">
                  <CheckCircle size={80} className="text-primary" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-8 leading-tight">
                  Magic is <br />
                  <span className="text-gradient">Underway.</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                  We've received your vision. Our team is already brainstorming to make it a reality.
                </p>
                
                {bookingId && (
                  <div className="mb-12 p-6 rounded-3xl bg-primary/5 border border-primary/20 inline-block">
                    <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Your Tracking Page</p>
                    <Link href={`/booking/${bookingId}`}>
                      <Button variant="outline" className="rounded-2xl border-primary text-primary font-black px-8 py-4 h-auto hover:bg-primary hover:text-white transition-all">
                        <ExternalLink className="mr-2 w-5 h-5" />
                        Track Booking Status
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="h-16 px-12 rounded-full bg-foreground text-background font-black text-xl hover:bg-foreground/90 transition-all w-full sm:w-auto"
                  >
                    Book Another One
                  </Button>
                  <Link href="/">
                    <Button variant="ghost" className="h-16 px-12 rounded-full font-black text-xl w-full sm:w-auto">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
