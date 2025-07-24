import dynamic from 'next/dynamic';
import { SectionType } from '../validations/sections';

export const ComponentRegistry: Record<SectionType, any> = {
  navbar: dynamic(() => import('@/components/sections/NavbarSection')),
  hero: dynamic(() => import('@/components/sections/HeroSection')),
  features: dynamic(() => import('@/components/sections/FeaturesSection')),
  pricing: dynamic(() => import('@/components/sections/PricingSection')),
  cta: dynamic(() => import('@/components/sections/CTASection')),
  footer: dynamic(() => import('@/components/sections/FooterSection')),
  faq: dynamic(() => import('@/components/sections/FAQSection')),
  testimonials: dynamic(() => import('@/components/sections/TestimonialsSection')),
  gallery: dynamic(() => import('@/components/sections/GallerySection')),
  stats: dynamic(() => import('@/components/sections/StatsSection')),
};
                                               