'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Sparkles, Layout, Layers, Palette, Plus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const [activeTab, setActiveTab] = React.useState('ai');
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { addSection, setWebsite } = useBuilderStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) throw new Error('Failed to generate');
      
      const data = await response.json();
      setWebsite(data);
      setActiveTab('layers');
    } catch (error) {
      console.error(error);
      alert('Error generating website. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const tabs = [
    { id: 'ai', icon: Sparkles, label: 'AI' },
    { id: 'components', icon: Layout, label: 'Blocks' },
    { id: 'layers', icon: Layers, label: 'Layers' },
    { id: 'theme', icon: Palette, label: 'Theme' },
  ];

  return (
    <div className="w-72 border-r border-border bg-card/30 flex h-full">
      {/* Icon Rail */}
      <div className="w-16 border-r border-border flex flex-col items-center py-6 gap-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center mb-4 shadow-lg shadow-accent-blue/20">
          <Sparkles className="text-white h-5 w-5" />
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "p-3 rounded-xl transition-all group relative",
              activeTab === tab.id ? "bg-accent-blue/10 text-accent-blue" : "text-secondary hover:text-foreground"
            )}
          >
            <tab.icon className="h-5 w-5" />
            <div className="absolute left-16 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">AI Website</h3>
              <p className="text-sm text-secondary">Describe what you want to build</p>
            </div>
            
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A modern landing page for a coffee subscription startup with a dark theme..."
              className="w-full h-32 p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-accent-blue focus:outline-none text-sm resize-none"
              disabled={isGenerating}
            />
            
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full rounded-xl gap-2 h-11 shadow-lg shadow-accent-blue/20"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Site
                </>
              )}
            </Button>

            <div className="pt-6 border-t border-border">

              <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Quick Presets</h4>
              <div className="space-y-2">
                {['SaaS Platform', 'Portfolio', 'Agency', 'Mobile App'].map(preset => (
                  <button key={preset} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted text-sm text-left transition-colors">
                    {preset}
                    <ChevronRight className="h-4 w-4 text-secondary/50" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Sections</h3>
              <p className="text-sm text-secondary">Drag or click to add blocks</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { type: 'navbar', label: 'Navbar', props: { logo: 'Brand', links: [{ label: 'Home', href: '#' }], cta: { label: 'Start', href: '#' } } },
                { type: 'hero', label: 'Hero', props: { title: 'Modern Headline', subtitle: 'Crafted for startups', ctaPrimary: { label: 'Get Started', href: '#' } } },
                { type: 'features', label: 'Features', props: { title: 'Core Features', subtitle: 'Why choose us', items: [{ title: 'Fast', description: 'Blazing performance' }] } },
                { type: 'footer', label: 'Footer', props: { copyright: '© 2026 Brand', links: [] } },
              ].map(comp => (
                <button
                  key={comp.type}
                  onClick={() => addSection(comp.type, comp.props)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-secondary group-hover:text-accent-blue transition-colors">
                    <Layout className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{comp.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
                        