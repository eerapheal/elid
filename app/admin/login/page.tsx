'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';

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
      console.error('[v0] Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground text-2xl font-bold">E</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Portal
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage bookings and content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@eventsandmore.ng"
                className="mt-2 border-border"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="mt-2 border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-secondary text-primary-foreground py-2"
            >
              {isLoading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="mr-2" size={18} />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center">
            For security, use your admin credentials to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
