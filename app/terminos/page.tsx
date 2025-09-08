import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Terminos() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Términos y Condiciones</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Términos y Condiciones</CardTitle>
          <CardDescription>Última actualización: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div>
            <h3 className="text-lg font-medium mb-2">1. Privacidad y Datos</h3>
            <p>
              Esta aplicación es muy sencilla y no recopila ningún dato personal de los usuarios. No utilizamos cookies,
              rastreadores ni almacenamiento de información propia.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">2. Anuncios de Google Ads</h3>
            <p>
              Los anuncios que ves están gestionados exclusivamente por Google Ads. Toda la recolección de datos
              (si hubiera) y el uso de cookies quedan bajo la responsabilidad de Google. Para más detalles,
              consulta la&nbsp;
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Política de Privacidad de Google
              </a>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">3. Uso del Servicio</h3>
            <p>
              Puedes usar libremente esta aplicación para el propósito que fue diseñada. Queda prohibido
              cualquier uso ilegal o que afecte el correcto funcionamiento del mismo.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">4. Limitación de Responsabilidad</h3>
            <p>
              En ningún caso seremos responsables por daños indirectos, especiales o consecuentes
              derivados del uso de esta aplicación o de los anuncios mostrados por Google Ads.
            </p>
          </div>

        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  )
}
