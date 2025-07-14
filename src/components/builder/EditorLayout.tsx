'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import { useBuilderStore } from '@/store/useBuilderStore';
import { PropertiesPanel } from './PropertiesPanel';

export function EditorLayout() {
  const { isPreviewMode } = useBuilderStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      {!isPreviewMode && <Sidebar />}

      {/* Main Content */}
      <div className="flex flex-col flex-1 relative overflow-hidden">
        <Toolbar />
        <Canvas />
      </div>

      {/* Right Settings Panel */}
      {!isPreviewMode && (
        <div className="w-80 border-l border-border bg-card/30 hidden lg:block overflow-y-auto">
          <PropertiesPanel />
        </div>
      )}
    </div>
  );
}
                               