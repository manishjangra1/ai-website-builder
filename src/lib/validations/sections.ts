import { z } from 'zod';

export const SectionTypeEnum = z.enum([
  'navbar',
  'hero',
  'features',
  'pricing',
  'cta',
  'footer',
  'faq',
  'testimonials',
  'gallery',
  'stats',
]);

export type SectionType = z.infer<typeof SectionTypeEnum>;

export const NavbarSchema = z.object({
  logo: z.string(),
  links: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
});

export const HeroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  ctaPrimary: z.object({
    label: z.string(),
    href: z.string(),
  }),
  ctaSecondary: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  imageUrl: z.string().optional(),
});

export const FeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const FeaturesSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  items: z.array(FeatureSchema),
});

export const PricingPlanSchema = z.object({
  name: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  cta: z.string(),
  popular: z.boolean().optional(),
});

export const PricingSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  plans: z.array(PricingPlanSchema),
});

export const CTASectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
});

export const FooterSchema = z.object({
  copyright: z.string(),
  links: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })),
});

export const SectionSchema = z.object({
  id: z.string(),
  type: SectionTypeEnum,
  props: z.any(), // We'll refine this with discriminated unions if needed
});

export const PageSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(SectionSchema),
  theme: z.object({
    primaryColor: z.string().optional(),
    fontFamily: z.string().optional(),
    mode: z.enum(['light', 'dark']).optional(),
  }).optional(),
});

export type WebsiteData = z.infer<typeof PageSchema>;
export type SectionData = z.infer<typeof SectionSchema>;
                                     