import { Card, CardContent } from "@/components/ui/card";
import { GitCompare } from "lucide-react";

export default function Comparacao() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Comparação</h1>
        <p className="text-muted-foreground">Compare setores e empresas lado a lado</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <GitCompare className="mb-4 h-12 w-12 opacity-40" />
          <p className="text-lg font-medium">Em breve</p>
          <p className="text-sm">Funcionalidade de comparação será implementada na próxima fase</p>
        </CardContent>
      </Card>
    </div>
  );
}
