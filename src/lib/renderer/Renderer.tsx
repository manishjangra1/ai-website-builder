'use client';

import React from 'react';
import { SectionData } from '../validations/sections';
import { ComponentRegistry } from './registry';

interface RendererProps {
  sections: SectionData[];
}

export function Renderer({ sections }: RendererProps) {
  return (
    <div className="flex flex-col w-full">
      {sections.map((section) => {
        const Component = ComponentRegistry[section.type];
        if (!Component) {
          console.warn(`No component found for type: ${section.type}`);
          return null;
        }

        return (
          <section key={section.id} id={section.id} className="relative group">
            <Component {...section.props} />
            {/* Editor overlays will be added here later */}
          </section>
        );
      })}
    </div>
  );
}
                                                           