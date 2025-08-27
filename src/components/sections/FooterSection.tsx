'use client';

import React from 'react';

interface FooterProps {
  copyright: string;
  links: { label: string; href: string }[];
}

export default function FooterSection({ copyright, links }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-secondary text-sm">
          {copyright}
        </div>
        
        <div className="flex items-center gap-8">
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="text-sm text-secondary hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
       