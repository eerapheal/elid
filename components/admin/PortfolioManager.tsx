'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2, Calendar, Save, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface PortfolioItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  services: string[];
  images: string[];
}

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      if (response.ok) setItems(await response.json());
    } catch (error) { toast.error('Failed to fetch portfolio'); }
    finally { setIsLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;
    const method = currentItem._id ? 'PUT' : 'POST';
    const url = currentItem._id ? `/api/admin/portfolio/${currentItem._id}` : '/api/admin/portfolio';
    try {
      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem),
      });
      if (response.ok) {
        toast.success('Saved successfully');
        setIsEditing(false); fetchItems();
      }
    } catch (error) { toast.error('An error occurred'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      if (response.ok) { toast.success('Deleted successfully'); fetchItems(); }
    } catch (error) { toast.error('An error occurred'); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Portfolio</h2>
        <Button onClick={() => { setCurrentItem({ title: '', description: '', category: 'Wedding', services: [], images: [] }); setIsEditing(true); }} className="rounded-2xl bg-primary font-black">
          <Plus className="mr-2 w-5 h-5" /> Add Project
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass border border-white/20 p-8 rounded-[32px] shadow-2xl mb-12">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Project Gallery</label>
                <ImageUpload 
                  value={currentItem?.images || []} 
                  onChange={(urls) => setCurrentItem({ ...currentItem!, images: urls })}
                  onRemove={(url) => setCurrentItem({ ...currentItem!, images: currentItem!.images.filter(i => i !== url) })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Title</label>
                  <input type="text" value={currentItem?.title} onChange={(e) => setCurrentItem({ ...currentItem!, title: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Category</label>
                  <select value={currentItem?.category} onChange={(e) => setCurrentItem({ ...currentItem!, category: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {['Wedding', 'Corporate', 'Festival', 'Private', 'Celebration'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea value={currentItem?.description} onChange={(e) => setCurrentItem({ ...currentItem!, description: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 min-h-[100px]" required />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl font-bold">Cancel</Button>
                <Button type="submit" className="rounded-xl bg-primary font-black px-8">Save Project</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card key={item._id} className="glass border border-white/20 rounded-[32px] p-8 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <Calendar className="text-secondary w-7 h-7" />
              </div>
              <div className="flex space-x-2">
                <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="p-2 rounded-xl bg-muted/50 hover:bg-primary/10 transition-all"><Edit2 className="w-5 h-5" /></button>
                <button onClick={() => handleDelete(item._id!)} className="p-2 rounded-xl bg-muted/50 text-red-500 hover:bg-red-500/10 transition-all"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground font-medium line-clamp-2 mb-4">{item.description}</p>
            <div className="text-xs font-black uppercase tracking-widest text-primary">{item.category}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
