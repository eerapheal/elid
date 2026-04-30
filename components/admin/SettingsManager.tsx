'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Share2,
  ExternalLink,
  MessageCircle,
  Users
} from 'lucide-react';

// Use generic icons as placeholders since brand logos were removed in lucide-react v1.0+
const Instagram = Globe;
const Facebook = Users;
const Twitter = ExternalLink;
const Linkedin = Share2;
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Settings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'LID EVENT',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialLinks: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({
          ...prev,
          ...data,
          socialLinks: data.socialLinks || {}
        }));
      }
    } catch (error) {
      toast.error('Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="text-center py-20 font-black uppercase tracking-widest text-primary animate-pulse">Loading settings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-foreground tracking-tighter">Site Settings</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Information */}
          <Card className="glass border border-white/20 p-8 rounded-[40px] shadow-2xl space-y-6">
            <h3 className="text-xl font-black text-foreground flex items-center">
              <Globe className="mr-2 text-primary" /> General Info
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Site Name</label>
                <input 
                  type="text" 
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full bg-muted/50 border border-white/10 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contact Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                  <textarea 
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links */}
          <Card className="glass border border-white/20 p-8 rounded-[40px] shadow-2xl space-y-6">
            <h3 className="text-xl font-black text-foreground flex items-center">
              <Instagram className="mr-2 text-primary" /> Social Presence
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="https://instagram.com/..."
                    value={settings.socialLinks?.instagram || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), instagram: e.target.value } })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Facebook</label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="https://facebook.com/..."
                    value={settings.socialLinks?.facebook || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), facebook: e.target.value } })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Twitter / X</label>
                <div className="relative">
                  <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="https://twitter.com/..."
                    value={settings.socialLinks?.twitter || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), twitter: e.target.value } })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">LinkedIn</label>
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="https://linkedin.com/in/..."
                    value={settings.socialLinks?.linkedin || ''}
                    onChange={(e) => setSettings({ ...settings, socialLinks: { ...(settings.socialLinks || {}), linkedin: e.target.value } })}
                    className="w-full bg-muted/50 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSaving}
            className="rounded-2xl bg-primary hover:bg-primary/90 font-black px-12 py-6 text-lg h-auto shadow-2xl shadow-primary/30"
          >
            {isSaving ? 'Saving...' : (
              <>
                <Save className="mr-2 w-6 h-6" />
                Save All Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
