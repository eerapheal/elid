'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Sparkles,
  Search,
  Bell,
  Settings,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  eventType: string;
  eventDate: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error('[ELID] Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchBookings();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background mesh-gradient">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) return null;

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus ? b.status === selectedStatus : true;
    const matchesSearch = b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = [
    { label: 'Total Bookings', count: bookings.length, icon: LayoutDashboard, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pending', count: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

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
    <div className="min-h-screen bg-background mesh-gradient flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden md:flex flex-col glass border-r border-white/20 h-screen sticky top-0 z-50 transition-all duration-300"
      >
        <div className="p-6 flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <span className="text-xl font-black tracking-tighter text-foreground whitespace-nowrap transition-opacity">
              ELID<span className="text-accent">.</span>
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {[
            { label: 'Overview', icon: LayoutDashboard, active: !selectedStatus, onClick: () => setSelectedStatus(null) },
            { label: 'Pending', icon: Clock, active: selectedStatus === 'pending', onClick: () => setSelectedStatus('pending') },
            { label: 'Confirmed', icon: CheckCircle2, active: selectedStatus === 'confirmed', onClick: () => setSelectedStatus('confirmed') },
            { label: 'Clients', icon: Users, active: false, onClick: () => {} },
            { label: 'Settings', icon: Settings, active: false, onClick: () => {} },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className={cn(
                "w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 group",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-bold">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="w-full flex items-center justify-start space-x-3 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-bold">Sign Out</span>}
          </Button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex p-2 rounded-xl hover:bg-primary/5 transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">
                {selectedStatus ? `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Bookings` : 'Overview'}
              </h1>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Welcome back, {session.user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all"
              />
            </div>
            <button className="p-3 rounded-2xl bg-muted/50 border border-white/10 text-foreground hover:bg-primary/5 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
            </button>
          </div>
        </header>

        <main className="p-6 md:p-12 space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass border border-white/20 p-8 rounded-[32px] shadow-xl relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedStatus(stat.label.toLowerCase() === 'total bookings' ? null : stat.label.toLowerCase())}
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

          {/* Bookings Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-foreground tracking-tighter">Recent Requests</h2>
              <div className="flex space-x-2">
                {['All', 'Pending', 'Confirmed', 'Cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s === 'All' ? null : s.toLowerCase())}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                      (selectedStatus === s.toLowerCase() || (s === 'All' && !selectedStatus))
                        ? "bg-foreground text-background" 
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Card className="glass border border-white/20 rounded-[40px] shadow-2xl overflow-hidden p-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Client</th>
                      <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Event Detail</th>
                      <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Date</th>
                      <th className="px-8 py-6 text-left text-xs font-black text-muted-foreground uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-right text-xs font-black text-muted-foreground uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <AnimatePresence mode="popLayout">
                      {isLoading ? (
                        <tr>
                          <td colSpan={5} className="py-20 text-center">
                            <motion.div 
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-primary font-black uppercase tracking-widest"
                            >
                              Fetching the magic...
                            </motion.div>
                          </td>
                        </tr>
                      ) : filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-20 text-center text-muted-foreground font-bold">
                            No requests found matching your filters.
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
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center font-black text-primary text-sm shadow-inner shrink-0">
                                  {booking.clientName[0]}
                                </div>
                                <div>
                                  <div className="text-base font-black text-foreground leading-none mb-1">{booking.clientName}</div>
                                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{booking.clientEmail}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-sm font-bold text-foreground">
                              {booking.eventType}
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
                              <button className="p-2 rounded-xl hover:bg-muted transition-colors">
                                <MoreVertical className="w-5 h-5 text-muted-foreground" />
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

