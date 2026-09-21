import { useEffect, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { StatusPill, speciesTone } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PatientsView() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    setor: "",
    proximo_exame: "",
  });

  const openCreateModal = () => {
    setEditingPaciente(null);
    setFormData({
      nome: "",
      especie: "",
      setor: "",
      proximo_exame: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (paciente: any) => {
    setEditingPaciente(paciente);
    setFormData({
      nome: paciente.nome,
      especie: paciente.especie,
      setor: paciente.setor,
      proximo_exame: paciente.proximo_exame,
    });
    setIsModalOpen(true);
  };

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

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const url = editingPaciente
        ? `http://localhost:8000/api/pacientes/${editingPaciente.id}`
        : "http://localhost:8000/api/pacientes";

      const method = editingPaciente ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(editingPaciente ? "Erro ao atualizar paciente" : "Erro ao cadastrar paciente");
      }

      setIsModalOpen(false);
      setEditingPaciente(null);
      setFormData({
        nome: "",
        especie: "",
        setor: "",
        proximo_exame: "",
      });
      await fetchPacientes();
    } catch (error) {
      console.error(editingPaciente ? "Falha ao atualizar paciente:" : "Falha ao cadastrar paciente:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pacientes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar paciente");
      }

      setPacientes((prev) => prev.filter((paciente) => paciente.id !== id));
    } catch (error) {
      console.error("Falha ao deletar paciente:", error);
    }
  };

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
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 rounded-lg" onClick={openCreateModal}>
                <Plus className="size-4" strokeWidth={2} /> Cadastrar paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingPaciente ? "Editar paciente" : "Novo paciente"}</DialogTitle>
                <DialogDescription>
                  {editingPaciente ? "Atualize as informações do paciente." : "Cadastre um paciente para acompanhar exames e setor."}
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))}
                    placeholder="Ex: Asterion 17"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="especie">Espécie</Label>
                  <Input
                    id="especie"
                    value={formData.especie}
                    onChange={(event) => setFormData((prev) => ({ ...prev, especie: event.target.value }))}
                    placeholder="Ex: Humano"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="setor">Setor</Label>
                  <Input
                    id="setor"
                    value={formData.setor}
                    onChange={(event) => setFormData((prev) => ({ ...prev, setor: event.target.value }))}
                    placeholder="Ex: Setor 4"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proximo_exame">Próximo exame</Label>
                  <Input
                    id="proximo_exame"
                    value={formData.proximo_exame}
                    onChange={(event) => setFormData((prev) => ({ ...prev, proximo_exame: event.target.value }))}
                    placeholder="Ex: 2026-10-12"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingPaciente ? "Salvar alterações" : "Salvar paciente"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Editar ${p.nome}`}
                      title={`Editar ${p.nome}`}
                      className="size-8 text-muted-foreground hover:text-foreground"
                      onClick={() => openEditModal(p)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Excluir ${p.nome}`}
                      title={`Excluir ${p.nome}`}
                      className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
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
