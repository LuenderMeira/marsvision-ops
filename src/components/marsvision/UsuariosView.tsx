import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusPill } from "./StatusPill";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  ativo?: boolean;
};

export function UsuariosView() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "Recepcionista",
  });

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/usuarios");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Falha ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usuarios.length >= 3) {
      setError("Seu plano permite até 3 usuários.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          cargo: formData.cargo,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      setIsModalOpen(false);
      setFormData({ nome: "", email: "", senha: "", cargo: "Recepcionista" });
      await fetchUsuarios();
    } catch (error) {
      console.error("Falha ao cadastrar usuário:", error);
      setError("Não foi possível cadastrar o usuário.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Gestão de usuários</h3>
          <p className="label-tech mt-1">Controle de acesso e permissões da clínica</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 rounded-lg" type="button" disabled={usuarios.length >= 3}>
              <Plus className="size-4" strokeWidth={2} /> Novo Usuário
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Novo usuário</DialogTitle>
              <DialogDescription>Cadastre um novo usuário com acesso ao sistema.</DialogDescription>
            </DialogHeader>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="nome-usuario">Nome</Label>
                <Input
                  id="nome-usuario"
                  value={formData.nome}
                  onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))}
                  placeholder="Ex: Ana Ribeiro"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-usuario">Email</Label>
                <Input
                  id="email-usuario"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="ana@marsvision.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha-usuario">Senha</Label>
                <Input
                  id="senha-usuario"
                  type="password"
                  value={formData.senha}
                  onChange={(event) => setFormData((prev) => ({ ...prev, senha: event.target.value }))}
                  placeholder="Digite a senha"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo-usuario">Cargo</Label>
                <Select
                  value={formData.cargo}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, cargo: value }))}
                >
                  <SelectTrigger id="cargo-usuario" className="w-full">
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={usuarios.length >= 3}>
                  Salvar usuário
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-surface">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.cargo}</TableCell>
                <TableCell className="text-right">
                  {usuario.ativo === false ? (
                    <StatusPill tone="neutral">Inativo</StatusPill>
                  ) : (
                    <StatusPill tone="success">Ativo</StatusPill>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
