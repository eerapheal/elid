'use client';

import { motion } from 'framer-motion';
import { Heart, Music, Users, Sparkles, Mic2, Camera, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 1,
    name: 'Event Planning',
    description: 'Complete event management from concept to execution.',
    icon: Sparkles,
    color: 'bg-primary/20',
    iconColor: 'text-primary',
    gridClass: 'md:col-span-2 md:row-span-2',
    gradient: 'from-primary/20 via-primary/5 to-transparent'
  },
  {
    id: 2,
    name: 'Wedding Planning',
    description: 'Timeless wedding experiences tailored to your vision.',
    icon: Heart,
    color: 'bg-accent/20',
    iconColor: 'text-accent',
    gridClass: 'md:col-span-1 md:row-span-1',
    gradient: 'from-accent/20 via-accent/5 to-transparent'
  },
  {
    id: 3,
    name: 'Master of Ceremonies',
    description: 'Talented MCs to keep the energy high.',
    icon: Mic2,
    color: 'bg-secondary/20',
    iconColor: 'text-secondary',
    gridClass: 'md:col-span-1 md:row-span-1',
    gradient: 'from-secondary/20 via-secondary/5 to-transparent'
  },
  {
    id: 4,
    name: 'Professional Dancers',
    description: 'Energetic dancers to elevate the entertainment.',
    icon: Music,
    color: 'bg-chart-4/20',
    iconColor: 'text-chart-4',
    gridClass: 'md:col-span-1 md:row-span-2',
    gradient: 'from-chart-4/20 via-chart-4/5 to-transparent'
  },
  {
    id: 5,
    name: 'Professional Ushers',
    description: 'Trained ushers for an exceptional guest experience.',
    icon: Users,
    color: 'bg-chart-5/20',
    iconColor: 'text-chart-5',
    gridClass: 'md:col-span-1 md:row-span-1',
    gradient: 'from-chart-5/20 via-chart-5/5 to-transparent'
  },
  {
    id: 6,
    name: 'Modelling Services',
    description: 'Models for brand activations and product launches.',
    icon: Camera,
    color: 'bg-primary/20',
    iconColor: 'text-primary',
    gridClass: 'md:col-span-1 md:row-span-1',
    gradient: 'from-primary/20 via-primary/5 to-transparent'
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 mb-6"
          >
            <div className="w-12 h-1.5 bg-primary rounded-full" />
            <span className="text-primary font-black uppercase tracking-widest text-sm">Our Expertise</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tighter"
            >
              Services that <br />
              <span className="text-gradient">Define Luxury.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-md font-medium leading-relaxed"
            >
              From concept to the final applause, we provide high-end solutions for every aspect of your event.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  "group relative overflow-hidden rounded-[32px] p-8 transition-all duration-500",
                  "border border-white/40 dark:border-white/10 glass shadow-xl hover:shadow-2xl",
                  service.gridClass
                )}
              >
                {/* Background Gradient */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  service.gradient
                )} />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-auto">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                      service.color
                    )}>
                      <IconComponent size={32} className={service.iconColor} />
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      className="p-3 rounded-full bg-white/50 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ArrowUpRight className={cn("w-6 h-6", service.iconColor)} />
                    </motion.div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

