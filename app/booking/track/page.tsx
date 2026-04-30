'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';

export default function TrackBookingPage() {
  const [bookingId, setBookingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;
    setIsSearching(true);
    router.push(`/booking/${bookingId.trim()}`);
  };

  return (
    <main className="min-h-screen bg-background linear-gradient">
      <Navigation />
      
      <section className="pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-widest text-xs mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Real-time Updates</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight tracking-tighter mb-8">
              Track Your <span className="text-gradient">Magic.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-md mx-auto">
              Enter your unique booking ID to check the current status and details of your celebration.
            </p>
          </div>

          <Card className="glass border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl backdrop-blur-3xl">
            <form onSubmit={handleTrack} className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-2">Booking ID</label>
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Enter ID (e.g. 64abc...)"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="w-full bg-white/50 dark:bg-white/5 border-2 border-white/40 dark:border-white/10 h-20 pl-16 pr-8 rounded-3xl text-xl font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSearching}
                className="w-full h-20 rounded-3xl bg-primary hover:bg-primary/90 text-white font-black text-2xl shadow-2xl shadow-primary/20 transition-all group"
              >
                {isSearching ? 'Locating...' : (
                  <>
                    Track Status
                    <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}


