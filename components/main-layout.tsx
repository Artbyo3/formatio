"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Document } from "@/lib/document-manager";
import { RichTextEditorRef } from "./rich-text-editor";
import { 
  LayoutDashboard, 
  FileText, 
  Menu,
  X,
  BookOpen
} from "lucide-react";
import { DashboardView } from "./dashboard-view";
import { WorkspaceView } from "./workspace-view";
import { StorageMonitor } from "./storage-monitor";
import { BlogView } from "./blog-view";

interface MainLayoutProps {
  documents: Document[];
  currentDocument: Document | null;
  onSwitchDocument: (id: string) => void;
  onCreateDocument: (template?: { content: string; name: string }) => void;
  onDeleteDocument: (id: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateContent: (content: string) => void;
  onUpdateSelection: (start: number, end: number) => void;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  editorRef: React.RefObject<RichTextEditorRef | null>;
}

type View = 'dashboard' | 'workspace' | 'blog';

export function MainLayout({
  documents,
  currentDocument,
  onSwitchDocument,
  onCreateDocument,
  onDeleteDocument,
  onUpdateTitle,
  onUpdateContent,
  onUpdateSelection,
  isDirty,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  editorRef
}: MainLayoutProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="h-screen flex bg-background">
      {/* Navegación lateral - solo 2 opciones */}
      <div className="w-64 glass-sidebar border-r flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-glass">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Formatio</h1>
              <p className="text-sm text-muted-foreground">Editor de Texto</p>
            </div>
          </div>
          
          {/* Navegación principal */}
          <nav className="space-y-3">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              className={`w-full justify-start h-12 rounded-xl smooth-transition ${
                currentView === 'dashboard' 
                  ? 'glass shadow-glass' 
                  : 'hover:glass hover:shadow-glass'
              }`}
              onClick={() => setCurrentView('dashboard')}
            >
              <div className="flex items-center w-full">
                <LayoutDashboard className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium text-left">Dashboard</span>
              </div>
            </Button>
            <Button
              variant={currentView === 'workspace' ? 'default' : 'ghost'}
              className={`w-full justify-start h-12 rounded-xl smooth-transition ${
                currentView === 'workspace' 
                  ? 'glass shadow-glass' 
                  : 'hover:glass hover:shadow-glass'
              }`}
              onClick={() => setCurrentView('workspace')}
            >
              <div className="flex items-center w-full">
                <FileText className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium text-left">Área de Trabajo</span>
              </div>
            </Button>
            <Button
              variant={currentView === 'blog' ? 'default' : 'ghost'}
              className={`w-full justify-start h-12 rounded-xl smooth-transition ${
                currentView === 'blog' 
                  ? 'glass shadow-glass' 
                  : 'hover:glass hover:shadow-glass'
              }`}
              onClick={() => setCurrentView('blog')}
            >
              <div className="flex items-center w-full">
                <BookOpen className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium text-left">Blog y Recursos</span>
              </div>
            </Button>
          </nav>
        </div>

        {/* Información adicional */}
        <div className="p-6 border-t border-white/10 mt-auto">
          <div className="glass-card rounded-xl p-4">
            <div className="text-sm space-y-3">
              {/* Información de almacenamiento */}
              <StorageMonitor />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header móvil */}
        <div className="lg:hidden border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Formatio</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {showMobileMenu && (
            <div className="mt-4 space-y-2">
              <Button
                variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-12 rounded-xl"
                onClick={() => {
                  setCurrentView('dashboard');
                  setShowMobileMenu(false);
                }}
              >
                <div className="flex items-center w-full">
                  <LayoutDashboard className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="font-medium text-left">Dashboard</span>
                </div>
              </Button>
              <Button
                variant={currentView === 'workspace' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-12 rounded-xl"
                onClick={() => {
                  setCurrentView('workspace');
                  setShowMobileMenu(false);
                }}
              >
                <div className="flex items-center w-full">
                  <FileText className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="font-medium text-left">Área de Trabajo</span>
                </div>
              </Button>
              <Button
                variant={currentView === 'blog' ? 'secondary' : 'ghost'}
                className="w-full justify-start h-12 rounded-xl"
                onClick={() => {
                  setCurrentView('blog');
                  setShowMobileMenu(false);
                }}
              >
                <div className="flex items-center w-full">
                  <BookOpen className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="font-medium text-left">Blog y Recursos</span>
                </div>
              </Button>
            </div>
          )}
        </div>

        {/* Vista actual */}
        <div className="flex-1 overflow-hidden">
          {currentView === 'dashboard' ? (
            <DashboardView
              documents={documents}
              onOpenDocument={(id) => {
                onSwitchDocument(id);
                setCurrentView('workspace');
              }}
              onCreateDocument={() => {
                onCreateDocument();
                setCurrentView('workspace');
              }}
              onDeleteDocument={onDeleteDocument}
            />
          ) : currentView === 'workspace' ? (
            <WorkspaceView
              documents={documents}
              currentDocument={currentDocument}
              onSwitchDocument={onSwitchDocument}
              onCreateDocument={onCreateDocument}
              onUpdateTitle={onUpdateTitle}
              onUpdateContent={onUpdateContent}
              onUpdateSelection={onUpdateSelection}
              isDirty={isDirty}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={onUndo}
              onRedo={onRedo}
              onSave={onSave}
              editorRef={editorRef}
              onGoToDashboard={() => setCurrentView('dashboard')}
            />
          ) : (
            <BlogView />
          )}
        </div>
      </div>
    </div>
  );
}
