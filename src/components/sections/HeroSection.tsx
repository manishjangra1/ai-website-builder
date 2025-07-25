'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-violet/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-secondary mb-10 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="rounded-full px-8 py-6 text-lg h-auto animate-glow">
            {ctaPrimary.label}
          </Button>
          {ctaSecondary && (
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg h-auto glass">
              {ctaSecondary.label}
            </Button>
          )}
        </motion.div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]" 
        style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}
                                            