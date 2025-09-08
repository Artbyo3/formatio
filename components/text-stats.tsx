"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Hash, 
  Clock, 
  Eye, 
  BookOpen,
  TrendingUp,
  Target
} from "lucide-react";

interface TextStatsProps {
  text: string;
}

export function TextStats({ text }: TextStatsProps) {
  const stats = useMemo(() => {
    if (!text) return null;

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    const wordCount = words.length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const lineCount = text.split('\n').length;
    const sentenceCount = sentences.length;
    const paragraphCount = paragraphs.length;
    
    // Tiempo de lectura estimado (palabras por minuto)
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Palabras más comunes
    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord.length > 2) {
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
      }
    });
    
    const mostCommonWords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));
    
    // Índice de legibilidad (Flesch Reading Ease)
    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = words.reduce((acc, word) => {
      const syllables = word.toLowerCase().replace(/[^aeiou]/g, '').length;
      return acc + Math.max(1, syllables);
    }, 0) / wordCount;
    
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    let readabilityLevel = "Muy difícil";
    let readabilityColor = "destructive";
    
    if (fleschScore >= 90) {
      readabilityLevel = "Muy fácil";
      readabilityColor = "default";
    } else if (fleschScore >= 80) {
      readabilityLevel = "Fácil";
      readabilityColor = "default";
    } else if (fleschScore >= 70) {
      readabilityLevel = "Bastante fácil";
      readabilityColor = "secondary";
    } else if (fleschScore >= 60) {
      readabilityLevel = "Estándar";
      readabilityColor = "secondary";
    } else if (fleschScore >= 50) {
      readabilityLevel = "Bastante difícil";
      readabilityColor = "outline";
    } else if (fleschScore >= 30) {
      readabilityLevel = "Difícil";
      readabilityColor = "outline";
    }
    
    // Densidad de palabras clave
    const keywordDensity = mostCommonWords.length > 0 
      ? (mostCommonWords[0].count / wordCount * 100).toFixed(1)
      : "0";
    
    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      lineCount,
      sentenceCount,
      paragraphCount,
      readingTime,
      mostCommonWords,
      fleschScore: Math.round(fleschScore),
      readabilityLevel,
      readabilityColor,
      keywordDensity,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10
    };
  }, [text]);

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estadísticas de Texto
          </CardTitle>
          <CardDescription>
            Las estadísticas aparecerán cuando escribas texto
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estadísticas Básicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Palabras</span>
              </div>
              <Badge variant="outline" className="text-lg">{stats.wordCount}</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Caracteres</span>
              </div>
              <Badge variant="outline" className="text-lg">{stats.charCount}</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Párrafos</span>
              </div>
              <Badge variant="outline" className="text-lg">{stats.paragraphCount}</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tiempo de lectura</span>
              </div>
              <Badge variant="outline" className="text-lg">{stats.readingTime} min</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Análisis de Legibilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nivel de legibilidad</span>
              <Badge variant={stats.readabilityColor as any}>
                {stats.readabilityLevel}
              </Badge>
            </div>
            <Progress value={Math.max(0, Math.min(100, stats.fleschScore))} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Puntuación Flesch: {stats.fleschScore}/100
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Promedio palabras por oración:</span>
              <span className="ml-2 font-medium">{stats.avgWordsPerSentence}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Promedio sílabas por palabra:</span>
              <span className="ml-2 font-medium">{stats.avgSyllablesPerWord}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {stats.mostCommonWords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Palabras Más Comunes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.mostCommonWords.map(({ word, count }) => (
                <div key={word} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{word}</span>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(count / stats.mostCommonWords[0].count) * 100} 
                      className="w-16 h-2" 
                    />
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">
                Densidad de palabra clave: {stats.keywordDensity}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Detalles Adicionales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Caracteres (sin espacios):</span>
              <span className="ml-2 font-medium">{stats.charCountNoSpaces}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Líneas:</span>
              <span className="ml-2 font-medium">{stats.lineCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Oraciones:</span>
              <span className="ml-2 font-medium">{stats.sentenceCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Promedio palabras por párrafo:</span>
              <span className="ml-2 font-medium">
                {stats.paragraphCount > 0 ? Math.round(stats.wordCount / stats.paragraphCount) : 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
