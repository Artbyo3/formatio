import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";

// Datos de artículos del blog (mismo que en la página principal)
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

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.id === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
