'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, LinkedinIcon, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                ELID<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-medium leading-relaxed">
              We don't just plan events; we create masterpieces. Elevating every moment into an extraordinary experience.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, LinkedinIcon].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors shadow-sm"
                >
                  <Icon size={20} className="text-foreground" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-foreground mb-8 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Portfolio', 'Team', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} 
                    className="text-muted-foreground font-semibold hover:text-primary transition-all flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-black text-foreground mb-8 uppercase tracking-widest">Our Expertise</h4>
            <ul className="space-y-4">
              {['Event Planning', 'Wedding Planning', 'Entertainment', 'Modelling Services'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#services" 
                    className="text-muted-foreground font-semibold hover:text-secondary transition-all flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black text-foreground mb-8 uppercase tracking-widest">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-accent w-5 h-5" />
                </div>
                <span className="text-muted-foreground font-semibold leading-relaxed">
                  123 Luxury Lane, Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary w-5 h-5" />
                </div>
                <span className="text-muted-foreground font-semibold">+234 800 EVENTS</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-secondary w-5 h-5" />
                </div>
                <span className="text-muted-foreground font-semibold">hello@elid.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-border pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground font-bold">
              &copy; {currentYear} <span className="text-gradient">ELID.</span> All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-muted-foreground font-semibold hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground font-semibold hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

