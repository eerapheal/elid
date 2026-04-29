'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        toast.success('Message sent successfully! We\'ll be in touch soon.');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('[ELID] Contact error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '08163007792',
      link: 'tel:08163007792',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'esejilynda@gmail.com',
      link: 'mailto:esejilynda@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'no 7 mbamalu estate praise center off jakpa road warri delta state',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: '9 AM - 6 PM (Mon-Fri)',
      link: '#',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to our team and let&apos;s discuss your event dreams.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.title}
                      href={item.link}
                      className="flex gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <IconComponent size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.details}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors text-primary text-sm font-medium"
                    >
                      {social.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 border-border"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 border-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-foreground">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    className="mt-2 border-border"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more..."
                    className="mt-2 min-h-40 border-border"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-secondary text-primary-foreground py-3 text-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-sm text-muted-foreground">
                  * Required fields. We typically respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
