"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextStats } from "./text-stats";
import { TextValidators } from "./text-validators";

interface StatsPanelProps {
  text: string;
  onApplyResult: (result: string) => void;
}

export function StatsPanel({ text, onApplyResult }: StatsPanelProps) {
  return (
    <div className="w-80 bg-muted/30 border-l p-4 overflow-y-auto">
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="validate">Validar</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="mt-4">
          <TextStats text={text} />
        </TabsContent>

        <TabsContent value="validate" className="mt-4">
          <TextValidators onApplyResult={onApplyResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
