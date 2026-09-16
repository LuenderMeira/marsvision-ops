import { MapPin, User } from "lucide-react";
import { appointments } from "./data";
import { StatusPill, apptTone } from "./StatusPill";

export function ScheduleView() {
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-base font-semibold">Agenda de hoje — Sol 07 / Ciclo 2242</h3>
          <p className="label-tech mt-1">6 atendimentos • 2 salas cirúrgicas ativas</p>
        </div>
        <StatusPill tone="accent">Ocupação das salas: 68%</StatusPill>
      </div>

      <ol className="p-4">
        {appointments.map((a, i) => (
          <li key={a.time} className="flex gap-4">
            <div className="w-16 shrink-0 pt-3 text-right text-sm font-semibold text-foreground">{a.time}</div>
            <div className="relative flex flex-col items-center">
              <span className="mt-4 size-2 shrink-0 rounded-full bg-primary" />
              {i < appointments.length - 1 && <span className="w-px flex-1 bg-border" />}
            </div>
            <div className="mb-3 flex-1 rounded-lg border border-border bg-background p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <StatusPill tone={apptTone[a.status]}>{a.status}</StatusPill>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5" strokeWidth={1.8} /> {a.patient}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" strokeWidth={1.8} /> {a.room}
                </span>
                <span>{a.duration}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
