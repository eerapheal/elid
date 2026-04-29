'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const teamMembers = [
  {
    id: 1,
    name: 'Lynda Eseji',
    role: 'Founder & CEO',
    specialty: 'Executive Planning',
    bio: 'Lynda is the visionary behind ELID EVENT & MORE, dedicated to redefining luxury and precision in the event industry.',
    image: 'LE',
    color: 'bg-primary/20'
  },
  {
    id: 2,
    name: 'Tunde Adeyemi',
    role: 'Master of Ceremonies',
    specialty: 'Entertainment',
    bio: 'Charismatic and professional, Tunde energizes every crowd with unmatched flair.',
    image: 'TA',
    color: 'bg-accent/20'
  },
  {
    id: 3,
    name: 'Amara Nwankwo',
    role: 'Creative Director',
    specialty: 'Performance',
    bio: 'Award-winning director bringing energy and elegance to the stage.',
    image: 'AN',
    color: 'bg-secondary/20'
  },
  {
    id: 4,
    name: 'Kunle Johnson',
    role: 'Event Manager',
    specialty: 'Corporate Events',
    bio: 'Specialist in large-scale corporate productions with impeccable detail.',
    image: 'KJ',
    color: 'bg-chart-4/20'
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-2xl bg-secondary/10 text-secondary font-black uppercase tracking-widest text-sm mb-6"
          >
            The Visionaries
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tighter"
          >
            Meet the <span className="text-gradient">Elites.</span>
          </motion.h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[40px] glass border border-white/40 dark:border-white/10 p-4 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                {/* Image Placeholder */}
                <div className={cn(
                  "aspect-[4/5] rounded-[32px] flex items-center justify-center transition-all duration-500 relative overflow-hidden",
                  member.color
                )}>
                  <span className="text-5xl font-black text-foreground/20 tracking-tighter">{member.image}</span>
                  
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                    {member.bio}
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

