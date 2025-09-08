"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Link, 
  Image, 
  Table,
  Plus,
  X
} from "lucide-react";

interface InsertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (type: 'link' | 'image' | 'table', data: any) => void;
}

export function InsertDialog({ isOpen, onClose, onInsert }: InsertDialogProps) {
  const [linkData, setLinkData] = useState({ url: '', text: '' });
  const [imageData, setImageData] = useState({ src: '', alt: '', width: '', height: '' });
  const [tableData, setTableData] = useState({ rows: 3, cols: 3 });

  const handleInsertLink = () => {
    if (linkData.url && linkData.text) {
      onInsert('link', linkData);
      setLinkData({ url: '', text: '' });
      onClose();
    }
  };

  const handleInsertImage = () => {
    if (imageData.src) {
      onInsert('image', imageData);
      setImageData({ src: '', alt: '', width: '', height: '' });
      onClose();
    }
  };

  const handleInsertTable = () => {
    onInsert('table', tableData);
    setTableData({ rows: 3, cols: 3 });
    onClose();
  };

  const generateTableHTML = (rows: number, cols: number) => {
    let html = '<table border="1" style="border-collapse: collapse; width: 100%;">\n';
    
    for (let i = 0; i < rows; i++) {
      html += '  <tr>\n';
      for (let j = 0; j < cols; j++) {
        const cellContent = i === 0 ? `Header ${j + 1}` : `Cell ${i + 1},${j + 1}`;
        const tag = i === 0 ? 'th' : 'td';
        html += `    <${tag} style="padding: 8px; border: 1px solid #ddd;">${cellContent}</${tag}>\n`;
      }
      html += '  </tr>\n';
    }
    
    html += '</table>';
    return html;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insertar Elemento</DialogTitle>
          <DialogDescription>
            Selecciona el tipo de elemento que quieres insertar
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Enlace
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Imagen
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              Tabla
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-text">Texto del enlace</Label>
              <Input
                id="link-text"
                value={linkData.text}
                onChange={(e) => setLinkData(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Texto que se mostrará"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkData.url}
                onChange={(e) => setLinkData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://ejemplo.com"
                type="url"
              />
            </div>
            <Button onClick={handleInsertLink} className="w-full">
              <Link className="h-4 w-4 mr-2" />
              Insertar Enlace
            </Button>
          </TabsContent>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-src">URL de la imagen</Label>
              <Input
                id="image-src"
                value={imageData.src}
                onChange={(e) => setImageData(prev => ({ ...prev, src: e.target.value }))}
                placeholder="https://ejemplo.com/imagen.jpg"
                type="url"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-alt">Texto alternativo</Label>
              <Input
                id="image-alt"
                value={imageData.alt}
                onChange={(e) => setImageData(prev => ({ ...prev, alt: e.target.value }))}
                placeholder="Descripción de la imagen"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="image-width">Ancho (px)</Label>
                <Input
                  id="image-width"
                  value={imageData.width}
                  onChange={(e) => setImageData(prev => ({ ...prev, width: e.target.value }))}
                  placeholder="300"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-height">Alto (px)</Label>
                <Input
                  id="image-height"
                  value={imageData.height}
                  onChange={(e) => setImageData(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="200"
                  type="number"
                />
              </div>
            </div>
            <Button onClick={handleInsertImage} className="w-full">
              <Image className="h-4 w-4 mr-2" />
              Insertar Imagen
            </Button>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            <div className="space-y-2">
              <Label>Dimensiones de la tabla</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="table-rows">Filas</Label>
                  <Input
                    id="table-rows"
                    value={tableData.rows}
                    onChange={(e) => setTableData(prev => ({ ...prev, rows: parseInt(e.target.value) || 1 }))}
                    type="number"
                    min="1"
                    max="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="table-cols">Columnas</Label>
                  <Input
                    id="table-cols"
                    value={tableData.cols}
                    onChange={(e) => setTableData(prev => ({ ...prev, cols: parseInt(e.target.value) || 1 }))}
                    type="number"
                    min="1"
                    max="20"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Vista previa</Label>
              <div className="border rounded-md p-4 bg-muted/50">
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: generateTableHTML(tableData.rows, tableData.cols) 
                  }}
                />
              </div>
            </div>
            
            <Button onClick={handleInsertTable} className="w-full">
              <Table className="h-4 w-4 mr-2" />
              Insertar Tabla
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
