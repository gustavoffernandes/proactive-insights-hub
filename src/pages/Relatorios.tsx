import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Gere relatórios PDF profissionais</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <FileText className="mb-4 h-12 w-12 opacity-40" />
          <p className="text-lg font-medium">Em breve</p>
          <p className="text-sm">Geração de relatórios PDF será implementada na próxima fase</p>
        </CardContent>
      </Card>
    </div>
  );
}
