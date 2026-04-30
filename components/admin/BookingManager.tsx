'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search,
  MoreVertical,
  Trash2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  eventLocation?: string;
  guestCount?: number;
  budget?: string;
  services: string[];
  message?: string;
  status: string;
  createdAt: string;
}

interface BookingManagerProps {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  isLoading: boolean;
}

export default function BookingManager({ bookings, setBookings, isLoading }: BookingManagerProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus ? b.status === selectedStatus : true;
    const matchesSearch = b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings(bookings.map(b => b._id === id ? updatedBooking : b));
        toast.success(`Booking ${newStatus} successfully`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter(b => b._id !== id));
        toast.success('Booking deleted successfully');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      contacted: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      confirmed: "bg-green-500/10 text-green-600 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-600 border-red-500/20"
    }[status] || "bg-muted text-muted-foreground";

    return (
      <Badge variant="outline" className={cn("rounded-full px-3 py-1 font-bold uppercase tracking-widest text-[10px]", styles)}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Manage Bookings</h2>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['All', 'Pending', 'Contacted', 'Confirmed', 'Cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s === 'All' ? null : s.toLowerCase())}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0",
              (selectedStatus === s.toLowerCase() || (s === 'All' && !selectedStatus))
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <Card className="glass border border-white/20 rounded-[40px] shadow-2xl overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Client</th>
                <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Event</th>
                <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Date</th>
                <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-xs font-black text-muted-foreground uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-primary font-black uppercase tracking-widest">
                        Loading...
                      </motion.div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-muted-foreground font-bold">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center font-black text-primary text-lg shadow-inner shrink-0">
                            {booking.clientName[0]}
                          </div>
                          <div>
                            <div className="text-base font-black text-foreground leading-none mb-1">{booking.clientName}</div>
                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{booking.clientEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-foreground mb-1">{booking.eventType}</div>
                        <div className="flex items-center text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                          <MapPin size={10} className="mr-1" />
                          {booking.eventLocation || 'No location set'}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2 text-sm font-bold text-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(booking.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <select 
                            value={booking.status}
                            onChange={(e) => updateStatus(booking._id, e.target.value)}
                            disabled={updatingId === booking._id}
                            className="bg-muted/50 border border-white/10 rounded-xl px-3 py-1 text-xs font-bold focus:outline-none disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button 
                            onClick={() => deleteBooking(booking._id)}
                            className="p-2 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
