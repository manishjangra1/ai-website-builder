'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/store/useBuilderStore';
import { Eye, Rocket, Share2, ZoomIn, ZoomOut, Monitor, Smartphone, Tablet, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { saveProject } from '@/app/actions/project';
import { useState } from 'react';

export function Toolbar() {
  const { zoomLevel, setZoomLevel, isPreviewMode, setPreviewMode, viewport, setViewport, website } = useBuilderStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await saveProject(null, website); // null for new project for now
      if (result.success) {
        alert('Project saved successfully!');
      } else {
        alert('Failed to save project.');
      }
    } catch (error) {
      alert('Error saving project.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-14 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-[100]">
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewport('desktop')}
            className={cn("h-7 w-7", viewport === 'desktop' ? "bg-background shadow-sm" : "text-secondary")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewport('tablet')}
            className={cn("h-7 w-7", viewport === 'tablet' ? "bg-background shadow-sm" : "text-secondary")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewport('mobile')}
            className={cn("h-7 w-7", viewport === 'mobile' ? "bg-background shadow-sm" : "text-secondary")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-4 w-[1px] bg-border mx-2" />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setZoomLevel(zoomLevel - 10)}><ZoomOut className="h-4 w-4" /></Button>
          <span className="text-xs font-medium w-10 text-center">{zoomLevel}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoomLevel(zoomLevel + 10)}><ZoomIn className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant={isPreviewMode ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setPreviewMode(!isPreviewMode)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className={cn("h-4 w-4", isSaving && "animate-spin")} />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button size="sm" className="rounded-full gap-2 px-6">
          <Rocket className="h-4 w-4" />
          Publish
        </Button>
      </div>
    </div>
  );
}
                      