"use client";

import { useState, useEffect, useRef } from "react";
import { useEditor } from "@/lib/use-editor";
import { MainLayout } from "@/components/main-layout";
import { RichTextEditorRef } from "@/components/rich-text-editor";
import { ExportManager } from "@/lib/export-utils";

export default function Home() {
  const {
    currentDocument,
    documents,
    isDirty,
    canUndo,
    canRedo,
    createNewDocument,
    switchToDocument,
    updateContent,
    updateTitle,
    deleteDocument,
    saveDocument,
    updateSelection,
    undo,
    redo
  } = useEditor();

  const editorRef = useRef<RichTextEditorRef>(null);

  // Crear documento inicial si no hay ninguno
  useEffect(() => {
    if (documents.length === 0) {
      createNewDocument();
    }
  }, [documents.length, createNewDocument]);

  // Manejar atajos de teclado globales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveDocument();
            break;
          case 'n':
            e.preventDefault();
            createNewDocument();
            break;
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              redo();
            } else {
              e.preventDefault();
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [saveDocument, createNewDocument, undo, redo]);


  return (
    <MainLayout
      documents={documents}
      currentDocument={currentDocument}
      onSwitchDocument={switchToDocument}
      onCreateDocument={createNewDocument}
      onDeleteDocument={deleteDocument}
      onUpdateTitle={updateTitle}
      onUpdateContent={updateContent}
      onUpdateSelection={updateSelection}
      isDirty={isDirty}
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={undo}
      onRedo={redo}
      onSave={saveDocument}
      editorRef={editorRef}
    />
  );
}
