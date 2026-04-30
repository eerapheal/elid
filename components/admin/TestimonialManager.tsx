'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2, Star, Save, X, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'sonner';

interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Testimonial | null>(null);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      if (response.ok) setTestimonials(await response.json());
    } catch (error) { toast.error('Failed to fetch testimonials'); }
    finally { setIsLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!current) return;
    const method = current._id ? 'PUT' : 'POST';
    const url = current._id ? `/api/admin/testimonials/${current._id}` : '/api/admin/testimonials';
    try {
      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
      });
      if (response.ok) {
        toast.success('Saved successfully');
        setIsEditing(false); fetchTestimonials();
      }
    } catch (error) { toast.error('An error occurred'); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Testimonials</h2>
        <Button onClick={() => { setCurrent({ name: '', role: '', content: '', rating: 5 }); setIsEditing(true); }} className="rounded-2xl bg-primary font-black">
          <Plus className="mr-2 w-5 h-5" /> Add Testimonial
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass border border-white/20 p-8 rounded-[32px] shadow-2xl mb-12">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Client Photo</label>
                <ImageUpload 
                  value={current?.image ? [current.image] : []} 
                  onChange={(urls) => setCurrent({ ...current!, image: urls[0] })}
                  onRemove={() => setCurrent({ ...current!, image: '' })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Name</label>
                  <input type="text" value={current?.name} onChange={(e) => setCurrent({ ...current!, name: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={current?.rating} onChange={(e) => setCurrent({ ...current!, rating: Number(e.target.value) })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Content</label>
                <textarea value={current?.content} onChange={(e) => setCurrent({ ...current!, content: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 min-h-[100px]" required />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary font-black px-8">Save Testimonial</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <Card key={t._id} className="glass border border-white/20 rounded-[32px] p-8 shadow-xl relative overflow-hidden group">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/5" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex space-x-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => { setCurrent(t); setIsEditing(true); }} className="p-2 rounded-xl bg-muted/50 hover:bg-primary/10 transition-all"><Edit2 className="w-4 h-4" /></button>
                <button onClick={async () => { if(confirm('Delete?')) { await fetch(`/api/admin/testimonials/${t._id}`, { method: 'DELETE' }); fetchTestimonials(); } }} className="p-2 rounded-xl bg-muted/50 text-red-500 hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-lg font-bold text-foreground mb-6 leading-relaxed italic">"{t.content}"</p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary uppercase overflow-hidden relative">
                {t.image ? (
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                ) : (
                  t.name[0]
                )}
              </div>
              <div className="font-black text-foreground">{t.name}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
