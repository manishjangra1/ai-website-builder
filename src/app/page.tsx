'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Globe, MousePointer2, ChevronRight, Code } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue/30 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-light dark:glass px-6 py-3 rounded-full border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center shadow-lg shadow-accent-blue/20">
              <Sparkles className="text-white h-4 w-4" />
            </div>
            <span className="font-bold tracking-tight">Antigravity</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#showcase" className="hover:text-foreground transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/builder">
              <Button size="sm" className="rounded-full px-6 gap-2 animate-glow">
                Launch App
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-bold uppercase tracking-wider mb-8"
          >
            <Zap className="h-3 w-3 fill-current" />
            Next Generation Website Builder
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            Build your vision <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan animate-gradient-x">
              at the speed of thought
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Generate production-ready websites in seconds. Our AI understands your goals and crafts premium designs using our curated component library.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/builder">
              <Button size="lg" className="rounded-full px-10 py-7 text-lg h-auto animate-glow">
                Start Building Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full px-10 py-7 text-lg h-auto glass">
              <Code className="mr-2 h-5 w-5" />
              View Source
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', damping: 20 }}
          className="mt-24 max-w-6xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative glass border border-white/10 rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl">
             {/* Abstract UI representation */}
             <div className="w-full h-full bg-background/50 flex items-center justify-center">
                <div className="text-secondary/20 flex flex-col items-center gap-4">
                  <MousePointer2 className="h-12 w-12 animate-bounce" />
                  <span className="text-2xl font-bold uppercase tracking-widest">Interactive Canvas Preview</span>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-24 px-6 relative bg-card/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: 'AI Generation', desc: 'Transform complex prompts into beautiful websites instantly.' },
            { icon: zap, title: 'Real-time Editing', desc: 'Visual builder with drag-and-drop and inline content editing.' },
            { icon: Globe, title: 'One-Click Publish', desc: 'Deploy your site to a global edge network with ease.' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="text-accent-blue h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/50 text-center text-secondary text-sm">
        <p>© 2026 Antigravity. Built with Next.js 15 and Tailwind v4.</p>
      </footer>
    </div>
  );
}

// Quick fix for the Zap icon reference case sensitivity
const zap = Zap;
    