'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  Mail, 
  Phone, 
  Search,
  ExternalLink,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  status: string;
  createdAt: string;
}

interface ClientManagerProps {
  bookings: Booking[];
}

export default function ClientManager({ bookings }: ClientManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const clients = useMemo(() => {
    const clientMap = new Map<string, {
      name: string;
      email: string;
      phone: string;
      totalBookings: number;
      lastBooking: string;
      history: Booking[];
    }>();

    bookings.forEach(booking => {
      const email = booking.clientEmail.toLowerCase();
      if (!clientMap.has(email)) {
        clientMap.set(email, {
          name: booking.clientName,
          email: booking.clientEmail,
          phone: booking.clientPhone,
          totalBookings: 1,
          lastBooking: booking.eventDate,
          history: [booking]
        });
      } else {
        const existing = clientMap.get(email)!;
        existing.totalBookings += 1;
        existing.history.push(booking);
        if (new Date(booking.eventDate) > new Date(existing.lastBooking)) {
          existing.lastBooking = booking.eventDate;
        }
      }
    });

    return Array.from(clientMap.values());
  }, [bookings]);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Clients Directory</h2>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClients.map((client, i) => (
          <motion.div
            key={client.email}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="glass border border-white/20 rounded-[40px] p-8 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-black text-primary text-2xl shadow-inner">
                  {client.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground leading-tight">{client.name}</h3>
                  <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    <Calendar size={12} className="mr-1 text-primary" />
                    Last: {new Date(client.lastBooking).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-sm font-medium text-foreground/80">
                  <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Mail size={14} className="text-muted-foreground" />
                  </div>
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-medium text-foreground/80">
                  <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Phone size={14} className="text-muted-foreground" />
                  </div>
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Bookings</div>
                  <div className="text-2xl font-black text-foreground">{client.totalBookings}</div>
                </div>
                <button className="flex items-center space-x-2 text-xs font-black uppercase text-primary tracking-widest hover:underline">
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
