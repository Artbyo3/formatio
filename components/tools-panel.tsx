"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Hash, 
  Calculator, 
  Wand2, 
  FileText, 
  Lock, 
  Globe, 
  Calendar,
  Copy,
  Check,
  RotateCcw
} from "lucide-react";

interface ToolsPanelProps {
  onApplyFormat: (formattedText: string) => void;
  currentText: string;
}

export function ToolsPanel({ onApplyFormat, currentText }: ToolsPanelProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Formateo de JSON
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(inputText || currentText);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputText(formatted);
    } catch (error) {
      setOutputText("Error: JSON inválido");
    }
  };

  // Minificar JSON
  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(inputText || currentText);
      const minified = JSON.stringify(parsed);
      setOutputText(minified);
    } catch (error) {
      setOutputText("Error: JSON inválido");
    }
  };

  // Formateo de XML
  const formatXML = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputText || currentText, "text/xml");
      const serializer = new XMLSerializer();
      const formatted = serializer.serializeToString(xmlDoc);
      setOutputText(formatted);
    } catch (error) {
      setOutputText("Error: XML inválido");
    }
  };

  // Formateo de HTML
  const formatHTML = () => {
    const text = inputText || currentText;
    const formatted = text
      .replace(/></g, '>\n<')
      .replace(/^\s+|\s+$/g, '')
      .split('\n')
      .map(line => line.trim())
      .join('\n');
    setOutputText(formatted);
  };

  // Convertir a Markdown
  const toMarkdown = () => {
    const text = inputText || currentText;
    const markdown = text
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<[^>]*>/g, '');
    setOutputText(markdown);
  };

  // Convertir de Markdown a HTML
  const markdownToHTML = () => {
    const text = inputText || currentText;
    const html = text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    setOutputText(html);
  };

  // Base64 Encode
  const base64Encode = () => {
    const text = inputText || currentText;
    const encoded = btoa(unescape(encodeURIComponent(text)));
    setOutputText(encoded);
  };

  // Base64 Decode
  const base64Decode = () => {
    try {
      const text = inputText || currentText;
      const decoded = decodeURIComponent(escape(atob(text)));
      setOutputText(decoded);
    } catch (error) {
      setOutputText("Error: Base64 inválido");
    }
  };

  // URL Encode
  const urlEncode = () => {
    const text = inputText || currentText;
    const encoded = encodeURIComponent(text);
    setOutputText(encoded);
  };

  // URL Decode
  const urlDecode = () => {
    try {
      const text = inputText || currentText;
      const decoded = decodeURIComponent(text);
      setOutputText(decoded);
    } catch (error) {
      setOutputText("Error: URL inválida");
    }
  };

  // Generar Lorem Ipsum
  const generateLoremIpsum = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    setOutputText(lorem);
  };

  // Generar contraseña
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setOutputText(password);
  };

  // Contar palabras
  const countWords = () => {
    const text = inputText || currentText;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const lines = text.split('\n').length;
    
    setOutputText(`Palabras: ${words}\nCaracteres: ${chars}\nCaracteres (sin espacios): ${charsNoSpaces}\nLíneas: ${lines}`);
  };

  // Convertir a mayúsculas
  const toUpperCase = () => {
    const text = inputText || currentText;
    setOutputText(text.toUpperCase());
  };

  // Convertir a minúsculas
  const toLowerCase = () => {
    const text = inputText || currentText;
    setOutputText(text.toLowerCase());
  };

  // Capitalizar primera letra
  const capitalize = () => {
    const text = inputText || currentText;
    const capitalized = text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    setOutputText(capitalized);
  };

  // Invertir texto
  const reverseText = () => {
    const text = inputText || currentText;
    setOutputText(text.split('').reverse().join(''));
  };

  // Eliminar espacios extra
  const removeExtraSpaces = () => {
    const text = inputText || currentText;
    setOutputText(text.replace(/\s+/g, ' ').trim());
  };

  // Eliminar líneas vacías
  const removeEmptyLines = () => {
    const text = inputText || currentText;
    setOutputText(text.split('\n').filter(line => line.trim() !== '').join('\n'));
  };

  // Ordenar líneas
  const sortLines = () => {
    const text = inputText || currentText;
    setOutputText(text.split('\n').sort().join('\n'));
  };

  // Aplicar formato al editor
  const applyFormat = () => {
    if (outputText) {
      onApplyFormat(outputText);
    }
  };

  return (
    <div className="w-80 bg-muted/30 border-l p-4 overflow-y-auto">
      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="format">Formato</TabsTrigger>
          <TabsTrigger value="convert">Convertir</TabsTrigger>
          <TabsTrigger value="generate">Generar</TabsTrigger>
          <TabsTrigger value="analyze">Analizar</TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Formateo de Código
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={formatJSON} className="w-full" variant="outline">
                Formatear JSON
              </Button>
              <Button onClick={minifyJSON} className="w-full" variant="outline">
                Minificar JSON
              </Button>
              <Button onClick={formatXML} className="w-full" variant="outline">
                Formatear XML
              </Button>
              <Button onClick={formatHTML} className="w-full" variant="outline">
                Formatear HTML
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transformación de Texto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={toUpperCase} className="w-full" variant="outline">
                MAYÚSCULAS
              </Button>
              <Button onClick={toLowerCase} className="w-full" variant="outline">
                minúsculas
              </Button>
              <Button onClick={capitalize} className="w-full" variant="outline">
                Capitalizar
              </Button>
              <Button onClick={reverseText} className="w-full" variant="outline">
                Invertir Texto
              </Button>
              <Button onClick={removeExtraSpaces} className="w-full" variant="outline">
                Eliminar Espacios Extra
              </Button>
              <Button onClick={removeEmptyLines} className="w-full" variant="outline">
                Eliminar Líneas Vacías
              </Button>
              <Button onClick={sortLines} className="w-full" variant="outline">
                Ordenar Líneas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="convert" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Codificación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={base64Encode} className="w-full" variant="outline">
                Base64 Encode
              </Button>
              <Button onClick={base64Decode} className="w-full" variant="outline">
                Base64 Decode
              </Button>
              <Button onClick={urlEncode} className="w-full" variant="outline">
                URL Encode
              </Button>
              <Button onClick={urlDecode} className="w-full" variant="outline">
                URL Decode
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Formatos de Documento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={toMarkdown} className="w-full" variant="outline">
                HTML → Markdown
              </Button>
              <Button onClick={markdownToHTML} className="w-full" variant="outline">
                Markdown → HTML
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={generateLoremIpsum} className="w-full" variant="outline">
                Lorem Ipsum
              </Button>
              <Button onClick={generatePassword} className="w-full" variant="outline">
                Contraseña Segura
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Análisis de Texto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={countWords} className="w-full" variant="outline">
                Contar Palabras
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Panel de entrada y salida */}
      <div className="mt-6 space-y-4">
        <div>
          <Label htmlFor="input-text">Texto de entrada (opcional)</Label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="O deja vacío para usar el texto del editor"
            className="mt-1"
            rows={3}
          />
        </div>

        {outputText && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Resultado</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(outputText)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={applyFormat}
                >
                  Aplicar
                </Button>
              </div>
            </div>
            <Textarea
              value={outputText}
              readOnly
              className="bg-muted"
              rows={6}
            />
          </div>
        )}
      </div>
    </div>
  );
}
