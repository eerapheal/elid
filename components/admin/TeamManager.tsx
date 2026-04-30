'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2, Users, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  specialty?: string;
  bio?: string;
  image?: string;
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/admin/team');
      if (response.ok) setMembers(await response.json());
    } catch (error) { toast.error('Failed to fetch team'); }
    finally { setIsLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMember) return;
    const method = currentMember._id ? 'PUT' : 'POST';
    const url = currentMember._id ? `/api/admin/team/${currentMember._id}` : '/api/admin/team';
    try {
      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentMember),
      });
      if (response.ok) {
        toast.success('Saved successfully');
        setIsEditing(false); fetchMembers();
      }
    } catch (error) { toast.error('An error occurred'); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Team Members</h2>
        <Button onClick={() => { setCurrentMember({ name: '', role: '', bio: '' }); setIsEditing(true); }} className="rounded-2xl bg-primary font-black">
          <Plus className="mr-2 w-5 h-5" /> Add Member
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass border border-white/20 p-8 rounded-[32px] shadow-2xl mb-12">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Photo</label>
                    <ImageUpload 
                      value={currentMember?.image ? [currentMember.image] : []} 
                      onChange={(urls) => setCurrentMember({ ...currentMember!, image: urls[0] })}
                      onRemove={() => setCurrentMember({ ...currentMember!, image: '' })}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Name</label>
                    <input type="text" value={currentMember?.name} onChange={(e) => setCurrentMember({ ...currentMember!, name: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Role</label>
                    <input type="text" value={currentMember?.role} onChange={(e) => setCurrentMember({ ...currentMember!, role: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none" required />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Bio</label>
                <textarea value={currentMember?.bio} onChange={(e) => setCurrentMember({ ...currentMember!, bio: e.target.value })} className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-4 min-h-[100px]" />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary font-black px-8">Save Member</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {members.map((member) => (
          <Card key={member._id} className="glass border border-white/20 rounded-[32px] p-8 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary text-lg">
                {member.name[0]}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => { setCurrentMember(member); setIsEditing(true); }} className="p-2 rounded-xl bg-muted/50 hover:bg-primary/10"><Edit2 className="w-5 h-5" /></button>
                <button onClick={async () => { if(confirm('Delete?')) { await fetch(`/api/admin/team/${member._id}`, { method: 'DELETE' }); fetchMembers(); } }} className="p-2 rounded-xl bg-muted/50 text-red-500 hover:bg-red-500/10"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
            <h3 className="text-xl font-black text-foreground">{member.name}</h3>
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{member.role}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
