import { products } from "./data";
import { StatusPill } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ProductsView() {
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-sm font-semibold">Inventory — Clinic Store</h3>
          <p className="label-tech mt-1">Prices in Galactic Credits (GC)</p>
        </div>
        <Button variant="outline" className="h-9 rounded-sm">
          <Plus className="size-4" strokeWidth={2} /> Add Product
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              {["SKU", "Product Name", "Category", "Stock Level", "Price (GC)"].map((h) => (
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
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={"font-mono text-sm " + (low ? "text-destructive" : "text-foreground")}>
                        {p.stock}
                      </span>
                      {low && <StatusPill tone="danger">Low stock</StatusPill>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-accent">
                    {p.price.toLocaleString("en-US")} GC
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
