import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Configurações de integração e importação de dados</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Integração Google Sheets</CardTitle>
          <CardDescription>Configure a importação de dados do protocolo PROART</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Settings className="mb-4 h-12 w-12 opacity-40" />
          <p className="text-lg font-medium">Em breve</p>
          <p className="text-sm">A integração com Google Sheets será configurada na próxima fase</p>
        </CardContent>
      </Card>
    </div>
  );
}
