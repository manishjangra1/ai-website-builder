'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function CTASection(props: any) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-accent-blue to-accent-violet p-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">{props.title || 'Ready to start?'}</h2>
        <p className="text-xl mb-10 opacity-90">{props.subtitle || 'Join thousands of creators today.'}</p>
        <Button size="lg" className="rounded-full px-10 py-7 bg-white text-accent-blue hover:bg-white/90">
          {props.cta?.label || 'Get Started'}
        </Button>
      </div>
    </section>
  );
}
       