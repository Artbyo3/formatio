"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  BarChart3, 
  HardDrive, 
  FileText,
  Hash,
  Calendar,
  Code,
  Type
} from "lucide-react";
import { ToolsPanel } from "./tools-panel";
import { StatsPanel } from "./stats-panel";
import { StorageMonitor } from "./storage-monitor";

interface ToolsViewProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function ToolsView({
  content,
  onContentChange
}: ToolsViewProps) {
  const [activeTab, setActiveTab] = useState("format");

  return (
    <div className="p-6 space-y-6">
      {/* Header simplificado */}
      <div>
        <h1 className="text-2xl font-semibold">Herramientas</h1>
        <p className="text-sm text-muted-foreground">
          Formateo, análisis y utilidades de texto
        </p>
      </div>

      {/* Pestañas organizadas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="format" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Formateo
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Análisis
          </TabsTrigger>
          <TabsTrigger value="convert" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Conversión
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Almacenamiento
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Formateo */}
        <TabsContent value="format" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Herramientas de Formateo
              </CardTitle>
              <CardDescription>
                Transforma y mejora tu texto con estas herramientas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToolsPanel
                currentText={content}
                onApplyFormat={onContentChange}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Análisis */}
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Análisis de Texto
              </CardTitle>
              <CardDescription>
                Estadísticas detalladas y análisis de legibilidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StatsPanel
                text={content}
                onApplyResult={(result) => onContentChange(result)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Conversión */}
        <TabsContent value="convert" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Codificación
                </CardTitle>
                <CardDescription>
                  Codifica y decodifica texto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Hash className="h-4 w-4 mr-2" />
                    Base64 Encode/Decode
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    URL Encode/Decode
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Hash className="h-4 w-4 mr-2" />
                    Hash MD5/SHA
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Conversión de Formato
                </CardTitle>
                <CardDescription>
                  Convierte entre diferentes formatos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Type className="h-4 w-4 mr-2" />
                    Markdown ↔ HTML
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    JSON ↔ YAML
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Formato de Fechas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Almacenamiento */}
        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Gestión de Almacenamiento
              </CardTitle>
              <CardDescription>
                Monitorea y gestiona el espacio de almacenamiento local
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StorageMonitor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
