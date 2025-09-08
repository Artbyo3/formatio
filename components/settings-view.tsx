"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Palette, 
  Keyboard, 
  Save, 
  Download, 
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Monitor
} from "lucide-react";

interface SettingsViewProps {
  onExportSettings: () => void;
  onImportSettings: (file: File) => void;
  onResetSettings: () => void;
}

export function SettingsView({
  onExportSettings,
  onImportSettings,
  onResetSettings
}: SettingsViewProps) {
  const [settings, setSettings] = useState({
    theme: 'system',
    autoSave: true,
    autoSaveInterval: 30,
    fontSize: 14,
    fontFamily: 'Inter',
    showWordCount: true,
    showCharCount: true,
    showLineCount: true,
    enableSpellCheck: true,
    enableAutoComplete: true,
    defaultFormat: 'html',
    maxDocuments: 50,
    backupFrequency: 'daily'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('formatio_settings', JSON.stringify(settings));
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportSettings(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Configuración</h1>
          <p className="text-sm text-muted-foreground">
            Personaliza tu experiencia de escritura
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onExportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" onClick={saveSettings} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Apariencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apariencia
            </CardTitle>
            <CardDescription>
              Personaliza el tema y la apariencia de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Claro
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Oscuro
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Sistema
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontSize">Tamaño de fuente</Label>
              <Input
                id="fontSize"
                type="number"
                min="10"
                max="24"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontFamily">Fuente</Label>
              <Select value={settings.fontFamily} onValueChange={(value) => updateSetting('fontFamily', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Editor
            </CardTitle>
            <CardDescription>
              Configuración del editor de texto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Guardado automático</Label>
                <p className="text-sm text-muted-foreground">
                  Guarda automáticamente los cambios
                </p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting('autoSave', checked)}
              />
            </div>

            {settings.autoSave && (
              <div className="space-y-2">
                <Label htmlFor="autoSaveInterval">Intervalo de guardado (segundos)</Label>
                <Input
                  id="autoSaveInterval"
                  type="number"
                  min="10"
                  max="300"
                  value={settings.autoSaveInterval}
                  onChange={(e) => updateSetting('autoSaveInterval', parseInt(e.target.value))}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Corrección ortográfica</Label>
                <p className="text-sm text-muted-foreground">
                  Resalta errores ortográficos
                </p>
              </div>
              <Switch
                checked={settings.enableSpellCheck}
                onCheckedChange={(checked) => updateSetting('enableSpellCheck', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autocompletado</Label>
                <p className="text-sm text-muted-foreground">
                  Sugiere palabras mientras escribes
                </p>
              </div>
              <Switch
                checked={settings.enableAutoComplete}
                onCheckedChange={(checked) => updateSetting('enableAutoComplete', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estadísticas
            </CardTitle>
            <CardDescription>
              Qué información mostrar en la interfaz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Contador de palabras</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar número de palabras
                </p>
              </div>
              <Switch
                checked={settings.showWordCount}
                onCheckedChange={(checked) => updateSetting('showWordCount', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Contador de caracteres</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar número de caracteres
                </p>
              </div>
              <Switch
                checked={settings.showCharCount}
                onCheckedChange={(checked) => updateSetting('showCharCount', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Contador de líneas</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar número de líneas
                </p>
              </div>
              <Switch
                checked={settings.showLineCount}
                onCheckedChange={(checked) => updateSetting('showLineCount', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Almacenamiento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Almacenamiento
            </CardTitle>
            <CardDescription>
              Configuración de almacenamiento local
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxDocuments">Máximo de documentos</Label>
              <Input
                id="maxDocuments"
                type="number"
                min="10"
                max="200"
                value={settings.maxDocuments}
                onChange={(e) => updateSetting('maxDocuments', parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Los documentos más antiguos se eliminarán automáticamente
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Frecuencia de respaldo</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Nunca</SelectItem>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultFormat">Formato por defecto</Label>
              <Select value={settings.defaultFormat} onValueChange={(value) => updateSetting('defaultFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="txt">Texto plano</SelectItem>
                  <SelectItem value="md">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Importar/Exportar configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Importar/Exportar Configuración</CardTitle>
          <CardDescription>
            Guarda o restaura tu configuración personalizada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" onClick={onExportSettings}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Configuración
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar Configuración
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zona de peligro */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Zona de Peligro
          </CardTitle>
          <CardDescription>
            Acciones que no se pueden deshacer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Restablecer configuración</h4>
              <p className="text-sm text-muted-foreground">
                Restaura todos los ajustes a sus valores por defecto
              </p>
            </div>
            <Button variant="destructive" onClick={onResetSettings}>
              <Trash2 className="h-4 w-4 mr-2" />
              Restablecer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
