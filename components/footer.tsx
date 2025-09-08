import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {currentYear} Formatio Formateador de Texto. Todos los derechos reservados.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/sobre-nosotros" className="hover:underline hover:text-foreground transition-colors">
            Sobre Nosotros
          </Link>
          <Link href="/privacidad" className="hover:underline hover:text-foreground transition-colors">
            Privacidad
          </Link>
          <Link href="/terminos" className="hover:underline hover:text-foreground transition-colors">
            Términos
          </Link>
        </nav>
      </div>
    </footer>
  )
}
