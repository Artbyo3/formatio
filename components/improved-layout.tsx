"use client";

import { MainSidebar } from "./main-sidebar";
import { ImprovedHeader } from "./improved-header";
import { ImprovedToolbar } from "./improved-toolbar";
import { RichTextEditor, RichTextEditorRef } from "./rich-text-editor";
import { ToolsPanel } from "./tools-panel";
import { StatsPanel } from "./stats-panel";
import { SearchReplaceDialog } from "./search-replace-dialog";
import { InsertDialog } from "./insert-dialog";

import { Document } from "@/lib/document-manager";

interface SearchOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
  regex?: boolean;
}

interface LinkData {
  url: string;
  text: string;
}

interface ImageData {
  src: string;
  alt: string;
  width: string;
  height: string;
}

interface TableData {
  rows: number;
  cols: number;
}

interface ImprovedLayoutProps {
  // Documentos
  documents: Document[];
  currentDocument: Document | null;
  onSwitchDocument: (id: string) => void;
  onCreateDocument: (template?: { content: string; name: string }) => void;
  onDeleteDocument: (id: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateContent: (content: string) => void;
  onUpdateSelection: (start: number, end: number) => void;
  
  // Estado de la aplicación
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  
  // Paneles
  showToolsPanel: boolean;
  showStatsPanel: boolean;
  onToggleTools: () => void;
  onToggleStats: () => void;
  
  // Diálogos
  isSearchOpen: boolean;
  isInsertOpen: boolean;
  onSearch: () => void;
  onCloseSearch: () => void;
  onCloseInsert: () => void;
  onSearchAction: (query: string, options: SearchOptions) => void;
  onReplaceAction: (query: string, replacement: string, options: SearchOptions) => void;
  onReplaceAllAction: (query: string, replacement: string, options: SearchOptions) => void;
  onInsertAction: (type: 'link' | 'image' | 'table', data: LinkData | ImageData | TableData) => void;
  
  // Exportación e importación
  onExport: (format: string) => void;
  onImport: () => void;
  
  // Referencias
  editorRef: React.RefObject<RichTextEditorRef>;
  searchResults: { current: number; total: number };
}

export function ImprovedLayout({
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
  showToolsPanel,
  showStatsPanel,
  onToggleTools,
  onToggleStats,
  isSearchOpen,
  isInsertOpen,
  onSearch,
  onCloseSearch,
  onCloseInsert,
  onSearchAction,
  onReplaceAction,
  onReplaceAllAction,
  onInsertAction,
  onExport,
  onImport,
  editorRef,
  searchResults
}: ImprovedLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar principal */}
      <MainSidebar
        documents={documents}
        currentDocument={currentDocument}
        onSwitchDocument={onSwitchDocument}
        onCreateDocument={onCreateDocument}
        onDeleteDocument={onDeleteDocument}
        onSave={onSave}
        onExport={onExport}
        onImport={onImport}
        showToolsPanel={showToolsPanel}
        showStatsPanel={showStatsPanel}
        onToggleTools={onToggleTools}
        onToggleStats={onToggleStats}
        isDirty={isDirty}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header mejorado */}
        <ImprovedHeader
          documentTitle={currentDocument?.title || ''}
          onTitleChange={onUpdateTitle}
          onSave={onSave}
          onExport={onExport}
          onImport={onImport}
          onSearch={onSearch}
          isDirty={isDirty}
          lastSaved={currentDocument?.updatedAt ? new Date(currentDocument.updatedAt) : undefined}
          wordCount={currentDocument?.wordCount || 0}
          charCount={currentDocument?.charCount || 0}
          showToolsPanel={showToolsPanel}
          showStatsPanel={showStatsPanel}
          onToggleTools={onToggleTools}
          onToggleStats={onToggleStats}
        />

        {/* Barra de herramientas mejorada */}
        <ImprovedToolbar
          onFormat={(format, value) => {
            if (editorRef.current) {
              editorRef.current.applyFormat(format, value);
            }
          }}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />

        {/* Área de contenido principal */}
        <div className="flex-1 flex min-h-0">
          {/* Editor principal */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-6">
              <div className="max-w-4xl mx-auto h-full">
                <RichTextEditor
                  ref={editorRef}
                  document={currentDocument}
                  onContentChange={onUpdateContent}
                  onSelectionChange={onUpdateSelection}
                  className="h-full border rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Paneles laterales */}
          {showToolsPanel && (
            <div className="w-80 border-l bg-muted/20">
              <ToolsPanel
                onApplyFormat={onUpdateContent}
                currentText={currentDocument?.content || ''}
              />
            </div>
          )}
          
          {showStatsPanel && (
            <div className="w-80 border-l bg-muted/20">
              <StatsPanel
                text={currentDocument?.content || ''}
                onApplyResult={onUpdateContent}
              />
            </div>
          )}
        </div>
      </div>

      {/* Diálogos modales */}
      <SearchReplaceDialog
        isOpen={isSearchOpen}
        onClose={onCloseSearch}
        onSearch={onSearchAction}
        onReplace={onReplaceAction}
        onReplaceAll={onReplaceAllAction}
        currentMatch={searchResults.current}
        totalMatches={searchResults.total}
      />

      <InsertDialog
        isOpen={isInsertOpen}
        onClose={onCloseInsert}
        onInsert={onInsertAction}
      />
    </div>
  );
}
