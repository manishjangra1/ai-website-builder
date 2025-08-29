'use client';

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PropertiesPanel() {
  const { website, activeSectionId, updateSection } = useBuilderStore();
  
  const activeSection = website.sections.find(s => s.id === activeSectionId);

  if (!activeSection) {
    return (
      <div className="p-6">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Properties</h2>
        <div className="text-secondary text-sm italic">
          Select a section to edit its properties
        </div>
      </div>
    );
  }

  const handleInputChange = (key: string, value: any) => {
    updateSection(activeSection.id, { [key]: value });
  };

  const renderFields = (props: any, prefix = '') => {
    return Object.entries(props).map(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={key} className="space-y-4 pt-4 border-t border-border mt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">{key}</h4>
            {renderFields(value, `${key}.`)}
          </div>
        );
      }

      if (Array.isArray(value)) {
        return (
          <div key={key} className="space-y-4 pt-4 border-t border-border mt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">{key}</h4>
            {value.map((item, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-secondary">ITEM {index + 1}</span>
                </div>
                {renderFields(item, `${key}[${index}].`)}
              </div>
            ))}
          </div>
        );
      }

      return (
        <div key={key} className="space-y-2">
          <Label className="text-[11px] font-medium text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
          <Input 
            value={value as string} 
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="h-8 text-sm bg-muted/50 border-border focus:ring-1 focus:ring-accent-blue"
          />
        </div>
      );
    });
  };

  return (
    <div className="p-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Properties</h2>
        <span className="text-[10px] bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded font-bold uppercase">
          {activeSection.type}
        </span>
      </div>

      <div className="space-y-6">
        {renderFields(activeSection.props)}
      </div>
    </div>
  );
}
  