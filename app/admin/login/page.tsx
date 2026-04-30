'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn, Sparkles, ShieldCheck, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success('Login successful');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('[LID] Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background linear-gradient flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 rotate-3">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-foreground">
              LID<span className="text-accent">.</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="glass border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl space-y-8 backdrop-blur-3xl">
          <div className="text-center">
            <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">
              Admin Portal
            </h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Secured Gate • Orchestrators Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                Authorized Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@lident.com"
                  className="bg-white/50 dark:bg-white/5 border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                Security Key
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-white/50 dark:bg-white/5 border-white/10 h-14 pl-12 rounded-2xl focus:ring-primary/20 font-medium"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <LogIn className="mr-2 w-5 h-5" />
                  Enter Dashboard
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center space-x-2 pt-4 opacity-50">
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Encrypted Session
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

