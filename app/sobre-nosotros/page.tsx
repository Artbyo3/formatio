import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SobreNosotros() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sobre Nosotros</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Información del Sitio</CardTitle>
          <CardDescription>Detalles sobre el operador de este servicio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Formatio es una herramienta en línea gratuita diseñada para ayudar a los usuarios a formatear,
            transformar y manipular texto de manera rápida y sencilla.
          </p>
        
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Política de Privacidad</CardTitle>
          <CardDescription>Cómo manejamos tus datos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-medium">Recopilación de Datos</h3>
          <p>
            Formatio no almacena ningún texto que proceses en nuestra herramienta. Todo el procesamiento se
            realiza en tu navegador y no enviamos tu contenido a nuestros servidores.
          </p>

          <h3 className="text-lg font-medium">Google AdSense</h3>
          <p>
            Utilizamos Google AdSense para mostrar anuncios. Google puede utilizar cookies para personalizar los
            anuncios que ves. Puedes obtener más información sobre cómo Google utiliza tus datos visitando la{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Política de Privacidad de Google
            </a>
            .
          </p>

      
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Términos y Condiciones</CardTitle>
          <CardDescription>Reglas de uso del servicio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-medium">Uso Aceptable</h3>
          <p>
            Al utilizar Formatio, aceptas no utilizar el servicio para procesar o generar contenido ilegal,
            difamatorio, obsceno, ofensivo o que infrinja derechos de autor.
          </p>

          <h3 className="text-lg font-medium">Limitación de Responsabilidad</h3>
          <p>
            Proporcionamos este servicio &quot;tal cual&quot;, sin garantías de ningún tipo. No somos responsables de ningún daño
            que pueda resultar del uso de nuestra herramienta.
          </p>

          <h3 className="text-lg font-medium">Cambios en los Términos</h3>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
            inmediatamente después de su publicación en el sitio.
          </p>
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
