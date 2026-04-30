'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ArrowLeft,
  Sparkles,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  eventLocation?: string;
  guestCount?: number;
  budget?: string;
  services: string[];
  message?: string;
  status: string;
  createdAt: string;
}

export default function BookingDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else {
          setError('Booking not found or access denied.');
        }
      } catch (err) {
        setError('An error occurred while fetching your booking.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background linear-gradient flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-background linear-gradient flex flex-col items-center justify-center p-6 text-center">
        <XCircle className="w-20 h-20 text-red-500 mb-8" />
        <h1 className="text-4xl font-black text-foreground mb-4">Oops!</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-md">{error || 'Booking not found.'}</p>
        <Link href="/">
          <Button className="rounded-2xl bg-primary px-12 py-6 font-black text-lg h-auto">Return Home</Button>
        </Link>
      </div>
    );
  }

  const statusInfo = {
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Processing' },
    contacted: { icon: Phone, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'In Discussion' },
    confirmed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Confirmed' },
    cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Cancelled' }
  }[booking.status] || { icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10', label: booking.status };

  const StatusIcon = statusInfo.icon;

  return (
    <main className="min-h-screen bg-background linear-gradient">
      <Navigation />
      
      <section className="pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm font-black text-primary uppercase tracking-widest mb-12 hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to home
          </Link>

          <div className="space-y-12">
            {/* Header Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div>
                  <div className={cn("inline-flex items-center px-4 py-2 rounded-2xl mb-6 font-black uppercase tracking-widest text-xs", statusInfo.bg, statusInfo.color)}>
                    <StatusIcon size={16} className="mr-2" />
                    {statusInfo.label}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                    {booking.eventType}
                  </h1>
                  <p className="text-muted-foreground font-medium">Booking ID: {booking._id}</p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-1">Event Date</div>
                  <div className="text-2xl font-black text-foreground">
                    {new Date(booking.eventDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass border border-white/20 rounded-[40px] p-8 shadow-xl"
              >
                <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-tighter">Event Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                      <div className="font-bold text-foreground">{booking.eventLocation || 'To be decided'}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Users className="text-secondary w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Guest Count</div>
                      <div className="font-bold text-foreground">{booking.guestCount || 'Not specified'} guests</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <CreditCard className="text-accent w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Budget Range</div>
                      <div className="font-bold text-foreground">{booking.budget || 'Custom'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass border border-white/20 rounded-[40px] p-8 shadow-xl"
              >
                <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-tighter">Client Details</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-black text-white text-xl">
                      {booking.clientName[0]}
                    </div>
                    <div>
                      <div className="font-black text-foreground text-lg">{booking.clientName}</div>
                      <div className="text-sm font-medium text-muted-foreground">{booking.clientEmail}</div>
                    </div>
                  </div>
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center space-x-3 text-sm font-bold text-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{booking.clientEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm font-bold text-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{booking.clientPhone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Services Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass border border-white/20 rounded-[40px] p-8 md:p-12 shadow-xl"
            >
              <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-tighter">Selected Services</h3>
              <div className="flex flex-wrap gap-4">
                {booking.services.map((service, i) => (
                  <div key={i} className="px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-widest text-xs">
                    {service}
                  </div>
                ))}
              </div>
              
              {booking.message && (
                <div className="mt-12 pt-12 border-t border-white/10">
                  <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Additional Message</h4>
                  <p className="text-lg font-medium text-foreground leading-relaxed italic">
                    "{booking.message}"
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
