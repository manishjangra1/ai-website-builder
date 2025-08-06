'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesProps {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export default function FeaturesSection({ title, subtitle, items }: FeaturesProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass hover:border-accent-blue/30 transition-colors group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              
              <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6 text-accent-blue">
                {/* Icon rendering logic can be added here */}
                <div className="w-6 h-6 rounded-full bg-current opacity-20" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-secondary leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
           