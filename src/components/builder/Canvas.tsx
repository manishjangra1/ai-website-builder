'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Renderer } from '@/lib/renderer/Renderer';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';

export function Canvas() {
  const { website, zoomLevel, reorderSections, isPreviewMode, viewport } = useBuilderStore();
  
  const viewportWidths = {
    desktop: '1200px',
    tablet: '768px',
    mobile: '375px'
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = website.sections.findIndex((s) => s.id === active.id);
      const newIndex = website.sections.findIndex((s) => s.id === over?.id);
      
      reorderSections(arrayMove(website.sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-muted/30 p-20 flex justify-center items-start transition-all">
      <motion.div
        animate={{ 
          scale: zoomLevel / 100,
          width: viewportWidths[viewport]
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="bg-background shadow-2xl rounded-xl overflow-hidden origin-top border border-border"
      >
        {isPreviewMode ? (
          <Renderer sections={website.sections} />
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={website.sections.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col">
                {website.sections.map((section) => (
                  <SortableSection key={section.id} section={section} />
                ))}
                
                {website.sections.length === 0 && (
                  <div className="h-96 flex flex-col items-center justify-center text-secondary border-2 border-dashed border-border m-8 rounded-2xl">
                    <p className="text-lg font-medium">Your canvas is empty</p>
                    <p className="text-sm">Describe your website to AI or add sections manually</p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </motion.div>
    </div>
  );
}
                                 