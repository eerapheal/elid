'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, PartyPopper, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 linear-gradient">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 px-4 py-2 rounded-2xl w-fit mx-auto lg:mx-0 shadow-sm"
            >
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-sm font-bold text-primary tracking-wide uppercase">Award-Winning Event Design</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[0.9] tracking-tighter"
            >
              LID <br />
              <span className="text-gradient">EVENT.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Transforming ordinary moments into extraordinary memories. From luxury weddings to high-octane corporate events, we orchestrate perfection.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4"
            >
              <Link href="/booking">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-primary/50">
                  Plan Your Event
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="#portfolio">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-primary/20 bg-white/10 backdrop-blur-md font-bold text-lg hover:bg-primary/5 transition-all">
                  Our Work
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-border/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="text-primary w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">500+</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Events</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Star className="text-accent w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">4.9/5</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Rating</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <PartyPopper className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">100%</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Glassy Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-80 h-80 glass rounded-[40px] z-20 flex items-center justify-center overflow-hidden shadow-2xl border-white/50 p-6"
              >
                <img src="/logo.png" alt="LID EVENT Logo" className="w-full h-full object-contain" />
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-0 right-0 w-72 h-72 glass rounded-[50px] z-10 flex items-center justify-center overflow-hidden shadow-2xl border-white/50"
              >
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-tr from-accent to-primary rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Star className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground leading-tight">Elite Excellence</h3>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-[80px] -z-10 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

