import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { StatusPill } from "./StatusPill";

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number | string;
};

export function ProductsView() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    quantidade: "",
    preco: "",
  });

  const openCreateModal = () => {
    setEditingProduto(null);
    setFormData({ nome: "", categoria: "", quantidade: "", preco: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (produto: Produto) => {
    setEditingProduto(produto);
    setFormData({
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: String(produto.quantidade),
      preco: String(produto.preco),
    });
    setIsModalOpen(true);
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/produtos");
      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Falha ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nome = formData.nome;
    const categoria = formData.categoria;
    const quantidade = Number(formData.quantidade);
    const precoTratado = String(formData.preco).replace(",", ".");
    const preco = Number(precoTratado);

    try {
      const url = editingProduto
        ? `http://localhost:8000/api/produtos/${editingProduto.id}`
        : "http://localhost:8000/api/produtos";
      const method = editingProduto ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          categoria,
          quantidade,
          preco,
        }),
      });

      if (!response.ok) {
        const erro = await response.json().catch(() => null);
        console.error("O backend recusou:", erro);
        alert("Ops! O servidor recusou os dados do produto.");
        return;
      }

      setIsModalOpen(false);
      setEditingProduto(null);
      setFormData({ nome: "", categoria: "", quantidade: "", preco: "" });
      await fetchProdutos();
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Falha na comunicação com o servidor local. O Uvicorn está rodando?");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/produtos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir produto");
      }

      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error("Falha ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
    }
  };

  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-base font-semibold">Estoque da loja clínica</h3>
          <p className="label-tech mt-1">Valores em Créditos Galácticos (CG)</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 rounded-lg" type="button" onClick={openCreateModal}>
              <Plus className="size-4" strokeWidth={2} /> Adicionar produto
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingProduto ? "Editar produto" : "Cadastrar produto"}</DialogTitle>
              <DialogDescription>
                {editingProduto ? "Atualize os dados do produto selecionado." : "Preencha os dados do novo produto para adicionar ao estoque."}
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))}
                  placeholder="Ex: Lente de contato Proxima"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(event) => setFormData((prev) => ({ ...prev, categoria: event.target.value }))}
                  placeholder="Ex: Ótica"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    min="0"
                    value={formData.quantidade}
                    onChange={(event) => setFormData((prev) => ({ ...prev, quantidade: event.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preco">Preço</Label>
                  <Input
                    id="preco"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.preco}
                    onChange={(event) => setFormData((prev) => ({ ...prev, preco: event.target.value }))}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingProduto ? "Salvar alterações" : "Salvar produto"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              {['Produto', 'Categoria', 'Quantidade', 'Preço (CG)', 'Ações'].map((h) => (
                <th key={h} className="label-tech px-4 py-2.5 text-left last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => {
              const baixoEstoque = Number(produto.quantidade) < 5;

              return (
                <tr key={produto.id} className="border-b border-border last:border-0 hover:bg-surface-2">
                  <td className="px-4 py-3 font-medium text-foreground">{produto.nome}</td>
                  <td className="px-4 py-3 text-muted-foreground">{produto.categoria}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={"text-sm font-medium " + (baixoEstoque ? "text-destructive" : "text-foreground")}>
                        {produto.quantidade}
                      </span>
                      {baixoEstoque && <StatusPill tone="danger">Estoque baixo</StatusPill>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                    {Number(produto.preco).toLocaleString("pt-BR")} CG
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Editar ${produto.nome}`}
                        title={`Editar ${produto.nome}`}
                        className="size-8 text-muted-foreground hover:text-foreground"
                        onClick={() => openEditModal(produto)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Excluir ${produto.nome}`}
                        title={`Excluir ${produto.nome}`}
                        className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(produto.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
