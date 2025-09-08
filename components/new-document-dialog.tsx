"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Search, FileText, Plus, BookOpen, FileCheck, Users, Briefcase, User, Newspaper, FileEdit, MessageSquare, GraduationCap, Calendar, Heart, Star, Globe, Code, PenTool } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  content: string;
}

interface NewDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDocument: (template?: Template) => void;
}

export function NewDocumentDialog({ isOpen, onClose, onCreateDocument }: NewDocumentDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Plantillas expandidas para diferentes tipos de textos formateables
  const templates: Template[] = [
    // Correspondencia
    {
      id: 'letter-formal',
      name: 'Carta Formal',
      description: 'Plantilla para cartas formales y comerciales',
      icon: <FileText className="h-5 w-5" />,
      category: 'Correspondencia',
      content: `Estimado/a [Nombre],

Me dirijo a usted con el propósito de [motivo de la carta].

[Desarrollo del contenido principal]

Agradezco su atención y quedo a la espera de su respuesta.

Atentamente,
[Su nombre]
[Fecha]`
    },
    {
      id: 'email-professional',
      name: 'Email Profesional',
      description: 'Plantilla para emails corporativos y profesionales',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Correspondencia',
      content: `Asunto: [Asunto del email]

Estimado/a [Nombre],

Espero que se encuentre bien.

[Contenido del mensaje]

Por favor, no dude en contactarme si tiene alguna pregunta.

Saludos cordiales,
[Su nombre]
[Su cargo]
[Información de contacto]`
    },
    {
      id: 'invitation',
      name: 'Invitación',
      description: 'Plantilla para invitaciones formales e informales',
      icon: <Calendar className="h-5 w-5" />,
      category: 'Correspondencia',
      content: `Estimado/a [Nombre],

Nos complace invitarle a [evento/actividad] que se realizará el [fecha] a las [hora] en [lugar].

[Detalles del evento]

Esperamos contar con su presencia.

Atentamente,
[Organizador]
[Información de contacto]`
    },

    // Documentos de trabajo
    {
      id: 'report',
      name: 'Informe',
      description: 'Estructura para informes y reportes ejecutivos',
      icon: <FileCheck className="h-5 w-5" />,
      category: 'Documentos',
      content: `INFORME

Título: [Título del informe]
Fecha: [Fecha]
Autor: [Nombre del autor]

RESUMEN EJECUTIVO
[Resumen de los puntos principales]

INTRODUCCIÓN
[Contexto y objetivos]

DESARROLLO
[Contenido principal dividido en secciones]

CONCLUSIONES
[Conclusiones y recomendaciones]

ANEXOS
[Documentos de apoyo si los hay]`
    },
    {
      id: 'proposal',
      name: 'Propuesta Comercial',
      description: 'Estructura para propuestas comerciales y de proyectos',
      icon: <Briefcase className="h-5 w-5" />,
      category: 'Documentos',
      content: `PROPUESTA COMERCIAL

Cliente: [Nombre del cliente]
Fecha: [Fecha]
Proyecto: [Nombre del proyecto]

RESUMEN EJECUTIVO
[Resumen de la propuesta]

OBJETIVOS
[Objetivos del proyecto]

METODOLOGÍA
[Descripción del enfoque]

CRONOGRAMA
[Fechas y hitos importantes]

PRESUPUESTO
[Desglose de costos]

BENEFICIOS
[Ventajas para el cliente]

PRÓXIMOS PASOS
[Acciones a seguir]`
    },
    {
      id: 'meeting-minutes',
      name: 'Acta de Reunión',
      description: 'Plantilla para actas de reuniones y sesiones',
      icon: <Users className="h-5 w-5" />,
      category: 'Documentos',
      content: `ACTA DE REUNIÓN

Fecha: [Fecha]
Hora: [Hora de inicio] - [Hora de finalización]
Lugar: [Ubicación]
Convocante: [Nombre]

ASISTENTES
- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

AGENDA
1. [Punto 1]
2. [Punto 2]
3. [Punto 3]

DESARROLLO
[Resumen de lo discutido en cada punto]

ACUERDOS
[Decisiones tomadas]

TAREAS ASIGNADAS
- [Tarea 1] - Responsable: [Nombre] - Fecha: [Fecha]
- [Tarea 2] - Responsable: [Nombre] - Fecha: [Fecha]

PRÓXIMA REUNIÓN
Fecha: [Fecha]
Hora: [Hora]
Lugar: [Ubicación]

Firma del secretario: [Nombre]`
    },

    // Contenido creativo
    {
      id: 'article',
      name: 'Artículo de Blog',
      description: 'Estructura para artículos y contenido web',
      icon: <Newspaper className="h-5 w-5" />,
      category: 'Contenido',
      content: `# [Título del Artículo]

*Por [Autor] - [Fecha]*

## Introducción
[Párrafo introductorio que capture la atención del lector]

## Desarrollo
[Contenido principal dividido en secciones con subtítulos]

### Subtítulo 1
[Contenido de la primera sección]

### Subtítulo 2
[Contenido de la segunda sección]

## Conclusión
[Resumen y cierre del artículo]

---
*Etiquetas: [tag1, tag2, tag3]*
*Compartir en: [redes sociales]*`
    },
    {
      id: 'story',
      name: 'Historia/Cuento',
      description: 'Plantilla para narrativas y cuentos',
      icon: <BookOpen className="h-5 w-5" />,
      category: 'Contenido',
      content: `# [Título de la Historia]

## Capítulo 1: [Título del capítulo]

[Desarrollo de la historia...]

---

*Personajes principales:*
- [Personaje 1]: [Descripción]
- [Personaje 2]: [Descripción]

*Ambientación:*
[Descripción del lugar y tiempo]

*Tema central:*
[Idea principal de la historia]`
    },
    {
      id: 'poem',
      name: 'Poema',
      description: 'Plantilla para poesía y versos',
      icon: <PenTool className="h-5 w-5" />,
      category: 'Contenido',
      content: `[Título del Poema]

[Primera estrofa]
[Línea 1]
[Línea 2]
[Línea 3]

[Segunda estrofa]
[Línea 1]
[Línea 2]
[Línea 3]

[Continuar según la estructura deseada...]

---
*Fecha: [Fecha]*
*Autor: [Nombre]*`
    },

    // Académico
    {
      id: 'essay',
      name: 'Ensayo Académico',
      description: 'Estructura para ensayos y trabajos académicos',
      icon: <GraduationCap className="h-5 w-5" />,
      category: 'Académico',
      content: `# [Título del Ensayo]

**Autor:** [Nombre]
**Fecha:** [Fecha]
**Materia:** [Nombre de la materia]
**Profesor:** [Nombre del profesor]

## Resumen
[Resumen de 150-200 palabras]

## Introducción
[Introducción con tesis principal]

## Desarrollo
### Punto 1: [Título del primer punto]
[Desarrollo del primer argumento]

### Punto 2: [Título del segundo punto]
[Desarrollo del segundo argumento]

### Punto 3: [Título del tercer punto]
[Desarrollo del tercer argumento]

## Conclusión
[Síntesis y conclusiones]

## Referencias
1. [Referencia 1]
2. [Referencia 2]
3. [Referencia 3]`
    },
    {
      id: 'thesis',
      name: 'Tesis/Investigación',
      description: 'Plantilla para trabajos de investigación extensos',
      icon: <FileEdit className="h-5 w-5" />,
      category: 'Académico',
      content: `# [Título de la Tesis]

**Autor:** [Nombre completo]
**Director:** [Nombre del director]
**Institución:** [Nombre de la institución]
**Fecha:** [Fecha de presentación]

## Resumen Ejecutivo
[Resumen de 300-500 palabras]

## Índice
1. Introducción
2. Marco Teórico
3. Metodología
4. Resultados
5. Discusión
6. Conclusiones
7. Referencias
8. Anexos

## 1. Introducción
### 1.1 Planteamiento del Problema
[Descripción del problema]

### 1.2 Objetivos
**Objetivo General:**
[Objetivo principal]

**Objetivos Específicos:**
- [Objetivo 1]
- [Objetivo 2]
- [Objetivo 3]

### 1.3 Justificación
[Importancia y relevancia del estudio]

## 2. Marco Teórico
[Revisión de literatura y fundamentos teóricos]

## 3. Metodología
[Descripción del método de investigación]

## 4. Resultados
[Presentación de los hallazgos]

## 5. Discusión
[Análisis e interpretación de resultados]

## 6. Conclusiones
[Conclusiones principales]

## 7. Referencias
[Lista de referencias bibliográficas]

## 8. Anexos
[Documentos de apoyo]`
    },

    // Personal
    {
      id: 'resume',
      name: 'Currículum Vitae',
      description: 'Plantilla para currículum vitae profesional',
      icon: <User className="h-5 w-5" />,
      category: 'Personal',
      content: `# [Nombre Completo]

**Email:** [email@ejemplo.com]
**Teléfono:** [Número de teléfono]
**LinkedIn:** [Perfil de LinkedIn]
**Ubicación:** [Ciudad, País]

## Resumen Profesional
[Breve resumen de 2-3 líneas sobre tu perfil profesional]

## Experiencia Laboral

### [Cargo] - [Empresa]
*[Fecha de inicio] - [Fecha de finalización]*
- [Logro 1]
- [Logro 2]
- [Logro 3]

### [Cargo] - [Empresa]
*[Fecha de inicio] - [Fecha de finalización]*
- [Logro 1]
- [Logro 2]
- [Logro 3]

## Educación

### [Título] - [Institución]
*[Año de graduación]*
[Descripción adicional si es relevante]

## Habilidades
- [Habilidad 1]
- [Habilidad 2]
- [Habilidad 3]
- [Habilidad 4]

## Certificaciones
- [Certificación 1] - [Institución] - [Año]
- [Certificación 2] - [Institución] - [Año]

## Idiomas
- [Idioma 1]: [Nivel]
- [Idioma 2]: [Nivel]`
    },
    {
      id: 'cover-letter',
      name: 'Carta de Presentación',
      description: 'Plantilla para cartas de presentación laborales',
      icon: <FileText className="h-5 w-5" />,
      category: 'Personal',
      content: `[Su nombre]
[Su dirección]
[Ciudad, Código Postal]
[Su email]
[Su teléfono]
[Fecha]

[Nombre del reclutador]
[Nombre de la empresa]
[Dirección de la empresa]

Estimado/a [Nombre del reclutador],

Me dirijo a usted para expresar mi interés en la posición de [nombre del puesto] que vi publicada en [fuente de la publicación].

Con [X años] de experiencia en [área relevante], he desarrollado habilidades sólidas en [habilidades clave] que considero valiosas para su equipo. En mi posición actual como [cargo actual] en [empresa actual], he logrado [logro específico con números si es posible].

Estoy particularmente interesado en esta oportunidad porque [razón específica relacionada con la empresa o el puesto]. Mi experiencia en [área específica] y mi pasión por [aspecto relevante del trabajo] me motivan a contribuir al éxito de [nombre de la empresa].

Adjunto mi currículum vitae para su consideración. Estaría encantado de discutir cómo mi experiencia y habilidades pueden beneficiar a su equipo.

Agradezco su tiempo y consideración.

Atentamente,
[Su nombre]`
    },

    // Técnico
    {
      id: 'technical-doc',
      name: 'Documentación Técnica',
      description: 'Plantilla para documentación de software y procesos',
      icon: <Code className="h-5 w-5" />,
      category: 'Técnico',
      content: `# [Nombre del Proyecto/API/Funcionalidad]

**Versión:** [Versión]
**Última actualización:** [Fecha]
**Autor:** [Nombre del autor]

## Descripción
[Descripción general del proyecto o funcionalidad]

## Requisitos
- [Requisito 1]
- [Requisito 2]
- [Requisito 3]

## Instalación
\`\`\`bash
[Comandos de instalación]
\`\`\`

## Uso
### Configuración Inicial
[Pasos para configurar]

### Ejemplos de Uso
\`\`\`[lenguaje]
[Código de ejemplo]
\`\`\`

## API Reference
### Métodos
#### [Nombre del método]
**Descripción:** [Descripción del método]
**Parámetros:**
- \`param1\` (tipo): [Descripción]
- \`param2\` (tipo): [Descripción]

**Retorna:** [Tipo de retorno]

## Troubleshooting
### Problema Común 1
**Síntoma:** [Descripción del problema]
**Solución:** [Pasos para resolver]

## Changelog
### v[1.0.0] - [Fecha]
- [Cambio 1]
- [Cambio 2]

## Contribuir
[Instrucciones para contribuir]

## Licencia
[Información de licencia]`
    },
    {
      id: 'user-manual',
      name: 'Manual de Usuario',
      description: 'Plantilla para manuales y guías de usuario',
      icon: <BookOpen className="h-5 w-5" />,
      category: 'Técnico',
      content: `# Manual de Usuario - [Nombre del Producto]

**Versión:** [Versión]
**Fecha:** [Fecha]

## Tabla de Contenidos
1. Introducción
2. Requisitos del Sistema
3. Instalación
4. Primeros Pasos
5. Funcionalidades Principales
6. Configuración Avanzada
7. Solución de Problemas
8. Soporte

## 1. Introducción
### ¿Qué es [Nombre del Producto]?
[Descripción del producto]

### Características Principales
- [Característica 1]
- [Característica 2]
- [Característica 3]

## 2. Requisitos del Sistema
### Requisitos Mínimos
- [Requisito 1]
- [Requisito 2]

### Requisitos Recomendados
- [Requisito 1]
- [Requisito 2]

## 3. Instalación
[Pasos detallados de instalación]

## 4. Primeros Pasos
### Crear una Cuenta
[Pasos para crear cuenta]

### Configuración Inicial
[Pasos de configuración]

## 5. Funcionalidades Principales
### [Funcionalidad 1]
[Descripción y pasos de uso]

### [Funcionalidad 2]
[Descripción y pasos de uso]

## 6. Configuración Avanzada
[Opciones avanzadas de configuración]

## 7. Solución de Problemas
### Problemas Frecuentes
**P: [Pregunta común]**
R: [Respuesta y solución]

## 8. Soporte
[Información de contacto y soporte]`
    },

    // Creativo/Inspiracional
    {
      id: 'journal',
      name: 'Diario Personal',
      description: 'Plantilla para diarios y reflexiones personales',
      icon: <Heart className="h-5 w-5" />,
      category: 'Personal',
      content: `# Diario Personal - [Fecha]

## ¿Cómo me siento hoy?
[Reflexión sobre el estado emocional]

## Lo que hice hoy
- [Actividad 1]
- [Actividad 2]
- [Actividad 3]

## Momentos destacados
[Descripción de momentos especiales del día]

## Aprendizajes
[Lo que aprendí hoy]

## Agradecimientos
[Por qué estoy agradecido hoy]

## Metas para mañana
- [Meta 1]
- [Meta 2]
- [Meta 3]

## Reflexión final
[Pensamientos finales del día]`
    },
    {
      id: 'goals',
      name: 'Plan de Metas',
      description: 'Plantilla para planificación de objetivos personales',
      icon: <Star className="h-5 w-5" />,
      category: 'Personal',
      content: `# Plan de Metas - [Año/Mes]

## Metas a Largo Plazo (1-5 años)
1. [Meta 1]
   - **Por qué es importante:** [Razón]
   - **Cómo la lograré:** [Plan de acción]

2. [Meta 2]
   - **Por qué es importante:** [Razón]
   - **Cómo la lograré:** [Plan de acción]

## Metas a Mediano Plazo (3-12 meses)
1. [Meta 1]
   - **Fecha límite:** [Fecha]
   - **Acciones específicas:** [Lista de acciones]

2. [Meta 2]
   - **Fecha límite:** [Fecha]
   - **Acciones específicas:** [Lista de acciones]

## Metas a Corto Plazo (1-4 semanas)
1. [Meta 1]
   - **Fecha límite:** [Fecha]
   - **Acciones diarias:** [Qué haré cada día]

2. [Meta 2]
   - **Fecha límite:** [Fecha]
   - **Acciones diarias:** [Qué haré cada día]

## Revisión Semanal
### Logros de esta semana
- [Logro 1]
- [Logro 2]

### Desafíos enfrentados
- [Desafío 1]
- [Desafío 2]

### Ajustes para la próxima semana
- [Ajuste 1]
- [Ajuste 2]`
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: <Globe className="h-4 w-4" /> },
    { id: 'Correspondencia', name: 'Correspondencia', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'Documentos', name: 'Documentos', icon: <FileCheck className="h-4 w-4" /> },
    { id: 'Contenido', name: 'Contenido', icon: <Newspaper className="h-4 w-4" /> },
    { id: 'Académico', name: 'Académico', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'Personal', name: 'Personal', icon: <User className="h-4 w-4" /> },
    { id: 'Técnico', name: 'Técnico', icon: <Code className="h-4 w-4" /> }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateDocument = (template?: Template) => {
    onCreateDocument(template);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Crear Nuevo Documento
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 h-full">
          {/* Barra de búsqueda y filtros */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar plantillas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Filtros de categoría */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="shrink-0"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </Button>
            ))}
          </div>

          {/* Opción de documento en blanco */}
          <div className="border rounded-lg p-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Documento en Blanco</h3>
                  <p className="text-sm text-muted-foreground">
                    Comenzar con un documento vacío
                  </p>
                </div>
              </div>
              <Button onClick={() => handleCreateDocument()}>
                Crear
              </Button>
            </div>
          </div>

          {/* Lista de plantillas */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleCreateDocument(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        {template.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron plantillas</h3>
                <p className="text-muted-foreground">
                  Intenta con otros términos de búsqueda o selecciona una categoría diferente.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
