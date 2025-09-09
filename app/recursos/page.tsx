"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Code, 
  Type, 
  AlignLeft,
  List,
  Quote,
  Download,
  ExternalLink,
  Star,
  Users,
  Target,
  Zap,
  Lightbulb,
  Eye
} from "lucide-react";
import Link from "next/link";

// Recursos educativos
const resources = [
  {
    id: "plantillas-documentos",
    title: "Plantillas de Documentos Profesionales",
    description: "Colección de plantillas listas para usar para diferentes tipos de documentos empresariales y académicos.",
    category: "Plantillas",
    icon: FileText,
    type: "download",
    items: [
      "Informes ejecutivos",
      "Propuestas de proyecto",
      "Cartas comerciales",
      "Presentaciones",
      "Manuales de usuario"
    ],
    featured: true
  },
  {
    id: "guia-markdown",
    title: "Guía Completa de Markdown",
    description: "Aprende la sintaxis de Markdown para crear documentos bien formateados de manera rápida y eficiente.",
    category: "Tutoriales",
    icon: Code,
    type: "guide",
    items: [
      "Sintaxis básica",
      "Formato de texto",
      "Listas y tablas",
      "Enlaces e imágenes",
      "Código y bloques"
    ],
    featured: true
  },
  {
    id: "herramientas-tipografia",
    title: "Herramientas de Tipografía Online",
    description: "Recopilación de las mejores herramientas gratuitas para trabajar con tipografía y fuentes.",
    category: "Herramientas",
    icon: Type,
    type: "tools",
    items: [
      "Google Fonts",
      "Font Squirrel",
      "Adobe Fonts",
      "Font Pair",
      "Type Scale"
    ],
    featured: false
  },
  {
    id: "checklist-escritura",
    title: "Checklist de Escritura Profesional",
    description: "Lista de verificación para asegurar que tus documentos cumplan con los estándares profesionales.",
    category: "Recursos",
    icon: List,
    type: "checklist",
    items: [
      "Revisión de ortografía",
      "Consistencia de formato",
      "Estructura lógica",
      "Legibilidad",
      "Elementos visuales"
    ],
    featured: true
  },
  {
    id: "estilos-citacion",
    title: "Guías de Estilos de Citación",
    description: "Referencias rápidas para los estilos de citación más comunes en documentos académicos y profesionales.",
    category: "Referencias",
    icon: Quote,
    type: "reference",
    items: [
      "APA (American Psychological Association)",
      "MLA (Modern Language Association)",
      "Chicago Manual of Style",
      "IEEE (Institute of Electrical and Electronics Engineers)",
      "Harvard Referencing"
    ],
    featured: false
  },
  {
    id: "herramientas-colaboracion",
    title: "Herramientas de Colaboración en Documentos",
    description: "Plataformas y herramientas para trabajar en equipo en la creación y edición de documentos.",
    category: "Herramientas",
    icon: Users,
    type: "tools",
    items: [
      "Google Docs",
      "Microsoft 365",
      "Notion",
      "Confluence",
      "Slab"
    ],
    featured: false
  }
];

const categories = [
  { name: "Plantillas", icon: FileText, count: 1 },
  { name: "Tutoriales", icon: BookOpen, count: 1 },
  { name: "Herramientas", icon: Code, count: 2 },
  { name: "Recursos", icon: List, count: 1 },
  { name: "Referencias", icon: Quote, count: 1 }
];

const tips = [
  {
    title: "Mantén la Consistencia",
    description: "Usa el mismo formato para elementos similares en todo tu documento.",
    icon: Target
  },
  {
    title: "Prioriza la Legibilidad",
    description: "Elige fuentes claras y mantén un tamaño apropiado para tu audiencia.",
    icon: Eye
  },
  {
    title: "Usa el Espacio en Blanco",
    description: "El espacio en blanco mejora la legibilidad y hace el documento más atractivo.",
    icon: Zap
  },
  {
    title: "Organiza con Jerarquía",
    description: "Usa títulos y subtítulos para crear una estructura clara y navegable.",
    icon: AlignLeft
  }
];

export default function RecursosPage() {
  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos y Herramientas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para crear documentos profesionales, desde plantillas hasta guías de estilo y herramientas de colaboración.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <resource.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Badge variant="secondary">{resource.category}</Badge>
                      <Badge variant="outline" className="ml-2 text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Destacado
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <strong>Incluye:</strong>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {resource.items.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                      {resource.items.length > 3 && (
                        <li className="text-gray-500 text-xs">
                          +{resource.items.length - 3} más...
                        </li>
                      )}
                    </ul>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        {resource.type === 'download' && <Download className="h-4 w-4 mr-2" />}
                        {resource.type === 'guide' && <BookOpen className="h-4 w-4 mr-2" />}
                        {resource.type === 'tools' && <ExternalLink className="h-4 w-4 mr-2" />}
                        {resource.type === 'checklist' && <List className="h-4 w-4 mr-2" />}
                        {resource.type === 'reference' && <Quote className="h-4 w-4 mr-2" />}
                        Ver {resource.type === 'download' ? 'Descargar' : 'Detalles'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Todos los Recursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <resource.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <Badge variant="secondary">{resource.category}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <strong>Incluye:</strong>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {resource.items.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                      {resource.items.length > 3 && (
                        <li className="text-gray-500 text-xs">
                          +{resource.items.length - 3} más...
                        </li>
                      )}
                    </ul>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        {resource.type === 'download' && <Download className="h-4 w-4 mr-2" />}
                        {resource.type === 'guide' && <BookOpen className="h-4 w-4 mr-2" />}
                        {resource.type === 'tools' && <ExternalLink className="h-4 w-4 mr-2" />}
                        {resource.type === 'checklist' && <List className="h-4 w-4 mr-2" />}
                        {resource.type === 'reference' && <Quote className="h-4 w-4 mr-2" />}
                        Ver {resource.type === 'download' ? 'Descargar' : 'Detalles'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Consejos Rápidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explorar por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                    <category.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} recursos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas Ayuda Personalizada?</h2>
          <p className="text-xl mb-6 opacity-90">
            Nuestro equipo está aquí para ayudarte a crear documentos profesionales perfectos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button size="lg" variant="secondary">
                <BookOpen className="h-5 w-5 mr-2" />
                Ver Blog
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              <Lightbulb className="h-5 w-5 mr-2" />
              Consejos Diarios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
