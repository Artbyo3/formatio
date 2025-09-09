"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  User, 
  BookOpen, 
  FileText, 
  Code, 
  Type, 
  AlignLeft,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from "lucide-react";
import { AdSpace } from "./ad-space";

// Datos de artículos del blog
const blogPosts = [
  {
    id: "guia-formatos-texto",
    title: "Guía Completa de Formatos de Texto: Todo lo que Necesitas Saber",
    excerpt: "Aprende los diferentes tipos de formatos de texto, cuándo usar cada uno y las mejores prácticas para crear documentos profesionales.",
    content: `
# Guía Completa de Formatos de Texto

## Introducción

Los formatos de texto son la base de cualquier documento profesional. Desde documentos académicos hasta presentaciones empresariales, el formato correcto puede marcar la diferencia entre un texto que se lee fácilmente y uno que confunde al lector.

## Tipos de Formatos de Texto

### 1. Formato de Párrafo
El formato de párrafo es fundamental para la legibilidad. Incluye:

- **Alineación**: Izquierda, centrada, justificada o derecha
- **Interlineado**: Espaciado entre líneas
- **Sangría**: Indentación de la primera línea
- **Espaciado**: Antes y después del párrafo

### 2. Formato de Carácter
Se aplica a caracteres individuales:

- **Negrita**: Para énfasis
- **Cursiva**: Para títulos de libros o énfasis sutil
- **Subrayado**: Para enlaces o énfasis (usar con moderación)
- **Tachado**: Para mostrar cambios o correcciones

### 3. Formato de Lista
Las listas mejoran la organización:

- **Listas con viñetas**: Para elementos no ordenados
- **Listas numeradas**: Para pasos o elementos secuenciales
- **Listas anidadas**: Para subcategorías

## Mejores Prácticas

### Legibilidad
- Usa fuentes legibles (Arial, Calibri, Times New Roman)
- Mantén un tamaño de fuente entre 10-12 puntos
- Evita usar más de 3 tipos de fuente diferentes

### Consistencia
- Aplica el mismo formato a elementos similares
- Usa estilos predefinidos cuando sea posible
- Mantén un estilo coherente en todo el documento

### Jerarquía Visual
- Usa títulos y subtítulos para organizar el contenido
- Diferencia claramente entre niveles de información
- Usa el espacio en blanco estratégicamente

## Herramientas Recomendadas

### Procesadores de Texto
- **Microsoft Word**: Completo y profesional
- **Google Docs**: Colaborativo y accesible
- **LibreOffice Writer**: Gratuito y potente

### Editores de Texto
- **Notion**: Para documentación moderna
- **Markdown**: Para escritura técnica
- **Scrivener**: Para escritura creativa

## Conclusión

El formato de texto correcto no solo mejora la apariencia de tu documento, sino que también facilita la lectura y comprensión. Invierte tiempo en aprender estas técnicas y verás una mejora significativa en la calidad de tus escritos.
    `,
    category: "Formato de Texto",
    author: "Equipo Formatio",
    date: "2024-01-15",
    readTime: "8 min",
    tags: ["formato", "texto", "guía", "legibilidad"],
    featured: true
  },
  {
    id: "tipografia-profesional",
    title: "Tipografía Profesional: Cómo Elegir las Fuentes Correctas",
    excerpt: "Descubre los secretos de la tipografía profesional y aprende a elegir las fuentes perfectas para cada tipo de documento.",
    content: `
# Tipografía Profesional: Cómo Elegir las Fuentes Correctas

## ¿Qué es la Tipografía?

La tipografía es el arte y la técnica de organizar el texto de manera que sea legible, atractivo y funcional. Una buena tipografía puede mejorar significativamente la experiencia de lectura.

## Clasificación de Fuentes

### Serif
Las fuentes serif tienen pequeños trazos decorativos:

- **Times New Roman**: Clásica y legible
- **Georgia**: Excelente para pantallas
- **Garamond**: Elegante y tradicional

### Sans Serif
Fuentes sin serifas, más modernas:

- **Arial**: Limpia y versátil
- **Helvetica**: Profesional y neutral
- **Calibri**: Moderna y legible

### Monospace
Todas las letras tienen el mismo ancho:

- **Courier New**: Para código y tablas
- **Monaco**: Para programación
- **Consolas**: Para desarrollo

## Principios de Tipografía

### Jerarquía
- Usa diferentes tamaños para crear jerarquía
- Los títulos deben ser más grandes que el texto
- Mantén proporciones consistentes

### Contraste
- Asegúrate de que el texto sea legible
- Usa colores que contrasten bien
- Evita combinaciones difíciles de leer

### Espaciado
- El interlineado debe ser 1.2-1.5 veces el tamaño de la fuente
- Usa espaciado consistente entre párrafos
- No comprimas demasiado el texto

## Aplicaciones Prácticas

### Documentos de Negocio
- Usa fuentes serif para documentos formales
- Mantén un estilo conservador
- Evita fuentes decorativas

### Presentaciones
- Usa fuentes sans serif para pantallas
- Asegúrate de que sean legibles a distancia
- Mantén un tamaño mínimo de 24 puntos

### Documentos Técnicos
- Usa fuentes monospace para código
- Combina serif y sans serif apropiadamente
- Mantén la consistencia

## Herramientas de Tipografía

### Google Fonts
- Biblioteca gratuita de fuentes
- Fácil integración web
- Gran variedad de estilos

### Adobe Fonts
- Fuentes profesionales
- Integración con Creative Cloud
- Calidad premium

### Font Squirrel
- Fuentes gratuitas de calidad
- Licencias claras
- Descarga directa

## Conclusión

La tipografía correcta puede transformar un documento mediocre en uno profesional. Tómate el tiempo para experimentar con diferentes fuentes y encuentra la combinación perfecta para tu proyecto.
    `,
    category: "Tipografía",
    author: "Equipo Formatio",
    date: "2024-01-10",
    readTime: "6 min",
    tags: ["tipografía", "fuentes", "diseño", "profesional"],
    featured: true
  },
  {
    id: "estructura-documentos",
    title: "Estructura de Documentos: Organiza tu Contenido Efectivamente",
    excerpt: "Aprende a estructurar tus documentos de manera lógica y profesional para mejorar la comprensión y navegación.",
    content: `
# Estructura de Documentos: Organiza tu Contenido Efectivamente

## Importancia de la Estructura

Una buena estructura es fundamental para cualquier documento. Ayuda al lector a:
- Navegar fácilmente por el contenido
- Encontrar información específica rápidamente
- Comprender la jerarquía de la información
- Mantener el interés durante la lectura

## Elementos Estructurales Básicos

### Título Principal
- Debe ser descriptivo y atractivo
- Usa un tamaño de fuente mayor
- Centrado o alineado a la izquierda

### Subtítulos
- Organizan el contenido en secciones
- Usa numeración si es necesario
- Mantén un estilo consistente

### Párrafos
- Un párrafo = una idea principal
- Usa párrafos cortos para mejor legibilidad
- Incluye transiciones entre párrafos

### Listas
- Organizan información relacionada
- Usa viñetas para elementos no ordenados
- Usa números para secuencias

## Tipos de Estructura

### Estructura Lineal
- Información presentada en orden secuencial
- Ideal para narrativas o instrucciones
- Fácil de seguir

### Estructura Jerárquica
- Información organizada por importancia
- De lo general a lo específico
- Ideal para informes y análisis

### Estructura Temática
- Información agrupada por temas
- Cada sección es independiente
- Ideal para manuales y guías

## Herramientas de Organización

### Esquemas
- Planifica antes de escribir
- Identifica puntos principales
- Organiza subpuntos lógicamente

### Mapas Mentales
- Visualiza las conexiones
- Identifica temas centrales
- Facilita la planificación

### Plantillas
- Usa estructuras probadas
- Ahorra tiempo en la organización
- Mantén consistencia

## Aplicaciones por Tipo de Documento

### Informes
1. Resumen ejecutivo
2. Introducción
3. Metodología
4. Resultados
5. Conclusiones
6. Recomendaciones

### Propuestas
1. Situación actual
2. Propuesta de solución
3. Beneficios esperados
4. Plan de implementación
5. Presupuesto
6. Cronograma

### Manuales
1. Introducción
2. Instalación/Configuración
3. Uso básico
4. Funciones avanzadas
5. Solución de problemas
6. Referencias

## Consejos Prácticos

### Antes de Escribir
- Define el objetivo del documento
- Identifica a tu audiencia
- Planifica la estructura
- Reúne toda la información necesaria

### Durante la Escritura
- Mantén el foco en el objetivo
- Usa transiciones claras
- Incluye ejemplos cuando sea apropiado
- Revisa la coherencia

### Después de Escribir
- Revisa la estructura general
- Verifica la lógica del flujo
- Asegúrate de que cumple el objetivo
- Pide feedback a otros

## Conclusión

Una buena estructura es la base de un documento efectivo. Invierte tiempo en planificar la organización de tu contenido y verás una mejora significativa en la claridad y profesionalismo de tus escritos.
    `,
    category: "Estructura",
    author: "Equipo Formatio",
    date: "2024-01-05",
    readTime: "7 min",
    tags: ["estructura", "organización", "documentos", "profesional"],
    featured: false
  },
  {
    id: "herramientas-escritura",
    title: "Las Mejores Herramientas de Escritura Digital en 2024",
    excerpt: "Descubre las herramientas más efectivas para escribir, editar y formatear documentos digitales profesionalmente.",
    content: `
# Las Mejores Herramientas de Escritura Digital en 2024

## Introducción

En la era digital, tener las herramientas correctas puede hacer la diferencia entre un documento mediocre y uno profesional. Aquí te presentamos las mejores opciones disponibles.

## Procesadores de Texto Tradicionales

### Microsoft Word
**Ventajas:**
- Funciones avanzadas de formato
- Integración con Office 365
- Plantillas profesionales
- Colaboración en tiempo real

**Ideal para:**
- Documentos empresariales
- Trabajos académicos
- Documentos complejos

### Google Docs
**Ventajas:**
- Acceso desde cualquier dispositivo
- Colaboración en tiempo real
- Integración con Google Workspace
- Historial de versiones

**Ideal para:**
- Trabajo colaborativo
- Documentos compartidos
- Escritura en equipo

### LibreOffice Writer
**Ventajas:**
- Completamente gratuito
- Compatible con Microsoft Word
- Funciones avanzadas
- Código abierto

**Ideal para:**
- Usuarios que buscan alternativas gratuitas
- Documentos básicos a intermedios

## Editores de Texto Modernos

### Notion
**Características:**
- Interfaz moderna y limpia
- Base de datos integrada
- Plantillas personalizables
- Colaboración avanzada

**Ideal para:**
- Documentación de proyectos
- Wikis personales
- Planificación de contenido

### Obsidian
**Características:**
- Enfoque en conexiones entre notas
- Markdown nativo
- Plugins extensibles
- Base de conocimiento personal

**Ideal para:**
- Investigación
- Notas interconectadas
- Pensamiento no lineal

### Typora
**Características:**
- Editor WYSIWYG para Markdown
- Interfaz minimalista
- Exportación a múltiples formatos
- Enfoque en la escritura

**Ideal para:**
- Escritura técnica
- Documentación
- Contenido web

## Herramientas Especializadas

### Scrivener
**Para escritura creativa:**
- Organización de capítulos
- Investigación integrada
- Modo de composición
- Exportación flexible

### Ulysses
**Para escritores:**
- Interfaz minimalista
- Organización por proyectos
- Sincronización iCloud
- Estadísticas de escritura

### iA Writer
**Para escritura enfocada:**
- Interfaz ultra-limpia
- Modo de enfoque
- Sintaxis mejorada
- Exportación simple

## Herramientas de Colaboración

### Confluence
- Documentación empresarial
- Integración con Jira
- Plantillas de equipo
- Búsqueda avanzada

### GitBook
- Documentación técnica
- Integración con Git
- Colaboración en equipo
- Hosting integrado

### Slab
- Base de conocimiento
- Interfaz moderna
- Búsqueda potente
- Integración con herramientas

## Herramientas de Formato

### Markdown
**Ventajas:**
- Sintaxis simple
- Compatible con cualquier editor
- Fácil de aprender
- Versátil

### LaTeX
**Ventajas:**
- Control total del formato
- Ideal para documentos académicos
- Calidad tipográfica superior
- Automatización

### HTML/CSS
**Ventajas:**
- Control completo del diseño
- Ideal para contenido web
- Flexible y personalizable
- Estándar web

## Consejos para Elegir

### Considera tu Necesidad
- ¿Qué tipo de documentos escribes?
- ¿Necesitas colaboración?
- ¿Qué nivel de formato requieres?

### Evalúa tu Presupuesto
- Herramientas gratuitas vs. pagas
- Costos de suscripción
- ROI de la inversión

### Prueba Antes de Comprometerte
- Versiones de prueba
- Demos en línea
- Comunidad y soporte

## Tendencias Futuras

### Inteligencia Artificial
- Asistentes de escritura
- Corrección automática avanzada
- Sugerencias de contenido
- Traducción automática

### Colaboración Mejorada
- Edición simultánea avanzada
- Comentarios en tiempo real
- Integración con videollamadas
- Trabajo remoto optimizado

### Automatización
- Plantillas inteligentes
- Formato automático
- Exportación programada
- Integración con flujos de trabajo

## Conclusión

La elección de herramientas de escritura depende de tus necesidades específicas. Experimenta con diferentes opciones y encuentra la combinación que mejor funcione para tu flujo de trabajo. Recuerda que la mejor herramienta es la que usas consistentemente y que mejora tu productividad.
    `,
    category: "Herramientas",
    author: "Equipo Formatio",
    date: "2024-01-01",
    readTime: "10 min",
    tags: ["herramientas", "escritura", "productividad", "digital"],
    featured: true
  }
];

