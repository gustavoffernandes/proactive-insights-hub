import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Company = Tables<"companies">;

export default function Empresas() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    const { data } = await supabase.from("companies").select("*").order("created_at", { ascending: false });
    setCompanies(data || []);
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("companies").insert({ name, description });
    if (error) {
      toast.error("Erro ao criar empresa: " + error.message);
    } else {
      toast.success("Empresa criada!");
      setName("");
      setDescription("");
      setOpen(false);
      fetchCompanies();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("companies").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir: " + error.message);
    } else {
      toast.success("Empresa excluída.");
      fetchCompanies();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Gerencie as empresas clientes</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nova Empresa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Empresa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nome da empresa" />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição breve" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Salvando..." : "Criar Empresa"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {companies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Building2 className="mb-4 h-12 w-12 opacity-40" />
            <p className="text-lg font-medium">Nenhuma empresa cadastrada</p>
            <p className="text-sm">Clique em "Nova Empresa" para começar</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <CardDescription>{company.description || "Sem descrição"}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(company.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Criada em {new Date(company.created_at).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
