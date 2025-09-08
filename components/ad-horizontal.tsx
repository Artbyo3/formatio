"use client"

import { useEffect, useRef } from "react"

interface AdHorizontalProps {
  className?: string
  adSlot: string
}

export function AdHorizontal({ className = "", adSlot }: AdHorizontalProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined" || !adRef.current || initialized.current) return

    initialized.current = true

    // Clear any previous content
    while (adRef.current.firstChild) {
      adRef.current.removeChild(adRef.current.firstChild)
    }

    try {
      // Create the ins element manually
      const ins = document.createElement("ins")
      ins.className = "adsbygoogle"
      ins.style.display = "block"
      ins.style.width = "100%"
      ins.style.height = "100%"
      ins.setAttribute("data-ad-client", "ca-pub-5211105409955429")
      ins.setAttribute("data-ad-slot", adSlot)
      ins.setAttribute("data-ad-format", "auto")
      ins.setAttribute("data-full-width-responsive", "true")

      // Add to DOM
      adRef.current.appendChild(ins)

      // Initialize with a delay to ensure AdSense script is loaded
      setTimeout(() => {
        try {
          // @ts-ignore
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
          console.error("Error initializing ad:", error)
        }
      }, 200)
    } catch (error) {
      console.error("Error setting up ad:", error)
    }
  }, [adSlot])

  return (
    <div className={`w-full h-[120px] ${className}`}>
      <div ref={adRef} className="w-full h-full"></div>
    </div>
  )
}
