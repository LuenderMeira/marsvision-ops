import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { StatusPill, staffTone } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StaffView() {
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfissional, setEditingProfissional] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    sala: "",
  });

  const fetchProfissionais = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/profissionais");
      if (!response.ok) {
        throw new Error("Erro ao buscar profissionais");
      }
      const data = await response.json();
      setProfissionais(data);
    } catch (error) {
      console.error("Falha ao carregar profissionais:", error);
    }
  };

  useEffect(() => {
    fetchProfissionais();
  }, []);

  const openCreateModal = () => {
    setEditingProfissional(null);
    setFormData({ nome: "", especialidade: "", sala: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (profissional: any) => {
    setEditingProfissional(profissional);
    setFormData({
      nome: profissional.nome,
      especialidade: profissional.especialidade,
      sala: profissional.sala,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const url = editingProfissional
        ? `http://localhost:8000/api/profissionais/${editingProfissional.id}`
        : "http://localhost:8000/api/profissionais";
      const method = editingProfissional ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(editingProfissional ? "Erro ao atualizar profissional" : "Erro ao cadastrar profissional");
      }

      setIsModalOpen(false);
      setEditingProfissional(null);
      setFormData({ nome: "", especialidade: "", sala: "" });
      await fetchProfissionais();
    } catch (error) {
      console.error(editingProfissional ? "Falha ao atualizar profissional:" : "Falha ao cadastrar profissional:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/profissionais/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir profissional");
      }

      setProfissionais((prev) => prev.filter((profissional) => profissional.id !== id));
    } catch (error) {
      console.error("Falha ao excluir profissional:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Equipe clínica</h3>
          <p className="label-tech mt-1">{profissionais.length} profissionais cadastrados</p>
        </div>

        <div className="flex items-center gap-2">
          <StatusPill tone="success">3 disponíveis agora</StatusPill>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 rounded-lg" onClick={openCreateModal}>
                <Plus className="size-4" strokeWidth={2} /> Cadastrar profissional
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[460px]">
              <DialogHeader>
                <DialogTitle>{editingProfissional ? "Editar profissional" : "Novo profissional"}</DialogTitle>
                <DialogDescription>
                  {editingProfissional ? "Atualize as informações do profissional." : "Cadastre um novo membro da equipe."}
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))}
                    placeholder="Ex: Dra. Helena Sato"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade</Label>
                  <Input
                    id="especialidade"
                    value={formData.especialidade}
                    onChange={(event) => setFormData((prev) => ({ ...prev, especialidade: event.target.value }))}
                    placeholder="Ex: Oftalmologia"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sala">Sala</Label>
                  <Input
                    id="sala"
                    value={formData.sala}
                    onChange={(event) => setFormData((prev) => ({ ...prev, sala: event.target.value }))}
                    placeholder="Ex: Sala 01"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingProfissional ? "Salvar alterações" : "Salvar profissional"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {profissionais.map((profissional) => (
          <div key={profissional.id} className="panel p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                {profissional.nome
                  .split(" ")
                  .map((part: string) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{profissional.nome}</p>
                <p className="truncate text-xs text-muted-foreground">{profissional.especialidade}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Editar ${profissional.nome}`}
                  title={`Editar ${profissional.nome}`}
                  className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
                  onClick={() => openEditModal(profissional)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Excluir ${profissional.nome}`}
                  title={`Excluir ${profissional.nome}`}
                  className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(profissional.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">{profissional.sala}</span>
              <StatusPill tone={staffTone["Disponível"] ?? "success"}>Disponível</StatusPill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
