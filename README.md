# Formatio - Editor de Texto Online

Un editor de texto completo online similar a Google Docs o Microsoft Word, que funciona completamente en el navegador sin necesidad de registro o login. Todos los datos se guardan localmente usando localStorage.

## 🚀 Características Principales

### ✨ Editor de Texto Rico
- **Formato completo**: Negrita, cursiva, subrayado, tachado
- **Alineación**: Izquierda, centro, derecha, justificado
- **Listas**: Con viñetas y numeradas
- **Elementos especiales**: Citas, código, títulos
- **Colores**: Texto y fondo personalizables

### 📄 Gestión de Documentos
- **Múltiples documentos**: Trabaja con varios documentos simultáneamente
- **Pestañas**: Interfaz de pestañas para cambiar entre documentos
- **Títulos editables**: Cambia el nombre de tus documentos
- **Persistencia**: Todo se guarda automáticamente en localStorage
- **Estadísticas**: Contador de palabras, caracteres y líneas

### 🔍 Búsqueda y Reemplazo
- **Búsqueda avanzada**: Con opciones de mayúsculas/minúsculas y palabras completas
- **Expresiones regulares**: Soporte para búsquedas complejas
- **Reemplazo**: Reemplaza texto individual o masivamente
- **Navegación**: Navega entre coincidencias encontradas

### 📤 Exportación e Importación
- **Formatos de exportación**: TXT, HTML, PDF (vía impresión), DOCX (vía HTML)
- **Importación**: Carga archivos de texto existentes
- **Nombres automáticos**: Genera nombres de archivo basados en el título del documento

### 🎨 Elementos de Inserción
- **Enlaces**: Inserta enlaces con texto personalizable
- **Imágenes**: Añade imágenes con URL, dimensiones y texto alternativo
- **Tablas**: Crea tablas con filas y columnas personalizables

### ⌨️ Atajos de Teclado
- `Ctrl+S`: Guardar documento
- `Ctrl+N`: Nuevo documento
- `Ctrl+F`: Buscar
- `Ctrl+H`: Reemplazar
- `Ctrl+Z`: Deshacer
- `Ctrl+Y` o `Ctrl+Shift+Z`: Rehacer

### 🔄 Historial de Cambios
- **Deshacer/Rehacer**: Historial completo de cambios
- **Persistencia**: El historial se mantiene durante la sesión
- **Límite inteligente**: Máximo 50 estados para optimizar rendimiento

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Tailwind CSS**: Framework de estilos utilitarios
- **Lucide React**: Iconos modernos y consistentes
- **localStorage**: Almacenamiento local del navegador

## 🚀 Instalación y Uso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/formatio.git
   cd formatio
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en `http://localhost:3000`

## 📱 Características Responsivas

- **Diseño adaptativo**: Funciona perfectamente en móviles, tablets y escritorio
- **Anuncios inteligentes**: Anuncios laterales en pantallas grandes, horizontales en móviles
- **Interfaz optimizada**: Barra de herramientas y pestañas adaptadas a cada tamaño de pantalla

## 🔒 Privacidad y Seguridad

- **Sin registro**: No necesitas crear cuenta ni proporcionar datos personales
- **Almacenamiento local**: Todos tus documentos se guardan en tu navegador
- **Sin servidor**: No enviamos tus datos a ningún servidor externo
- **Control total**: Tú tienes control completo sobre tus documentos

## 🎯 Casos de Uso

- **Escritura personal**: Diarios, notas, ideas
- **Trabajo**: Documentos de oficina, reportes, presentaciones
- **Educación**: Tareas, ensayos, apuntes
- **Creatividad**: Historias, poesía, guiones
- **Productividad**: Listas, planificaciones, documentación

## 🔮 Próximas Características

- [ ] Colaboración en tiempo real
- [ ] Plantillas de documentos
- [ ] Sincronización con la nube
- [ ] Temas personalizables
- [ ] Atajos de teclado personalizables
- [ ] Soporte para Markdown
- [ ] Integración con servicios de almacenamiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras.

---

**Formatio** - Tu editor de texto online, simple y poderoso. ✨
