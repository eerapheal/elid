'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="contact" className="py-24 md:py-40 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-primary -z-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-50 -z-10 animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter"
            >
              Ready to Create <br />
              <span className="text-white/70">Magic?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Get in touch with our team today and let's orchestrate something truly extraordinary together.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <Link href="/booking">
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-lg shadow-2xl shadow-black/20 transition-all hover:-translate-y-1"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-10 rounded-2xl border-2 border-white/40 text-white hover:bg-white/10 font-bold text-lg transition-all"
                >
                  Say Hello
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right - Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin, title: 'Location', value: 'Victoria Island, Lagos', color: 'bg-white/10' },
              { icon: Phone, title: 'Phone', value: '+234 800 EVENTS', color: 'bg-white/15' },
              { icon: Mail, title: 'Email', value: 'hello@elid.com', color: 'bg-white/15' },
              { icon: Clock, title: 'Hours', value: '9 AM - 6 PM', color: 'bg-white/10' },
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "p-8 rounded-[32px] backdrop-blur-xl border border-white/20 shadow-lg group",
                  info.color
                )}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="font-black text-white text-lg mb-1">{info.title}</h3>
                <p className="text-white/70 font-semibold">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

