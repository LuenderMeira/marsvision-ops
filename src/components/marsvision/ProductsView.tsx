import { products } from "./data";
import { StatusPill } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";

export function ProductsView() {
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-base font-semibold">Estoque da loja clínica</h3>
          <p className="label-tech mt-1">Valores em Créditos Galácticos (CG)</p>
        </div>
        <Button className="h-9 rounded-lg">
          <Plus className="size-4" strokeWidth={2} /> Adicionar produto
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              {["SKU", "Produto", "Categoria", "Estoque", "Preço (CG)", "Ações"].map((h) => (
                <th key={h} className="label-tech px-4 py-2.5 text-left last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const low = p.stock < p.min;
              return (
                <tr key={p.sku} className="border-b border-border last:border-0 hover:bg-surface-2">
                  <td className="px-4 py-3 text-xs font-medium text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={"text-sm font-medium " + (low ? "text-destructive" : "text-foreground")}>
                        {p.stock}
                      </span>
                      {low && <StatusPill tone="danger">Estoque baixo</StatusPill>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                    {p.price.toLocaleString("pt-BR")} CG
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button type="button" variant="ghost" size="icon" aria-label={`Editar ${p.name}`} title={`Editar ${p.name}`} className="size-8 text-muted-foreground hover:text-foreground"><Pencil className="size-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" aria-label={`Excluir ${p.name}`} title={`Excluir ${p.name}`} className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></Button>
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