const categories = [
  { name: "Formato de Texto", icon: FileText, count: 1 },
  { name: "Tipografía", icon: Type, count: 1 },
  { name: "Estructura", icon: AlignLeft, count: 1 },
  { name: "Herramientas", icon: Code, count: 1 }
];

interface BlogViewProps {
  className?: string;
}

export function BlogView({ className = "" }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const currentPost = selectedPost ? blogPosts.find(p => p.id === selectedPost) : null;

  const handleShare = async (platform: string) => {
    if (!currentPost) return;
    
    const url = window.location.href;
    const title = currentPost.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  // Si hay un post seleccionado, mostrar vista detallada
  if (currentPost) {
    return (
      <div className={`h-full flex flex-col ${className}`}>
        {/* Header del artículo */}
        <div className="border-b border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedPost(null)}
            >
              ← Volver al blog
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{currentPost.category}</Badge>
            {currentPost.featured && (
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Destacado
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-black mb-4">
            {currentPost.title}
          </h1>
          
          <p className="text-lg text-gray-700 mb-6">
            {currentPost.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(currentPost.date).toLocaleDateString('es-ES')}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {currentPost.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {currentPost.author}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido del artículo */}
        <div className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-ul:text-gray-800 prose-ol:text-gray-800 prose-li:text-gray-800 prose-strong:text-black prose-strong:font-semibold prose-code:text-black prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    let content = currentPost.content;
                    
                    // Procesar títulos
                    content = content.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-black mb-6 mt-8 first:mt-0">$1</h1>');
                    content = content.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-black mb-4 mt-8">$1</h2>');
                    content = content.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-black mb-3 mt-6">$1</h3>');
                    
                    // Procesar texto en negrita y cursiva (más específico para evitar conflictos)
                    content = content.replace(/\*\*([^*]+)\*\*/gim, '<strong class="font-semibold text-black">$1</strong>');
                    content = content.replace(/\*([^*]+)\*/gim, '<em class="italic text-gray-800">$1</em>');
                    
                    // Procesar listas - primero marcar elementos de lista
                    content = content.replace(/^[\s]*[\-\*] (.*$)/gim, 'LIST_ITEM:$1');
                    
                    // Dividir en líneas para procesar mejor
                    const lines = content.split('\n');
                    const processedLines = [];
                    let inList = false;
                    
                    for (let i = 0; i < lines.length; i++) {
                      const line = lines[i];
                      
                      if (line.startsWith('LIST_ITEM:')) {
                        if (!inList) {
                          processedLines.push('<ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">');
                          inList = true;
                        }
                        const item = line.replace('LIST_ITEM:', '').trim();
                        processedLines.push(`<li class="mb-2 text-gray-800">${item}</li>`);
                      } else {
                        if (inList) {
                          processedLines.push('</ul>');
                          inList = false;
                        }
                        
                        if (line.trim() === '') {
                          processedLines.push('');
                        } else if (!line.match(/^<[h|l]/)) {
                          processedLines.push(`<p class="mb-4 text-gray-800 leading-relaxed">${line}</p>`);
                        } else {
                          processedLines.push(line);
                        }
                      }
                    }
                    
                    // Cerrar lista si está abierta
                    if (inList) {
                      processedLines.push('</ul>');
                    }
                    
                    return processedLines.join('\n');
                  })()
                }}
              />
            </CardContent>
          </Card>

          {/* Ad Space - Article Bottom */}
          <div className="mt-8">
            <AdSpace format="horizontal" label="Anuncio del Artículo" />
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-black mb-4">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {currentPost.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista principal del blog
  return (
    <div className={`h-full flex ${className}`}>
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-gray-50/50 p-6">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar
            </h3>
            <Input
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-black mb-3">Categorías</h3>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "Todas" ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${
                  selectedCategory === "Todas" 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedCategory("Todas")}
              >
                Todas ({blogPosts.length})
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className={`w-full justify-start h-10 ${
                    selectedCategory === category.name 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Ad Space - Vertical */}
          <div className="mb-6">
            <AdSpace format="vertical" label="Anuncio Lateral" />
          </div>

          {/* Featured */}
          <div>
            <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Destacados
            </h3>
            <div className="space-y-3">
                {featuredPosts.slice(0, 3).map((post) => (
                  <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200 bg-white" onClick={() => setSelectedPost(post.id)}>
                    <CardContent className="p-3">
                      <h4 className="font-bold text-sm line-clamp-2 mb-1 text-black">{post.title}</h4>
                      <p className="text-xs text-gray-500">{post.readTime}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">
            {/* Ad Space - Top */}
            <div className="mb-8">
              <AdSpace format="horizontal" label="Anuncio Principal" />
            </div>
          {/* Featured Posts */}
          {selectedCategory === "Todas" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">Artículos Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 bg-white" onClick={() => setSelectedPost(post.id)}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">{post.category}</Badge>
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            <Star className="h-3 w-3 mr-1" />
                            Destacado
                          </Badge>
                        </div>
                        <CardTitle className="group-hover:text-blue-600 transition-colors text-black text-lg font-bold">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 text-gray-700 mt-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.date).toLocaleDateString('es-ES')}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {post.readTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Ad Space - Between Content */}
          <div className="mb-8">
            <AdSpace format="horizontal" label="Anuncio Intermedio" />
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">
              {selectedCategory === "Todas" ? "Todos los Artículos" : `Artículos de ${selectedCategory}`}
            </h2>
            <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 bg-white" onClick={() => setSelectedPost(post.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">{post.category}</Badge>
                            {post.featured && (
                              <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                                <Star className="h-3 w-3 mr-1" />
                                Destacado
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors text-black">
                            {post.title}
                          </h3>
                          <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.date).toLocaleDateString('es-ES')}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {post.readTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {post.author}
                              </span>
                            </div>
                            <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                              Leer más
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs border-gray-300 text-gray-600">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Ad Space - Bottom */}
          <div className="mt-8">
            <AdSpace format="horizontal" label="Anuncio Final" />
          </div>
        </div>
      </div>
    </div>
  );
}
