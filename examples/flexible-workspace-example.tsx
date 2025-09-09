"use client";

import { useState, useRef } from "react";
import { FlexibleWorkspace, FlexibleWorkspaceRef } from "@/components/flexible-workspace";
import { Document } from "@/lib/document-manager";

export function FlexibleWorkspaceExample() {
  const [document, setDocument] = useState<Document | null>({
    id: '1',
    title: 'Mi Documento',
    content: '<p>Contenido del documento...</p>',
    createdAt: new Date(),
    updatedAt: new Date(),
    wordCount: 3,
    charCount: 25
  });
  
  const [isDirty, setIsDirty] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  const workspaceRef = useRef<FlexibleWorkspaceRef>(null);

  const handleContentChange = (content: string) => {
    if (document) {
      setDocument(prev => prev ? { ...prev, content } : null);
      setIsDirty(true);
    }
  };

  const handleTitleChange = (title: string) => {
    if (document) {
      setDocument(prev => prev ? { ...prev, title } : null);
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    // Simular guardado
    console.log('Guardando documento:', document);
    setIsDirty(false);
  };

  const handleUndo = () => {
    // Simular deshacer
    console.log('Deshaciendo...');
    setCanUndo(false);
  };

  const handleRedo = () => {
    // Simular rehacer
    console.log('Rehaciendo...');
    setCanRedo(false);
  };

  const handleSelectionChange = (start: number, end: number) => {
    console.log('Selección:', { start, end });
  };

  return (
    <div className="h-screen bg-background">
      <FlexibleWorkspace
        ref={workspaceRef}
        document={document}
        onContentChange={handleContentChange}
        onSelectionChange={handleSelectionChange}
        onTitleChange={handleTitleChange}
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isDirty={isDirty}
        canUndo={canUndo}
        canRedo={canRedo}
        className="h-full"
      />
    </div>
  );
}

// Ejemplo de uso con diferentes tipos de contenido
export function WorkspaceModeExamples() {
  const [currentMode, setCurrentMode] = useState<'text' | 'code' | 'data' | 'layout' | 'collab' | 'terminal'>('text');
  
  const examples = {
    text: {
      title: 'Ensayo sobre Inteligencia Artificial',
      content: `
        <h1>El Impacto de la Inteligencia Artificial en la Sociedad</h1>
        <p>La inteligencia artificial ha revolucionado la forma en que vivimos y trabajamos...</p>
        <h2>Introducción</h2>
        <p>En los últimos años, hemos presenciado avances significativos en el campo de la IA...</p>
        <h2>Desarrollo</h2>
        <p>Los algoritmos de machine learning han demostrado capacidades sorprendentes...</p>
        <h2>Conclusión</h2>
        <p>Es importante que como sociedad abordemos estos cambios de manera responsable...</p>
      `
    },
    code: {
      title: 'Algoritmo de Ordenamiento',
      content: `
        <pre><code>function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Ejemplo de uso
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sorted = quickSort(numbers);
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]</code></pre>
      `
    },
    data: {
      title: 'Datos de Ventas Q1 2024',
      content: `
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Enero</th>
              <th>Febrero</th>
              <th>Marzo</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto A</td>
              <td>1000</td>
              <td>1200</td>
              <td>1100</td>
              <td>3300</td>
            </tr>
            <tr>
              <td>Producto B</td>
              <td>800</td>
              <td>900</td>
              <td>950</td>
              <td>2650</td>
            </tr>
          </tbody>
        </table>
      `
    },
    layout: {
      title: 'Documentación del Proyecto',
      content: `
        <h1># Documentación del Proyecto</h1>
        <p>Esta es la documentación principal del proyecto.</p>
        <h2>## Instalación</h2>
        <p>Para instalar el proyecto, ejecuta:</p>
        <pre><code>npm install</code></pre>
        <h2>## Uso</h2>
        <p>El proyecto se puede usar de la siguiente manera:</p>
        <ul>
          <li>Inicia el servidor</li>
          <li>Configura las variables de entorno</li>
          <li>Ejecuta las migraciones</li>
        </ul>
      `
    },
    collab: {
      title: 'Documento Colaborativo',
      content: `
        <p>Este es un documento que está siendo editado por múltiples usuarios.</p>
        <p class="change-added">Esta línea fue agregada por el usuario A.</p>
        <p class="change-modified">Esta línea fue modificada por el usuario B.</p>
        <p>Esta línea no ha sido modificada.</p>
        <div class="comment">
          <p>Comentario: ¿Podríamos agregar más detalles aquí?</p>
          <span class="comment-author">- Usuario C</span>
        </div>
      `
    },
    terminal: {
      title: 'Logs del Sistema',
      content: `
        <div class="terminal-line">$ npm start</div>
        <div class="terminal-line">Starting development server...</div>
        <div class="terminal-line">Compiled successfully!</div>
        <div class="terminal-line">Local:            http://localhost:3000</div>
        <div class="terminal-line">On Your Network:  http://192.168.1.100:3000</div>
        <div class="terminal-line">Ready in 2.3s</div>
      `
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Ejemplos de Modos de Trabajo</h2>
      
      <div className="flex gap-2 flex-wrap">
        {Object.keys(examples).map((mode) => (
          <button
            key={mode}
            onClick={() => setCurrentMode(mode as any)}
            className={`px-4 py-2 rounded-lg ${
              currentMode === mode 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">
          {examples[currentMode].title}
        </h3>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: examples[currentMode].content }}
        />
      </div>
    </div>
  );
}
