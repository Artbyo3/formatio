"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  BarChart3, 
  HardDrive,
  Menu,
  X
} from "lucide-react";

export type AppView = 'dashboard' | 'editor' | 'tools' | 'settings';

interface AppNavigationProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  documentCount: number;
  isDirty: boolean;
  showMobileMenu: boolean;
  onToggleMobileMenu: () => void;
}

export function AppNavigation({
  currentView,
  onViewChange,
  documentCount,
  isDirty,
  showMobileMenu,
  onToggleMobileMenu
}: AppNavigationProps) {
  const navigationItems = [
    {
      id: 'dashboard' as AppView,
      label: 'Inicio',
      icon: LayoutDashboard,
      description: 'Documentos y archivos'
    },
    {
      id: 'editor' as AppView,
      label: 'Editor',
      icon: FileText,
      description: 'Escribir y editar',
      badge: isDirty ? '•' : undefined
    },
    {
      id: 'tools' as AppView,
      label: 'Herramientas',
      icon: BarChart3,
      description: 'Formateo y análisis'
    },
    {
      id: 'settings' as AppView,
      label: 'Ajustes',
      icon: Settings,
      description: 'Configuración'
    }
  ];

  return (
    <>
      {/* Navegación móvil */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Formatio</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMobileMenu}
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {showMobileMenu && (
          <div className="border-b bg-background">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onViewChange(item.id);
                      onToggleMobileMenu();
                    }}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Navegación desktop */}
      <div className="hidden lg:block w-64 bg-muted/30 border-r h-full">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Formatio</h1>
              <p className="text-xs text-muted-foreground">Editor de Texto</p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">{documentCount}</span> documentos
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Información adicional */}
        <div className="p-4 border-t mt-auto">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Datos almacenados localmente</p>
            <p>• Sin conexión a internet requerida</p>
            <p>• Exporta regularmente tus documentos</p>
          </div>
        </div>
      </div>
    </>
  );
}
