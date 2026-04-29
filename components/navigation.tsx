'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Team', href: '/#team' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300",
        scrolled ? "top-2" : "top-4"
      )}
    >
      <div className={cn(
        "relative rounded-2xl px-4 py-2 transition-all duration-500",
        scrolled 
          ? "glass shadow-2xl backdrop-blur-xl bg-white/70 dark:bg-black/50 border-white/40 dark:border-white/10" 
          : "bg-transparent border-transparent"
      )}>
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-tr from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Sparkles className="text-white w-6 h-6" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
              ELID<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-muted/50 dark:bg-muted/10 p-1 rounded-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors group"
              >
                {item.label}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                  layoutId="nav-underline"
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/booking">
              <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-2 py-4 border-t border-border mt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-lg font-bold text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/booking" onClick={() => setIsOpen(false)} className="pt-2">
                  <Button className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-xl shadow-primary/20">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

