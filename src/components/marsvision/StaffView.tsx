import { staff } from "./data";
import { StatusPill, staffTone } from "./StatusPill";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StaffView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Equipe clínica</h3>
          <p className="label-tech mt-1">6 profissionais • turno das 07:00 às 19:00</p>
        </div>
        <StatusPill tone="success">3 disponíveis agora</StatusPill>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {staff.map((s) => (
          <div key={s.name} className="panel p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                {s.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.specialty}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" aria-label={`Editar ${s.name}`} title={`Editar ${s.name}`} className="size-8 shrink-0 text-muted-foreground hover:text-foreground"><Pencil className="size-4" /></Button>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                {s.license} • {s.cases} atendimentos
              </span>
              <StatusPill tone={staffTone[s.status]}>{s.status}</StatusPill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
