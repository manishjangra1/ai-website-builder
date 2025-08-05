import { create } from 'zustand';
import { SectionData, WebsiteData } from '@/lib/validations/sections';

interface BuilderState {
  website: WebsiteData;
  activeSectionId: string | null;
  isPreviewMode: boolean;
  zoomLevel: number;
  viewport: 'desktop' | 'tablet' | 'mobile';
  
  // Actions
  setWebsite: (website: WebsiteData) => void;
  updateSection: (sectionId: string, props: any) => void;
  addSection: (type: string, props: any) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (newSections: SectionData[]) => void;
  setActiveSection: (id: string | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setZoomLevel: (zoom: number) => void;
  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  website: {
    title: 'Untitled Project',
    description: 'My awesome AI-generated website',
    sections: [],
  },
  activeSectionId: null,
  isPreviewMode: false,
  zoomLevel: 100,
  viewport: 'desktop',

  setWebsite: (website) => set({ website }),
  
  updateSection: (sectionId, props) => set((state) => ({
    website: {
      ...state.website,
      sections: state.website.sections.map((s) => 
        s.id === sectionId ? { ...s, props: { ...s.props, ...props } } : s
      ),
    },
  })),

  addSection: (type, props) => set((state) => ({
    website: {
      ...state.website,
      sections: [
        ...state.website.sections,
        {
          id: Math.random().toString(36).substr(2, 9),
          type: type as any,
          props,
        },
      ],
    },
  })),

  removeSection: (sectionId) => set((state) => ({
    website: {
      ...state.website,
      sections: state.website.sections.filter((s) => s.id !== sectionId),
    },
    activeSectionId: state.activeSectionId === sectionId ? null : state.activeSectionId,
  })),

  reorderSections: (newSections) => set((state) => ({
    website: {
      ...state.website,
      sections: newSections,
    },
  })),

  setActiveSection: (id) => set({ activeSectionId: id }),
  
  setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),
  
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),

  setViewport: (viewport) => set({ viewport }),
}));
                                