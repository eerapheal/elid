'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SiteData {
  services: any[];
  portfolio: any[];
  team: any[];
  testimonials: any[];
  settings: {
    siteName?: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

const SiteContext = createContext<SiteData | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/site-data');
        if (response.ok) {
          setData(await response.json());
        }
      } catch (error) {
        console.error('Failed to fetch site data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SiteContext.Provider value={data}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteContext);
}
