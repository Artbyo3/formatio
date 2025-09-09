"use client";

import { useEffect } from "react";

interface AdSpaceProps {
  format?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

export function AdSpace({ 
  format = 'horizontal', 
  className = "",
  label = "Área de Anuncio"
}: AdSpaceProps) {
  useEffect(() => {
    try {
      // Cargar el script de Google Ads si no está cargado
      if (typeof window !== 'undefined' && !(window as any).adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5211105409955429';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    } catch (error) {
      console.log('Error loading Google Ads script:', error);
    }
  }, []);

  const adClient = 'ca-pub-5211105409955429';
  const adSlot = '6056376493';

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`}>
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className="text-xs text-gray-400">
        {format === 'horizontal' ? '728x90 - Horizontal' : '300x250 - Vertical'}
      </div>
      <div className="mt-4">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script 
          dangerouslySetInnerHTML={{
            __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
          }}
        />
      </div>
    </div>
  );
}