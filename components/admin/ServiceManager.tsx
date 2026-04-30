'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Sparkles,
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface Service {
  _id?: string;
  name: string;
  description: string;
  price?: number;
  image?: string;
}

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService) return;

    const method = currentService._id ? 'PUT' : 'POST';
    const url = currentService._id 
      ? `/api/admin/services/${currentService._id}` 
      : '/api/admin/services';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService),
      });

      if (response.ok) {
        toast.success(currentService._id ? 'Service updated' : 'Service created');
        setIsEditing(false);
        setCurrentService(null);
        fetchServices();
      } else {
        toast.error('Failed to save service');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Service deleted');
        fetchServices();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Services</h2>
        <Button 
          onClick={() => {
            setCurrentService({ name: '', description: '' });
            setIsEditing(true);
          }}
          className="rounded-2xl bg-primary hover:bg-primary/90 font-black"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add Service
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass border border-white/20 p-8 rounded-[32px] shadow-2xl mb-12"
          >
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Service Image</label>
                <ImageUpload 
                  value={currentService?.image ? [currentService.image] : []} 
                  onChange={(urls) => setCurrentService({ ...currentService!, image: urls[0] })}
                  onRemove={() => setCurrentService({ ...currentService!, image: '' })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Name</label>
                  <input 
                    type="text" 
                    value={currentService?.name}
                    onChange={(e) => setCurrentService({ ...currentService!, name: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Price (Optional)</label>
                  <input 
                    type="number" 
                    value={currentService?.price || ''}
                    onChange={(e) => setCurrentService({ ...currentService!, price: Number(e.target.value) })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea 
                  value={currentService?.description}
                  onChange={(e) => setCurrentService({ ...currentService!, description: e.target.value })}
                  className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl font-bold">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl bg-primary font-black px-8">
                  <Save className="mr-2 w-5 h-5" />
                  Save Service
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service._id}
            layout
            className="glass border border-white/20 rounded-[32px] p-8 shadow-xl relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-primary w-7 h-7" />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setCurrentService(service);
                    setIsEditing(true);
                  }}
                  className="p-2 rounded-xl bg-muted/50 text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(service._id!)}
                  className="p-2 rounded-xl bg-muted/50 text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3">{service.name}</h3>
            <p className="text-muted-foreground font-medium line-clamp-3 mb-6">{service.description}</p>
            {service.price && (
              <div className="text-lg font-black text-primary">
                ${service.price.toLocaleString()}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
