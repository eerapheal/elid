'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSiteData } from '@/context/SiteContext';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Ngozi Obi',
    role: 'Wedding Client',
    content: "LID EVENT made our wedding day absolutely perfect. Every detail was handled with such care and professionalism. We couldn't have asked for better!",
    rating: 5,
    color: 'border-primary/20 bg-primary/5'
  },
  {
    id: 2,
    name: 'Seun Adeleye',
    role: 'Corporate Client',
    content: 'Our product launch was a massive success thanks to the team. Their creativity and attention to detail was outstanding.',
    rating: 5,
    color: 'border-secondary/20 bg-secondary/5'
  },
  {
    id: 3,
    name: 'Zainab Hassan',
    role: 'Birthday Celebration',
    content: 'I wanted my birthday to be special, and LID EVENT delivered beyond my expectations. The energy was perfect!',
    rating: 5,
    color: 'border-accent/20 bg-accent/5'
  },
  {
    id: 4,
    name: 'Chima Eze',
    role: 'Corporate Client',
    content: 'Working with LID EVENT for our annual conference was a game-changer. Professional, reliable, and delivered exceptional results.',
    rating: 5,
    color: 'border-chart-4/20 bg-chart-4/5'
  },
];

export default function Testimonials() {
  const siteData = useSiteData();
  const dbTestimonials = siteData?.testimonials || [];

  const displayTestimonials = dbTestimonials.length > 0 
    ? dbTestimonials.map((t: any, i: number) => ({
        ...t,
        id: t._id,
        name: t.clientName,
        role: t.clientRole || 'Client',
        content: t.message,
        rating: t.rating || 5,
        color: i % 2 === 0 ? 'border-primary/20 bg-primary/5' : 'border-secondary/20 bg-secondary/5'
      }))
    : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-muted/10 linear-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="w-12 h-1.5 bg-primary rounded-full" />
            <span className="text-primary font-black uppercase tracking-widest text-sm">Testimonials</span>
            <div className="w-12 h-1.5 bg-primary rounded-full" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tighter"
          >
            What They <span className="text-gradient">Say.</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "relative p-10 rounded-[40px] border-2 transition-all duration-500 overflow-hidden group",
                testimonial.color
              )}
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-foreground/5 -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-2xl font-bold text-foreground mb-10 leading-relaxed tracking-tight">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center shadow-md font-black text-primary text-xl">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="text-xl font-black text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

