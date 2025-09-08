import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Privacidad() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidad</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Política de Privacidad</CardTitle>
          <CardDescription>Última actualización: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div>
            <h3 className="text-lg font-medium mb-2">1. Privacidad y Datos</h3>
            <p>
              Esta aplicación es muy sencilla y no recopila ningún dato personal de los usuarios.
              No utilizamos cookies, rastreadores ni otro método de almacenamiento local.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">2. Anuncios de Google Ads</h3>
            <p>
              Los anuncios que se muestran están gestionados exclusivamente por Google Ads.
              Cualquier recopilación de datos o uso de cookies asociado a esos anuncios
              depende únicamente de la política de Google. Para más información, consulta la&nbsp;
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
              Puedes usar esta aplicación libremente para el propósito previsto.
              Cualquier uso indebido o intento de alterar su funcionamiento está
              expresamente prohibido.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">4. Limitación de Responsabilidad</h3>
            <p>
              No nos hacemos responsables por daños indirectos, especiales o consecuentes
              que puedan derivarse del uso de esta aplicación o de los anuncios gestionados por Google Ads.
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
