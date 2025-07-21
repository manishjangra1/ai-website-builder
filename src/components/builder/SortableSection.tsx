'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SectionData } from '@/lib/validations/sections';
import { ComponentRegistry } from '@/lib/renderer/registry';
import { GripVertical, Trash2, Settings2, Plus } from 'lucide-react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { cn } from '@/lib/utils';

interface SortableSectionProps {
  section: SectionData;
}

export function SortableSection({ section }: SortableSectionProps) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging 
  } = useSortable({ id: section.id });

  const { activeSectionId, setActiveSection, removeSection } = useBuilderStore();
  const isActive = activeSectionId === section.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 40 : 1,
  };

  const Component = ComponentRegistry[section.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setActiveSection(section.id)}
      className={cn(
        "relative group border-2 border-transparent transition-colors rounded-xl",
        isActive ? "border-accent-blue" : "hover:border-accent-blue/30"
      )}
    >
      {/* Overlay Toolbar */}
      {!isDragging && (
        <div className={cn(
          "absolute -left-12 top-0 bottom-0 w-10 flex flex-col items-center gap-2 pt-4 opacity-0 transition-opacity",
          isActive || "group-hover:opacity-100"
        )}>
          <div 
            {...attributes} 
            {...listeners}
            className="p-2 cursor-grab active:cursor-grabbing rounded-lg bg-card border border-border shadow-sm hover:bg-muted"
          >
            <GripVertical className="h-4 w-4 text-secondary" />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
            className="p-2 rounded-lg bg-card border border-border shadow-sm hover:bg-destructive/10 hover:text-destructive text-secondary"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add Section Button (Bottom) */}
      <div className="absolute -bottom-3 left-0 right-0 flex justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="h-6 w-6 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Actual Content */}
      <div className={cn(isDragging && "opacity-50 pointer-events-none")}>
        <Component {...section.props} isEditing={true} />
      </div>

      {/* Selection Label */}
      {isActive && (
        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-accent-blue text-white text-[10px] font-bold rounded uppercase tracking-wider z-20">
          {section.type}
        </div>
      )}
    </div>
  );
}
                  