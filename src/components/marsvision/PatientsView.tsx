import { useEffect, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { StatusPill, speciesTone } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PatientsView() {
  const [pacientes, setPacientes] = useState<any[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pacientes");
        if (!response.ok) {
          throw new Error("Erro ao buscar pacientes");
        }
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Falha ao carregar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-base font-semibold">Cadastro de pacientes</h3>
          <p className="label-tech mt-1">{pacientes.length} registros</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} />
            <Input placeholder="Buscar paciente" aria-label="Buscar paciente" className="h-9 w-56 rounded-lg bg-surface pl-8 text-sm" />
          </div>
          <Button className="h-9 rounded-lg">
            <Plus className="size-4" strokeWidth={2} /> Cadastrar paciente
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              {["ID do paciente", "Nome completo", "Colônia / Setor", "Espécie", "Próximo exame", "Ações"].map((h) => (
                <th key={h} className="label-tech px-4 py-2.5 text-left last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-2">
                <td className="px-4 py-3 text-xs font-medium text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{p.nome}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.setor}</td>
                <td className="px-4 py-3">
                  <StatusPill tone={speciesTone[p.especie] ?? "default"}>{p.especie}</StatusPill>
                </td>
                <td className="px-4 py-3 text-xs font-medium text-foreground">{p.proximo_exame}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button type="button" variant="ghost" size="icon" aria-label={`Editar ${p.nome}`} title={`Editar ${p.nome}`} className="size-8 text-muted-foreground hover:text-foreground"><Pencil className="size-4" /></Button>
                    <Button type="button" variant="ghost" size="icon" aria-label={`Excluir ${p.nome}`} title={`Excluir ${p.nome}`} className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
