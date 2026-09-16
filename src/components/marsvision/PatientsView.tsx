import { Plus, Search } from "lucide-react";
import { patients } from "./data";
import { StatusPill, speciesTone } from "./StatusPill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PatientsView() {
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-sm font-semibold">Patient Registry</h3>
          <p className="label-tech mt-1">1,284 records // 8 shown</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} />
            <Input placeholder="Search registry" className="h-9 w-56 rounded-sm bg-surface-2 pl-8 text-sm" />
          </div>
          <Button className="h-9 rounded-sm">
            <Plus className="size-4" strokeWidth={2} /> Register Patient
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              {["Patient ID", "Full Name", "Colony / Sector", "Species", "Next Exam"].map((h) => (
                <th key={h} className="label-tech px-4 py-2.5 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-2">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.colony}</td>
                <td className="px-4 py-3">
                  <StatusPill tone={speciesTone[p.species]}>{p.species}</StatusPill>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{p.nextExam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
