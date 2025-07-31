'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  logo: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  isEditing?: boolean;
}

export default function NavbarSection({ logo, links, cta, isEditing }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={isEditing ? false : { y: -100 }}
      animate={isEditing ? false : { y: 0 }}
      className={cn(
        isEditing ? "relative" : "sticky",
        "top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : 
        isEditing ? "bg-card/50 border-b border-border/50" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-violet">
          {logo}
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="text-sm font-medium text-secondary hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">Login</Button>
          <Button size="sm" className="rounded-full px-5">
            {cta.label}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
                                     