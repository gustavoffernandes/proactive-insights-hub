import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, AlertTriangle, TrendingUp } from "lucide-react";
import { SCALE_LABELS, SCALES, getRiskLevel, getRiskLabel } from "@/lib/proart";
import type { Json } from "@/integrations/supabase/types";

export default function Index() {
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("companies").select("id, name").then(({ data }) => {
      setCompanies(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedCompany) {
      setResponses([]);
      return;
    }
    supabase
      .from("survey_responses")
      .select("*")
      .eq("company_id", selectedCompany)
      .then(({ data }) => setResponses(data || []));
  }, [selectedCompany]);

  const getScaleAverage = (scaleNumber: number) => {
    if (!responses.length) return 0;
    const key = `scale_${scaleNumber}` as const;
    let total = 0;
    let count = 0;
    responses.forEach((r) => {
      const scaleData = r[key] as Record<string, number>;
      if (scaleData && typeof scaleData === "object") {
        Object.values(scaleData).forEach((v) => {
          if (typeof v === "number") {
            total += v;
            count++;
          }
        });
      }
    });
    return count > 0 ? total / count : 0;
  };

  const sectors = [...new Set(responses.map((r) => r.sector).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos riscos psicossociais (PROART)</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Selecione uma empresa" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedCompany ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Building2 className="mb-4 h-12 w-12 opacity-40" />
            <p className="text-lg font-medium">Selecione uma empresa para começar</p>
            <p className="text-sm">Os dados do protocolo PROART serão exibidos aqui</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Respondentes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{responses.length}</div>
                <p className="text-xs text-muted-foreground">{sectors.length} setores</p>
              </CardContent>
            </Card>

            {([1, 2, 3, 4] as const).map((scaleNum) => {
              const avg = getScaleAverage(scaleNum);
              const risk = getRiskLevel(avg, scaleNum);
              const riskColors = {
                low: "text-risk-low",
                medium: "text-risk-medium",
                high: "text-risk-high",
              };
              return (
                <Card key={scaleNum}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium truncate">
                      Escala {scaleNum}
                    </CardTitle>
                    {risk === "high" ? (
                      <AlertTriangle className="h-4 w-4 text-risk-high" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${riskColors[risk]}`}>
                      {avg > 0 ? avg.toFixed(2) : "—"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {SCALE_LABELS[scaleNum]} · {avg > 0 ? getRiskLabel(risk) : "Sem dados"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {responses.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>Nenhuma resposta encontrada para esta empresa.</p>
                <p className="text-sm">Importe dados via Google Sheets na página de Configurações.</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
