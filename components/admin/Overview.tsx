'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Users,
  Calendar,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

interface OverviewProps {
  stats: Stats;
  recentBookings: any[];
  onViewAll: (status: string | null) => void;
}

export default function Overview({ stats, recentBookings, onViewAll }: OverviewProps) {
  const statCards = [
    { label: 'Total Bookings', count: stats.total, icon: LayoutDashboard, color: 'text-primary', bg: 'bg-primary/10', status: null },
    { label: 'Pending', count: stats.pending, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', status: 'pending' },
    { label: 'Confirmed', count: stats.confirmed, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', status: 'confirmed' },
    { label: 'Cancelled', count: stats.cancelled, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', status: 'cancelled' },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass border border-white/20 p-8 rounded-[32px] shadow-xl relative overflow-hidden group cursor-pointer"
            onClick={() => onViewAll(stat.status)}
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <p className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-4xl font-black text-foreground tracking-tight">{stat.count}</p>
            
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass border border-white/20 rounded-[40px] shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-foreground flex items-center">
              <TrendingUp className="mr-2 text-primary" /> Recent Activity
            </h3>
            <button 
              onClick={() => onViewAll(null)}
              className="text-sm font-black text-primary hover:underline uppercase tracking-widest"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentBookings.slice(0, 5).map((booking, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary">
                    {booking.clientName[0]}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{booking.clientName}</div>
                    <div className="text-xs text-muted-foreground">{booking.eventType}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-[10px] font-black uppercase text-primary tracking-widest">
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Tips/Stats */}
        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-primary to-secondary p-8 rounded-[40px] text-white shadow-2xl">
            <Sparkles className="w-10 h-10 mb-6 text-white/50" />
            <h3 className="text-2xl font-black mb-4 leading-tight">Elite Performance</h3>
            <p className="text-white/80 font-medium mb-6">
              Your conversion rate is up by 15% this month. Keep orchestrating perfection!
            </p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="h-full bg-white"
              />
            </div>
          </Card>

          <Card className="glass border border-white/20 p-8 rounded-[40px] shadow-2xl">
            <h4 className="font-black text-foreground mb-6 uppercase tracking-widest text-sm">Active Models</h4>
            <div className="space-y-4">
              {[
                { label: 'Services', icon: Sparkles, color: 'text-primary' },
                { label: 'Portfolio', icon: Calendar, color: 'text-secondary' },
                { label: 'Testimonials', icon: Users, color: 'text-accent' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon size={16} className={item.color} />
                    <span className="font-bold text-foreground">{item.label}</span>
                  </div>
                  <div className="text-sm font-black text-muted-foreground">Active</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
