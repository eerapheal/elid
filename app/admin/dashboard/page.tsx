'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Sparkles,
  Search,
  Bell,
  Settings,
  MessageSquare,
  Briefcase,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Import Admin Components
import Overview from '@/components/admin/Overview';
import BookingManager from '@/components/admin/BookingManager';
import ServiceManager from '@/components/admin/ServiceManager';
import PortfolioManager from '@/components/admin/PortfolioManager';
import TeamManager from '@/components/admin/TeamManager';
import TestimonialManager from '@/components/admin/TestimonialManager';
import ClientManager from '@/components/admin/ClientManager';
import SettingsManager from '@/components/admin/SettingsManager';

interface Booking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  status: string;
  createdAt: string;
  services: string[];
}

type TabType = 'overview' | 'bookings' | 'services' | 'portfolio' | 'team' | 'testimonials' | 'clients' | 'settings';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        console.error('[LID] Error fetching bookings:', error);
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
      <div className="flex items-center justify-center min-h-screen bg-background linear-gradient">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) return null;

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview stats={stats} recentBookings={bookings} onViewAll={(status) => setActiveTab('bookings')} />;
      case 'bookings':
        return <BookingManager bookings={bookings} setBookings={setBookings} isLoading={isLoading} />;
      case 'services':
        return <ServiceManager />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'team':
        return <TeamManager />;
      case 'testimonials':
        return <TestimonialManager />;
      case 'clients':
        return <ClientManager bookings={bookings} />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <div className="text-center py-20 text-muted-foreground font-black uppercase tracking-widest">Coming Soon: {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background linear-gradient flex overflow-hidden">
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
              LID<span className="text-accent">.</span>
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={cn(
                "w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 group",
                activeTab === item.id 
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
              className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight capitalize">
                {activeTab}
              </h1>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Admin Panel • {session.user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-3 rounded-2xl bg-muted/50 border border-white/10 text-foreground hover:bg-primary/5 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-black text-white text-sm shadow-lg">
              {session.user?.name?.[0]}
            </div>
          </div>
        </header>

        <main className="p-6 md:p-12 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

