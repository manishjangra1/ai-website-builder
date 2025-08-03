'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function PricingSection(props: any) {
  return (
    <section className="py-24 px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">{props.title || 'Pricing Plans'}</h2>
      <p className="text-secondary mb-12">{props.subtitle || 'Choose the plan that fits your needs'}</p>
      <div className="flex flex-wrap justify-center gap-8">
        {(props.plans || []).map((plan: any, i: number) => (
          <div key={i} className="p-8 rounded-3xl glass w-80 border border-border">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-6">{plan.price}</div>
            <ul className="text-left space-y-3 mb-8 text-secondary text-sm">
              {(plan.features || []).map((f: string, j: number) => (
                <li key={j}>• {f}</li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full bg-accent-blue text-white font-medium">Get Started</button>
          </div>
        ))}
      </div>
    </section>
  );
}
     