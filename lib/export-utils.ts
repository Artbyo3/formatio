export interface ExportOptions {
  format: 'txt' | 'html' | 'pdf' | 'docx';
  filename?: string;
  includeMetadata?: boolean;
}

export class ExportManager {
  static exportToText(content: string, filename: string = 'documento.txt'): void {
    // Limpiar HTML y convertir a texto plano
    const textContent = this.stripHtml(content);
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static exportToHtml(content: string, filename: string = 'documento.html'): void {
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename.replace('.html', '')}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        p {
            margin-bottom: 1em;
        }
        blockquote {
            border-left: 4px solid #ddd;
            margin: 1em 0;
            padding-left: 1em;
            font-style: italic;
        }
        code {
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #f5f5f5;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async exportToPdf(content: string, filename: string = 'documento.pdf'): Promise<void> {
    // Para PDF necesitaríamos una librería como jsPDF o Puppeteer
    // Por ahora, exportamos como HTML que se puede imprimir como PDF
    this.exportToHtml(content, filename.replace('.pdf', '.html'));
    
    // Mostrar mensaje al usuario
    alert('Se ha exportado como HTML. Puedes usar "Imprimir como PDF" en tu navegador para convertirlo a PDF.');
  }

  static async exportToDocx(content: string, filename: string = 'documento.docx'): Promise<void> {
    // Para DOCX necesitaríamos una librería como docx
    // Por ahora, exportamos como HTML
    this.exportToHtml(content, filename.replace('.docx', '.html'));
    
    // Mostrar mensaje al usuario
    alert('Se ha exportado como HTML. Puedes abrirlo en Word y guardarlo como DOCX.');
  }

  static stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  static formatFilename(title: string, format: string): string {
    const sanitized = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    return `${sanitized || 'documento'}.${format}`;
  }
}
