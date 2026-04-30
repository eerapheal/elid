'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Filter } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSiteData } from '@/context/SiteContext';

const defaultPortfolioItems = [
  {
    id: 1,
    title: 'Luxury Wedding Reception',
    category: 'Wedding',
    services: ['Planning', 'MC', 'Dancers'],
    description: 'An elegant celebration of love with 300+ guests featuring live entertainment.',
    image: 'Wedding Reception',
    color: 'from-primary/20 to-secondary/20'
  },
  {
    id: 2,
    title: 'Corporate Launch Event',
    category: 'Corporate',
    services: ['Planning', 'Models', 'MC'],
    description: 'Professional product launch with brand activation and stunning models.',
    image: 'Corporate Event',
    color: 'from-accent/20 to-primary/20'
  },
  {
    id: 3,
    title: 'Cultural Celebration',
    category: 'Festival',
    services: ['Planning', 'Dancers', 'Ushers'],
    description: 'Vibrant cultural event celebrating heritage with professional dancers.',
    image: 'Cultural Event',
    color: 'from-secondary/20 to-accent/20'
  },
  {
    id: 4,
    title: 'Intimate Dinner Gala',
    category: 'Private',
    services: ['Planning', 'MC', 'Ushers'],
    description: 'Exclusive dining experience with elegant ambiance and professional service.',
    image: 'Dinner Gala',
    color: 'from-chart-4/20 to-primary/20'
  },
  {
    id: 5,
    title: 'Birthday Extravaganza',
    category: 'Celebration',
    services: ['Planning', 'Dancers', 'MC'],
    description: 'Memorable birthday celebration with interactive entertainment.',
    image: 'Birthday Event',
    color: 'from-chart-5/20 to-secondary/20'
  },
  {
    id: 6,
    title: 'Trade Show Experience',
    category: 'Corporate',
    services: ['Planning', 'Models', 'Ushers'],
    description: 'Dynamic trade show presence with professional staff and engaging experiences.',
    image: 'Trade Show',
    color: 'from-primary/20 to-chart-4/20'
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const siteData = useSiteData();
  const dbItems = siteData?.portfolio || [];

  const displayItems = dbItems.length > 0 
    ? dbItems.map((item: any, i: number) => ({
        ...item,
        id: item._id,
        category: item.category || 'Event',
        services: item.services || [],
        description: item.description || '',
        image: item.images?.[0] || '',
        color: i % 2 === 0 ? 'from-primary/20 to-secondary/20' : 'from-accent/20 to-primary/20'
      }))
    : defaultPortfolioItems;

  const filteredItems = filter === 'All' 
    ? displayItems 
    : displayItems.filter((item: any) => item.category === filter);

  const categories = ['All', ...new Set(displayItems.map((item: any) => item.category))];

  return (
    <section id="portfolio" className="py-24 md:py-40 bg-muted/20 linear-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-1.5 bg-accent rounded-full" />
              <span className="text-accent font-black uppercase tracking-widest text-sm">Our Work</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tighter"
            >
              Moments Turned <br />
              <span className="text-gradient">Into Legacies.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 bg-white/50 dark:bg-white/5 p-2 rounded-2xl backdrop-blur-md border border-white/20"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300",
                  filter === cat 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[32px] glass border border-white/40 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className={cn(
                "h-64 bg-gradient-to-br transition-all duration-700 relative overflow-hidden",
                item.color
              )}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center z-20">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className="w-16 h-16 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/40"
                  >
                    <ArrowUpRight className="text-white w-8 h-8" />
                  </motion.div>
                </div>
                {item.image && (
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute top-6 right-6 z-10">
                  <Badge className="bg-white/50 backdrop-blur-md text-foreground border-none font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
                    {item.category}
                  </Badge>
                </div>
                {!item.image && (
                  <div className="h-full flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity">
                    <span className="text-2xl font-black uppercase tracking-[0.2em] text-foreground/50 rotate-12">{item.title}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-medium mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.services.map((service) => (
                    <span 
                      key={service} 
                      className="px-4 py-1 rounded-full bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

