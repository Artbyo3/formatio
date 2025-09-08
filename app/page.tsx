"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
const Check = dynamic(() => import("lucide-react").then((mod) => mod.Check), {
  ssr: false,
});
const Copy = dynamic(() => import("lucide-react").then((mod) => mod.Copy), {
  ssr: false,
});
const Trash = dynamic(() => import("lucide-react").then((mod) => mod.Trash), {
  ssr: false,
});
import { Badge } from "@/components/ui/badge";
import { AdSpace } from "@/components/ad-space";
import { AdHorizontal } from "@/components/ad-horizontal";
import { Footer } from "@/components/footer";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ chars: 0, words: 0, lines: 0 });

  // Update stats when text changes
  useEffect(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.trim() ? text.trim().split(/\n/).length : 0;
    setStats({ chars, words, lines });
  }, [text]);

  const formatText = (type: string) => {
    let formatted = text;

    switch (type) {
      case "uppercase":
        formatted = text.toUpperCase();
        break;
      case "lowercase":
        formatted = text.toLowerCase();
        break;
      case "capitalize":
        formatted = text
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        break;
      case "remove-extra-spaces":
        // Elimina espacios duplicados y al inicio/final
        formatted = text.replace(/\s+/g, " ").trim();
        break;
      case "sort-lines":
        // Ordena las líneas alfabéticamente
        formatted = text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .sort()
          .join("\n");
        break;
      case "remove-empty-lines":
        // Elimina líneas vacías
        formatted = text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .join("\n");
        break;
      default:
        formatted = text;
    }

    setResult(formatted);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
    setResult("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-1">
        {/* Espacio para anuncio izquierdo - solo visible en pantallas grandes */}
        <div className="hidden lg:block w-1/6 p-4 sticky top-4 h-screen">
          <AdSpace position="left" adSlot="6056376493" />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Formatio</h1>
          <p className="text-center text-muted-foreground mb-6">
            Formatea tu texto al instante
          </p>

          {/* Anuncio horizontal - solo visible en pantallas pequeñas */}
          <div className="block lg:hidden mb-6">
            <AdHorizontal adSlot="5916775693" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>Entrada</CardTitle>
                <CardDescription className="flex flex-wrap justify-between items-center gap-2">
                  <span>Pega tu texto aquí</span>
                  <Badge
                    variant="outline"
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {stats.chars} caracteres | {stats.words} palabras |{" "}
                    {stats.lines} líneas
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <textarea
                  placeholder="Pega tu texto aquí"
                  className="min-h-[300px] h-full w-full resize-none border rounded-md p-3"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={clearText}>
                  <Trash className="h-4 w-4 mr-2" />
                  Limpiar
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>Resultado</CardTitle>
                <CardDescription className="flex flex-wrap justify-between items-center gap-2">
                  <span>Tu texto formateado</span>
                  {result && (
                    <Badge
                      variant="outline"
                      className="whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {result.length} caracteres
                    </Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pb-2 relative">
                {/* Contenedor que se expande automáticamente */}
                <div className="min-h-[300px] w-full border rounded-md p-3 whitespace-pre-wrap break-words">
                  {result}
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!result}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Opciones de Formato</CardTitle>
                <CardDescription>Elige cómo formatear tu texto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => formatText("uppercase")}
                    variant="outline"
                  >
                    MAYÚSCULAS
                  </Button>
                  <Button
                    onClick={() => formatText("lowercase")}
                    variant="outline"
                  >
                    minúsculas
                  </Button>
                  <Button
                    onClick={() => formatText("capitalize")}
                    variant="outline"
                  >
                    Capitalizar Palabras
                  </Button>
                  <Button
                    onClick={() => formatText("remove-extra-spaces")}
                    variant="outline"
                  >
                    Eliminar Espacios Extra
                  </Button>
                  <Button
                    onClick={() => formatText("sort-lines")}
                    variant="outline"
                  >
                    Ordenar Líneas
                  </Button>
                  <Button
                    onClick={() => formatText("remove-empty-lines")}
                    variant="outline"
                  >
                    Eliminar Líneas Vacías
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Anuncio horizontal - solo visible en pantallas pequeñas */}
          <div className="block lg:hidden mt-6">
            <AdHorizontal adSlot="5916775693" />
          </div>
        </main>

        {/* Espacio para anuncio derecho - solo visible en pantallas grandes */}
        <div className="hidden lg:block w-1/6 p-4 sticky top-4 h-screen">
          <AdSpace position="right" adSlot="6056376493" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
